import expect from 'expect'

expect.extend({
  toMatchChord(base, modifier, suffix, bassBase, bassModifier) {
    expect.assert(
      this.actual.base === base,
      'expected chord base %s to equal %s',
      this.actual.base,
      base
    );

    expect.assert(
      this.actual.modifier === modifier,
      'expected chord modifier %s to equal %s',
      this.actual.modifier,
      modifier
    );

    expect.assert(
      this.actual.suffix === suffix,
      'expected chord suffix %s to equal %s',
      this.actual.suffix,
      suffix
    );

    expect.assert(
      this.actual.bassBase === bassBase,
      'expected chord bass base %s to equal %s',
      this.actual.bassBase,
      bassBase
    );

    expect.assert(
      this.actual.bassModifier === bassModifier,
      'expected chord bass modifier %s to equal %s',
      this.actual.bassModifier,
      bassModifier
    );
  }
})
