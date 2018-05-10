import expect from 'expect';

import Chord from '../src/chord';

const chordsEqual = (actualChord, expectedChord) => (
  actualChord.base === expectedChord.base &&
  actualChord.modifier === expectedChord.modifier &&
  actualChord.suffix === expectedChord.suffix &&
  actualChord.bassBase === expectedChord.bassBase &&
  actualChord.bassModifier === expectedChord.bassModifier
);

expect.extend({
  toMatchChord(actualChord, base, modifier, suffix, bassBase, bassModifier) {
    const expectedChord = new Chord({ base, modifier, suffix, bassBase, bassModifier });
    const pass = chordsEqual(actualChord, expectedChord);

    if (pass) {
      return {
        message: () => `expected ${actualChord} not to equal ${expectedChord}`,
        pass: true,
      };
    }

    return {
      message: () => `expected ${actualChord} to equal ${expectedChord}`,
      pass: false,
    };
  },
});
