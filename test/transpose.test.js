import Chord from '../src/chord';
import './matchers';

describe('Chord', () => {
  describe('transpose', () => {
    describe('when delta > 0', () => {
      it('tranposes up', () => {
        const chord = new Chord({
          base: 'D',
          modifier: 'b',
          suffix: null,
          bassBase: 'A',
          bassModifier: '#',
        });

        const transposedChord = chord.transpose(5);
        expect(transposedChord).toBeChord('G', 'b', null, 'D', '#');
      });
    });

    describe('when delta < 0', () => {
      it('Does not change the chord', () => {
        const chord = new Chord({
          base: 'A',
          modifier: '#',
          suffix: null,
          bassBase: 'B',
          bassModifier: 'b',
        });

        const transposedChord = chord.transpose(-4);
        expect(transposedChord).toBeChord('F', '#', null, 'G', 'b');
      });
    });

    describe('when delta = 0', () => {
      it('Does not change the chord', () => {
        const chord = new Chord({
          base: 'B',
          modifier: '#',
          suffix: null,
          bassBase: 'C',
          bassModifier: 'b',
        });

        const tranposedChord = chord.transpose(0);
        expect(tranposedChord).toBeChord('B', '#', null, 'C', 'b');
      });
    });
  });
});
