import parse from './parse';
import { deprecate } from './functions';

export { parse };

export default {
  parse(chordString) {
    deprecate(
      'Chord.parse is deprecated, please use: import { parse } from \'chordjs\'; const chord = parse(\'Esus\');',
    );
    return parse(chordString);
  },
};
