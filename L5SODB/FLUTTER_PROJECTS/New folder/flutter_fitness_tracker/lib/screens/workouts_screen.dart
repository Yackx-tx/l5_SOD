import 'package:flutter/material.dart';
import '../models/workout.dart';

class WorkoutsScreen extends StatefulWidget {
  const WorkoutsScreen({Key? key}) : super(key: key);

  @override
  State<WorkoutsScreen> createState() => _WorkoutsScreenState();
}

class _WorkoutsScreenState extends State<WorkoutsScreen> {
  // WHAT YOU LEARN: StatefulWidget manages mutable state
  // _workouts list can be modified and setState() triggers rebuild
  List<Workout> _workouts = [
    Workout(
      id: '1',
      name: 'Morning Run',
      category: 'Cardio',
      durationMinutes: 30,
      caloriesBurned: 350,
      date: DateTime.now(),
      intensity: 'High',
    ),
    Workout(
      id: '2',
      name: 'Weight Training',
      category: 'Strength',
      durationMinutes: 45,
      caloriesBurned: 400,
      date: DateTime.now().subtract(const Duration(days: 1)),
      intensity: 'High',
    ),
    Workout(
      id: '3',
      name: 'Yoga Session',
      category: 'Flexibility',
      durationMinutes: 60,
      caloriesBurned: 200,
      date: DateTime.now().subtract(const Duration(days: 2)),
      intensity: 'Low',
    ),
    Workout(
      id: '4',
      name: 'Swimming',
      category: 'Cardio',
      durationMinutes: 40,
      caloriesBurned: 380,
      date: DateTime.now().subtract(const Duration(days: 3)),
      intensity: 'Medium',
    ),
  ];

  String _selectedCategory = 'All';

  // WHAT YOU LEARN: Filter workouts based on selected category
  List<Workout> get _filteredWorkouts {
    if (_selectedCategory == 'All') {
      return _workouts;
    }
    return _workouts.where((w) => w.category == _selectedCategory).toList();
  }

  // WHAT YOU LEARN: Delete workout with setState() to trigger rebuild
  void _deleteWorkout(String id) {
    setState(() {
      _workouts.removeWhere((workout) => workout.id == id);
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Workout deleted')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // WHAT YOU LEARN: Filter chips allow selection-based filtering
          _buildFilterChips(),
          Expanded(
            child: _filteredWorkouts.isEmpty
                ? _buildEmptyState()
                : _buildWorkoutsList(),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        // WHAT YOU LEARN: Callback for adding new workouts
        onPressed: () {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Add new workout feature coming soon!')),
          );
        },
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildFilterChips() {
    final categories = ['All', 'Cardio', 'Strength', 'Flexibility'];

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.all(16.0),
      child: Row(
        children: categories.map((category) {
          return Padding(
            padding: const EdgeInsets.only(right: 8.0),
            child: FilterChip(
              // WHAT YOU LEARN: FilterChip shows selected/unselected state
              label: Text(category),
              selected: _selectedCategory == category,
              onSelected: (selected) {
                setState(() {
                  _selectedCategory = category;
                });
              },
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildWorkoutsList() {
    return ListView.builder(
      padding: const EdgeInsets.all(16.0),
      itemCount: _filteredWorkouts.length,
      itemBuilder: (context, index) {
        final workout = _filteredWorkouts[index];
        return Padding(
          padding: const EdgeInsets.only(bottom: 12.0),
          child: _buildWorkoutCard(workout),
        );
      },
    );
  }

  Widget _buildWorkoutCard(Workout workout) {
    return Dismissible(
      // WHAT YOU LEARN: Dismissible enables swipe-to-delete gesture
      // background shows when swiping right, secondaryBackground for left
      key: Key(workout.id),
      onDismissed: (direction) {
        _deleteWorkout(workout.id);
      },
      background: Container(
        decoration: BoxDecoration(
          color: Colors.red,
          borderRadius: BorderRadius.circular(12),
        ),
        alignment: Alignment.centerLeft,
        padding: const EdgeInsets.only(left: 16.0),
        child: const Icon(Icons.delete, color: Colors.white),
      ),
      secondaryBackground: Container(
        decoration: BoxDecoration(
          color: Colors.red,
          borderRadius: BorderRadius.circular(12),
        ),
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 16.0),
        child: const Icon(Icons.delete, color: Colors.white),
      ),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    workout.name,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                  Chip(
                    label: Text(workout.category),
                    backgroundColor: _getCategoryColor(workout.category)
                        .withOpacity(0.2),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  _buildInfoRow(
                    icon: Icons.timer,
                    label: '${workout.durationMinutes} min',
                  ),
                  _buildInfoRow(
                    icon: Icons.local_fire_department,
                    label: '${workout.caloriesBurned} kcal',
                  ),
                  _buildInfoRow(
                    icon: Icons.trending_up,
                    label: workout.intensity,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInfoRow({required IconData icon, required String label}) {
    return Row(
      children: [
        Icon(icon, size: 16, color: Colors.grey[600]),
        const SizedBox(width: 4),
        Text(
          label,
          style: TextStyle(fontSize: 12, color: Colors.grey[600]),
        ),
      ],
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.fitness_center, size: 64, color: Colors.grey[300]),
          const SizedBox(height: 16),
          Text(
            'No workouts found',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: Colors.grey[600],
                ),
          ),
        ],
      ),
    );
  }

  Color _getCategoryColor(String category) {
    switch (category) {
      case 'Cardio':
        return Colors.red;
      case 'Strength':
        return Colors.blue;
      case 'Flexibility':
        return Colors.purple;
      default:
        return Colors.grey;
    }
  }
}
