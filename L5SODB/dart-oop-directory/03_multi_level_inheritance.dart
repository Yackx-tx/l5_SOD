// ===================================================================
// 3. MULTI-LEVEL INHERITANCE
// ===================================================================
// Multi-level Inheritance: Chain of inheritance A -> B -> C
// Grandparent (Level 1) -> Parent (Level 2) -> Child (Level 3)

// Grandparent class
class Vehicle {
  String brand;

  Vehicle(this.brand);

  void fuelType() {
    print('This $brand vehicle needs fuel.');
  }
}

// Parent class (inherits from Vehicle)
class Car extends Vehicle {
  String type;

  Car(String brand, this.type) : super(brand);

  void carType() {
    print('$brand is a $type type car.');
  }
}

// Child class (inherits from Car, which inherits from Vehicle)
class ElectricCar extends Car {
  double batteryCapacity;

  ElectricCar(String brand, String type, this.batteryCapacity)
      : super(brand, type);

  void chargeBattery() {
    print('Charging battery... Capacity: $batteryCapacity kWh');
  }

  void displayInfo() {
    print('Brand: $brand, Type: $type, Battery: $batteryCapacity kWh');
  }
}

void main() {
  // Create object of ElectricCar
  ElectricCar tesla = ElectricCar('Tesla', 'Sedan', 100);

  // Access methods from grandparent class (Vehicle)
  tesla.fuelType();

  // Access methods from parent class (Car)
  tesla.carType();

  // Access methods from current class (ElectricCar)
  tesla.chargeBattery();
  tesla.displayInfo();
}
