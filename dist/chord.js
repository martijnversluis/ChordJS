(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return factory();
    });
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = factory();
  } else {
    factory();
  }
})(function () {

  var chordRegex = /([A-G])(#|b)?([^\/\s]*)(\/([A-G])(#|b)?)?/i;
  var A = 'A'.charCodeAt(0);
  var G = 'G'.charCodeAt(0);

  var keyUp = function keyUp(key) {
    return keyChange(key, 1);
  };

  var keyDown = function keyDown(key) {
    return keyChange(key, -1);
  };

  var keyChange = function keyChange(key, delta) {
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

  var _normalize7 = function _normalize7(base, modifier) {
    if (modifier === '#' && /^(B|E)$/.test(base)) {
      return [keyUp(base), null];
    }
    if (modifier === 'b' && /^(C|F)$/.test(base)) {
      return [keyDown(base), null];
    }
    return [base, modifier];
  };

  var internalSwitchModifier = function internalSwitchModifier(base, modifier) {
    if (modifier === '#') {
      return [keyUp(base), 'b'];
    }
    if (modifier === 'b') {
      return [keyDown(base), '#'];
    }
  };

  var _switchModifier = function _switchModifier(base, modifier) {
    var _normalize = _normalize7(base, modifier);

    var _normalize2 = _slicedToArray(_normalize, 2);

    base = _normalize2[0];
    modifier = _normalize2[1];


    if (modifier) {
      return internalSwitchModifier(base, modifier);
    }

    return [base, modifier];
  };

  var _useModifier = function _useModifier(base, modifier, newModifier) {
    if (modifier && modifier != newModifier) {
      return internalSwitchModifier(base, modifier);
    }

    return [base, modifier];
  };

  var _transpose = function _transpose(base, modifier, delta) {
    var newBase = base;
    var newModifier = modifier;


    if (delta < 0) {
      var _repeatProcessor = repeatProcessor(base, modifier, _transposeDown, Math.abs(delta));

      var _repeatProcessor2 = _slicedToArray(_repeatProcessor, 2);

      newBase = _repeatProcessor2[0];
      newModifier = _repeatProcessor2[1];
    } else if (delta > 0) {
      var _repeatProcessor3 = repeatProcessor(base, modifier, _transposeUp, delta);

      var _repeatProcessor4 = _slicedToArray(_repeatProcessor3, 2);

      newBase = _repeatProcessor4[0];
      newModifier = _repeatProcessor4[1];
    }

    return _useModifier(newBase, newModifier, modifier);
  };

  var repeatProcessor = function repeatProcessor(base, modifier, processor, amount) {
    for (var i = 0; i < amount; i++) {
      var _processor = processor(base, modifier);

      var _processor2 = _slicedToArray(_processor, 2);

      base = _processor2[0];
      modifier = _processor2[1];
    }

    return [base, modifier];
  };

  var _transposeUp = function _transposeUp(base, modifier) {
    var _normalize3 = _normalize7(base, modifier);

    var _normalize4 = _slicedToArray(_normalize3, 2);

    base = _normalize4[0];
    modifier = _normalize4[1];


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

  var _transposeDown = function _transposeDown(base, modifier) {
    var _normalize5 = _normalize7(base, modifier);

    var _normalize6 = _slicedToArray(_normalize5, 2);

    base = _normalize6[0];
    modifier = _normalize6[1];


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

  var processChord = function processChord(sourceChord, processor, processorArg) {
    var chord = sourceChord.clone();

    var _processor3 = processor(sourceChord.base, sourceChord.modifier, processorArg);

    var _processor4 = _slicedToArray(_processor3, 2);

    chord.base = _processor4[0];
    chord.modifier = _processor4[1];


    if (sourceChord.bassBase) {
      var _processor5 = processor(sourceChord.bassBase, sourceChord.bassModifier, processorArg);

      var _processor6 = _slicedToArray(_processor5, 2);

      chord.bassBase = _processor6[0];
      chord.bassModifier = _processor6[1];
    }

    return chord;
  };

  return function () {
    _createClass(Chord, null, [{
      key: 'parse',
      value: function parse(chordString) {
        var parts = null;

        if (parts = chordRegex.exec(chordString)) {
          return new Chord(parts[1], parts[2], parts[3], parts[5], parts[6]);
        }

        return null;
      }
    }]);

    function Chord(base, modifier, suffix, bassBase, bassModifier) {
      _classCallCheck(this, Chord);

      this.base = base || null;
      this.modifier = modifier || null;
      this.suffix = suffix || null;
      this.bassBase = bassBase || null;
      this.bassModifier = bassModifier || null;
    }

    _createClass(Chord, [{
      key: 'clone',
      value: function clone() {
        return new Chord(this.base, this.modifier, this.suffix, this.bassBase, this.bassModifier);
      }
    }, {
      key: 'normalize',
      value: function normalize() {
        return processChord(this, _normalize7);
      }
    }, {
      key: 'switchModifier',
      value: function switchModifier() {
        return processChord(this, _switchModifier);
      }
    }, {
      key: 'useModifier',
      value: function useModifier(newModifier) {
        return processChord(this, _useModifier, newModifier);
      }
    }, {
      key: 'transposeUp',
      value: function transposeUp() {
        return processChord(this, _transposeUp);
      }
    }, {
      key: 'transposeDown',
      value: function transposeDown() {
        return processChord(this, _transposeDown);
      }
    }, {
      key: 'transpose',
      value: function transpose(delta) {
        return processChord(this, _transpose, delta);
      }
    }, {
      key: 'toString',
      value: function toString() {
        var chordString = this.base + (this.modifier || '') + (this.suffix || '');

        if (this.bassBase) {
          chordString += '/' + this.bassBase + (this.bassModifier || '');
        }

        return chordString;
      }
    }]);

    return Chord;
  }();
});

},{}]},{},[1]);
