import NetInfo from '@react-native-community/netinfo';
import { uploadSiteVideoApi } from '../api/video';
import {
    getPendingVideos,
    savePendingVideos,
} from '../storage/videoStorage';

export const syncPendingVideos = async () => {
    const net = await NetInfo.fetch();
    if (!net.isConnected) return;

    const queue = await getPendingVideos();
    if (!queue.length) return;

    const remaining = [];

    for (const item of queue) {
        try {
            const formData = new FormData();

            formData.append('clientVideoId', item.clientVideoId);
            formData.append('image', {
                uri: item.uri,
                type: item.type,
                name: item.fileName,
            } as any);

            await uploadSiteVideoApi(item.jobId, formData);
        } catch {
            remaining.push(item);
        }
    }

    await savePendingVideos(remaining);
};
