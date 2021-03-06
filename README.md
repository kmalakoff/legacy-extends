## legacy-extends

Helper to extend a class including defining super\_ and superConstruct (optional) on the derived class. Compatible with Node.js inherits and handles es6 classes using Reflect API.

es6

```
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

var animal = new Animal();
assert.equal(animal.move(), 'No name unknown');

var dog = new Dog('Rover');
assert.equal(dog.move(), 'Dog Rover run');
```

es5

```
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

var animal = new Animal();
assert.equal(animal.move(), 'No name unknown');

var dog = new Dog('Rover');
assert.equal(dog.move(), 'Dog Rover run');
```
