expectChord = (chord, base, modifier, suffix, bassBase, bassModifier) ->
  expect(chord.base).toEqual base
  expect(chord.modifier).toEqual modifier
  expect(chord.suffix).toEqual suffix
  expect(chord.bassBase).toEqual bassBase
  expect(chord.bassModifier).toEqual bassModifier

describe 'Chord', ->
  beforeAll ->
    @base = 'E'
    @modifier = 'b'
    @suffix = 'sus4'
    @bassBase = 'G'
    @bassModifier = '#'

  describe 'constructor', ->
    it 'should set the right parameters', ->
      chord = new Chord(@base, @modifier, @suffix, @bassBase, @bassModifier)
      expectChord(@base, @modifier, @suffix, @bassBase, @bassModifier)
      
  describe 'parse', ->
    context 'chord without bass', ->
      context 'simple chord', ->
        chord = Chord.parse 'E'
        expectChord('E', null, null, null, null)
        
      context 'chord with suffix', ->
        chord = Chord.parse 'Esus4'
        expectChord('E', null, 'sus4', null, null)
        
      context 'chord with modifier', ->
        chord = Chord.parse 'F#'
        expectChord('F', '#', null, null, null)
        
      context 'chord with modifier and suffix', ->
        chord = Chord.parse 'F#sus4'
        expectChord('F', '#', 'sus4', null, null)
        
      context 'chord with confusing suffix', ->
        chord = Chord.parse 'Fmaj9#11'
        expectChord('F', null, 'maj9#11', null, null)
        
      context 'chord with modifier and confusing suffix', ->
        chord = Chord.parse 'F#maj9b11'
        expectChord('F', '#', 'maj9b11', null, null)
