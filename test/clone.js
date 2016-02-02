import expect from 'expect'
import Chord from '../chord'
import './matchers'

describe('Chord', () => {
  describe('clone', () => {
    it('assigns the right instance variables', () => {
      const chord = new Chord('E', 'b', 'sus4', 'G', '#');
      const clonedChord = chord.clone()
      expect(clonedChord).toMatchChord('E', 'b', 'sus4', 'G', '#');
    })
  })
})
