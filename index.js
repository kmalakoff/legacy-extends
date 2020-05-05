/* eslint-disable */

var hasProp = {}.hasOwnProperty;
function extend(child, parent) {
  for (var key in parent) {
    if (hasProp.call(parent, key)) child[key] = parent[key];
  }
  function ctor() {
    this.constructor = child;
  }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;
  return child;
}

function legacyArguments(__this, args) {
  if (__this[argNames[0]] !== args[0]) {
    var length = argNames.length;
    for (var index = 0; index < length; index++) {
      __this[argNames[index]] = args[index];
    }
  }
}

module.exports = function legacyExtends(child, parent, argNames) {
  if (typeof Reflect === 'undefined') {
    child.__constructor__ = function ctor() {
      child.__super__.constructor.apply(this, arguments);
      if (argNames && argNames.length) legacyArguments(this, arguments);
      return this;
    };
    extend(child, parent);
  } else {
    child.__constructor__ = function ctor() {
      var obj = Reflect.construct(parent, arguments, child);
      if (argNames && argNames.length) legacyArguments(this, arguments);
      return obj;
    };
    Reflect.setPrototypeOf(child.prototype, parent.prototype);
    Reflect.setPrototypeOf(child, parent);
  }
};
