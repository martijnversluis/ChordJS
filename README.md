# ChordJS

A simple JavaScript chord parsing and manipulation tool

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
