import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import BudgetCard from '../../components/overview/BudgetCard';
import InfoCard from '../../components/overview/InfoCard';
import SectionCard from '../../components/overview/SectionCard';
import { formatDisplayDate } from '../../utils/reusable';
import BackOnlineBanner from '../../components/BackOnlineBanner';

export default function JobOverviewTab({ job }: any) {
    const location = job.location || 'Location not available';

    const client =
        job.client ||
        job.location?.split(',')?.[0]?.trim() ||
        'Client';

    const date =
        job.date ||
        job.createdAt ||
        new Date().toISOString();

    const status = job.status || 'active';

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <BudgetCard
                status={status}
                budget={job.budget}
            />

            <View style={styles.row}>
                <InfoCard
                    icon="MapPin"
                    iconBg="#ECFDF5"
                    iconColor="#22C55E"
                    label="Location"
                    value={location}
                />

                <InfoCard
                    icon="Clock"
                    iconBg="#FFFBEB"
                    iconColor="#F59E0B"
                    label="Started"
                    value={formatDisplayDate(date)}
                />
            </View>

            <SectionCard
                icon="User"
                title="Client Information"
                content={client}
            />

            <SectionCard
                title="Description"
                content={job.description || 'No description provided'}
            />


            <BackOnlineBanner />
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 32,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
});
