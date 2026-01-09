import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Platform,
    Modal,
    Pressable,
    Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import NetInfo from '@react-native-community/netinfo';
import uuid from 'react-native-uuid';

import ScreenWrapper from '../../components/ScreenWrapper';
import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import Lucide from '../../components/Lucide';
import AppText from '../../components/AppText';
import JobHeader from '../../components/JobHeader';

import { getLocalJobs, saveLocalJobs } from '../../storage/jobStorage';
import { createJobApi, updateJobApi } from '../../api/jobs';

const formatDate = (date: Date) => date.toISOString().split('T')[0];

export default function CreateEditJobScreen({ navigation, route }: any) {
    const job = route?.params?.job;
    const isEdit = Boolean(job);

    const [client, city] = job?.location
        ? job.location.split(',').map((s: string) => s.trim())
        : ['', ''];

    const [title, setTitle] = useState(job?.title || '');
    const [description, setDescription] = useState(job?.description || '');
    const [clientName, setClientName] = useState(client);
    const [cityName, setCityName] = useState(city);
    const [budget, setBudget] = useState(job?.budget?.toString() || '');
    const [status, setStatus] = useState(job?.status || 'Pending');

    const [startDate, setStartDate] = useState<Date | null>(
        job?.date ? new Date(job.date) : null
    );

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        if (!title.trim()) return 'Job title is required';
        if (!clientName.trim()) return 'Client name is required';
        if (!cityName.trim()) return 'City is required';
        if (!budget.trim()) return 'Budget is required';
        if (isNaN(Number(budget))) return 'Budget must be numeric';
        return null;
    };

    const handleSave = async () => {
        const error = validate();
        if (error) {
            Alert.alert('Validation Error', error);
            return;
        }

        setLoading(true);

        const jobId = job?._id || uuid.v4();
        const localJob = {
            id: jobId,
            clientJobId: job?.clientJobId || jobId,
            title,
            description,
            location: `${clientName}, ${cityName}`,
            budget: Number(budget),
            _syncStatus: isEdit ? 'updated' : 'pending',
        };


        const localJobs = await getLocalJobs();

        const updatedJobs = isEdit
            ? localJobs.map((j: any) =>
                j.id === localJob.id ? localJob : j
            )
            : [localJob, ...localJobs];

        await saveLocalJobs(updatedJobs);

        const net = await NetInfo.fetch();

        if (net.isConnected) {
            try {
                const apiPayload = {
                    clientJobId: localJob.id,
                    title: localJob.title,
                    location: localJob.location,
                    description: localJob.description,
                    budget: localJob.budget,
                };

                if (isEdit) {
                    await updateJobApi(job._id, apiPayload);
                } else {
                    await createJobApi(apiPayload);
                }

                const syncedJobs = updatedJobs.map((j: any) =>
                    j.id === localJob.id
                        ? { ...j, _syncStatus: 'synced' }
                        : j
                );

                await saveLocalJobs(syncedJobs);
            } catch { }
        }

        setLoading(false);
        navigation.goBack();
    };

    return (
        <ScreenWrapper>
            <View style={styles.safe}>
                <JobHeader
                    title={isEdit ? 'Edit Job' : 'Create New Job'}
                    subtitle={
                        isEdit
                            ? 'Update job details'
                            : 'Fill in the details below'
                    }
                    onBack={() => navigation.goBack()}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Lucide icon="Briefcase" color="#3B82F6" />
                            <AppText variant="semibold" style={styles.cardTitle}>
                                Job Details
                            </AppText>
                        </View>

                        <Input
                            placeholder="Job Title *"
                            value={title}
                            onChangeText={setTitle}
                        />

                        <Input
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            style={styles.textArea}
                        />
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Lucide icon="User" color="#22C55E" />
                            <AppText variant="semibold" style={styles.cardTitle}>
                                Client Info
                            </AppText>
                        </View>

                        <Input
                            placeholder="Client Name *"
                            value={clientName}
                            onChangeText={setClientName}
                        />

                        <Input
                            placeholder="City *"
                            value={cityName}
                            onChangeText={setCityName}
                            leftIcon="MapPin"
                        />
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Lucide icon="DollarSign" color="#F59E0B" />
                            <AppText variant="semibold" style={styles.cardTitle}>
                                Budget & Timeline
                            </AppText>
                        </View>

                        <Input
                            placeholder="Budget (USD) *"
                            value={budget}
                            onChangeText={setBudget}
                            keyboardType="numeric"
                            leftIcon="DollarSign"
                        />

                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                            <Input
                                placeholder="Start Date"
                                value={startDate ? formatDate(startDate) : ''}
                                leftIcon="Calendar"
                                editable={false}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setShowStatusModal(true)}>
                            <Input
                                placeholder="Status"
                                value={status}
                                leftIcon="CheckCircle"
                                editable={false}
                            />
                        </TouchableOpacity>
                    </View>

                    <PrimaryButton
                        title={
                            loading
                                ? 'Saving...'
                                : isEdit
                                    ? 'Update Job'
                                    : 'Create Job'
                        }
                        onPress={handleSave}
                        disabled={loading}
                    />
                </ScrollView>

                {showDatePicker && (
                    <DateTimePicker
                        value={startDate || new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(e, d) => {
                            setShowDatePicker(false);
                            if (d) setStartDate(d);
                        }}
                    />
                )}

                <Modal visible={showStatusModal} transparent animationType="fade">
                    <Pressable
                        style={styles.modalOverlay}
                        onPress={() => setShowStatusModal(false)}
                    >
                        <View style={styles.modalContent}>
                            {['Pending', 'Active', 'Completed'].map(item => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.option}
                                    onPress={() => {
                                        setStatus(item);
                                        setShowStatusModal(false);
                                    }}
                                >
                                    <AppText style={styles.optionText}>
                                        {item}
                                    </AppText>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Pressable>
                </Modal>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#EDF4FF',
    },
    container: {
        padding: 16,
        paddingBottom: 32,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    cardTitle: {
        fontSize: 16,
        color: '#0F172A',
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        width: '80%',
        paddingVertical: 8,
    },
    option: {
        paddingVertical: 14,
        paddingHorizontal: 20,
    },
    optionText: {
        fontSize: 16,
        color: '#0F172A',
    },
});
