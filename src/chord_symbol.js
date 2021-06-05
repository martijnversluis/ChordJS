import {
  normalize,
  processChord,
  switchModifier,
  transpose,
  transposeDown,
  transposeUp,
  useModifier,
} from './functions';

import Chord from './chord';

class ChordSymbol extends Chord {
  normalize() {
    return processChord(this, normalize);
  }

  switchModifier() {
    return processChord(this, switchModifier);
  }

  useModifier(newModifier) {
    return processChord(this, useModifier, newModifier);
  }

  transposeUp() {
    return processChord(this, transposeUp);
  }

  transposeDown() {
    return processChord(this, transposeDown);
  }

  transpose(delta) {
    return processChord(this, transpose, delta);
  }

  toString() {
    const chordString = this.base + (this.modifier || '') + (this.suffix || '');

    if (this.bassBase) {
      return `${chordString}/${this.bassBase}${this.bassModifier || ''}`;
    }

    return chordString;
  }
}

export default ChordSymbol;
