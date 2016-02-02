import expect from 'expect'
import Chord from '../chord'
import './matchers'

describe('Chord', () => {
  describe('transposeUp', () => {
    context('for C, D, F, G and A', () => {
      it('returns the # version', () => {
        const chord = new Chord('A', null, null, 'G', null);
        const transposedChord = chord.transposeUp();
        expect(transposedChord).toMatchChord('A', '#', null, 'G', '#');
      });
    });

    context('for C#, D#, F#, G# and A#', () => {
      it('returns the next note without #', () => {
        const chord = new Chord('A', '#', null, 'G', '#');
        const transposedChord = chord.transposeUp();
        expect(transposedChord).toMatchChord('B', null, null, 'A', null);
      });
    });

    context('for E and B', () => {
      it('returns the next note', () => {
        const chord = new Chord('E', null, null, 'B', null);
        const transposedChord = chord.transposeUp();
        expect(transposedChord).toMatchChord('F', null, null, 'C', null);
      });
    });

    context('for Db, Eb, Gb, Ab and Bb', () => {
      it('returns the note without b', () => {
        const chord = new Chord('D', 'b', null, 'E', 'b');
        const transposedChord = chord.transposeUp();
        expect(transposedChord).toMatchChord('D', null, null, 'E', null);
      });
    });

    context('for Cb and Fb', () => {
      it('returns the note without b', () => {
        const chord = new Chord('C', 'b', null, 'F', 'b');
        const transposedChord = chord.transposeUp();
        expect(transposedChord).toMatchChord('C', null, null, 'F', null);
      });
    });

    context('for E# and B#', () => {
      it('returns the next note with #', () => {
        const chord = new Chord('E', '#', null, 'B', '#');
        const transposedChord = chord.transposeUp();
        expect(transposedChord).toMatchChord('F', '#', null, 'C', '#');
      });
    });
  });
});
