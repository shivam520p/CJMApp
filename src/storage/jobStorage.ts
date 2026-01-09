import AsyncStorage from '@react-native-async-storage/async-storage';

const JOBS_KEY = 'LOCAL_JOBS';
const JOB_DETAILS_KEY = 'JOB_DETAILS';

export const getLocalJobs = async () => {
    const data = await AsyncStorage.getItem(JOBS_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveLocalJobs = async (jobs: any[]) => {
    await AsyncStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
};

export const getLocalJobDetails = async (jobId: string) => {
    const data = await AsyncStorage.getItem(JOB_DETAILS_KEY);
    const map = data ? JSON.parse(data) : {};
    return map[jobId] || null;
};

export const saveLocalJobDetails = async (jobId: string, job: any) => {
    const data = await AsyncStorage.getItem(JOB_DETAILS_KEY);
    const map = data ? JSON.parse(data) : {};
    map[jobId] = job;
    await AsyncStorage.setItem(JOB_DETAILS_KEY, JSON.stringify(map));
};
