import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { starterDogs } from '../data/dogs';
import { emptyState, recordSwipe } from '../lib/state';
import { AppState, DogProfile } from '../types';

const STORAGE_KEY = '@pawfect-perth/app-state/v1';
interface AppContextValue {
  state: AppState; hydrated: boolean; remainingDogs: DogProfile[]; matchedDogs: DogProfile[];
  saveProfile: (profile: DogProfile) => void; swipe: (dog: DogProfile, decision: 'like' | 'pass') => boolean; resetDiscovery: () => void;
}
const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AppState>(emptyState);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { AsyncStorage.getItem(STORAGE_KEY).then((stored) => stored && setState(JSON.parse(stored))).catch(() => setState(emptyState)).finally(() => setHydrated(true)); }, []);
  useEffect(() => { if (hydrated) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => undefined); }, [hydrated, state]);
  const saveProfile = useCallback((profile: DogProfile) => setState((current) => ({ ...current, activeProfile: profile, onboardingComplete: true })), []);
  const swipe = useCallback((dog: DogProfile, decision: 'like' | 'pass') => {
    let matched = false;
    setState((current) => { matched = decision === 'like' && dog.isMutualLike && !current.matches.some((item) => item.profileId === dog.id); return recordSwipe(current, dog, decision); });
    return matched;
  }, []);
  const resetDiscovery = useCallback(() => setState((current) => ({ ...current, swipeHistory: [], matches: [] })), []);
  const remainingDogs = useMemo(() => starterDogs.filter((dog) => !state.swipeHistory.some((item) => item.profileId === dog.id)), [state.swipeHistory]);
  const matchedDogs = useMemo(() => state.matches.map((match) => starterDogs.find((dog) => dog.id === match.profileId)).filter(Boolean) as DogProfile[], [state.matches]);
  return <AppContext.Provider value={{ state, hydrated, remainingDogs, matchedDogs, saveProfile, swipe, resetDiscovery }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}
