import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import { SafeAreaView } from 'react-native-safe-area-context';
import JobHeader from '../../components/JobHeader';

const BASE_URL = 'https://your-api-domain.com/';

export default function VideoPlayerScreen({ route, navigation }: any) {
    const { video } = route.params;

    const videoUrl = `${BASE_URL}${video.filePath}`;

    return (
        <SafeAreaView style={styles.safe}>
            <JobHeader
                title="Site Video"
                onBack={() => navigation.goBack()}
            />

            <View style={styles.container}>
                <Video
                    source={{ uri: videoUrl }}
                    style={styles.video}
                    controls
                    resizeMode="contain"
                    fullscreen
                    paused={false}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#000',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    video: {
        width: '100%',
        height: '100%',
    },
});
