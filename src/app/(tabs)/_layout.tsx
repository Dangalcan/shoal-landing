import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { useTheme } from '@/theme';

export default function TabLayout() {
  const t = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: t.primary,
        tabBarInactiveTintColor: t.ink4,
        tabBarStyle: { backgroundColor: t.card, borderTopColor: t.border },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="ship-wheel" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: 'Marketplace',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="storefront-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="developers"
        options={{
          title: 'Developers',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="code-braces" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
