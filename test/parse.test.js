import Chord from '../src/chord';
import './matchers';

describe('Chord', () => {
  describe('parse', () => {
    describe('chord without bass', () => {
      it('parses a simple chord', () => {
        const chord = Chord.parse('E');
        expect(chord).toBeChord('E', null, null, null, null);
      });

      it('parses a chord with suffix', () => {
        const chord = Chord.parse('Esus4');
        expect(chord).toBeChord('E', null, 'sus4', null, null);
      });

      it('parses a chord with modifier', () => {
        const chord = Chord.parse('F#');
        expect(chord).toBeChord('F', '#', null, null, null);
      });

      it('parses a chord with modifier and suffix', () => {
        const chord = Chord.parse('F#sus4');
        expect(chord).toBeChord('F', '#', 'sus4', null, null);
      });

      it('parses a chord with confusing suffix', () => {
        const chord = Chord.parse('Fmaj9#11');
        expect(chord).toBeChord('F', null, 'maj9#11', null, null);
      });

      it('parses a chord with modifier and confusing suffix', () => {
        const chord = Chord.parse('F#maj9b11');
        expect(chord).toBeChord('F', '#', 'maj9b11', null, null);
      });
    });

    describe('chord with bass', () => {
      it('parses a simple chord', () => {
        const chord = Chord.parse('E/B');
        expect(chord).toBeChord('E', null, null, 'B', null);
      });

      it('parses a chord with suffix', () => {
        const chord = Chord.parse('Esus4/B');
        expect(chord).toBeChord('E', null, 'sus4', 'B', null);
      });

      it('parses a chord with modifier', () => {
        const chord = Chord.parse('F#/C#');
        expect(chord).toBeChord('F', '#', null, 'C', '#');
      });

      it('parses a chord with modifier and suffix', () => {
        const chord = Chord.parse('F#sus4/C#');
        expect(chord).toBeChord('F', '#', 'sus4', 'C', '#');
      });

      it('parses a chord with confusing suffix', () => {
        const chord = Chord.parse('Fmaj9#11/C#');
        expect(chord).toBeChord('F', null, 'maj9#11', 'C', '#');
      });

      it('parses a chord with modifier and confusing suffix', () => {
        const chord = Chord.parse('F#maj9b11/C#');
        expect(chord).toBeChord('F', '#', 'maj9b11', 'C', '#');
      });
    });
  });
});
