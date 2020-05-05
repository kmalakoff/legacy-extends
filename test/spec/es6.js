var assert = require('assert');

var extend = require('../..');

describe('es6 class', function () {
  it('extend es5', function () {
    function Animal(name) {
      this.name = name || 'No name';
    }
    Animal.prototype.move = function move() {
      return this.name + ' unknown';
    };

    function Dog(name) {
      return Dog.__constructor__.call(this, name);
    }
    extend(Dog, Animal);
    Dog.prototype.move = function move() {
      return this.name + ' run';
    };

    var animal = new Animal();
    assert.equal(animal.move(), 'No name unknown');

    var dog = new Dog('Rover');
    assert.equal(dog.move(), 'Rover run');
  });

  it('extends es6', function () {
    class Animal {
      constructor(name) {
        this.name = name || 'No name';
      }

      move() {
        return this.name + ' unknown';
      }
    }

    class Dog {
      constructor(name) {
        return Dog.__constructor__.call(this, name);
      }

      move() {
        return this.name + ' run';
      }
    }
    extend(Dog, Animal);

    var animal = new Animal();
    assert.equal(animal.move(), 'No name unknown');

    var dog = new Dog('Rover');
    assert.equal(dog.move(), 'Rover run');
  });
});
