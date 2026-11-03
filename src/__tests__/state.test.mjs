import assert from 'node:assert/strict';
import test from 'node:test';
import { emptyState, recordSwipe, validateProfile } from '../lib/state.ts';

const dog = {
  id: 'milo', name: 'Milo', age: '10 months', breed: 'Labrador', sex: 'Male',
  suburb: 'Fremantle', bio: 'Beach mornings.', traits: ['Sunny', 'Playful', 'Loyal'],
  assetKey: 'labrador-milo', isOwned: false, isMutualLike: true,
};

test('a mutual like creates one persisted match', () => {
  const now = new Date('2026-11-03T10:00:00.000Z');
  const next = recordSwipe(emptyState, dog, 'like', now);
  assert.equal(next.swipeHistory.length, 1);
  assert.deepEqual(next.matches, [{ profileId: 'milo', timestamp: now.toISOString() }]);
});

test('a pass never creates a match', () => {
  const next = recordSwipe(emptyState, dog, 'pass');
  assert.equal(next.matches.length, 0);
});

test('the same profile cannot be swiped twice', () => {
  const once = recordSwipe(emptyState, dog, 'like');
  const twice = recordSwipe(once, dog, 'like');
  assert.strictEqual(twice, once);
});

test('profile validation requires a photo and exactly three traits', () => {
  const valid = { ...dog, photoUri: 'file:///dog.jpg', isOwned: true };
  assert.equal(validateProfile(valid), true);
  assert.equal(validateProfile({ ...valid, photoUri: '' }), false);
  assert.equal(validateProfile({ ...valid, traits: ['Playful', 'Gentle'] }), false);
});
