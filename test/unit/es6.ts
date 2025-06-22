import assert from 'assert';

// @ts-ignore
import extend from 'legacy-extends';

describe('es6 class', () => {
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
      // @ts-ignore
      extend(Dog, Animal);

      Dog.prototype.name = function name() {
        // @ts-ignore
        return `Dog ${Dog.super_.name.call(this)}`;
      };

      Dog.prototype.move = function move() {
        return `${this.name()} run`;
      };

      function Cat(name) {
        Animal.call(this, name);
      }
      // @ts-ignore
      extend(Cat, Animal);

      Cat.prototype.name = function name() {
        // @ts-ignore
        return `Cat ${Cat.super_.name.call(this)}`;
      };

      Cat.prototype.move = function move() {
        return `${this.name()} sneak`;
      };

      // @ts-ignore
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
        // @ts-ignore
        return Dog.superConstruct.call(this, name);
      }
      extend(Dog, Animal);

      Dog.prototype.name = function name() {
        // @ts-ignore
        return `Dog ${Dog.super_.name.call(this)}`;
      };

      Dog.prototype.move = function move() {
        return `${this.name()} run`;
      };

      function Cat(name) {
        // @ts-ignore
        return Cat.superConstruct.call(this, name);
      }
      // @ts-ignore
      extend(Cat, Animal);

      Cat.prototype.name = function name() {
        // @ts-ignore
        return `Cat ${Cat.super_.name.call(this)}`;
      };

      Cat.prototype.move = function move() {
        return `${this.name()} sneak`;
      };

      // @ts-ignore
      const animal = new Animal();
      assert.equal(animal.move(), 'No name unknown');

      // @ts-ignore
      const dog = new Dog('Rover');
      assert.equal(dog.move(), 'Dog Rover run');

      // @ts-ignore
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
        // @ts-ignore
        return Dog.superConstruct.call(this, name);
      }
      extend(Dog, Animal, { ensureProperties: ['_name'] });

      Dog.prototype.name = function name() {
        // @ts-ignore
        return `Dog ${Dog.super_.name.call(this)}`;
      };

      Dog.prototype.move = function move() {
        return `${this.name()} run`;
      };

      function Cat(name) {
        // @ts-ignore
        return Cat.superConstruct.call(this, name);
      }
      extend(Cat, Animal, { ensureProperties: ['_name'] });

      Cat.prototype.name = function name() {
        // @ts-ignore
        return `Cat ${Cat.super_.name.call(this)}`;
      };

      Cat.prototype.move = function move() {
        return `${this.name()} sneak`;
      };

      const animal = new Animal();
      assert.equal(animal.move(), 'undefined unknown');

      // @ts-ignore
      const dog = new Dog('Rover');
      assert.equal(dog.move(), 'Dog Rover run');

      // @ts-ignore
      const cat = new Cat('Whiskers');
      assert.equal(cat.move(), 'Cat Whiskers sneak');
    });
  });

  describe('es6', () => {
    it('inherits', () => {
      class Animal {
        constructor(name) {
          // @ts-ignore
          this._name = name || 'No name';
        }

        name() {
          // @ts-ignore
          return this._name;
        }

        move() {
          return `${this.name()} unknown`;
        }
      }

      class Dog {
        constructor(name) {
          // biome-ignore lint/correctness/noConstructorReturn: Legacy
          return Reflect.construct(Animal, [name], Dog);
        }

        name() {
          // @ts-ignore
          return `Dog ${Dog.super_.name.call(this)}`;
        }

        move() {
          return `${this.name()} run`;
        }
      }
      extend(Dog, Animal);

      class Cat {
        constructor(name) {
          // biome-ignore lint/correctness/noConstructorReturn: Legacy
          return Reflect.construct(Animal, [name], Cat);
        }

        name() {
          // @ts-ignore
          return `Cat ${Cat.super_.name.call(this)}`;
        }

        move() {
          return `${this.name()} sneak`;
        }
      }
      extend(Cat, Animal);

      // @ts-ignore
      const animal = new Animal();
      assert.equal(animal.move(), 'No name unknown');

      const dog = new Dog('Rover');
      assert.equal(dog.move(), 'Dog Rover run');

      const cat = new Cat('Whiskers');
      assert.equal(cat.move(), 'Cat Whiskers sneak');
    });

    it('superConstruct', () => {
      class Animal {
        constructor(name) {
          // @ts-ignore
          this._name = name || 'No name';
        }

        name() {
          // @ts-ignore
          return this._name;
        }

        move() {
          return `${this.name()} unknown`;
        }
      }

      class Dog {
        constructor(name) {
          // @ts-ignore
          // biome-ignore lint/correctness/noConstructorReturn: Legacy
          return Dog.superConstruct.call(this, name);
        }

        name() {
          // @ts-ignore
          return `Dog ${Dog.super_.name.call(this)}`;
        }

        move() {
          return `${this.name()} run`;
        }
      }
      extend(Dog, Animal);

      class Cat {
        constructor(name) {
          // @ts-ignore
          // biome-ignore lint/correctness/noConstructorReturn: Legacy
          return Cat.superConstruct.call(this, name);
        }

        name() {
          // @ts-ignore
          return `Cat ${Cat.super_.name.call(this)}`;
        }

        move() {
          return `${this.name()} sneak`;
        }
      }
      extend(Cat, Animal);

      // @ts-ignore
      const animal = new Animal();
      assert.equal(animal.move(), 'No name unknown');

      const dog = new Dog('Rover');
      assert.equal(dog.move(), 'Dog Rover run');

      const cat = new Cat('Whiskers');
      assert.equal(cat.move(), 'Cat Whiskers sneak');
    });

    it('ensureProperties', () => {
      class Animal {
        name() {
          // @ts-ignore
          return this._name;
        }

        move() {
          return `${this.name()} unknown`;
        }
      }

      class Dog {
        constructor(name) {
          // @ts-ignore
          // biome-ignore lint/correctness/noConstructorReturn: Legacy
          return Dog.superConstruct.call(this, name);
        }

        name() {
          // @ts-ignore
          return `Dog ${Dog.super_.name.call(this)}`;
        }

        move() {
          return `${this.name()} run`;
        }
      }
      extend(Dog, Animal, { ensureProperties: ['_name'] });

      class Cat {
        constructor(name) {
          // @ts-ignore
          // biome-ignore lint/correctness/noConstructorReturn: Legacy
          return Cat.superConstruct.call(this, name);
        }

        name() {
          // @ts-ignore
          return `Cat ${Cat.super_.name.call(this)}`;
        }

        move() {
          return `${this.name()} sneak`;
        }
      }
      extend(Cat, Animal, { ensureProperties: ['_name'] });

      const animal = new Animal();
      assert.equal(animal.move(), 'undefined unknown');

      const dog = new Dog('Rover');
      assert.equal(dog.move(), 'Dog Rover run');

      const cat = new Cat('Whiskers');
      assert.equal(cat.move(), 'Cat Whiskers sneak');
    });
  });
});
