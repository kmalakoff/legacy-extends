import assert from 'assert';

// @ts-ignore
import extend from 'legacy-extends';

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
      // @ts-ignore
      // biome-ignore lint/style/noArguments: <explanation>
      return Dog.superConstruct.apply(this, arguments);
    }
    extend(Dog, Animal, { ensureProperties: ['arg1', 'arg2'] });

    Dog.prototype.name = function name() {
      // @ts-ignore
      return `Dog ${Dog.super_.name.call(this)}`;
    };

    Dog.prototype.move = function move() {
      return `${this.name()} run`;
    };

    // @ts-ignore
    const animal = new Animal();
    assert.equal(animal.move(), 'No name unknown');

    // @ts-ignore
    const dog = new Dog('Rover', 'something');
    assert.equal(dog.move(), 'Dog Rover run');
    assert.equal(dog.arg1, 'Rover');
    assert.equal(dog.arg2, 'something');
  });
});
