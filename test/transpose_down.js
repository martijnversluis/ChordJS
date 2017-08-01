import expect from 'expect'
import Chord from '../src/chord'
import './matchers'

describe('Chord', () => {
  describe('transposeUp', () => {
    context('for D, E, G, A, B', () => {
      it('returns the b version', () => {
        const chord = new Chord({
          base: 'A',
          modifier: null,
          suffix: null,
          bassBase: 'G',
          bassModifier: null
        });

        const transposedChord = chord.transposeDown();
        expect(transposedChord).toMatchChord('A', 'b', null, 'G', 'b');
      });
    });

    context('for C#, D#, F#, G# and A#', () => {
      it('returns the note without #', () => {
        const chord = new Chord({
          base: 'A',
          modifier: '#',
          suffix: null,
          bassBase: 'G',
          bassModifier: '#'
        });

        const transposedChord = chord.transposeDown();
        expect(transposedChord).toMatchChord('A', null, null, 'G', null);
      });
    });

    context('for F and C', () => {
      it('returns the previous note', () => {
        const chord = new Chord({
          base: 'F',
          modifier: null,
          suffix: null,
          bassBase: 'C',
          bassModifier: null
        });

        const transposedChord = chord.transposeDown();
        expect(transposedChord).toMatchChord('E', null, null, 'B', null);
      });
    });

    context('for Db, Eb, Gb, Ab and Bb', () => {
      it('returns the previous note without b', () => {
        const chord = new Chord({
          base: 'D',
          modifier: 'b',
          suffix: null,
          bassBase: 'E',
          bassModifier: 'b'
        });

        const transposedChord = chord.transposeDown();
        expect(transposedChord).toMatchChord('C', null, null, 'D', null);
      });
    });

    context('for B# and E#', () => {
      it('returns the note without #', () => {
        const chord = new Chord({
          base: 'B',
          modifier: '#',
          suffix: null,
          bassBase: 'E',
          bassModifier: '#'
        });

        const transposedChord = chord.transposeDown();
        expect(transposedChord).toMatchChord('B', null, null, 'E', null);
      });
    });

    context('for Fb and Cb', () => {
      it('returns the previous note with b', () => {
        const chord = new Chord({
          base: 'F',
          modifier: 'b',
          suffix: null,
          bassBase: 'C',
          bassModifier: 'b'
        });

        const transposedChord = chord.transposeDown();
        expect(transposedChord).toMatchChord('E', 'b', null, 'B', 'b');
      });
    });
  });
});
