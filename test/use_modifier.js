import expect from 'expect'
import Chord from '../src/chord'
import './matchers'

describe('Chord', () => {
  describe('useModifier', () => {
    context('for a chord without modifier', () => {
      it('does not change the chord', () => {
        const chord = new Chord('F', null, null, 'F', null);
        const switchedChord = chord.useModifier('b');
        expect(switchedChord).toMatchChord('F', null, null, 'F', null);
      });
    });

    context('for b', () => {
      it('changes to b', () => {
        const chord = new Chord('G', '#', null, 'G', '#');
        const switchedChord = chord.useModifier('b');
        expect(switchedChord).toMatchChord('A', 'b', null, 'A', 'b');
      });
    });

    context('for #', () => {
      it('changes to #', () => {
        const chord = new Chord('G', 'b', null, 'G', 'b');
        const switchedChord = chord.useModifier('#');
        expect(switchedChord).toMatchChord('F', '#', null, 'F', '#');
      });
    });
  });
});
