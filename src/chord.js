class Chord {
  constructor(
    {
      base, modifier, suffix, bassBase, bassModifier,
    },
  ) {
    this.base = base || null;
    this.modifier = modifier || null;
    this.suffix = suffix || null;
    this.bassBase = bassBase || null;
    this.bassModifier = bassModifier || null;
  }

  clone() {
    const {
      base, modifier, suffix, bassBase, bassModifier,
    } = this;

    return new this.constructor(
      {
        base, modifier, suffix, bassBase, bassModifier,
      },
    );
  }

  set(properties) {
    return new this.constructor(
      {
        base: this.base,
        modifier: this.modifier,
        suffix: this.suffix,
        bassBase: this.bassBase,
        bassModifier: this.bassModifier,
        ...properties,
      },
    );
  }
}

export default Chord;
