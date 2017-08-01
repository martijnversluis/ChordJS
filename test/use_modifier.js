import expect from 'expect'
import Chord from '../src/chord'
import './matchers'

describe('Chord', () => {
  describe('useModifier', () => {
    context('for a chord without modifier', () => {
      it('does not change the chord', () => {
        const chord = new Chord({
          base: 'F',
          modifier: null,
          suffix: null,
          bassBase: 'F',
          bassModifier: null
        });

        const switchedChord = chord.useModifier('b');
        expect(switchedChord).toMatchChord('F', null, null, 'F', null);
      });
    });

    context('for b', () => {
      it('changes to b', () => {
        const chord = new Chord({
          base: 'G',
          modifier: '#',
          suffix: null,
          bassBase: 'G',
          bassModifier: '#'
        });

        const switchedChord = chord.useModifier('b');
        expect(switchedChord).toMatchChord('A', 'b', null, 'A', 'b');
      });
    });

    context('for #', () => {
      it('changes to #', () => {
        const chord = new Chord({
          base: 'G',
          modifier: 'b',
          suffix: null,
          bassBase: 'G',
          bassModifier: 'b'
        });

        const switchedChord = chord.useModifier('#');
        expect(switchedChord).toMatchChord('F', '#', null, 'F', '#');
      });
    });
  });
});
