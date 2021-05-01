import Chord from '../src/chord';

function toBeClassInstanceWithProperties(received, klass, properties) {
  const propertyNames = Object.keys(properties);
  const pass = (received instanceof klass) && propertyNames.every((name) => received[name] === properties[name]);
  const stringifiedProperties = propertyNames.map((name) => `${name}=${properties[name]}`);

  if (pass) {
    return {
      message: () => `expected ${received} not to be a ${klass.name}(${stringifiedProperties})`,
      pass: true,
    };
  }

  return {
    message: () => {
      const errorBase = `expected ${received} to be a ${klass.name}(${stringifiedProperties})`;
      const errors = [];
      const type = typeof received;

      if (type !== 'object') {
        errors.push(`it was a ${type} with value ${received}`);
      } else if (!(received instanceof klass)) {
        errors.push(`it was a instance of ${received.constructor.name}`);
      } else {
        propertyNames.forEach((name) => {
          const actualProperty = received[name];
          const expectedProperty = properties[name];
          const actualType = typeof actualProperty;
          const expectedType = typeof expectedProperty;

          if (actualType !== expectedType) {
            errors.push(`expected ${name} to be a ${expectedType} but it was a ${actualType}`);
          } else if (actualProperty !== expectedProperty) {
            errors.push(`its ${name} were: "${actualProperty}" vs "${expectedProperty}"`);
          }
        });
      }

      return `${errorBase}, but ${errors.join(' and ')}`;
    },
    pass: false,
  };
}

function toBeChord(received, base, modifier, suffix, bassBase, bassModifier) {
  return toBeClassInstanceWithProperties(received, Chord, {
    base, modifier, suffix, bassBase, bassModifier,
  });
}

expect.extend({
  toBeChord,
});
