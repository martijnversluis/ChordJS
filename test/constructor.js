import expect from 'expect'
import Chord from '../chord'
import './matchers'

describe('Chord', function() {
  describe('constructor', function() {
    it('assigns the right instance variables', function() {
      const chord = new Chord('E', 'b', 'sus4', 'G', '#');
      expect(chord).toMatchChord('E', 'b', 'sus4', 'G', '#');
    })
  })
})
