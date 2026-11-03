import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { DogCard } from '../../components/DogCard';
import { MatchModal } from '../../components/MatchModal';
import { useApp } from '../../context/AppContext';
import { colors, shadow } from '../../theme';
import { DogProfile } from '../../types';
export default function DiscoverScreen() {
  const { remainingDogs, swipe, state } = useApp(); const [matchedDog, setMatchedDog] = useState<DogProfile | null>(null); const current = remainingDogs[0];
  const decide = (decision: 'like' | 'pass') => { if (!current) return; const matched = swipe(current, decision); if (matched) { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined); setMatchedDog(current); } else Haptics.selectionAsync().catch(() => undefined); };
  return <SafeAreaView style={styles.safe}><View style={styles.header}><Text style={styles.brand}>Pawfect Perth</Text><Text style={styles.paw}>♥</Text></View><View style={styles.deck}>
    {current ? <DogCard key={current.id} dog={current} onDecision={decide} /> : <View style={styles.empty}><Text style={styles.emptyHeart}>♡</Text><Text style={styles.emptyTitle}>All caught up</Text><Text style={styles.emptyText}>Your matches are waiting.</Text></View>}
  </View>{current && <View style={styles.actions}><Pressable accessibilityLabel="Pass" onPress={() => decide('pass')} style={({ pressed }) => [styles.action, pressed && styles.pressed]}><Text style={styles.pass}>×</Text></Pressable><Pressable accessibilityLabel="Like" onPress={() => decide('like')} style={({ pressed }) => [styles.action, styles.likeAction, pressed && styles.pressed]}><Text style={styles.like}>♥</Text></Pressable></View>}<MatchModal visible={Boolean(matchedDog)} user={state.activeProfile} dog={matchedDog} onClose={() => setMatchedDog(null)} /></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.cream, paddingHorizontal: 18 }, header: { height: 66, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, brand: { color: colors.cocoa, fontSize: 24, fontWeight: '900', letterSpacing: -0.6 }, paw: { color: colors.rose, fontSize: 22 }, deck: { flex: 1, justifyContent: 'center', alignItems: 'center' }, actions: { height: 94, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 22 }, action: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', ...shadow }, likeAction: { backgroundColor: colors.rose }, pass: { color: colors.cocoaSoft, fontSize: 37, fontWeight: '300', lineHeight: 40 }, like: { color: colors.white, fontSize: 24 }, pressed: { transform: [{ scale: 0.93 }] }, empty: { alignItems: 'center', padding: 32 }, emptyHeart: { color: colors.blush, fontSize: 70 }, emptyTitle: { color: colors.cocoa, fontSize: 25, fontWeight: '800', marginTop: 10 }, emptyText: { color: colors.cocoaSoft, fontSize: 15, marginTop: 6 } });
