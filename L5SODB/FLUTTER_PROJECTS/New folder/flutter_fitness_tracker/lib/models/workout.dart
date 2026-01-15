// WHAT YOU LEARN: Data models separate business logic from UI
// This class represents a single workout entry

class Workout {
  final String id;
  final String name;
  final String category;
  final int durationMinutes;
  final int caloriesBurned;
  final DateTime date;
  final String intensity; // 'Low', 'Medium', 'High'

  Workout({
    required this.id,
    required this.name,
    required this.category,
    required this.durationMinutes,
    required this.caloriesBurned,
    required this.date,
    required this.intensity,
  });

  // WHAT YOU LEARN: Factory constructor for creating instances from JSON
  factory Workout.fromJson(Map<String, dynamic> json) {
    return Workout(
      id: json['id'] as String,
      name: json['name'] as String,
      category: json['category'] as String,
      durationMinutes: json['durationMinutes'] as int,
      caloriesBurned: json['caloriesBurned'] as int,
      date: DateTime.parse(json['date'] as String),
      intensity: json['intensity'] as String,
    );
  }

  // WHAT YOU LEARN: Convert to JSON for storage or API calls
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'category': category,
      'durationMinutes': durationMinutes,
      'caloriesBurned': caloriesBurned,
      'date': date.toIso8601String(),
      'intensity': intensity,
    };
  }
}
