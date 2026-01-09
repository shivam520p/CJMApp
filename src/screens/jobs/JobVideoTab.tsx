import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import UploadVideoCard from '../../components/video/UploadVideoCard';
import EmptyVideoCard from '../../components/video/EmptyVideoCard';
import BackOnlineBanner from '../../components/BackOnlineBanner';
import VideoPreviewCard from '../../components/video/VideoPreviewCard';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
    VideoPlayer: { video: any };
};

export default function JobVideoTab({ job }: any) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const siteVideo = job?.siteVideo;

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <UploadVideoCard jobId={job._id} />

            {siteVideo ? (
                <VideoPreviewCard
                    video={siteVideo}
                    onPress={() =>
                        navigation.navigate('VideoPlayer', {
                            video: siteVideo,
                        })
                    }
                />
            ) : (
                <EmptyVideoCard />
            )}

            <BackOnlineBanner />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 32,
        padding: 16,
    },
});
