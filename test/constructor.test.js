import Chord from '../src/chord';
import './matchers';

describe('Chord', () => {
  describe('constructor', () => {
    it('assigns the right instance variables', () => {
      const chord = new Chord({
        base: 'E',
        modifier: 'b',
        suffix: 'sus4',
        bassBase: 'G',
        bassModifier: '#',
      });

      expect(chord).toBeChord('E', 'b', 'sus4', 'G', '#');
    });
  });
});
