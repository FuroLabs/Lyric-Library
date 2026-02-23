import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { QueryProvider } from '@/app/providers/QueryProvider';
import { AppNavigator } from '@/app/AppNavigator';
import { colors } from '@/theme';

/**
 * App root — wraps providers around the navigator.
 * Interns should NOT modify this file unless instructed.
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <NavigationContainer>
          <StatusBar style="dark" backgroundColor={colors.bgPrimary} />
          <AppNavigator />
        </NavigationContainer>
      </QueryProvider>
    </SafeAreaProvider>
  );
}
