// ===================================================================
// 1. CLASSES AND OBJECTS
// ===================================================================
// A class is a blueprint for creating objects
// An object is an instance of a class

// Define a class called 'Car'
class Car {
  // Attributes (Properties) - Data members
  String brand;
  String model;
  int year;
  double price;

  // Constructor - Special method used to initialize objects
  Car(this.brand, this.model, this.year, this.price);

  // Method - Function defined inside a class
  void displayInfo() {
    print('Brand: $brand, Model: $model, Year: $year, Price: \$$price');
  }

  // Another method
  void startEngine() {
    print('$brand $model engine started!');
  }
}

// Main execution
void main() {
  // Create objects (instances) of the Car class
  Car car1 = Car('Toyota', 'Camry', 2022, 25000);
  Car car2 = Car('Honda', 'Civic', 2023, 24000);

  // Access and print object information
  print('--- Car 1 ---');
  car1.displayInfo();
  car1.startEngine();

  print('\n--- Car 2 ---');
  car2.displayInfo();
  car2.startEngine();

  // Accessing individual properties
  print('\nCar 1 brand: ${car1.brand}');
  print('Car 2 model: ${car2.model}');
}
