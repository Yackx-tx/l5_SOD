import 'package:flutter/material.dart';
import '../models/workout.dart';

class ProgressScreen extends StatelessWidget {
  const ProgressScreen({Key? key}) : super(key: key);

  // WHAT YOU LEARN: Sample data for analytics
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
    Workout(
      id: '4',
      name: 'Swimming',
      category: 'Cardio',
      durationMinutes: 40,
      caloriesBurned: 380,
      date: DateTime.now().subtract(const Duration(days: 3)),
      intensity: 'Medium',
    ),
    Workout(
      id: '5',
      name: 'Cycling',
      category: 'Cardio',
      durationMinutes: 50,
      caloriesBurned: 420,
      date: DateTime.now().subtract(const Duration(days: 4)),
      intensity: 'High',
    ),
  ];

  // WHAT YOU LEARN: Helper methods for data aggregation and statistics
  int _getTotalCaloriesThisWeek() {
    int total = 0;
    final oneWeekAgo = DateTime.now().subtract(const Duration(days: 7));
    for (var workout in sampleWorkouts) {
      if (workout.date.isAfter(oneWeekAgo)) {
        total += workout.caloriesBurned;
      }
    }
    return total;
  }

  int _getTotalWorkoutsThisWeek() {
    int count = 0;
    final oneWeekAgo = DateTime.now().subtract(const Duration(days: 7));
    for (var workout in sampleWorkouts) {
      if (workout.date.isAfter(oneWeekAgo)) {
        count++;
      }
    }
    return count;
  }

  int _getAverageDuration() {
    if (sampleWorkouts.isEmpty) return 0;
    int total =
        sampleWorkouts.fold(0, (sum, w) => sum + w.durationMinutes);
    return (total / sampleWorkouts.length).round();
  }

  // WHAT YOU LEARN: Group and count workouts by category
  Map<String, int> _getCategoryBreakdown() {
    final breakdown = <String, int>{};
    for (var workout in sampleWorkouts) {
      breakdown[workout.category] = (breakdown[workout.category] ?? 0) + 1;
    }
    return breakdown;
  }

  // WHAT YOU LEARN: Get daily breakdown for current week
  Map<String, int> _getDailyBreakdown() {
    final dailyData = <String, int>{};
    final days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Initialize with 0 for each day
    for (var day in days) {
      dailyData[day] = 0;
    }

    // Count workouts for each day
    for (var workout in sampleWorkouts) {
      final dayIndex = workout.date.weekday - 1; // 0 = Monday
      if (dayIndex >= 0 && dayIndex < 7) {
        dailyData[days[dayIndex]] =
            (dailyData[days[dayIndex]] ?? 0) + workout.caloriesBurned;
      }
    }

    return dailyData;
  }

  @override
  Widget build(BuildContext context) {
    final categoryBreakdown = _getCategoryBreakdown();
    final dailyBreakdown = _getDailyBreakdown();

    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // WHAT YOU LEARN: Summary stats at the top
            _buildSummaryStats(context),
            const SizedBox(height: 24),

            // WHAT YOU LEARN: Category breakdown visualization
            _buildCategoryBreakdown(context, categoryBreakdown),
            const SizedBox(height: 24),

            // WHAT YOU LEARN: Weekly activity chart
            _buildWeeklyChart(context, dailyBreakdown),
            const SizedBox(height: 24),

            // WHAT YOU LEARN: Recent activity timeline
            _buildActivityTimeline(context),
          ],
        ),
      ),
    );
  }

  Widget _buildSummaryStats(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Your Progress',
          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                fontWeight: FontWeight.bold,
              ),
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: _buildStatBox(
                context,
                title: 'This Week',
                value: '${_getTotalWorkoutsThisWeek()}',
                unit: 'workouts',
                icon: Icons.sports,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _buildStatBox(
                context,
                title: 'Calories',
                value: '${_getTotalCaloriesThisWeek()}',
                unit: 'kcal',
                icon: Icons.local_fire_department,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _buildStatBox(
                context,
                title: 'Avg Duration',
                value: '${_getAverageDuration()}',
                unit: 'min',
                icon: Icons.timer,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildStatBox(
    BuildContext context, {
    required String title,
    required String value,
    required String unit,
    required IconData icon,
  }) {
    return Card(
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, size: 20, color: Colors.grey[600]),
            const SizedBox(height: 8),
            Text(
              value,
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            Text(
              unit,
              style: TextStyle(fontSize: 12, color: Colors.grey[600]),
            ),
            Text(
              title,
              style: const TextStyle(fontSize: 10, color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryBreakdown(
    BuildContext context,
    Map<String, int> breakdown,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Category Breakdown',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
              ),
        ),
        const SizedBox(height: 12),
        ...breakdown.entries.map((entry) {
          final percentage = (entry.value / sampleWorkouts.length * 100).toInt();
          return Padding(
            padding: const EdgeInsets.only(bottom: 12.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(entry.key),
                    Text('${entry.value} (${percentage}%)'),
                  ],
                ),
                const SizedBox(height: 4),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: entry.value / sampleWorkouts.length,
                    minHeight: 8,
                    backgroundColor: Colors.grey[300],
                    valueColor: AlwaysStoppedAnimation<Color>(
                      _getCategoryColor(entry.key),
                    ),
                  ),
                ),
              ],
            ),
          );
        }).toList(),
      ],
    );
  }

  Widget _buildWeeklyChart(
    BuildContext context,
    Map<String, int> dailyBreakdown,
  ) {
    final maxValue =
        dailyBreakdown.values.isEmpty ? 1 : dailyBreakdown.values.reduce((a, b) => a > b ? a : b);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Weekly Activity',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
              ),
        ),
        const SizedBox(height: 16),
        Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: dailyBreakdown.entries.map((entry) {
            final height = maxValue > 0 ? (entry.value / maxValue) * 150 : 0.0;
            return Column(
              children: [
                Container(
                  width: 30,
                  height: height.toDouble(),
                  decoration: BoxDecoration(
                    color: Colors.indigo[400],
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  entry.key,
                  style: const TextStyle(fontSize: 12),
                ),
              ],
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildActivityTimeline(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Recent Activity',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
              ),
        ),
        const SizedBox(height: 12),
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: sampleWorkouts.length,
          itemBuilder: (context, index) {
            final workout = sampleWorkouts[index];
            return ListTile(
              leading: CircleAvatar(
                backgroundColor:
                    _getCategoryColor(workout.category).withOpacity(0.3),
                child: Icon(
                  _getCategoryIcon(workout.category),
                  color: _getCategoryColor(workout.category),
                ),
              ),
              title: Text(workout.name),
              subtitle: Text(
                '${workout.durationMinutes} min • ${workout.date.month}/${workout.date.day}',
              ),
              trailing: Text(
                '${workout.caloriesBurned} kcal',
                style: const TextStyle(fontWeight: FontWeight.bold),
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
}
