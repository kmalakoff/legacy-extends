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
module.exports = function legacyExtends(child, parent, options) {
  var initialize = options && options.ensureProperties && options.ensureProperties.length ? ensureProperties.bind(null, options.ensureProperties) : null;

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
      !initialize || initialize(this, arguments);
      return this;
    };
  } else {
    Reflect.setPrototypeOf(child.prototype, parent.prototype);
    Reflect.setPrototypeOf(child, parent);

    child.__super__ = parent.prototype;
    child.__super__.construct = function construct() {
      var self = Reflect.construct(parent, arguments, child);
      !initialize || initialize(self, arguments);
      return self;
    };
  }
};
