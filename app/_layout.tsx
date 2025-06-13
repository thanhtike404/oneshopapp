import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { registerForPushNotificationsAsync } from '@/services/notificationService';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),

  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded or an error occurred
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    // This timer waits 1 second before running the notification logic.
    const timer = setTimeout(() => {
      registerForPushNotificationsAsync()
        .then(token => {
          // Here, you would send the token to your Next.js backend
          if (token) {
            console.log('Sending token to backend:', token);
            fetch(`${process.env.EXPO_PUBLIC_API_URL}/notifications/push`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token, platform: 'expo', userId: '4bd9973b-64e8-4d88-84ca-5af38764f7c4' }),
            });
          }
        })
        .catch(error => console.error('Error registering for push notifications:', error));
    }, 1000); // 1000 milliseconds = 1 second

    // This is a cleanup function that runs if the component is removed
    return () => clearTimeout(timer);
  }, []);

  // Show a loading indicator while waiting for fonts
  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack >
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false,
            
            }} 
          />
          <Stack.Screen 
            name="+not-found" 
            options={{ 
              title: 'Not Found',
          
            }} 
          />
          {/* Add other screens as needed */}
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}