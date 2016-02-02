import expect from 'expect'
import Chord from '../chord'
import './matchers'

describe('Chord', () => {
  describe('switchModifier', () => {
    context('for a chord without modifier', () => {
      it('does not change the chord', () => {
        const chord = new Chord('F', null, null, 'F', null);
        const switchedChord = chord.switchModifier();
        expect(switchedChord).toMatchChord('F', null, null, 'F', null);
      });
    });

    context('for a b chord', () => {
      it('changes to #', () => {
        const chord = new Chord('G', '#', null, 'G', '#');
        const switchedChord = chord.switchModifier();
        expect(switchedChord).toMatchChord('A', 'b', null, 'A', 'b');
      });
    });

    context('for a # chord', () => {
      it('changes to b', () => {
        const chord = new Chord('G', 'b', null, 'G', 'b');
        const switchedChord = chord.switchModifier();
        expect(switchedChord).toMatchChord('F', '#', null, 'F', '#');
      });
    });
  });
});
