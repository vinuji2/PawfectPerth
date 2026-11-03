import { ImageSourcePropType } from 'react-native';
import { DogAssetKey, DogProfile } from '../types';

export const dogImages: Record<DogAssetKey, ImageSourcePropType> = {
  'labrador-milo': require('../../assets/dogs/labrador-milo.jpg'),
  'labrador-daisy': require('../../assets/dogs/labrador-daisy.jpg'),
  'golden-finn': require('../../assets/dogs/golden-finn.jpg'),
  'golden-lola': require('../../assets/dogs/golden-lola.jpg'),
  'husky-koda': require('../../assets/dogs/husky-koda.jpg'),
  'husky-nova': require('../../assets/dogs/husky-nova.jpg'),
  'aussie-blue': require('../../assets/dogs/aussie-blue.jpg'),
  'aussie-poppy': require('../../assets/dogs/aussie-poppy.jpg'),
};

export const resolveDogPhoto = (dog: DogProfile): ImageSourcePropType =>
  dog.photoUri ? { uri: dog.photoUri } : dogImages[dog.assetKey!];

export const starterDogs: DogProfile[] = [
  { id: 'milo', name: 'Milo', age: '10 months', breed: 'Labrador', sex: 'Male', suburb: 'Fremantle', bio: 'Beach mornings and carrying the biggest stick.', traits: ['Sunny', 'Playful', 'Loyal'], assetKey: 'labrador-milo', isOwned: false, isMutualLike: true },
  { id: 'daisy', name: 'Daisy', age: '8 months', breed: 'Labrador', sex: 'Female', suburb: 'Cottesloe', bio: 'Soft paws, splashy swims and afternoon naps.', traits: ['Gentle', 'Cheery', 'Cuddly'], assetKey: 'labrador-daisy', isOwned: false, isMutualLike: false },
  { id: 'finn', name: 'Finn', age: '1 year', breed: 'Golden Retriever', sex: 'Male', suburb: 'Scarborough', bio: 'Always ready for a sunset walk by the water.', traits: ['Warm', 'Social', 'Goofy'], assetKey: 'golden-finn', isOwned: false, isMutualLike: true },
  { id: 'lola', name: 'Lola', age: '9 months', breed: 'Golden Retriever', sex: 'Female', suburb: 'Subiaco', bio: 'Garden explorer with a fondness for tennis balls.', traits: ['Sweet', 'Curious', 'Bouncy'], assetKey: 'golden-lola', isOwned: false, isMutualLike: false },
  { id: 'koda', name: 'Koda', age: '11 months', breed: 'Siberian Husky', sex: 'Male', suburb: 'Leederville', bio: 'Cool mornings, fast zoomies and dramatic singing.', traits: ['Bold', 'Silly', 'Active'], assetKey: 'husky-koda', isOwned: false, isMutualLike: false },
  { id: 'nova', name: 'Nova', age: '1 year', breed: 'Siberian Husky', sex: 'Female', suburb: 'Mount Lawley', bio: 'A bright-eyed adventurer who loves shady parks.', traits: ['Bright', 'Brave', 'Chatty'], assetKey: 'husky-nova', isOwned: false, isMutualLike: true },
  { id: 'blue', name: 'Blue', age: '7 months', breed: 'Australian Shepherd', sex: 'Male', suburb: 'Victoria Park', bio: 'Smart, fluffy and happiest learning a new trick.', traits: ['Clever', 'Soft', 'Focused'], assetKey: 'aussie-blue', isOwned: false, isMutualLike: false },
  { id: 'poppy', name: 'Poppy', age: '10 months', breed: 'Australian Shepherd', sex: 'Female', suburb: 'South Perth', bio: 'Picnic companion with excellent cuddle manners.', traits: ['Cosy', 'Kind', 'Spirited'], assetKey: 'aussie-poppy', isOwned: false, isMutualLike: true },
];
