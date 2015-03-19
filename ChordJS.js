(function() {
  (function(factory) {
    if (typeof define === 'function' && define.amd) {
      define(function() {
        return factory();
      });
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
      module.exports = factory();
    } else {
      factory();
    }
  })(function() {
    var A, G, chordRegex, keyChange, keyDown, keyUp, normalize, switchModifier, transposeDown, transposeUp;
    chordRegex = /([A-G])(#|b)?([^\/\s]*)(\/([A-G])(#|b)?)?/i;
    A = 'A'.charCodeAt(0);
    G = 'G'.charCodeAt(0);
    keyUp = function(key) {
      return this.keyChange(key, 1);
    };
    keyDown = function(key) {
      return this.keyChange(key, -1);
    };
    keyChange = function(key, delta) {
      var charCode;
      charCode = key.toUpperCase().charCodeAt(0);
      charCode += delta;
      if (charCode > G) {
        charCode = A;
      }
      if (charCode < A) {
        charCode = G;
      }
      return String.fromCharCode(charCode);
    };
    normalize = function(base, modifier) {
      if (modifier === '#' && /^(B|E)$/.test(base)) {
        return [keyUp(base), null];
      }
      if (modifier === 'b' && /^(C|F)$/.test(base)) {
        return [keyDown(base), null];
      }
      return [base, modifier];
    };
    switchModifier = function(base, modifier) {
      var ref;
      ref = normalize(base, modifier), base = ref[0], modifier = ref[1];
      if (modifier) {
        if (modifier === '#') {
          return [keyUp(base), 'b'];
        }
        if (modifier === 'b') {
          return [keyDown(base), '#'];
        }
      }
      return [base, modifier];
    };
    transposeUp = function(base, modifier) {
      var ref;
      ref = normalize(base, modifier), base = ref[0], modifier = ref[1];
      if (modifier === 'b') {
        return [base, null];
      }
      if (modifier === '#') {
        return [keyUp(base), null];
      }
      if (/^(B|E)$/.test(base)) {
        return [keyUp(base), null];
      }
      return [base, '#'];
    };
    transposeDown = function(base, modifier) {
      var ref;
      ref = normalize(base, modifier), base = ref[0], modifier = ref[1];
      if (modifier === 'b') {
        return [keyDown(base), null];
      }
      if (modifier === '#') {
        return [base, null];
      }
      if (/^(C|F)$/.test(base)) {
        return [keyDown(base), null];
      }
      return [base, 'b'];
    };
    return window.Chord = (function() {
      Chord.parse = function(chordString) {
        var parts;
        if (parts = chordRegex.exec(chordString)) {
          return new Chord(parts[1], parts[2], parts[3], parts[5], parts[6]);
        }
        return null;
      };

      function Chord(base1, modifier1, suffix, bassBase, bassModifier) {
        this.base = base1;
        this.modifier = modifier1;
        this.suffix = suffix;
        this.bassBase = bassBase;
        this.bassModifier = bassModifier;
      }

      Chord.prototype.clone = function() {
        return new Chord(this.base, this.modifier, this.suffix, this.bassBase, this.bassModifier);
      };

      Chord.prototype.normalize = function() {
        var chord, ref, ref1;
        chord = this.clone();
        ref = normalize(this.base, this.modifier), chord.base = ref[0], chord.modifier = ref[1];
        if (this.bassBase) {
          ref1 = normalize(this.bassBase, this.bassModifier), chord.bassBase = ref1[0], chord.bassModifier = ref1[1];
        }
        return chord;
      };

      Chord.prototype.switchModifier = function() {
        var chord, ref, ref1;
        chord = this.clone();
        ref = switchModifier(this.base, this.modifier), chord.base = ref[0], chord.modifier = ref[1];
        if (this.bassBase) {
          ref1 = switchModifier(this.bassBase, this.bassModifier), chord.bassBase = ref1[0], chord.bassModifier = ref1[1];
        }
        return chord;
      };

      Chord.prototype.transposeUp = function() {
        var chord, ref, ref1;
        chord = this.clone();
        ref = transposeUp(this.base, this.modifier), chord.base = ref[0], chord.modifier = ref[1];
        if (this.bassBase) {
          ref1 = transposeUp(this.bassBase, this.bassModifier), chord.bassBase = ref1[0], chord.bassModifier = ref1[1];
        }
        return chord;
      };

      Chord.prototype.transposeDown = function() {
        var chord, ref, ref1;
        chord = this.clone();
        ref = transposeDown(this.base, this.modifier), chord.base = ref[0], chord.modifier = ref[1];
        if (this.bassBase) {
          ref1 = transposeDown(this.bassBase, this.bassModifier), chord.bassBase = ref1[0], chord.bassModifier = ref1[1];
        }
        return chord;
      };

      Chord.prototype.toString = function() {
        var chordString;
        chordString = this.base + (this.modifier || '') + this.suffix;
        if (this.bassBase) {
          chordString += '/' + this.bassBase + (this.bassModifier || '');
        }
        return chordString;
      };

      return Chord;

    })();
  });

}).call(this);

//# sourceMappingURL=ChordJS.js.map
