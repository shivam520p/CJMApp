import AsyncStorage from '@react-native-async-storage/async-storage';

const VIDEO_KEY = 'PENDING_VIDEOS';

export const getPendingVideos = async () => {
    const data = await AsyncStorage.getItem(VIDEO_KEY);
    return data ? JSON.parse(data) : [];
};

export const savePendingVideos = async (videos: any[]) => {
    await AsyncStorage.setItem(VIDEO_KEY, JSON.stringify(videos));
};
