const assert = require('assert');

const extend = require('legacy-extends');

describe('es5 class', () => {
  describe('es5', () => {
    it('inherits pattern', () => {
      function Animal(name) {
        this._name = name || 'No name';
      }

      Animal.prototype.name = function name() {
        return this._name;
      };

      Animal.prototype.move = function move() {
        return `${this.name()} unknown`;
      };

      function Dog(name) {
        Animal.call(this, name);
      }
      extend(Dog, Animal);

      Dog.prototype.name = function name() {
        return `Dog ${Dog.super_.name.call(this)}`;
      };

      Dog.prototype.move = function move() {
        return `${this.name()} run`;
      };

      function Cat(name) {
        Animal.call(this, name);
      }
      extend(Cat, Animal);

      Cat.prototype.name = function name() {
        return `Cat ${Cat.super_.name.call(this)}`;
      };

      Cat.prototype.move = function move() {
        return `${this.name()} sneak`;
      };

      const animal = new Animal();
      assert.equal(animal.move(), 'No name unknown');

      const dog = new Dog('Rover');
      assert.equal(dog.move(), 'Dog Rover run');

      const cat = new Cat('Whiskers');
      assert.equal(cat.move(), 'Cat Whiskers sneak');
    });

    it('superConstruct', () => {
      function Animal(name) {
        this._name = name || 'No name';
      }

      Animal.prototype.name = function name() {
        return this._name;
      };

      Animal.prototype.move = function move() {
        return `${this.name()} unknown`;
      };

      function Dog(name) {
        return Dog.superConstruct.call(this, name);
      }
      extend(Dog, Animal);

      Dog.prototype.name = function name() {
        return `Dog ${Dog.super_.name.call(this)}`;
      };

      Dog.prototype.move = function move() {
        return `${this.name()} run`;
      };

      function Cat(name) {
        return Cat.superConstruct.call(this, name);
      }
      extend(Cat, Animal);

      Cat.prototype.name = function name() {
        return `Cat ${Cat.super_.name.call(this)}`;
      };

      Cat.prototype.move = function move() {
        return `${this.name()} sneak`;
      };

      const animal = new Animal();
      assert.equal(animal.move(), 'No name unknown');

      const dog = new Dog('Rover');
      assert.equal(dog.move(), 'Dog Rover run');

      const cat = new Cat('Whiskers');
      assert.equal(cat.move(), 'Cat Whiskers sneak');
    });

    it('ensureProperties', () => {
      function Animal() {}

      Animal.prototype.name = function name() {
        return this._name;
      };

      Animal.prototype.move = function move() {
        return `${this.name()} unknown`;
      };

      function Dog(name) {
        return Dog.superConstruct.call(this, name);
      }
      extend(Dog, Animal, { ensureProperties: ['_name'] });

      Dog.prototype.name = function name() {
        return `Dog ${Dog.super_.name.call(this)}`;
      };

      Dog.prototype.move = function move() {
        return `${this.name()} run`;
      };

      function Cat(name) {
        return Cat.superConstruct.call(this, name);
      }
      extend(Cat, Animal, { ensureProperties: ['_name'] });

      Cat.prototype.name = function name() {
        return `Cat ${Cat.super_.name.call(this)}`;
      };

      Cat.prototype.move = function move() {
        return `${this.name()} sneak`;
      };

      const animal = new Animal();
      assert.equal(animal.move(), 'undefined unknown');

      const dog = new Dog('Rover');
      assert.equal(dog.move(), 'Dog Rover run');

      const cat = new Cat('Whiskers');
      assert.equal(cat.move(), 'Cat Whiskers sneak');
    });
  });
});
