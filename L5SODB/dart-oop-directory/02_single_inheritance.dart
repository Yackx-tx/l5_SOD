// ===================================================================
// 2. SINGLE INHERITANCE
// ===================================================================
// Single Inheritance: One child class extends one parent class
// Child class inherits all properties and methods of parent class

// Parent class (Base class / Super class)
class Animal {
  String name;
  int age;

  Animal(this.name, this.age);

  // Method in parent class
  void eat() {
    print('$name is eating.');
  }

  void sleep() {
    print('$name is sleeping.');
  }
}

// Child class (Derived class / Sub class) - inherits from Animal
class Dog extends Animal {
  String breed;

  // Constructor of child class
  Dog(String name, int age, this.breed) : super(name, age);

  // Method specific to Dog
  void bark() {
    print('$name (Breed: $breed) is barking: Woof! Woof!');
  }

  // Override parent method (we'll cover this in Polymorphism)
  void display() {
    print('Dog Name: $name, Age: $age, Breed: $breed');
  }
}

void main() {
  // Create object of child class Dog
  Dog dog = Dog('Buddy', 5, 'Golden Retriever');

  // Access inherited methods from parent class
  dog.eat();
  dog.sleep();

  // Access methods specific to Dog
  dog.bark();
  dog.display();
}
