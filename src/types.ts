export type DogSex = 'Female' | 'Male';
export type DogAssetKey = 'labrador-milo' | 'labrador-daisy' | 'golden-finn' | 'golden-lola' | 'husky-koda' | 'husky-nova' | 'aussie-blue' | 'aussie-poppy';

export interface DogProfile {
  id: string; name: string; age: string; breed: string; sex: DogSex; suburb: string;
  bio: string; traits: [string, string, string]; photoUri?: string; assetKey?: DogAssetKey;
  isOwned: boolean; isMutualLike: boolean;
}
export interface SwipeDecision { profileId: string; decision: 'like' | 'pass'; timestamp: string; }
export interface MatchRecord { profileId: string; timestamp: string; }
export interface AppState { activeProfile: DogProfile | null; swipeHistory: SwipeDecision[]; matches: MatchRecord[]; onboardingComplete: boolean; }
