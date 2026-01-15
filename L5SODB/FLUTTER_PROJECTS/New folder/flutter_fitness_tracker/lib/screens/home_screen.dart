import 'package:flutter/material.dart';
import '../models/workout.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  // WHAT YOU LEARN: Sample data for demonstration
  // In a real app, this would come from a database or API
  static final List<Workout> sampleWorkouts = [
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
  ];

  // WHAT YOU LEARN: Helper method to calculate total calories this week
  int _calculateWeeklyCalories() {
    int total = 0;
    final oneWeekAgo = DateTime.now().subtract(const Duration(days: 7));
    for (var workout in sampleWorkouts) {
      if (workout.date.isAfter(oneWeekAgo)) {
        total += workout.caloriesBurned;
      }
    }
    return total;
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // WHAT YOU LEARN: Greeting with personalized message
            _buildGreetingSection(),
            const SizedBox(height: 24),

            // WHAT YOU LEARN: Stats cards in a grid layout using Column
            _buildStatsSection(),
            const SizedBox(height: 24),

            // WHAT YOU LEARN: Recent workouts list
            _buildRecentWorkoutsSection(),
          ],
        ),
      ),
    );
  }

  Widget _buildGreetingSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Welcome Back!',
          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                fontWeight: FontWeight.bold,
              ),
        ),
        const SizedBox(height: 8),
        Text(
          'Let\'s achieve your fitness goals today',
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Colors.grey[600],
              ),
        ),
      ],
    );
  }

  Widget _buildStatsSection() {
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: _buildStatCard(
                title: 'This Week',
                value: '${_calculateWeeklyCalories()}',
                unit: 'kcal',
                icon: Icons.local_fire_department,
                color: Colors.orange,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _buildStatCard(
                title: 'Workouts',
                value: '${sampleWorkouts.length}',
                unit: 'completed',
                icon: Icons.check_circle,
                color: Colors.green,
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: _buildStatCard(
                title: 'Streak',
                value: '7',
                unit: 'days',
                icon: Icons.flame,
                color: Colors.red,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _buildStatCard(
                title: 'Goal Progress',
                value: '75',
                unit: '%',
                icon: Icons.trending_up,
                color: Colors.blue,
              ),
            ),
          ],
        ),
      ],
    );
  }

  // WHAT YOU LEARN: Custom widget builder for reusable stat cards
  Widget _buildStatCard({
    required String title,
    required String value,
    required String unit,
    required IconData icon,
    required Color color,
  }) {
    return Card(
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    color: Colors.grey,
                    fontSize: 14,
                  ),
                ),
                Icon(icon, color: color, size: 20),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              value,
              style: const TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
              ),
            ),
            Text(
              unit,
              style: const TextStyle(
                color: Colors.grey,
                fontSize: 12,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRecentWorkoutsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Recent Workouts',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
              ),
        ),
        const SizedBox(height: 12),
        // WHAT YOU LEARN: ListView.builder creates list items on demand
        ListView.separated(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: sampleWorkouts.length,
          separatorBuilder: (context, index) => const SizedBox(height: 8),
          itemBuilder: (context, index) {
            final workout = sampleWorkouts[index];
            return Card(
              child: ListTile(
                // WHAT YOU LEARN: ListTile is a pre-designed Material widget
                // for displaying list items with icon, title, and trailing
                leading: CircleAvatar(
                  backgroundColor: _getCategoryColor(workout.category),
                  child: Icon(
                    _getCategoryIcon(workout.category),
                    color: Colors.white,
                  ),
                ),
                title: Text(workout.name),
                subtitle: Text(
                  '${workout.durationMinutes} min • ${workout.caloriesBurned} kcal',
                ),
                trailing: Chip(
                  label: Text(workout.intensity),
                  backgroundColor:
                      _getIntensityColor(workout.intensity).withOpacity(0.3),
                  labelStyle: TextStyle(
                    color: _getIntensityColor(workout.intensity),
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            );
          },
        ),
      ],
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

  IconData _getCategoryIcon(String category) {
    switch (category) {
      case 'Cardio':
        return Icons.favorite;
      case 'Strength':
        return Icons.fitness_center;
      case 'Flexibility':
        return Icons.self_improvement;
      default:
        return Icons.sports;
    }
  }

  Color _getIntensityColor(String intensity) {
    switch (intensity) {
      case 'High':
        return Colors.red;
      case 'Medium':
        return Colors.orange;
      case 'Low':
        return Colors.green;
      default:
        return Colors.grey;
    }
  }
}
