import expect from 'expect.js'
import Chord from '../chord'

describe('Chord', () => {
  describe('toString', () => {
    it('returns the right string representation', () => {
      const chord = new Chord('E', 'b', 'sus4', 'G', '#');
      expect(chord.toString()).to.eql('Ebsus4/G#');
    })
  })
})
