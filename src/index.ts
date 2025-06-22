function ensureProperties(names: string[], self: object, args: unknown[]) {
  if (self[names[0]] !== args[0]) {
    const length = names.length;
    for (let index = 0; index < length; index++) {
      self[names[index]] = args[index];
    }
  }
}

export type Klass = new (...args: unknown[]) => unknown;
export interface KlassHelper {
  super_: typeof Function.prototype;
  superConstruct: () => Klass;
}
export interface Options {
  ensureProperties?: unknown[];
}

const hasProp = {}.hasOwnProperty;
function extendLegacy(child_: unknown, parent_: unknown, options?: Options) {
  const child = child_ as Klass;
  const parent = parent_ as Klass;
  const initialize = options && options.ensureProperties && options.ensureProperties.length ? ensureProperties.bind(null, options.ensureProperties) : null;

  for (const key in parent) {
    if (hasProp.call(parent, key)) child[key] = parent[key];
  }
  function ctor() {}
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.prototype.constructor = child;

  const khild = child as unknown as KlassHelper;
  khild.super_ = parent.prototype;
  khild.superConstruct = function construct() {
    // biome-ignore lint/complexity/noArguments: Apply arguments
    parent.prototype.constructor.apply(this, arguments);

    // biome-ignore lint/complexity/noArguments: Apply arguments
    !initialize || initialize(this, arguments);
    return this;
  };
}

function extendReflect(child_: unknown, parent_: unknown, options?: Options) {
  const child = child_ as Klass;
  const parent = parent_ as Klass;
  const initialize = options && options.ensureProperties && options.ensureProperties.length ? ensureProperties.bind(null, options.ensureProperties) : null;

  Reflect.setPrototypeOf(child.prototype, parent.prototype);
  Reflect.setPrototypeOf(child, parent);

  const khild = child as unknown as KlassHelper;
  khild.super_ = parent.prototype;
  khild.superConstruct = function construct() {
    // biome-ignore lint/complexity/noArguments: Apply arguments
    const self = Reflect.construct(parent, arguments, child);

    // biome-ignore lint/complexity/noArguments: Apply arguments
    !initialize || initialize(self, arguments);
    return self;
  };
}

export default typeof Reflect === 'undefined' ? extendLegacy : extendReflect;
