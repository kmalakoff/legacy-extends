var assert = require('assert');

var extend = require('../..');

describe('es6 class', function () {
  describe('es5', function () {
    it('inherits pattern', function () {
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
        Animal.call(this, name);
      }
      extend(Dog, Animal);

      Dog.prototype.name = function name() {
        return 'Dog ' + Dog.super_.name.call(this);
      };

      Dog.prototype.move = function move() {
        return this.name() + ' run';
      };

      function Cat(name) {
        Animal.call(this, name);
      }
      extend(Cat, Animal);

      Cat.prototype.name = function name() {
        return 'Cat ' + Cat.super_.name.call(this);
      };

      Cat.prototype.move = function move() {
        return this.name() + ' sneak';
      };

      var animal = new Animal();
      assert.equal(animal.move(), 'No name unknown');

      var dog = new Dog('Rover');
      assert.equal(dog.move(), 'Dog Rover run');

      var cat = new Cat('Whiskers');
      assert.equal(cat.move(), 'Cat Whiskers sneak');
    });

    it('superConstruct', function () {
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
        return Dog.superConstruct.call(this, name);
      }
      extend(Dog, Animal);

      Dog.prototype.name = function name() {
        return 'Dog ' + Dog.super_.name.call(this);
      };

      Dog.prototype.move = function move() {
        return this.name() + ' run';
      };

      function Cat(name) {
        return Cat.superConstruct.call(this, name);
      }
      extend(Cat, Animal);

      Cat.prototype.name = function name() {
        return 'Cat ' + Cat.super_.name.call(this);
      };

      Cat.prototype.move = function move() {
        return this.name() + ' sneak';
      };

      var animal = new Animal();
      assert.equal(animal.move(), 'No name unknown');

      var dog = new Dog('Rover');
      assert.equal(dog.move(), 'Dog Rover run');

      var cat = new Cat('Whiskers');
      assert.equal(cat.move(), 'Cat Whiskers sneak');
    });

    it('ensureProperties', function () {
      function Animal() {}

      Animal.prototype.name = function name() {
        return this._name;
      };

      Animal.prototype.move = function move() {
        return this.name() + ' unknown';
      };

      function Dog(name) {
        return Dog.superConstruct.call(this, name);
      }
      extend(Dog, Animal, { ensureProperties: ['_name'] });

      Dog.prototype.name = function name() {
        return 'Dog ' + Dog.super_.name.call(this);
      };

      Dog.prototype.move = function move() {
        return this.name() + ' run';
      };

      function Cat(name) {
        return Cat.superConstruct.call(this, name);
      }
      extend(Cat, Animal, { ensureProperties: ['_name'] });

      Cat.prototype.name = function name() {
        return 'Cat ' + Cat.super_.name.call(this);
      };

      Cat.prototype.move = function move() {
        return this.name() + ' sneak';
      };

      var animal = new Animal();
      assert.equal(animal.move(), 'undefined unknown');

      var dog = new Dog('Rover');
      assert.equal(dog.move(), 'Dog Rover run');

      var cat = new Cat('Whiskers');
      assert.equal(cat.move(), 'Cat Whiskers sneak');
    });
  });

  describe('es6', function () {
    it('inherits', function () {
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
          return Reflect.construct(Animal, [name], Dog);
        }

        name() {
          return 'Dog ' + Dog.super_.name.call(this);
        }

        move() {
          return this.name() + ' run';
        }
      }
      extend(Dog, Animal);

      class Cat {
        constructor(name) {
          return Reflect.construct(Animal, [name], Cat);
        }

        name() {
          return 'Cat ' + Cat.super_.name.call(this);
        }

        move() {
          return this.name() + ' sneak';
        }
      }
      extend(Cat, Animal);

      var animal = new Animal();
      assert.equal(animal.move(), 'No name unknown');

      var dog = new Dog('Rover');
      assert.equal(dog.move(), 'Dog Rover run');

      var cat = new Cat('Whiskers');
      assert.equal(cat.move(), 'Cat Whiskers sneak');
    });

    it('superConstruct', function () {
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
          return Dog.superConstruct.call(this, name);
        }

        name() {
          return 'Dog ' + Dog.super_.name.call(this);
        }

        move() {
          return this.name() + ' run';
        }
      }
      extend(Dog, Animal);

      class Cat {
        constructor(name) {
          return Cat.superConstruct.call(this, name);
        }

        name() {
          return 'Cat ' + Cat.super_.name.call(this);
        }

        move() {
          return this.name() + ' sneak';
        }
      }
      extend(Cat, Animal);

      var animal = new Animal();
      assert.equal(animal.move(), 'No name unknown');

      var dog = new Dog('Rover');
      assert.equal(dog.move(), 'Dog Rover run');

      var cat = new Cat('Whiskers');
      assert.equal(cat.move(), 'Cat Whiskers sneak');
    });

    it('ensureProperties', function () {
      class Animal {
        name() {
          return this._name;
        }

        move() {
          return this.name() + ' unknown';
        }
      }

      class Dog {
        constructor(name) {
          return Dog.superConstruct.call(this, name);
        }

        name() {
          return 'Dog ' + Dog.super_.name.call(this);
        }

        move() {
          return this.name() + ' run';
        }
      }
      extend(Dog, Animal, { ensureProperties: ['_name'] });

      class Cat {
        constructor(name) {
          return Cat.superConstruct.call(this, name);
        }

        name() {
          return 'Cat ' + Cat.super_.name.call(this);
        }

        move() {
          return this.name() + ' sneak';
        }
      }
      extend(Cat, Animal, { ensureProperties: ['_name'] });

      var animal = new Animal();
      assert.equal(animal.move(), 'undefined unknown');

      var dog = new Dog('Rover');
      assert.equal(dog.move(), 'Dog Rover run');

      var cat = new Cat('Whiskers');
      assert.equal(cat.move(), 'Cat Whiskers sneak');
    });
  });
});
