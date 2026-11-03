import { Tabs } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../../theme';
const TabIcon = ({ symbol, focused }: { symbol: string; focused: boolean }) => <Text style={[styles.icon, focused && styles.iconActive]}>{symbol}</Text>;
export default function TabsLayout() {
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.rose, tabBarInactiveTintColor: colors.cocoaSoft, tabBarStyle: styles.bar, tabBarLabelStyle: styles.label }}>
    <Tabs.Screen name="discover" options={{ title: 'Discover', tabBarIcon: ({ focused }) => <TabIcon symbol="♡" focused={focused} /> }} />
    <Tabs.Screen name="matches" options={{ title: 'Matches', tabBarIcon: ({ focused }) => <TabIcon symbol="♥" focused={focused} /> }} />
    <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ focused }) => <TabIcon symbol="●" focused={focused} /> }} />
  </Tabs>;
}
const styles = StyleSheet.create({ bar: { height: 72, paddingTop: 8, paddingBottom: 10, borderTopColor: colors.line, backgroundColor: colors.paper }, label: { fontSize: 12, fontWeight: '700' }, icon: { color: colors.cocoaSoft, fontSize: 25, lineHeight: 26 }, iconActive: { color: colors.rose } });
