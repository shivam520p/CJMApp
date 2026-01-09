import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';

import Avatar from '../../components/Avatar';
import SearchBar from '../../components/SearchBar';
import JobCard from '../../components/JobCard';
import BackOnlineBanner from '../../components/BackOnlineBanner';
import Lucide from '../../components/Lucide';
import AppText from '../../components/AppText';
import ProfileMenuSheet from '../../components/ProfileMenuSheet';

import { getJobsApi } from '../../api/jobs';
import { getLocalJobs, saveLocalJobs } from '../../storage/jobStorage';
import { syncJobs } from '../../sync/jobSync';
import { useAuth } from '../../context/AuthContext';

export default function JobListScreen({ navigation }: any) {
    const { profile } = useAuth();
    const [jobs, setJobs] = useState<any[]>([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [online, setOnline] = useState(true);
    const [justSynced, setJustSynced] = useState(false);

    const loadJobs = async () => {
        const localJobs = await getLocalJobs();
        setJobs(localJobs);

        try {
            const res = await getJobsApi();

            const apiJobs = res.data.map((j: any) => ({
                ...j,
                id: j.clientJobId || j._id,
                _syncStatus: 'synced',
            }));

            const merged = [
                ...apiJobs,
                ...localJobs.filter(
                    (l: any) => l._syncStatus !== 'synced'
                ),
            ];

            setJobs(merged);
            await saveLocalJobs(merged);
        } catch {
            setJobs(localJobs);
        }
    };


    useFocusEffect(
        useCallback(() => {
            loadJobs();
        }, [])
    );
    useEffect(() => {
        const unsub = NetInfo.addEventListener(async state => {
            const isOnline = !!state.isConnected;
            setOnline(isOnline);

            if (isOnline) {
                await syncJobs();
                await loadJobs();

                setJustSynced(true);
                setTimeout(() => setJustSynced(false), 3000);
            }
        });

        return unsub;
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={jobs}
                keyExtractor={item =>
                    item.id || item.clientJobId || item._id
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <JobCard
                        job={item}
                        onPress={() =>
                            navigation.navigate('JobOverview', { job: item })
                        }
                    />
                )}
                ListHeaderComponent={
                    <View>
                        <View style={styles.headerBox}>
                            <View style={styles.header}>
                                <View>
                                    <AppText style={styles.welcome}>
                                        Welcome back,
                                    </AppText>
                                    <AppText
                                        variant="semibold"
                                        style={styles.name}
                                    >
                                        {profile?.name || 'User'}
                                    </AppText>
                                </View>

                                <TouchableOpacity
                                    onPress={() => setMenuVisible(true)}
                                >
                                    <Avatar letter={profile?.name?.charAt(0).toUpperCase() || 'U'}
                                    />
                                </TouchableOpacity>
                            </View>

                            <SearchBar />
                        </View>

                        <View style={styles.sectionRow}>
                            <AppText
                                variant="semibold"
                                style={styles.sectionTitle}
                            >
                                Your Jobs ({jobs.length})
                            </AppText>
                            <AppText variant="medium" style={styles.viewAll}>
                                View All
                            </AppText>
                        </View>
                    </View>
                }
                ListFooterComponent={
                        <View style={styles.btcOuter}>
                            <BackOnlineBanner />
                        </View>
                }
            />

            <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                style={styles.fab}
            >
                <TouchableOpacity
                    style={styles.fabContent}
                    onPress={() => navigation.navigate('CreateJob')}
                >
                    <Lucide icon="Plus" color="#FFFFFF" size={28} />
                </TouchableOpacity>
            </LinearGradient>

            <ProfileMenuSheet
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#EDF4FF',
    },
    headerBox: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    welcome: {
        fontSize: 14,
        color: '#64748B',
    },
    name: {
        fontSize: 24,
        color: '#0F172A',
    },
    sectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#F1F5F9',
    },
    sectionTitle: {
        fontSize: 18,
        color: '#0F172A',
    },
    viewAll: {
        color: '#3B82F6',
    },
    listContent: {
        paddingBottom: 140,
    },
    fab: {
        position: 'absolute',
        right: 24,
        bottom: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 10,
    },
    fabContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btcOuter: {
        paddingHorizontal: 16,
    },
});
