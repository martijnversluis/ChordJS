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

  keyUp = (key) -> keyChange(key, 1)

  keyDown = (key) -> keyChange(key, -1)

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

  internalSwitchModifier = (base, modifier) ->
    return [keyUp(base),   'b'] if modifier == '#'
    return [keyDown(base), '#'] if modifier == 'b'

  switchModifier = (base, modifier) ->
    [base, modifier] = normalize(base, modifier)

    return internalSwitchModifier(base, modifier) if modifier
    return [base, modifier]

  useModifier = (base, modifier, newModifier) ->
    if modifier && modifier != newModifier
      return internalSwitchModifier(base, modifier)
    return [base, modifier]

  transpose = (base, modifier, delta) ->
    if delta < 0
      repeatProcessor(base, modifier, transposeDown, Math.abs(delta))
    if delta > 0
      repeatProcessor(base, modifier, transposeUp, delta)
    [base, modifier]

  reoeatProcessor = (base, modifier, processor, amount) ->
    i = 0

    while i < amount
      [base, modifier] = processor(base, modifier)
      i++

    [base, modifier]

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

  processChord = (sourceChord, processor, processorArg) ->
    chord = sourceChord.clone()
    [chord.base, chord.modifier] = processor(sourceChord.base, sourceChord.modifier, processorArg)

    if sourceChord.bassBase
      [chord.bassBase, chord.bassModifier] = processor(
        sourceChord.bassBase, sourceChord.bassModifier, processorArg)

    return chord

  return class window.Chord

    @parse: (chordString) ->
      if parts = chordRegex.exec(chordString)
        return new Chord(parts[1], parts[2], parts[3], parts[5], parts[6])
      return null

    constructor: (@base, @modifier, @suffix, @bassBase, @bassModifier) ->

    clone: -> new Chord(@base, @modifier, @suffix, @bassBase, @bassModifier)

    normalize: -> processChord(this, normalize)

    switchModifier: -> processChord(this, switchModifier)

    useModifier: (newModifier) -> processChord(this, useModifier, newModifier)

    transposeUp: -> processChord(this, transposeUp)

    transposeDown: -> processChord(this, transposeDown)

    traspose: (delta) -> processChord(this, key)

    toString: ->
      chordString = @base + (@modifier || '') + @suffix
      chordString += '/' + @bassBase + (@bassModifier || '') if @bassBase
      return chordString

)
