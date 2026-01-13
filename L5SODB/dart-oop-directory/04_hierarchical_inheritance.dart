// ===================================================================
// 4. HIERARCHICAL INHERITANCE
// ===================================================================
// Hierarchical Inheritance: One parent class, multiple child classes
// Parent (base) -> Child 1, Child 2, Child 3, etc.

// Parent class
class Animal {
  String name;
  int age;

  Animal(this.name, this.age);

  void eat() {
    print('$name is eating.');
  }

  void sleep() {
    print('$name is sleeping.');
  }
}

// Child class 1: Dog extends Animal
class Dog extends Animal {
  String breed;

  Dog(String name, int age, this.breed) : super(name, age);

  void bark() {
    print('$name says: Woof! Woof!');
  }
}

// Child class 2: Cat extends Animal
class Cat extends Animal {
  String color;

  Cat(String name, int age, this.color) : super(name, age);

  void meow() {
    print('$name says: Meow! Meow!');
  }
}

// Child class 3: Bird extends Animal
class Bird extends Animal {
  double wingSpan;

  Bird(String name, int age, this.wingSpan) : super(name, age);

  void fly() {
    print('$name is flying with wing span: $wingSpan meters');
  }
}

void main() {
  // Create objects of different child classes
  Dog dog = Dog('Buddy', 5, 'Golden Retriever');
  Cat cat = Cat('Whiskers', 3, 'Orange');
  Bird bird = Bird('Tweety', 2, 0.5);

  print('--- Dog ---');
  dog.eat(); // Inherited method
  dog.bark(); // Specific method

  print('\n--- Cat ---');
  cat.sleep(); // Inherited method
  cat.meow(); // Specific method

  print('\n--- Bird ---');
  bird.eat(); // Inherited method
  bird.fly(); // Specific method
}
