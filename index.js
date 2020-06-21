/* eslint-disable */

function ensureProperties(names, self, args) {
  if (self[names[0]] !== args[0]) {
    var length = names.length;
    for (var index = 0; index < length; index++) {
      self[names[index]] = args[index];
    }
  }
}

var hasProp = {}.hasOwnProperty;
function extendLegacy(child, parent, options) {
  var initialize = options && options.ensureProperties && options.ensureProperties.length ? ensureProperties.bind(null, options.ensureProperties) : null;

  for (var key in parent) {
    if (hasProp.call(parent, key)) child[key] = parent[key];
  }
  function ctor() {}
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.prototype.constructor = child;

  child.super_ = parent.prototype;
  child.superConstruct = function construct() {
    parent.prototype.constructor.apply(this, arguments);
    !initialize || initialize(this, arguments);
    return this;
  };
}

function extendReflect(child, parent, options) {
  var initialize = options && options.ensureProperties && options.ensureProperties.length ? ensureProperties.bind(null, options.ensureProperties) : null;

  Reflect.setPrototypeOf(child.prototype, parent.prototype);
  Reflect.setPrototypeOf(child, parent);

  child.super_ = parent.prototype;
  child.superConstruct = function construct() {
    var self = Reflect.construct(parent, arguments, child);
    !initialize || initialize(self, arguments);
    return self;
  };
}

module.exports = typeof Reflect === 'undefined' ? extendLegacy : extendReflect;
