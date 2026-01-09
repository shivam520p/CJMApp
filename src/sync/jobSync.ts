import { getLocalJobs, saveLocalJobs } from '../storage/jobStorage';
import { createJobApi, updateJobApi } from '../api/jobs';

export const syncJobs = async () => {
    const jobs = await getLocalJobs();

    const pending = jobs.filter(
        (j: any) => j._syncStatus === 'pending' || j._syncStatus === 'updated'
    );

    if (!pending.length) return;

    const updated = [...jobs];

    for (const job of pending) {
        try {
            const payload = {
                clientJobId: job.clientJobId,
                title: job.title,
                location: job.location,
                description: job.description,
                budget: job.budget,
            };

            if (job._syncStatus === 'pending') {
                await createJobApi(payload);
            } else {
                await updateJobApi(job.clientJobId, payload);
            }

            const idx = updated.findIndex(j => j.id === job.id);
            updated[idx] = { ...job, _syncStatus: 'synced' };
        } catch { }
    }

    await saveLocalJobs(updated);
};
