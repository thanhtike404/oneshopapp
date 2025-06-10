import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.tint,
          tabBarInactiveTintColor: colors.tabIconDefault,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarBackground: () => (
            <>
              <View style={styles.customTabBarBackground} />
              <BlurView intensity={30} tint={colorScheme === 'dark' ? 'dark' : 'light'} style={StyleSheet.absoluteFill} />
            </>
          ),
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Animated.View style={focused ? styles.activeIconContainer : {}}>
                <IconSymbol name="house.fill" color={color} size={24} />
              </Animated.View>
            ),
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: 'Discover',
            tabBarIcon: ({ color, focused }) => (
              <Animated.View style={focused ? styles.activeIconContainer : {}}>
                <AntDesign name="search1" color={color} size={24} />
              </Animated.View>
            ),
          }}
        />
      </Tabs>

      {/* Central Floating Button */}
      {/* <TouchableOpacity style={styles.fabButton} onPress={() => console.log('FAB pressed')}>
        <View style={styles.fabInner}>
          <AntDesign name="plus" size={24} color="white" />
        </View>
      </TouchableOpacity> */}
    </>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom:0,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 35,
    paddingHorizontal: 40,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
  },
  customTabBarBackground: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(83, 78, 78, 0.8)',
  },
  activeIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 1.1 }],
  },
  fabButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 35,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  fabInner: {
    backgroundColor: '#4CAF50',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
