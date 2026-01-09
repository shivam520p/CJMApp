import AsyncStorage from '@react-native-async-storage/async-storage';

const key = (jobId: string) => `JOB_NOTES_${jobId}`;

export const getLocalNotes = async (jobId: string) => {
    const raw = await AsyncStorage.getItem(key(jobId));
    return raw ? JSON.parse(raw) : [];
};

export const saveLocalNotes = async (jobId: string, notes: any[]) => {
    await AsyncStorage.setItem(key(jobId), JSON.stringify(notes));
};
