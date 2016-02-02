import expect from 'expect'
import Chord from '../chord'

describe('Chord', () => {
  describe('toString', () => {
    it('returns the right string representation', () => {
      const chord = new Chord('E', 'b', 'sus4', 'G', '#');
      expect(chord.toString()).toEqual('Ebsus4/G#');
    })
  })
})
