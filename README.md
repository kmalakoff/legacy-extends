## legacy-extends

Helper to extend a class including defining **constructor and **super\_\_ on the derived class.

es6

```
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
```

es5

```
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
```
