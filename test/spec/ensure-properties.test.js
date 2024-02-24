const assert = require('assert');

const extend = require('legacy-extends');

describe('ensure properties', () => {
  it('extend es5', () => {
    function Animal(name) {
      this._name = name || 'No name';
    }

    Animal.prototype.name = function name() {
      return this._name;
    };

    Animal.prototype.move = function move() {
      return `${this.name()} unknown`;
    };

    function Dog(_name) {
      // biome-ignore lint/style/noArguments: <explanation>
      return Dog.superConstruct.apply(this, arguments);
    }
    extend(Dog, Animal, { ensureProperties: ['arg1', 'arg2'] });

    Dog.prototype.name = function name() {
      return `Dog ${Dog.super_.name.call(this)}`;
    };

    Dog.prototype.move = function move() {
      return `${this.name()} run`;
    };

    const animal = new Animal();
    assert.equal(animal.move(), 'No name unknown');

    const dog = new Dog('Rover', 'something');
    assert.equal(dog.move(), 'Dog Rover run');
    assert.equal(dog.arg1, 'Rover');
    assert.equal(dog.arg2, 'something');
  });
});
