import expect from 'expect'
import Chord from '../src/chord'
import './matchers'

describe('Chord', () => {
  describe('normalize', () => {
    it('normalizes E#', () => {
      const chord = new Chord('E', '#', null, 'E', '#');
      const normalizedChord = chord.normalize();
      expect(normalizedChord).toMatchChord('F', null, null, 'F', null);
    });

    it('normalizes B#', () => {
      const chord = new Chord('B', '#', null, 'B', '#');
      const normalizedChord = chord.normalize();
      expect(normalizedChord).toMatchChord('C', null, null, 'C', null);
    });

    it('normalizes Cb', () => {
      const chord = new Chord('C', 'b', null, 'C', 'b');
      const normalizedChord = chord.normalize();
      expect(normalizedChord).toMatchChord('B', null, null, 'B', null);
    });

    it('normalizes Fb', () => {
      const chord = new Chord('F', 'b', null, 'F', 'b');
      const normalizedChord = chord.normalize();
      expect(normalizedChord).toMatchChord('E', null, null, 'E', null);
    });
  });
});
