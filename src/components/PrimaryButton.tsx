import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';
export function PrimaryButton({ label, onPress, disabled = false }: { label: string; onPress: () => void; disabled?: boolean }) {
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, disabled && styles.disabled, pressed && !disabled && styles.pressed]}><Text style={styles.label}>{label}</Text></Pressable>;
}
const styles = StyleSheet.create({ button: { minHeight: 54, borderRadius: 18, backgroundColor: colors.rose, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }, disabled: { opacity: 0.38 }, pressed: { transform: [{ scale: 0.98 }] }, label: { color: colors.white, fontSize: 16, fontWeight: '700', letterSpacing: 0.2 } });
