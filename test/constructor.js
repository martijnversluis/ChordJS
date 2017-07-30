import expect from 'expect'
import Chord from '../src/chord'
import './matchers'

describe('Chord', () => {
  describe('constructor', () => {
    it('assigns the right instance variables', () => {
      const chord = new Chord('E', 'b', 'sus4', 'G', '#');
      expect(chord).toMatchChord('E', 'b', 'sus4', 'G', '#');
    })
  })
})
