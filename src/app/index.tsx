import { Redirect } from 'expo-router';
import { LoadingScreen } from '../components/LoadingScreen';
import { useApp } from '../context/AppContext';
export default function IndexScreen() { const { hydrated, state } = useApp(); if (!hydrated) return <LoadingScreen />; return <Redirect href={state.onboardingComplete ? '/(tabs)/discover' : '/profile-setup'} />; }
