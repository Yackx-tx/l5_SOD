// ===================================================================
// 5. MULTIPLE INHERITANCE (Using Mixins in Dart)
// ===================================================================
// Dart doesn't support traditional multiple inheritance, but uses MIXINS
// Mixins allow you to use methods from multiple classes
// Use 'with' keyword to apply mixins

// Mixin 1: Can fly
mixin Flyable {
  void fly() {
    print('I can fly!');
  }
}

// Mixin 2: Can swim
mixin Swimmable {
  void swim() {
    print('I can swim!');
  }
}

// Mixin 3: Can walk
mixin Walkable {
  void walk() {
    print('I can walk!');
  }
}

// Base class
class Animal {
  String name;

  Animal(this.name);

  void eat() {
    print('$name is eating.');
  }
}

// Class using single mixin
class Bird extends Animal with Flyable {
  Bird(String name) : super(name);
}

// Class using multiple mixins (Multiple Inheritance)
class Duck extends Animal with Flyable, Swimmable, Walkable {
  Duck(String name) : super(name);

  void display() {
    print('$name is a duck - it can do everything!');
  }
}

// Class using two mixins
class Penguin extends Animal with Swimmable, Walkable {
  Penguin(String name) : super(name);
}

void main() {
  print('--- Bird ---');
  Bird bird = Bird('Parrot');
  bird.eat();
  bird.fly();

  print('\n--- Duck (Multiple Abilities) ---');
  Duck duck = Duck('Donald');
  duck.display();
  duck.eat(); // From Animal class
  duck.fly(); // From Flyable mixin
  duck.swim(); // From Swimmable mixin
  duck.walk(); // From Walkable mixin

  print('\n--- Penguin ---');
  Penguin penguin = Penguin('Tux');
  penguin.eat();
  penguin.swim();
  penguin.walk();
}
