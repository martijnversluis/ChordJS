import expect from 'expect'
import Chord from '../src/chord'

describe('Chord', () => {
  describe('toString', () => {
    it('returns the right string representation', () => {
      const chord = new Chord({
        base: 'E',
        modifier: 'b',
        suffix: 'sus4',
        bassBase: 'G',
        bassModifier: '#'
      });

      expect(chord.toString()).toEqual('Ebsus4/G#');
    })
  })
})
