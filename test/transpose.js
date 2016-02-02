import expect from 'expect'
import Chord from '../chord'
import './matchers'

describe('Chord', () => {
  describe('transpose', () => {
    context('when delta > 0', () => {
      it('tranposes up', () => {
        const chord = new Chord('D', 'b', null, 'A', '#');
        const transposedChord = chord.transpose(5);
        // expect(`${chord} => ${transposedChord}`).toEqual('foo');
        expect(transposedChord).toMatchChord('G', 'b', null, 'D', '#');
      });
    });

    context('when delta < 0', () => {
      it('Does not change the chord', () => {
        const chord = new Chord('A', '#', null, 'B', 'b');
        const transposedChord = chord.transpose(-4);
        // expect(`${chord} => ${transposedChord}`).toEqual('foo');
        expect(transposedChord).toMatchChord('F', '#', null, 'G', 'b');
      });
    });

    context('when delta = 0', () => {
      it('Does not change the chord', () => {
        const chord = new Chord('B', '#', null, 'C', 'b');
        const tranposedChord = chord.transpose(0);
        expect(tranposedChord).toMatchChord('B', '#', null, 'C', 'b');
      });
    });
  });
});
