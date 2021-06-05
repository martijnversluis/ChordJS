import Chord from './chord';

class NumericChord extends Chord {
  constructor(
    {
      base, modifier, suffix, bassBase, bassModifier,
    },
  ) {
    super(
      {
        base: parseInt(base, 10),
        modifier,
        suffix,
        bassBase: parseInt(bassBase, 10),
        bassModifier,
      },
    );
  }

  toString() {
    const chordString = (this.modifier || '') + this.base + (this.suffix || '');

    if (this.bassBase) {
      return `${chordString}/${this.bassModifier || ''}${this.bassBase}`;
    }

    return chordString;
  }

  normalize() {
    return this.clone();
  }

  switchModifier() {
    return this.clone();
  }

  transpose() {
    return this.clone();
  }

  transposeUp() {
    return this.clone();
  }

  transposeDown() {
    return this.clone();
  }

  useModifier() {
    return this.clone();
  }
}

export default NumericChord;
