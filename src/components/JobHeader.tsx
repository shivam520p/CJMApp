import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Lucide from './Lucide';
import AppText from './AppText';

type Props = {
    title: string;
    subtitle?: string;
    onBack: () => void;
    tabs?: string[];
    activeTab?: string;
    onTabChange?: (tab: string) => void;
    showEdit?: boolean;
    onEditPress?: () => void;
};

export default function JobHeader({
    title,
    subtitle,
    onBack,
    tabs,
    activeTab,
    onTabChange,
    showEdit,
    onEditPress,
}: Props) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.topRow}>
                <TouchableOpacity style={styles.backBtn} onPress={onBack}>
                    <Lucide icon="ArrowLeft" />
                </TouchableOpacity>

                <View style={styles.titleBox}>
                    <AppText variant="semibold" style={styles.title}>
                        {title}
                    </AppText>
                    {subtitle ? (
                        <AppText style={styles.subtitle}>
                            {subtitle}
                        </AppText>
                    ) : null}
                </View>

                {showEdit ? (
                    <TouchableOpacity
                        style={styles.editBtn}
                        onPress={onEditPress}
                    >
                        <AppText style={styles.editText}>Edit</AppText>
                    </TouchableOpacity>
                ) : null}
            </View>

            {tabs && tabs.length > 0 ? (
                <View style={styles.tabsWrapper}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.tabsRow}
                    >
                        {tabs.map(tab => {
                            const active = tab === activeTab;

                            return (
                                <TouchableOpacity
                                    key={tab}
                                    style={[
                                        styles.tabItem,
                                        active && styles.activeTab,
                                    ]}
                                    onPress={() => onTabChange?.(tab)}
                                >
                                    <Lucide
                                        icon={
                                            tab === 'Overview'
                                                ? 'FileText'
                                                : tab === 'Notes'
                                                    ? 'File'
                                                    : 'Video'
                                        }
                                        size={16}
                                        color={
                                            active
                                                ? '#2563EB'
                                                : '#64748B'
                                        }
                                    />
                                    <AppText
                                        style={[
                                            styles.tabText,
                                            active &&
                                            styles.activeTabText,
                                        ]}
                                        variant='medium'
                                    >
                                        {tab}
                                    </AppText>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 12,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F1F5F9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleBox: {
        flex: 1,
        marginLeft: 12,
    },
    title: {
        fontSize: 18,
        color: '#0F172A',
    },
    subtitle: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 2,
    },
    editBtn: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    editText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    tabsWrapper: {
        marginTop: 16,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabsRow: {
        backgroundColor: '#F1F5F9',
        borderRadius: 24,
        padding: 4,
        gap: 4,
    },
    tabItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 16,
    },
    activeTab: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tabText: {
        fontSize: 14,
        color: '#64748B',
    },
    activeTabText: {
        color: '#2563EB',
    },
});
