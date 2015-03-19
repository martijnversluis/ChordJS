((factory) ->
  if typeof define == 'function' && define.amd
    # AMD. Register as an anonymous module.
    define () -> factory()
  else if typeof module == 'object' && typeof module.exports == 'object'
    # Node-like environment
    module.exports = factory()
  else
    # Browser globals
    factory()
  return
)(->

  chordRegex = /([A-G])(#|b)?([^\/\s]*)(\/([A-G])(#|b)?)?/i
  A = 'A'.charCodeAt(0)
  G = 'G'.charCodeAt(0)

  keyUp = (key) -> @keyChange(key, 1)

  keyDown = (key) -> @keyChange(key, -1)

  keyChange = (key, delta) ->
    charCode = key.toUpperCase().charCodeAt(0)
    charCode += delta
    charCode = A if charCode > G
    charCode = G if charCode < A
    String.fromCharCode(charCode)
      
  normalize = (base, modifier) ->
    if modifier == '#' and /^(B|E)$/.test(base)
      return [keyUp(base), null]

    if modifier == 'b' and /^(C|F)$/.test(base)
      return [keyDown(base), null]

    return [base, modifier]

  switchModifier = (base, modifier) ->
    [base, modifier] = normalize(base, modifier)

    if modifier
      return [keyUp(base),   'b'] if modifier == '#'
      return [keyDown(base), '#'] if modifier == 'b'
    return [base, modifier]

  transposeUp = (base, modifier) ->
    [base, modifier] = normalize(base, modifier)

    if modifier == 'b'
      return [base, null]
    if modifier == '#'
      return [keyUp(base), null]
    if /^(B|E)$/.test(base)
      return [keyUp(base), null]
    return [base, '#']

  transposeDown = (base, modifier) ->
    [base, modifier] = normalize(base, modifier)

    if modifier == 'b'
      return [keyDown(base), null]
    if modifier == '#'
      return [base, null]
    if /^(C|F)$/.test(base)
      return [keyDown(base), null]
    return [base, 'b']

  return class window.Chord

    @parse: (chordString) ->
      if parts = chordRegex.exec(chordString)
        return new Chord(parts[1], parts[2], parts[3], parts[5], parts[6])
      return null

    constructor: (@base, @modifier, @suffix, @bassBase, @bassModifier) ->

    clone: -> new Chord(@base, @modifier, @suffix, @bassBase, @bassModifier)

    normalize: ->
      chord = @clone()
      [chord.base, chord.modifier] = normalize(@base, @modifier)

      if @bassBase
        [chord.bassBase, chord.bassModifier] = normalize(@bassBase, @bassModifier)

      return chord

    switchModifier: ->
      chord = @clone()
      [chord.base, chord.modifier] = switchModifier(@base, @modifier)

      if @bassBase
        [chord.bassBase, chord.bassModifier] = switchModifier(@bassBase, @bassModifier)

      return chord

    transposeUp: ->
      chord = @clone()
      [chord.base, chord.modifier] = transposeUp(@base, @modifier)

      if @bassBase
        [chord.bassBase, chord.bassModifier] = transposeUp(@bassBase, @bassModifier)

      return chord

    transposeDown: ->
      chord = @clone()
      [chord.base, chord.modifier] = transposeDown(@base, @modifier)

      if @bassBase
        [chord.bassBase, chord.bassModifier] = transposeDown(@bassBase, @bassModifier)

      return chord

    toString: ->
      chordString = @base + (@modifier || '') + @suffix
      chordString += '/' + @bassBase + (@bassModifier || '') if @bassBase
      return chordString

)
