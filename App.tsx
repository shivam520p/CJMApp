import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import NetInfo from '@react-native-community/netinfo';
import { AuthProvider } from './src/context/AuthContext';
import { syncPendingVideos } from './src/sync/videoSync';

export default function App() {
  const scheme = useColorScheme();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        syncPendingVideos();
      }
    });

    syncPendingVideos();
    return unsubscribe;
  }, []);
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar
          barStyle={
            scheme === 'dark'
              ? 'light-content'
              : 'dark-content'
          }
        />
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
