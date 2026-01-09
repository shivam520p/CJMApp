import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import JobListScreen from '../screens/jobs/JobListScreen';
import CreateEditJobScreen from '../screens/jobs/CreateEditJobScreen';
import JobOverviewScreen from '../screens/jobs/JobOverviewScreen';
import VideoPlayerScreen from '../components/video/VideoPlayerScreen';

export type AppStackParamList = {
    Jobs: undefined;
    CreateJob: undefined;
    JobOverview: undefined;
    VideoPlayer: undefined;
    Notes: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Jobs"
                component={JobListScreen}
                options={{ title: 'Your Jobs' }}
            />

            <Stack.Screen
                name="CreateJob"
                component={CreateEditJobScreen}
                options={{ title: 'Create Job' }}
            />

            <Stack.Screen
                name="JobOverview"
                component={JobOverviewScreen}
            />

            <Stack.Screen
                name="VideoPlayer"
                component={VideoPlayerScreen}
            />

        </Stack.Navigator>
    );
}
