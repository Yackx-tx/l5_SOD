# Fitness Tracker App - Flutter Learning Project

A comprehensive Flutter application demonstrating **Learning Outcome 2: Implement UI Designs**. This project showcases professional UI implementation, state management, Material Design patterns, and educational best practices.

## Project Overview

This Fitness Tracker app is designed as an educational resource with detailed inline documentation explaining Flutter concepts and best practices. Each file contains "WHAT YOU LEARN" comments explaining key concepts.

### Features

- **Home Screen**: Dashboard with stats cards, greeting, and recent workouts
- **Workouts Screen**: Interactive list with category filtering and swipe-to-delete
- **Progress Screen**: Analytics with category breakdown, weekly charts, and activity timeline
- **Navigation**: Tab-based navigation using BottomNavigationBar
- **State Management**: StatefulWidget with setState() for reactive updates
- **Material Design**: Pre-designed widgets (Card, ListTile, Chip, Dismissible, FloatingActionButton)

## Project Structure

```
lib/
├── main.dart                 # App entry point, navigation setup
├── models/
│   └── workout.dart         # Data model for workouts
└── screens/
    ├── home_screen.dart     # Dashboard and stats
    ├── workouts_screen.dart # Workout list with filtering
    └── progress_screen.dart # Analytics and tracking
```

## Getting Started

### Prerequisites
- Flutter SDK 3.0.0 or higher
- Dart 3.0.0 or higher
- IDE: Android Studio, VS Code, or any Flutter-compatible editor

### Installation

1. **Create a new Flutter project**:
   ```bash
   flutter create fitness_tracker
   cd fitness_tracker
   ```

2. **Copy the project files**:
   - Copy all Dart files to the `lib/` directory maintaining the folder structure
   - Replace `pubspec.yaml` with the provided version
   - Copy `.gitignore` to the project root

3. **Get dependencies**:
   ```bash
   flutter pub get
   ```

4. **Run[]() the app**:
   ```bash
   flutter run
   ```

## Learning Outcomes Covered

### 1. UI Design Implementation
- Multiple screens with consistent Material Design
- Responsive layouts using Flexbox (Row, Column, Expanded)
- Custom widgets for code reusability
- Color theming and visual hierarchy

### 2. Widget Hierarchy & Composition
- Stateless vs Stateful widgets
- Pre-designed Material widgets (Scaffold, ListTile, Card, etc.)
- Widget composition and separation of concerns
- Custom widget builders for reusable components

### 3. State Management
- setState() for triggering rebuilds
- Data passing through widget constructors
- Local state management in StatefulWidget
- IndexedStack for efficient navigation

### 4. Interactive Components
- BottomNavigationBar for tab navigation
- FilterChip for category selection
- Dismissible for swipe-to-delete
- FloatingActionButton for actions
- List items with onTap callbacks

### 5. Data Processing
- Collections and list operations (map, where, filter)
- Data aggregation (sum, average, grouping)
- Sorting and ordering
- Statistics calculation

### 6. Code Organization
- Separation of models and UI
- Private methods for helper functions
- Consistent naming conventions
- Comprehensive documentation

## Key Concepts Explained

### StatelessWidget vs StatefulWidget

**StatelessWidget**: Immutable, no internal state
```dart
class HomeScreen extends StatelessWidget {
  // No state changes - purely display data
  @override
  Widget build(BuildContext context) {
    // Static UI
  }
}
```

**StatefulWidget**: Mutable, can change internal state
```dart
class WorkoutsScreen extends StatefulWidget {
  @override
  State<WorkoutsScreen> createState() => _WorkoutsScreenState();
}

class _WorkoutsScreenState extends State<WorkoutsScreen> {
  void _deleteWorkout(String id) {
    setState(() {
      // Modify state - triggers rebuild
    });
  }
}
```

### Material Design Widgets

- **Scaffold**: Main container with appBar, body, bottomNavigationBar
- **Card**: Elevated container for content grouping
- **ListTile**: Pre-designed list item with icon, title, subtitle
- **Chip**: Small interactive element for filtering/selection
- **Dismissible**: Swipe-to-action gesture support
- **FloatingActionButton**: Action button with Material behavior

### State Management Pattern

1. Define mutable state in StatefulWidget
2. Create helper methods to modify state
3. Call setState() when state changes
4. Build UI based on current state
5. Pass data down to child widgets

## Extensions & Next Steps

### Beginner Challenges
- Add form validation for new workout input
- Implement persistent storage with shared_preferences
- Add animations to screen transitions
- Create a settings screen

### Intermediate Challenges
- Use Provider for state management
- Implement local database with Hive
- Add image picker for workout photos
- Create notifications with flutter_local_notifications

### Advanced Challenges
- Implement cloud sync with Firebase
- Add charts with charts_flutter
- Build habit tracking features
- Implement advanced analytics

## Best Practices Demonstrated

✅ **Code Organization**: Separated models, screens, and utilities
✅ **Reusability**: Custom widgets and helper methods
✅ **Documentation**: Inline comments explaining concepts
✅ **Responsive Design**: Flexible layouts for different screens
✅ **Material Design**: Proper use of Material widgets and patterns
✅ **State Management**: Clear data flow and state updates
✅ **User Feedback**: Snackbars, empty states, and visual feedback
✅ **Error Handling**: Graceful handling of edge cases

## Resources & References

- [Flutter Documentation](https://flutter.dev/docs)
- [Dart Language Tour](https://dart.dev/guides/language/language-tour)
- [Material Design Guidelines](https://material.io/design)
- [Flutter Cookbook](https://flutter.dev/docs/cookbook)

## Troubleshooting

### App won't run
```bash
flutter clean
flutter pub get
flutter run
```

### Dependencies not found
```bash
flutter pub get
flutter pub upgrade
```

### Hot reload not working
- Press `r` to hot reload
- Press `R` to hot restart
- Restart the app if issues persist

## Support

For Flutter help:
- Visit [flutter.dev](https://flutter.dev)
- Check [Stack Overflow](https://stackoverflow.com/questions/tagged/flutter)
- Explore [Flutter Community](https://flutter.dev/community)

---

**Created for**: Learning Outcome 2 - Implement UI Designs
**Level**: Beginner to Intermediate
**Duration**: 2-4 weeks for full understanding
**Last Updated**: January 2026
