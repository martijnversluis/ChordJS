const chordRegex = /([A-G])(#|b)?([^\/\s]*)(\/([A-G])(#|b)?)?/i;
const A = 'A'.charCodeAt(0);
const G = 'G'.charCodeAt(0);

const keyUp = function(key) {
  return keyChange(key, 1);
};

const keyDown = function(key) {
  return keyChange(key, -1);
};

const keyChange = function(key, delta) {
  var charCode;
  charCode = key.toUpperCase().charCodeAt(0);
  charCode += delta;

  if (charCode > G) {
    charCode = A;
  }

  if (charCode < A) {
    charCode = G;
  }

  return String.fromCharCode(charCode);
};

const normalize = function(base, modifier) {
  if (modifier === '#' && /^(B|E)$/.test(base)) {
    return [keyUp(base), null];
  }
  if (modifier === 'b' && /^(C|F)$/.test(base)) {
    return [keyDown(base), null];
  }
  return [base, modifier];
};

const internalSwitchModifier = function(base, modifier) {
  if (modifier === '#') {
    return [keyUp(base), 'b'];
  }
  if (modifier === 'b') {
    return [keyDown(base), '#'];
  }
};

const switchModifier = function(base, modifier) {
  [base, modifier] = normalize(base, modifier)

  if (modifier) {
    return internalSwitchModifier(base, modifier);
  }

  return [base, modifier];
};

const useModifier = function(base, modifier, newModifier) {
  if (modifier && modifier !== newModifier) {
    return internalSwitchModifier(base, modifier);
  }

  return [base, modifier];
};

const transpose = function(base, modifier, delta) {
  let [newBase, newModifier] = [base, modifier]

  if (delta < 0) {
    [newBase, newModifier] = repeatProcessor(base, modifier, transposeDown, Math.abs(delta));
  } else if (delta > 0) {
    [newBase, newModifier] = repeatProcessor(base, modifier, transposeUp, delta);
  }

  return useModifier(newBase, newModifier, modifier);
};

const repeatProcessor = function(base, modifier, processor, amount) {
  for (let i = 0; i < amount; i++) {
    [base, modifier] = processor(base, modifier)
  }

  return [base, modifier];
};

const transposeUp = function(base, modifier) {
  [base, modifier] = normalize(base, modifier)

  if (modifier === 'b') {
    return [base, null];
  }

  if (modifier === '#') {
    return [keyUp(base), null];
  }

  if (/^(B|E)$/.test(base)) {
    return [keyUp(base), null];
  }

  return [base, '#'];
};

const transposeDown = function(base, modifier) {
  [base, modifier] = normalize(base, modifier);

  if (modifier === 'b') {
    return [keyDown(base), null];
  }

  if (modifier === '#') {
    return [base, null];
  }

  if (/^(C|F)$/.test(base)) {
    return [keyDown(base), null];
  }

  return [base, 'b'];
};

const processChord = function(sourceChord, processor, processorArg) {
  let chord = sourceChord.clone();
  [chord.base, chord.modifier] = processor(sourceChord.base, sourceChord.modifier, processorArg)

  if (sourceChord.bassBase) {
    [chord.bassBase, chord.bassModifier] = processor(sourceChord.bassBase, sourceChord.bassModifier, processorArg)
  }

  return chord;
};

class Chord {
  static parse(chordString) {
    const parts = chordRegex.exec(chordString);

    if (parts) {
      const [, base, modifier, suffix, , bassBase, bassModifier] = parts;
      return new Chord({base, modifier, suffix, bassBase, bassModifier});
    }

    return null;
  }

  constructor({base, modifier, suffix, bassBase, bassModifier}) {
    this.base = base || null;
    this.modifier = modifier || null;
    this.suffix = suffix || null;
    this.bassBase = bassBase || null;
    this.bassModifier = bassModifier || null;
  }

  clone() {
    const {base, modifier, suffix, bassBase, bassModifier} = this;
    return new Chord({base, modifier, suffix, bassBase, bassModifier});
  }

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
    let chordString = this.base + (this.modifier || '') + (this.suffix || '');

    if (this.bassBase) {
      chordString += '/' + this.bassBase + (this.bassModifier || '');
    }

    return chordString;
  }
}

export default Chord;
