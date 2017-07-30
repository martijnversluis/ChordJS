import expect from 'expect'
import Chord from '../src/chord'
import './matchers'

describe('Chord', () => {
  describe('normalize', () => {
    it('normalizes E#', () => {
      const chord = new Chord({
        base: 'E',
        modifier: '#',
        suffix: null,
        bassBase: 'E',
        bassModifier: '#'
      });

      const normalizedChord = chord.normalize();
      expect(normalizedChord).toMatchChord('F', null, null, 'F', null);
    });

    it('normalizes B#', () => {
      const chord = new Chord({
        base: 'B',
        modifier: '#',
        suffix: null,
        bassBase: 'B',
        bassModifier: '#'
      });

      const normalizedChord = chord.normalize();
      expect(normalizedChord).toMatchChord('C', null, null, 'C', null);
    });

    it('normalizes Cb', () => {
      const chord = new Chord({
        base: 'C',
        modifier: 'b',
        suffix: null,
        bassBase: 'C',
        bassModifier: 'b'
      });

      const normalizedChord = chord.normalize();
      expect(normalizedChord).toMatchChord('B', null, null, 'B', null);
    });

    it('normalizes Fb', () => {
      const chord = new Chord({
        base: 'F',
        modifier: 'b',
        suffix: null,
        bassBase: 'F',
        bassModifier: 'b'
      });

      const normalizedChord = chord.normalize();
      expect(normalizedChord).toMatchChord('E', null, null, 'E', null);
    });
  });
});
