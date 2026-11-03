import { LinearGradient } from 'expo-linear-gradient';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { resolveDogPhoto } from '../data/dogs';
import { colors } from '../theme';
import { DogProfile } from '../types';
export function MatchModal({ visible, user, dog, onClose }: { visible: boolean; user: DogProfile | null; dog: DogProfile | null; onClose: () => void }) {
  if (!dog || !user) return null;
  return <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}><LinearGradient colors={['rgba(77,53,48,0.94)', 'rgba(220,110,125,0.95)']} style={styles.backdrop}>
    <Text style={styles.heart}>♥</Text><Text style={styles.title}>It’s a match!</Text><View style={styles.photos}><Image source={resolveDogPhoto(user)} style={[styles.photo, styles.left]} /><Image source={resolveDogPhoto(dog)} style={[styles.photo, styles.right]} /></View><Text style={styles.names}>{user.name} + {dog.name}</Text><Pressable onPress={onClose} style={styles.button}><Text style={styles.buttonText}>Keep discovering</Text></Pressable>
  </LinearGradient></Modal>;
}
const styles = StyleSheet.create({ backdrop: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28 }, heart: { color: colors.blush, fontSize: 34 }, title: { color: colors.white, fontSize: 38, fontWeight: '900', marginTop: 4 }, photos: { flexDirection: 'row', marginTop: 34 }, photo: { width: 142, height: 142, borderRadius: 71, borderWidth: 5, borderColor: colors.white }, left: { transform: [{ rotate: '-7deg' }], marginRight: -16 }, right: { transform: [{ rotate: '7deg' }] }, names: { color: colors.white, fontSize: 20, fontWeight: '700', marginTop: 28 }, button: { marginTop: 38, minHeight: 54, paddingHorizontal: 28, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white }, buttonText: { color: colors.rose, fontSize: 16, fontWeight: '800' } });
