import { parse } from './index';
import ChordSymbol from './chord_symbol';
import { isEmptyString } from './functions';

const TRANSPOSE_DISTANCE = [null, 0, 2, 4, 5, 7, 9, 11];
const MAJOR_SCALE = [null, 'M', 'm', 'm', 'M', 'M', 'm', 'dim'];

const MODIFIER_TRANSPOSITION = {
  '#': 1,
  b: -1,
};

function transposeDistance(chordNumber, modifier) {
  return TRANSPOSE_DISTANCE[chordNumber] + (MODIFIER_TRANSPOSITION[modifier] || 0);
}

function normalizeSuffix(suffix) {
  if (suffix === 'M') {
    return '';
  }

  return suffix;
}

function chordSuffix({ base, suffix }) {
  if (isEmptyString(suffix)) {
    const defaultSuffix = MAJOR_SCALE[base];
    return normalizeSuffix(defaultSuffix);
  }

  return normalizeSuffix(suffix);
}

function chordModifier(keyChord, numericChord) {
  if (keyChord.modifier === 'b' || numericChord.modifier === 'b') {
    return 'b';
  }

  return '#';
}

function toChordSymbol(numericChord, key) {
  let keyChord = parse(key);

  if (keyChord.suffix === 'm') {
    keyChord = keyChord.transpose(3).set({ suffix: null });
  }

  const modifier = chordModifier(keyChord, numericChord);

  const baseTransposeDistance = transposeDistance(numericChord.base, numericChord.modifier);
  const baseChord = keyChord.transpose(baseTransposeDistance).useModifier(modifier);
  let bassChord = null;

  if (numericChord.bassBase) {
    bassChord = keyChord.transpose(transposeDistance(numericChord.bassBase, numericChord.bassModifier));
  }

  const suffix = chordSuffix(numericChord);

  return new ChordSymbol({
    base: baseChord.base,
    modifier: baseChord.modifier,
    suffix,
    bassBase: bassChord?.base,
    bassModifier: bassChord?.modifier,
  });
}

export default toChordSymbol;
