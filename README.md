# ⚠️ NOTE: ChordJS has been merged into [ChordSheetJS](https://github.com/martijnversluis/ChordSheetJS)

ChordJS will not receive any more updates, although it will remain on NPM. To benefit from new features, please use ChordSheetJS instead.

```bash
npm install chordjs
```

or:

```bash
yarn add chordjs
```

```javascript
import Chord from 'chordsheetjs';
const chord = Chord.parse('Em');
```

-----

# ChordJS [![Build Status](https://travis-ci.org/martijnversluis/ChordJS.svg?branch=master)](https://travis-ci.org/martijnversluis/ChordJS) [![npm version](https://badge.fury.io/js/chordjs.svg)](https://badge.fury.io/js/chordjs) [![Code Climate](https://codeclimate.com/github/martijnversluis/ChordJS/badges/gpa.svg)](https://codeclimate.com/github/martijnversluis/ChordJS)

A simple JavaScript chord parsing and manipulation tool

## Installation

`ChordJS` is on npm, to install run:

```bash
npm install chordjs
```

or:

```bash
yarn add chordjs
```

Load with `import` (es2015):

```javascript
var Chord = require('chordjs').default;
import Chord, { parse } from 'chordjs';
```

## Functionalities

### Parse

```javascript
const chord = parse('Ebsus4/Bb');
```

Parse numeric chords (Nashville system):

```javascript
const chord = parse('b1sus4/#3');
```

### Display with #toString

Use #toString() to convert the chord to a chord string (eg Dsus/F#)

```javascript
const chord = parse('Ebsus4/Bb');
chord.toString(); // --> "Ebsus4/Bb"
```

### Clone

```javascript
var chord2 = chord.clone();
```

### Normalize

Normalizes keys B#, E#, Cb and Fb to C, F, B and E

```javascript
const chord = parse('E#/B#'),
    normalizedChord = chord.normalize();
normalizedChord.toString(); // --> "F/C"
```

### Switch modifier

Convert # to b and vice versa

```javascript
const chord = parse('Eb/Bb');
const chord2 = chord.switchModifier();
chord2.toString(); // --> "D#/A#"
```

### Use specific modifier

Set the chord to a specific modifier (# or b)

```javascript
const chord = parse('Eb/Bb');
const chord2 = chord.useModifier('#');
chord2.toString(); // --> "D#/A#"
```

```javascript
const chord = parse('Eb/Bb');
const chord2 = chord.useModifier('b');
chord2.toString(); // --> "Eb/Bb"
```

### Transpose up

```javascript
const chord = parse('Eb/Bb');
const chord2 = chord.transposeUp();
chord2.toString(); // -> "E/B"
```

### Transpose down

```javascript
const chord = parse('Eb/Bb');
const chord2 = chord.transposeDown();
chord2.toString(); // -> "D/A"
```

### Transpose

```javascript
const chord = parse('C/E');
const chord2 = chord.transpose(4);
chord2.toString(); // -> "E/G#"
```

```javascript
const chord = parse('C/E');
const chord2 = chord.transpose(-4);
chord2.toString(); // -> "Ab/C"
```

### Convert numeric chord to chord symbol

```javascript
const numericChord = parse('2/4');
const chordSymbol = toChordSymbol(numericChord, 'E');
chordSymbol.toString(); // -> "F#m/A"
```
