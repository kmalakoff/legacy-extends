function ensureProperties(names, self, args) {
  if (self[names[0]] !== args[0]) {
    const length = names.length;
    for (let index = 0; index < length; index++) {
      self[names[index]] = args[index];
    }
  }
}

const hasProp = {}.hasOwnProperty;
function extendLegacy(child, parent, options) {
  const initialize = options && options.ensureProperties && options.ensureProperties.length ? ensureProperties.bind(null, options.ensureProperties) : null;

  for (const key in parent) {
    if (hasProp.call(parent, key)) child[key] = parent[key];
  }
  function ctor() {}
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.prototype.constructor = child;

  child.super_ = parent.prototype;
  child.superConstruct = function construct() {
    // biome-ignore lint/style/noArguments: <explanation>
    parent.prototype.constructor.apply(this, arguments);

    // biome-ignore lint/style/noArguments: <explanation>
    !initialize || initialize(this, arguments);
    return this;
  };
}

function extendReflect(child, parent, options) {
  const initialize = options && options.ensureProperties && options.ensureProperties.length ? ensureProperties.bind(null, options.ensureProperties) : null;

  Reflect.setPrototypeOf(child.prototype, parent.prototype);
  Reflect.setPrototypeOf(child, parent);

  child.super_ = parent.prototype;
  child.superConstruct = function construct() {
    // biome-ignore lint/style/noArguments: <explanation>
    const self = Reflect.construct(parent, arguments, child);

    // biome-ignore lint/style/noArguments: <explanation>
    !initialize || initialize(self, arguments);
    return self;
  };
}

export default typeof Reflect === 'undefined' ? extendLegacy : extendReflect;
