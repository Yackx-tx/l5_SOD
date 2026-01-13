// ===================================================================
// 6. POLYMORPHISM
// ===================================================================
// Polymorphism: "Many forms" - Same method name, different behaviors
// 1. Method Overriding: Child class overrides parent class method
// 2. Method Overloading: Same method with different parameters (via named parameters)

// Parent class
class Shape {
  String name;

  Shape(this.name);

  // Method to be overridden
  void draw() {
    print('Drawing a $name');
  }

  void area() {
    print('Calculating area of $name');
  }
}

// Child class 1: Circle
class Circle extends Shape {
  double radius;

  Circle(this.radius) : super('Circle');

  // Override parent method (Polymorphism)
  @override
  void draw() {
    print('Drawing a Circle with radius: $radius');
  }

  @override
  void area() {
    double circleArea = 3.14159 * radius * radius;
    print('Area of Circle: ${circleArea.toStringAsFixed(2)}');
  }
}

// Child class 2: Rectangle
class Rectangle extends Shape {
  double length;
  double width;

  Rectangle(this.length, this.width) : super('Rectangle');

  // Override parent method (Polymorphism)
  @override
  void draw() {
    print('Drawing a Rectangle with length: $length and width: $width');
  }

  @override
  void area() {
    double rectArea = length * width;
    print('Area of Rectangle: $rectArea');
  }
}

// Child class 3: Triangle
class Triangle extends Shape {
  double side1;
  double side2;
  double side3;

  Triangle(this.side1, this.side2, this.side3) : super('Triangle');

  @override
  void draw() {
    print('Drawing a Triangle with sides: $side1, $side2, $side3');
  }

  @override
  void area() {
    double s = (side1 + side2 + side3) / 2;
    double triangleArea = (s * (s - side1) * (s - side2) * (s - side3));
    print('Area of Triangle: ${triangleArea.toStringAsFixed(2)}');
  }
}

void main() {
  // Polymorphism: Same reference can hold different object types
  List<Shape> shapes = [
    Circle(5),
    Rectangle(4, 6),
    Triangle(3, 4, 5),
  ];

  print('--- Demonstrating Polymorphism ---\n');

  // Same method call, different behavior based on object type
  for (Shape shape in shapes) {
    shape.draw();
    shape.area();
    print('---');
  }

  print('\nPolymorphism allows us to use the same interface (draw, area)');
  print('but get different behaviors based on the actual object type!');
}
