import expect from 'expect'
import Chord from '../chord'
import './matchers'

describe('parse', function() {
  describe('chord without bass', function() {
    it('parses a simple chord', function() {
      const chord = Chord.parse('E');
      expect(chord).toMatchChord('E', null, null, null, null);
    });

    it('parses a chord with suffix', function() {
      const chord = Chord.parse('Esus4');
      expect(chord).toMatchChord('E', null, 'sus4', null, null);
    });

    it('parses a chord with modifier', function() {
      const chord = Chord.parse('F#');
      expect(chord).toMatchChord('F', '#', null, null, null);
    });

    it('parses a chord with modifier and suffix', function() {
      const chord = Chord.parse('F#sus4');
      expect(chord).toMatchChord('F', '#', 'sus4', null, null);
    });

    it('parses a chord with confusing suffix', function() {
      const chord = Chord.parse('Fmaj9#11');
      expect(chord).toMatchChord('F', null, 'maj9#11', null, null);
    });

    return it('parses a chord with modifier and confusing suffix', function() {
      const chord = Chord.parse('F#maj9b11');
      expect(chord).toMatchChord('F', '#', 'maj9b11', null, null);
    });
  });
});
