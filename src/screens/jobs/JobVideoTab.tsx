import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import UploadVideoCard from '../../components/video/UploadVideoCard';
import EmptyVideoCard from '../../components/video/EmptyVideoCard';
import BackOnlineBanner from '../../components/BackOnlineBanner';

export default function JobVideoTab({ job }: any) {
    console.log(job.siteVideo)
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
                <UploadVideoCard jobId={job._id} />
                <EmptyVideoCard />

            <BackOnlineBanner />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 32,
        padding: 16
    },
});
