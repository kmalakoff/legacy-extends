var assert = require('assert');

var extend = require('../..');

describe('es6 class', function () {
  it('extend es5', function () {
    function Animal(name) {
      this._name = name || 'No name';
    }
    Animal.prototype.name = function name() {
      return this._name;
    };
    Animal.prototype.move = function move() {
      return this.name() + ' unknown';
    };

    function Dog(name) {
      return Dog.__super__.construct.call(this, name);
    }
    extend(Dog, Animal);
    Dog.prototype.name = function name() {
      return 'Dog ' + Dog.__super__.name.call(this);
    };
    Dog.prototype.move = function move() {
      return this.name() + ' run';
    };

    var animal = new Animal();
    assert.equal(animal.move(), 'No name unknown');

    var dog = new Dog('Rover');
    assert.equal(dog.move(), 'Dog Rover run');
  });

  it('extends es6', function () {
    class Animal {
      constructor(name) {
        this._name = name || 'No name';
      }

      name() {
        return this._name;
      }

      move() {
        return this.name() + ' unknown';
      }
    }

    class Dog {
      constructor(name) {
        return Dog.__super__.construct.call(this, name);
      }

      name() {
        return 'Dog ' + Dog.__super__.name.call(this);
      }

      move() {
        return this.name() + ' run';
      }
    }
    extend(Dog, Animal);

    var animal = new Animal();
    assert.equal(animal.move(), 'No name unknown');

    var dog = new Dog('Rover');
    assert.equal(dog.move(), 'Dog Rover run');
  });
});
