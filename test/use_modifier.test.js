import Chord from '../src/chord';
import './matchers';

describe('Chord', () => {
  describe('useModifier', () => {
    describe('for a chord without modifier', () => {
      it('does not change the chord', () => {
        const chord = new Chord({
          base: 'F',
          modifier: null,
          suffix: null,
          bassBase: 'F',
          bassModifier: null,
        });

        const switchedChord = chord.useModifier('b');
        expect(switchedChord).toBeChord('F', null, null, 'F', null);
      });
    });

    describe('for b', () => {
      it('changes to b', () => {
        const chord = new Chord({
          base: 'G',
          modifier: '#',
          suffix: null,
          bassBase: 'G',
          bassModifier: '#',
        });

        const switchedChord = chord.useModifier('b');
        expect(switchedChord).toBeChord('A', 'b', null, 'A', 'b');
      });
    });

    describe('for #', () => {
      it('changes to #', () => {
        const chord = new Chord({
          base: 'G',
          modifier: 'b',
          suffix: null,
          bassBase: 'G',
          bassModifier: 'b',
        });

        const switchedChord = chord.useModifier('#');
        expect(switchedChord).toBeChord('F', '#', null, 'F', '#');
      });
    });
  });
});
