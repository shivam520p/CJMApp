import api from './client';

export const getJobsApi = async () => {
    const res = await api.get('/api/v1/jobs');
    return res.data;
};

export const createJobApi = async (job: {
    clientJobId: string;
    title: string;
    location: string;
    description?: string;
    budget: number;
}) => {
    const res = await api.post('/api/v1/jobs', job);
    return res.data;
};

export const updateJobApi = async (
    jobId: string,
    job: {
        clientJobId: string;
        title: string;
        location: string;
        description?: string;
        budget: number;
    }
) => {
    console.log(job, "job", jobId)
    const res = await api.put(`/api/v1/jobs/${jobId}`, job);
    return res.data;
};

export const getJobDetailsApi = async (jobId: string) => {
    const res = await api.get(`/api/v1/job-details/${jobId}`);
    return res.data;
};