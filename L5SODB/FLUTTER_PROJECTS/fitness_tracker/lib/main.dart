import 'package:flutter/material.dart';
import 'screens/home_screen.dart';
import 'screens/workouts_screen.dart';
import 'screens/progress_screen.dart';

void main() {
  runApp(const FitnessTrackerApp());
}

class FitnessTrackerApp extends StatelessWidget {
  const FitnessTrackerApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fitness Tracker',
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF6366F1),
          brightness: Brightness.light,
        ),
      ),
      home: const MainApp(),
    );
  }
}

class MainApp extends StatefulWidget {
  const MainApp({Key? key}) : super(key: key);

  @override
  State<MainApp> createState() => _MainAppState();
}

class _MainAppState extends State<MainApp> {
  int _selectedIndex = 0;

  // WHAT YOU LEARN: IndexedStack allows efficient navigation between screens
  // without rebuilding. Only the selected screen is active.
  final List<Widget> _screens = const [
    HomeScreen(),
    WorkoutsScreen(),
    ProgressScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // WHAT YOU LEARN: Scaffold provides the basic Material Design structure
      // with appBar, body, and bottomNavigationBar
      appBar: AppBar(
        title: const Text('Fitness Tracker'),
        elevation: 0,
        centerTitle: true,
      ),
      body: IndexedStack(
        index: _selectedIndex,
        children: _screens,
      ),
      // WHAT YOU LEARN: BottomNavigationBar handles tab navigation
      // setState() rebuilds the widget when _selectedIndex changes
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.fitness_center),
            label: 'Workouts',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.show_chart),
            label: 'Progress',
          ),
        ],
      ),
    );
  }
}
