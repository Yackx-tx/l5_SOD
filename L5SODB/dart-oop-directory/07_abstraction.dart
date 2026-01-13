// ===================================================================
// 7. ABSTRACTION
// ===================================================================
// Abstraction: Hiding implementation details, showing only functionality
// Use 'abstract' keyword to create abstract classes
// Abstract classes cannot be instantiated (can't create objects directly)
// Abstract methods must be implemented by child classes

// Abstract class - Cannot create objects of this class directly
abstract class DatabaseConnection {
  // Abstract method - Must be implemented by child classes
  void connect();
  void disconnect();
  void query(String sql);

  // Concrete method - Already implemented (optional)
  void printConnectionStatus() {
    print('Database operation in progress...');
  }
}

// Concrete class 1: MySQL Implementation
class MySQLDatabase extends DatabaseConnection {
  String host;

  MySQLDatabase(this.host);

  // Must implement all abstract methods
  @override
  void connect() {
    print('Connecting to MySQL database on $host...');
    print('Connected successfully!');
  }

  @override
  void disconnect() {
    print('Disconnecting from MySQL database...');
  }

  @override
  void query(String sql) {
    print('Executing MySQL query: $sql');
    print('Result received from MySQL');
  }
}

// Concrete class 2: MongoDB Implementation
class MongoDBDatabase extends DatabaseConnection {
  String serverUrl;

  MongoDBDatabase(this.serverUrl);

  @override
  void connect() {
    print('Connecting to MongoDB at $serverUrl...');
    print('MongoDB connected!');
  }

  @override
  void disconnect() {
    print('Closing MongoDB connection...');
  }

  @override
  void query(String sql) {
    print('Executing MongoDB query: $sql');
    print('Documents retrieved from MongoDB');
  }
}

// Concrete class 3: PostgreSQL Implementation
class PostgreSQLDatabase extends DatabaseConnection {
  String port;

  PostgreSQLDatabase(this.port);

  @override
  void connect() {
    print('Connecting to PostgreSQL on port $port...');
    print('PostgreSQL connected!');
  }

  @override
  void disconnect() {
    print('Closing PostgreSQL connection...');
  }

  @override
  void query(String sql) {
    print('Executing PostgreSQL query: $sql');
    print('Data retrieved from PostgreSQL');
  }
}

void main() {
  print('--- Abstraction with Different Database Implementations ---\n');

  // Cannot create object of abstract class
  // DatabaseConnection db = DatabaseConnection(); // ERROR!

  // Create objects of concrete implementations
  DatabaseConnection mysqlDb = MySQLDatabase('localhost');
  DatabaseConnection mongoDb = MongoDBDatabase('mongodb://server:27017');
  DatabaseConnection postgresDb = PostgreSQLDatabase('5432');

  print('--- MySQL Database ---');
  mysqlDb.connect();
  mysqlDb.query('SELECT * FROM users');
  mysqlDb.printConnectionStatus();
  mysqlDb.disconnect();

  print('\n--- MongoDB Database ---');
  mongoDb.connect();
  mongoDb.query('db.users.find({})');
  mongoDb.printConnectionStatus();
  mongoDb.disconnect();

  print('\n--- PostgreSQL Database ---');
  postgresDb.connect();
  postgresDb.query('SELECT * FROM users');
  postgresDb.printConnectionStatus();
  postgresDb.disconnect();

  print('\n--- Benefits of Abstraction ---');
  print('1. Hides complex implementation details');
  print('2. Provides a common interface for different implementations');
  print('3. Makes code more flexible and maintainable');
  print('4. Easy to add new database types without changing existing code');
}
