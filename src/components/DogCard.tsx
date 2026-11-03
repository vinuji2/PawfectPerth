import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useMemo, useState } from 'react';
import { Animated, Image, PanResponder, StyleSheet, Text, View } from 'react-native';
import { resolveDogPhoto } from '../data/dogs';
import { colors, shadow } from '../theme';
import { DogProfile } from '../types';

export function DogCard({ dog, onDecision }: { dog: DogProfile; onDecision: (decision: 'like' | 'pass') => void }) {
  const [position] = useState(() => new Animated.ValueXY());
  const rotate = position.x.interpolate({ inputRange: [-220, 0, 220], outputRange: ['-10deg', '0deg', '10deg'], extrapolate: 'clamp' });
  const likeOpacity = position.x.interpolate({ inputRange: [20, 110], outputRange: [0, 1], extrapolate: 'clamp' });
  const passOpacity = position.x.interpolate({ inputRange: [-110, -20], outputRange: [1, 0], extrapolate: 'clamp' });
  const complete = useCallback((decision: 'like' | 'pass') => Animated.timing(position, { toValue: { x: decision === 'like' ? 520 : -520, y: 30 }, duration: 220, useNativeDriver: true }).start(() => { position.setValue({ x: 0, y: 0 }); onDecision(decision); }), [onDecision, position]);
  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 8,
    onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], { useNativeDriver: false }),
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > 105) complete('like'); else if (gesture.dx < -105) complete('pass');
      else Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: true, friction: 6 }).start();
    },
  }), [complete, position]);
  return <Animated.View {...panResponder.panHandlers} style={[styles.card, { transform: [...position.getTranslateTransform(), { rotate }] }]}>
    <Image source={resolveDogPhoto(dog)} style={styles.photo} />
    <Animated.View style={[styles.stamp, styles.likeStamp, { opacity: likeOpacity }]}><Text style={styles.stampText}>LIKE</Text></Animated.View>
    <Animated.View style={[styles.stamp, styles.passStamp, { opacity: passOpacity }]}><Text style={styles.stampText}>PASS</Text></Animated.View>
    <LinearGradient colors={['transparent', 'rgba(45,24,20,0.84)']} style={styles.gradient}>
      <View style={styles.titleRow}><Text style={styles.name}>{dog.name}</Text><Text style={styles.age}>{dog.age}</Text></View>
      <Text style={styles.meta}>{dog.breed} · {dog.suburb}</Text><Text style={styles.bio}>{dog.bio}</Text>
      <View style={styles.traits}>{dog.traits.map((trait) => <View key={trait} style={styles.trait}><Text style={styles.traitText}>{trait}</Text></View>)}</View>
    </LinearGradient>
  </Animated.View>;
}
const styles = StyleSheet.create({
  card: { flex: 1, width: '100%', maxHeight: 610, borderRadius: 30, overflow: 'hidden', backgroundColor: colors.paper, ...shadow }, photo: { width: '100%', height: '100%', resizeMode: 'cover' },
  gradient: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 24, paddingTop: 110 }, titleRow: { flexDirection: 'row', alignItems: 'baseline', gap: 10 },
  name: { color: colors.white, fontSize: 34, fontWeight: '800' }, age: { color: colors.white, fontSize: 16, fontWeight: '600' }, meta: { color: '#FFF1EA', fontSize: 15, fontWeight: '600', marginTop: 3 },
  bio: { color: colors.white, fontSize: 15, lineHeight: 21, marginTop: 10 }, traits: { flexDirection: 'row', gap: 8, marginTop: 14, flexWrap: 'wrap' }, trait: { backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 11 }, traitText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  stamp: { position: 'absolute', top: 42, borderWidth: 3, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 }, likeStamp: { left: 24, borderColor: '#FFF', backgroundColor: 'rgba(220,110,125,0.82)', transform: [{ rotate: '-8deg' }] }, passStamp: { right: 24, borderColor: '#FFF', backgroundColor: 'rgba(77,53,48,0.72)', transform: [{ rotate: '8deg' }] }, stampText: { color: '#FFF', fontWeight: '900', fontSize: 20 },
});
