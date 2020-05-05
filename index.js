/* eslint-disable */

function legacyArguments(self, args, argNames) {
  if (self[argNames[0]] !== args[0]) {
    var length = argNames.length;
    for (var index = 0; index < length; index++) {
      self[argNames[index]] = args[index];
    }
  }
}

var hasProp = {}.hasOwnProperty;
module.exports = function legacyExtends(child, parent, argNames) {
  if (typeof Reflect === 'undefined') {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    child.__super__ = parent.prototype;
    child.__super__.construct = function construct() {
      child.__super__.constructor.apply(this, arguments);
      !argNames || !argNames.length || legacyArguments(this, arguments, argNames);
      return this;
    };
  } else {
    Reflect.setPrototypeOf(child.prototype, parent.prototype);
    Reflect.setPrototypeOf(child, parent);

    child.__super__ = parent.prototype;
    child.__super__.construct = function construct() {
      var self = Reflect.construct(parent, arguments, child);
      !argNames || !argNames.length || legacyArguments(this, arguments, argNames);
      return self;
    };
  }
};
