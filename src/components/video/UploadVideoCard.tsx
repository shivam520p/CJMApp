import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import NetInfo from '@react-native-community/netinfo';
import uuid from 'react-native-uuid';

import Lucide from '../Lucide';
import AppText from '../AppText';

import { uploadSiteVideoApi } from '../../api/video';
import {
    getPendingVideos,
    savePendingVideos,
} from '../../storage/videoStorage';

export default function UploadVideoCard({ jobId }: any) {
    const pickVideo = async () => {
        launchImageLibrary(
            { mediaType: 'video', selectionLimit: 1 },
            async response => {
                if (response.didCancel) return;

                if (response.errorCode) {
                    Alert.alert('Error', response.errorMessage || 'Failed');
                    return;
                }

                const asset = response.assets?.[0];
                if (!asset?.uri) return;

                const clientVideoId = uuid.v4();

                const videoPayload = {
                    jobId,
                    clientVideoId,
                    uri: asset.uri,
                    type: asset.type || 'video/mp4',
                    fileName: asset.fileName || 'video.mp4',
                };

                const net = await NetInfo.fetch();

                if (net.isConnected) {
                    try {
                        const formData = new FormData();
                        formData.append('clientVideoId', clientVideoId);
                        formData.append('image', {
                            uri: asset.uri,
                            type: videoPayload.type,
                            name: videoPayload.fileName,
                        } as any);

                        await uploadSiteVideoApi(jobId, formData);
                        Alert.alert('Success', 'Video uploaded');
                        return;
                    } catch { }
                }

                const queue = await getPendingVideos();
                await savePendingVideos([...queue, videoPayload]);

                Alert.alert(
                    'Saved Offline',
                    'Video will upload when online'
                );
            }
        );
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.iconWrap}>
                <Lucide icon="Upload" size={32} color="#3B82F6" />
            </View>

            <AppText variant="semibold" style={styles.title}>
                Upload Site Video
            </AppText>

            <AppText style={styles.subtitle}>
                Tap to browse and select a video
            </AppText>

            <TouchableOpacity activeOpacity={0.85} onPress={pickVideo}>
                <LinearGradient
                    colors={['#3B82F6', '#2563EB']}
                    style={styles.button}
                >
                    <View style={styles.buttonContent}>
                        <AppText style={styles.buttonText}>
                            Browse Files
                        </AppText>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        padding: 24,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#3B82F6',
        marginBottom: 16,
    },
    iconWrap: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: '#EEF2FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        color: '#0F172A',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        marginBottom: 24,
    },
    button: {
        borderRadius: 28,
        overflow: 'hidden',
    },
    buttonContent: {
        paddingVertical: 14,
        paddingHorizontal: 32,
        minHeight: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
});
