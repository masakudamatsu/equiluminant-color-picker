// Simulate the user's interaction with the range input slider
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value',
).set; // A workaround for React overriding the Dom node's setter. See https://github.com/cypress-io/cypress/issues/1570#issuecomment-450966053

export default nativeInputValueSetter;
