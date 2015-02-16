# ChordJS

A simple JavaScript chord parsing and manipulation tool

## Functionalities

### Parse

```coffeescript
chord = Chord.parse 'Ebsus4/Bb'
```

```javascript
var chord = Chord.parse('Ebsus4/Bb');
```

### Display with #toString

Use #toString() to convert the chord to a chord string (eg Dsus/F#)

```coffeescript
chord = Chord.parse 'Ebsus4/Bb'
chord.toString() # --> "Ebsus4/Bb"
```

```javascript
var chord = Chord.parse('Ebsus4/Bb');
chord.toString(); // --> "Ebsus4/Bb"
```

### Clone

```coffeescript
chord2 = chord.clone()
```

```javascript
var chord2 = chord.clone();
```

### Normalize

Normalizes keys B#, E#, Cb and Fb to C, F, B and E

```coffeescript
chord = Chord.parse 'E#/B#'
normalizedChord = chord.normalize()
normalizedChord.toString() # --> "F/C"
```

```javascript
var chord = Chord.parse('E#/B#'),
    normalizedChord = chord.normalize();
normalizedChord.toString(); // --> "F/C"
```

### Switch modifier

Convert # to b and vice versa

```coffeescript
chord = Chord.parse 'Eb/Bb'
chord2 = chord.switchModifier()
chord2.toString() # --> "D#/A#"
```

```javascript
var chord = Chord.parse('Eb/Bb'),
    chord2 = chord.switchModifier();
chord2.toString(); // -> "D#/A#"
```

### Transpose up

```coffeescript
chord = Chord.parse 'Eb/Bb'
chord2 = chord.transposeUp()
chord2.toString() # --> "E/B"
```

```javascript
var chord = Chord.parse('Eb/Bb'),
    chord2 = chord.transposeUp();
chord2.toString(); // -> "E/B"
```

### Transpose down

```coffeescript
chord = Chord.parse 'Eb/Bb'
chord2 = chord.transposeDown()
chord2.toString() # --> "D/A"
```

```javascript
var chord = Chord.parse('Eb/Bb'),
    chord2 = chord.transposeDown();
chord2.toString(); // -> "D/A"
```
