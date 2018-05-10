const chordRegex = /([A-G])(#|b)?([^/\s]*)(\/([A-G])(#|b)?)?/i;
const A = 'A'.charCodeAt(0);
const G = 'G'.charCodeAt(0);

const keyChange = (key, delta) => {
  let charCode;
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

const keyUp = key => keyChange(key, 1);

const keyDown = key => keyChange(key, -1);

const normalize = (base, modifier) => {
  if (modifier === '#' && /^(B|E)$/.test(base)) {
    return [keyUp(base), null];
  }

  if (modifier === 'b' && /^(C|F)$/.test(base)) {
    return [keyDown(base), null];
  }

  return [base, modifier];
};

const internalSwitchModifier = (base, modifier) => {
  if (modifier === '#') {
    return [keyUp(base), 'b'];
  }

  if (modifier === 'b') {
    return [keyDown(base), '#'];
  }

  throw new Error(`Unexpected modifier ${modifier}`);
};

const switchModifier = (base, modifier) => {
  const [normalizedBase, normalizedModifier] = normalize(base, modifier);

  if (modifier) {
    return internalSwitchModifier(normalizedBase, normalizedModifier);
  }

  return [normalizedBase, normalizedModifier];
};

const useModifier = (base, modifier, newModifier) => {
  if (modifier && modifier !== newModifier) {
    return internalSwitchModifier(base, modifier);
  }

  return [base, modifier];
};

const repeatProcessor = (base, modifier, processor, amount) => {
  let [processedBase, processedModifier] = [base, modifier];

  for (let i = 0; i < amount; i += 1) {
    [processedBase, processedModifier] = processor(processedBase, processedModifier);
  }

  return [processedBase, processedModifier];
};

const transposeUp = (base, modifier) => {
  const [normalizedBase, normalizedModifier] = normalize(base, modifier);

  if (normalizedModifier === 'b') {
    return [normalizedBase, null];
  }

  if (normalizedModifier === '#') {
    return [keyUp(normalizedBase), null];
  }

  if (/^(B|E)$/.test(normalizedBase)) {
    return [keyUp(normalizedBase), null];
  }

  return [normalizedBase, '#'];
};

const transposeDown = (base, modifier) => {
  const [normalizedBase, normalizedModifier] = normalize(base, modifier);

  if (normalizedModifier === 'b') {
    return [keyDown(normalizedBase), null];
  }

  if (normalizedModifier === '#') {
    return [normalizedBase, null];
  }

  if (/^(C|F)$/.test(normalizedBase)) {
    return [keyDown(normalizedBase), null];
  }

  return [normalizedBase, 'b'];
};

const transpose = (base, modifier, delta) => {
  let [newBase, newModifier] = [base, modifier];

  if (delta < 0) {
    [newBase, newModifier] = repeatProcessor(base, modifier, transposeDown, Math.abs(delta));
  } else if (delta > 0) {
    [newBase, newModifier] = repeatProcessor(base, modifier, transposeUp, delta);
  }

  return useModifier(newBase, newModifier, modifier);
};

const processChord = (sourceChord, processor, processorArg) => {
  const chord = sourceChord.clone();
  [chord.base, chord.modifier] = processor(sourceChord.base, sourceChord.modifier, processorArg);

  if (sourceChord.bassBase) {
    [chord.bassBase, chord.bassModifier] = processor(sourceChord.bassBase, sourceChord.bassModifier, processorArg);
  }

  return chord;
};

class Chord {
  static parse(chordString) {
    const parts = chordRegex.exec(chordString);

    if (parts) {
      const [, base, modifier, suffix, , bassBase, bassModifier] = parts;
      return new Chord({ base, modifier, suffix, bassBase, bassModifier });
    }

    return null;
  }

  constructor({ base, modifier, suffix, bassBase, bassModifier }) {
    this.base = base || null;
    this.modifier = modifier || null;
    this.suffix = suffix || null;
    this.bassBase = bassBase || null;
    this.bassModifier = bassModifier || null;
  }

  clone() {
    const { base, modifier, suffix, bassBase, bassModifier } = this;
    return new Chord({ base, modifier, suffix, bassBase, bassModifier });
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
    const chordString = this.base + (this.modifier || '') + (this.suffix || '');

    if (this.bassBase) {
      return `${chordString}/${this.bassBase}${this.bassModifier || ''}`;
    }

    return chordString;
  }
}

export default Chord;
