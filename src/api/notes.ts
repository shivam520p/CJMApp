import api from './client';

export const createNoteApi = (jobId: string, data: any) => {
    return api.post(`/api/v1/jobs/${jobId}/notes`, data);
};

export const updateNoteApi = (jobId: string, noteId: string, data: any) => {
    return api.put(`/api/v1/jobs/${jobId}/notes/${noteId}`, data);
};
