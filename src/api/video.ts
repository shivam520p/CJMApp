import api from './client';

export const uploadSiteVideoApi = async (
    jobId: string,
    formData: FormData
) => {
    return api.post(
        `/api/v1/jobs/${jobId}/site-video`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
};
