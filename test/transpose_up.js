import expect from 'expect'
import Chord from '../src/chord'
import './matchers'

describe('Chord', () => {
  describe('transposeUp', () => {
    context('for C, D, F, G and A', () => {
      it('returns the # version', () => {
        const chord = new Chord({
          base: 'A',
          modifier: null,
          suffix: null,
          bassBase: 'G',
          bassModifier: null
        });

        const transposedChord = chord.transposeUp();
        expect(transposedChord).toMatchChord('A', '#', null, 'G', '#');
      });
    });

    context('for C#, D#, F#, G# and A#', () => {
      it('returns the next note without #', () => {
        const chord = new Chord({
          base: 'A',
          modifier: '#',
          suffix: null,
          bassBase: 'G',
          bassModifier: '#'
        });

        const transposedChord = chord.transposeUp();
        expect(transposedChord).toMatchChord('B', null, null, 'A', null);
      });
    });

    context('for E and B', () => {
      it('returns the next note', () => {
        const chord = new Chord({
          base: 'E',
          modifier: null,
          suffix: null,
          bassBase: 'B',
          bassModifier: null
        });

        const transposedChord = chord.transposeUp();
        expect(transposedChord).toMatchChord('F', null, null, 'C', null);
      });
    });

    context('for Db, Eb, Gb, Ab and Bb', () => {
      it('returns the note without b', () => {
        const chord = new Chord({
          base: 'D',
          modifier: 'b',
          suffix: null,
          bassBase: 'E',
          bassModifier: 'b'
        });

        const transposedChord = chord.transposeUp();
        expect(transposedChord).toMatchChord('D', null, null, 'E', null);
      });
    });

    context('for Cb and Fb', () => {
      it('returns the note without b', () => {
        const chord = new Chord({
          base: 'C',
          modifier: 'b',
          suffix: null,
          bassBase: 'F',
          bassModifier: 'b'
        });

        const transposedChord = chord.transposeUp();
        expect(transposedChord).toMatchChord('C', null, null, 'F', null);
      });
    });

    context('for E# and B#', () => {
      it('returns the next note with #', () => {
        const chord = new Chord({
          base: 'E',
          modifier: '#',
          suffix: null,
          bassBase: 'B',
          bassModifier: '#'
        });

        const transposedChord = chord.transposeUp();
        expect(transposedChord).toMatchChord('F', '#', null, 'C', '#');
      });
    });
  });
});
