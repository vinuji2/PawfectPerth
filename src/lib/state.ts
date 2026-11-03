import type { AppState, DogProfile, MatchRecord, SwipeDecision } from '../types';

export const emptyState: AppState = { activeProfile: null, swipeHistory: [], matches: [], onboardingComplete: false };

export function recordSwipe(state: AppState, dog: DogProfile, decision: 'like' | 'pass', now = new Date()): AppState {
  if (state.swipeHistory.some((item) => item.profileId === dog.id)) return state;
  const swipe: SwipeDecision = { profileId: dog.id, decision, timestamp: now.toISOString() };
  const shouldMatch = decision === 'like' && dog.isMutualLike;
  const match: MatchRecord | null = shouldMatch ? { profileId: dog.id, timestamp: now.toISOString() } : null;
  return { ...state, swipeHistory: [...state.swipeHistory, swipe], matches: match ? [...state.matches, match] : state.matches };
}

export function validateProfile(profile: Partial<DogProfile>): boolean {
  return Boolean(profile.photoUri && profile.name?.trim() && profile.age?.trim() && profile.breed?.trim() && profile.sex && profile.suburb?.trim() && profile.bio?.trim() && profile.traits?.length === 3);
}
