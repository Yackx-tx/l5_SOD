# Dart OOP Concepts - Student Learning Guide

## Overview
This directory contains 7 comprehensive Dart files demonstrating all fundamental Object-Oriented Programming (OOP) concepts with detailed comments and examples suitable for student revision.

## Files Structure

### 1. **01_class_and_object.dart** 📦
**Concept:** Classes and Objects

- Understanding classes as blueprints
- Creating objects (instances)
- Class attributes (properties)
- Class methods (functions)
- Constructors for initialization

**Example:** Car class with properties and methods
**Key Takeaway:** Classes organize data and behavior together

---

### 2. **02_single_inheritance.dart** 🔗
**Concept:** Single Inheritance

- Parent class (super class/base class)
- Child class extending parent class
- Inheriting properties and methods
- Adding new methods to child class
- Syntax: `class Child extends Parent`

**Example:** Animal (parent) → Dog (child)
**Key Takeaway:** Child class inherits all public members of parent class

---

### 3. **03_multi_level_inheritance.dart** 🔗🔗🔗
**Concept:** Multi-Level Inheritance

- Three levels of inheritance hierarchy
- Grandparent → Parent → Child chain
- Each child inherits from its parent
- All ancestors' methods are available

**Example:** Vehicle → Car → ElectricCar
**Key Takeaway:** Creates a hierarchy of related classes with progressive specialization

---

### 4. **04_hierarchical_inheritance.dart** 🌳
**Concept:** Hierarchical Inheritance

- One parent class
- Multiple child classes extending the same parent
- Each child class can have different implementations
- Promotes code reuse across multiple classes

**Example:** Animal (parent) → Dog, Cat, Bird (children)
**Key Takeaway:** Multiple classes can share common functionality from one parent

---

### 5. **05_multiple_inheritance.dart** 🎭
**Concept:** Multiple Inheritance (Using Mixins)

- Dart uses mixins instead of traditional multiple inheritance
- Syntax: `class Child extends Parent with Mixin1, Mixin2`
- Mixins provide methods and properties from multiple sources
- Avoids the "diamond problem" of traditional multiple inheritance

**Example:** Duck combines Flyable, Swimmable, and Walkable mixins
**Key Takeaway:** Mixins allow a class to reuse methods from multiple sources cleanly

---

### 6. **06_polymorphism.dart** 🎪
**Concept:** Polymorphism (Many Forms)

- Same method name, different implementations
- Method overriding in child classes
- Using parent class reference with child class objects
- Runtime method dispatch

**Example:** Shape (parent) → Circle, Rectangle, Triangle (children) - each with different draw() and area()
**Key Takeaway:** Polymorphism allows writing flexible, reusable code

---

### 7. **07_abstraction.dart** 🎭
**Concept:** Abstraction

- Abstract classes (cannot be instantiated directly)
- Abstract methods (must be implemented by child classes)
- Hiding implementation details
- Defining contracts that child classes must follow
- Syntax: `abstract class MyClass`

**Example:** DatabaseConnection (abstract) → MySQLDatabase, MongoDBDatabase, PostgreSQLDatabase (concrete)
**Key Takeaway:** Abstraction helps define common interfaces while allowing different implementations

---

## How to Use This Guide

### For Students:
1. **Read the comments** in each file carefully
2. **Understand the structure** of each OOP concept
3. **Run each file** individually to see the output
4. **Modify the examples** to practice and experiment
5. **Try combining concepts** - e.g., use inheritance + polymorphism + abstraction

### Running Individual Files:
```bash
dart 01_class_and_object.dart
dart 02_single_inheritance.dart
dart 03_multi_level_inheritance.dart
# ... and so on
```

### Running the Main File:
```bash
dart main.dart
```

## Key OOP Principles Summary

| Concept | Purpose | File |
|---------|---------|------|
| **Encapsulation** | Bundle data and methods together | 01_class_and_object.dart |
| **Single Inheritance** | Extend one parent class | 02_single_inheritance.dart |
| **Multi-level Inheritance** | Chain of inheritance | 03_multi_level_inheritance.dart |
| **Hierarchical Inheritance** | Multiple children from one parent | 04_hierarchical_inheritance.dart |
| **Multiple Inheritance** | Combine multiple sources (mixins) | 05_multiple_inheritance.dart |
| **Polymorphism** | Same interface, different behaviors | 06_polymorphism.dart |
| **Abstraction** | Hide complexity, define contracts | 07_abstraction.dart |

## Important Dart-Specific Notes

1. **Constructors**: Use `this.property` shorthand for parameter assignment
2. **Super keyword**: Access parent class using `super()`
3. **Override annotation**: Mark overridden methods with `@override`
4. **Abstract classes**: Use `abstract` keyword, cannot instantiate directly
5. **Mixins**: Use `with` keyword to apply multiple mixins
6. **Access modifiers**: Dart uses leading underscore for private members: `_privateVariable`

## Practice Exercises for Students

1. **Extend Single Inheritance**
   - Create a Vehicle class and extend it with Car and Motorcycle

2. **Add Methods**
   - Add new methods to existing child classes

3. **Create New Hierarchy**
   - Design your own class hierarchy (e.g., School → Student, Teacher)

4. **Mix and Match**
   - Create a class that uses both inheritance and mixins

5. **Override Methods**
   - Practice overriding different methods and observe polymorphic behavior

6. **Create Abstract Classes**
   - Design your own abstract class with methods for child classes to implement

## Revision Checklist

- [ ] Understand what a class is and how to create objects
- [ ] Know the difference between inheritance types
- [ ] Understand how method overriding works (polymorphism)
- [ ] Know when to use abstract classes
- [ ] Understand mixins and multiple inheritance in Dart
- [ ] Can create your own OOP code combining these concepts
- [ ] Can identify OOP concepts in existing code

## Additional Resources

- Dart Official Documentation: https://dart.dev/guides/language/language-tour
- Dart OOP Guide: https://dart.dev/guides/language/language-tour#classes
- Common OOP Patterns in Dart

---

**Happy Learning! Practice these concepts regularly to master OOP in Dart!** 🚀
