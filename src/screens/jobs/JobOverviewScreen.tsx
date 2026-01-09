import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';

import JobHeader from '../../components/JobHeader';
import JobOverviewTab from './JobOverviewTab';
import JobNotesTab from './NotesScreen';
import JobVideoTab from './JobVideoTab';

import { getJobDetailsApi } from '../../api/jobs';
import {
    getLocalJobDetails,
    saveLocalJobDetails,
} from '../../storage/jobStorage';

export default function JobOverviewScreen({ navigation, route }: any) {
    const { job } = route.params;
    const jobId = job._id || job.id;

    const [activeTab, setActiveTab] = useState('Overview');
    const [jobDetails, setJobDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const loadDetails = async () => {
        setLoading(true);

        const cached = await getLocalJobDetails(jobId);
        if (cached) {
            setJobDetails(cached);
        }

        const net = await NetInfo.fetch();
        if (net.isConnected) {
            try {
                const apiData = await getJobDetailsApi(jobId);
                setJobDetails(apiData.data);
                await saveLocalJobDetails(jobId, apiData.data);
            } catch { }
        }

        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            loadDetails();
        }, [])
    );

    if (!jobDetails && loading) {
        return (
            <SafeAreaView style={styles.safe}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <JobHeader
                title={jobDetails.title}
                subtitle={jobDetails.location}
                onBack={() => navigation.goBack()}
                tabs={['Overview', 'Notes', 'Video']}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                showEdit
                onEditPress={() =>
                    navigation.navigate('CreateJob', { job: jobDetails })
                }
            />

            <View style={styles.content}>
                {activeTab === 'Overview' && (
                    <JobOverviewTab job={jobDetails} />
                )}
                {activeTab === 'Notes' && (
                    <JobNotesTab job={jobDetails} />
                )}
                {activeTab === 'Video' && (
                    <JobVideoTab job={jobDetails} />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#EDF4FF',
    },
    content: {
        flex: 1,
    },
});
