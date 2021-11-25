import parse from './parse';
import { deprecate } from './functions';

export { parse };

deprecate(`
ChordJS has been merged into ChordSheetJS.
ChordJS will not receive any more updates, although it will remain on NPM.
To benefit from new features, please use ChordSheetJS instead:

    npm install chordjs

or

    yarn add chordjs
`.substring(1));

export default {
  parse(chordString) {
    deprecate(
      'Chord.parse is deprecated, please use: import { parse } from \'chordjs\'; const chord = parse(\'Esus\');',
    );
    return parse(chordString);
  },
};
