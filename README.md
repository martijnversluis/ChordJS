# ChordJS [![Build Status](https://travis-ci.org/martijnversluis/ChordJS.svg?branch=master)](https://travis-ci.org/martijnversluis/ChordJS) [![npm version](https://badge.fury.io/js/chordjs.svg)](https://badge.fury.io/js/chordjs) [![codebeat badge](https://codebeat.co/badges/17008239-5c76-49c2-8e93-ae00267939b2)](https://codebeat.co/projects/github-com-martijnversluis-chordjs-master) [![Code Climate](https://codeclimate.com/github/martijnversluis/ChordJS/badges/gpa.svg)](https://codeclimate.com/github/martijnversluis/ChordJS)

A simple JavaScript chord parsing and manipulation tool

## Installation

`ChordJS` is on npm, to install run:

```bash
npm install chordjs
```

Load with `require()` or `import` (es2015):

```javascript
var Chord = require('chordjs');
import Chord from 'chordjs';
```

It is also possible to download or clone the repository. When you load one of
the compiled packages in the `dist/` folder, you can use `window.Chord` in the
browser.

## Functionalities

### Parse

```javascript
var chord = Chord.parse('Ebsus4/Bb');
```

### Display with #toString

Use #toString() to convert the chord to a chord string (eg Dsus/F#)

```javascript
var chord = Chord.parse('Ebsus4/Bb');
chord.toString(); // --> "Ebsus4/Bb"
```

### Clone

```javascript
var chord2 = chord.clone();
```

### Normalize

Normalizes keys B#, E#, Cb and Fb to C, F, B and E

```javascript
var chord = Chord.parse('E#/B#'),
    normalizedChord = chord.normalize();
normalizedChord.toString(); // --> "F/C"
```

### Switch modifier

Convert # to b and vice versa

```javascript
var chord = Chord.parse('Eb/Bb'),
    chord2 = chord.switchModifier();
chord2.toString(); // --> "D#/A#"
```

### Use specific modifier

Set the chord to a specific modifier (# or b)

```javascript
var chord = Chord.parse('Eb/Bb'),
    chord2 = chord.useModifier('#');
chord2.toString(); // --> "D#/A#"
```

```javascript
var chord = Chord.parse('Eb/Bb'),
    chord2 = chord.useModifier('b');
chord2.toString(); // --> "Eb/Bb"
```

### Transpose up

```javascript
var chord = Chord.parse('Eb/Bb'),
    chord2 = chord.transposeUp();
chord2.toString(); // -> "E/B"
```

### Transpose down

```javascript
var chord = Chord.parse('Eb/Bb'),
    chord2 = chord.transposeDown();
chord2.toString(); // -> "D/A"
```

### Transpose

```javascript
var chord = Chord.parse('C/E'),
    chord2 = chord.transpose(4);
chord2.toString(); // -> "E/G#"
```

```javascript
var chord = Chord.parse('C/E'),
    chord2 = chord.transpose(-4);
chord2.toString(); // -> "Ab/C"
```
