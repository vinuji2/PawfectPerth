import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../theme';
export function LoadingScreen() { return <View style={styles.container}><ActivityIndicator color={colors.rose} /></View>; }
const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cream } });
