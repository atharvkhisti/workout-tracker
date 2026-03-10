export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  category: 'big' | 'small';
}

export interface ExerciseSlot {
  position: number;
  muscleGroup: string;
  category: 'big' | 'small';
  options: Exercise[];
}

export interface WorkoutDay {
  id: string;
  name: string;
  shortName: string;
  exercises: ExerciseSlot[];
}

// PUSH DAY EXERCISES
const pushExercises: ExerciseSlot[] = [
  {
    position: 1,
    muscleGroup: 'chest',
    category: 'big',
    options: [
      { id: 'flat-db-press', name: 'Flat Dumbbell Press', muscleGroup: 'chest', category: 'big' },
      { id: 'barbell-bench', name: 'Barbell Bench Press', muscleGroup: 'chest', category: 'big' },
      { id: 'smith-bench', name: 'Smith Machine Bench Press', muscleGroup: 'chest', category: 'big' },
    ],
  },
  {
    position: 2,
    muscleGroup: 'chest',
    category: 'big',
    options: [
      { id: 'incline-db-press', name: 'Incline Dumbbell Press', muscleGroup: 'chest', category: 'big' },
      { id: 'incline-barbell', name: 'Incline Barbell Press', muscleGroup: 'chest', category: 'big' },
      { id: 'incline-smith', name: 'Incline Smith Machine Press', muscleGroup: 'chest', category: 'big' },
    ],
  },
  {
    position: 3,
    muscleGroup: 'chest',
    category: 'big',
    options: [
      { id: 'decline-cable-fly', name: 'Decline Cable Fly', muscleGroup: 'chest', category: 'big' },
      { id: 'decline-db-fly', name: 'Decline Dumbbell Fly', muscleGroup: 'chest', category: 'big' },
      { id: 'low-cable-crossover', name: 'Low Cable Crossover', muscleGroup: 'chest', category: 'big' },
    ],
  },
  {
    position: 4,
    muscleGroup: 'chest',
    category: 'big',
    options: [
      { id: 'chest-fly-machine', name: 'Chest Fly Machine', muscleGroup: 'chest', category: 'big' },
      { id: 'pec-deck', name: 'Pec Deck', muscleGroup: 'chest', category: 'big' },
      { id: 'cable-fly', name: 'Cable Fly', muscleGroup: 'chest', category: 'big' },
    ],
  },
  {
    position: 5,
    muscleGroup: 'triceps',
    category: 'small',
    options: [
      { id: 'vbar-pushdown', name: 'V-Bar Tricep Pushdown', muscleGroup: 'triceps', category: 'small' },
      { id: 'rope-pushdown', name: 'Rope Pushdown', muscleGroup: 'triceps', category: 'small' },
      { id: 'straight-bar-pushdown', name: 'Straight Bar Pushdown', muscleGroup: 'triceps', category: 'small' },
    ],
  },
  {
    position: 6,
    muscleGroup: 'triceps',
    category: 'small',
    options: [
      { id: 'overhead-cable-ext', name: 'Overhead Cable Tricep Extension', muscleGroup: 'triceps', category: 'small' },
      { id: 'db-overhead-ext', name: 'Dumbbell Overhead Tricep Extension', muscleGroup: 'triceps', category: 'small' },
      { id: 'skull-crushers', name: 'Skull Crushers', muscleGroup: 'triceps', category: 'small' },
    ],
  },
];

// PULL DAY EXERCISES
const pullExercises: ExerciseSlot[] = [
  {
    position: 1,
    muscleGroup: 'back',
    category: 'big',
    options: [
      { id: 'hammer-lat-pulldown', name: 'Hammer Strength Lat Pulldown', muscleGroup: 'back', category: 'big' },
      { id: 'wide-grip-pulldown', name: 'Wide Grip Lat Pulldown', muscleGroup: 'back', category: 'big' },
      { id: 'close-grip-pulldown', name: 'Close Grip Lat Pulldown', muscleGroup: 'back', category: 'big' },
    ],
  },
  {
    position: 2,
    muscleGroup: 'back',
    category: 'big',
    options: [
      { id: 'dumbbell-row', name: 'Dumbbell Row', muscleGroup: 'back', category: 'big' },
      { id: 'single-arm-cable-row', name: 'Single Arm Cable Row', muscleGroup: 'back', category: 'big' },
      { id: 'barbell-row', name: 'Barbell Row', muscleGroup: 'back', category: 'big' },
    ],
  },
  {
    position: 3,
    muscleGroup: 'back',
    category: 'big',
    options: [
      { id: 'seated-cable-row', name: 'Seated Cable Row', muscleGroup: 'back', category: 'big' },
      { id: 't-bar-row', name: 'T-Bar Row', muscleGroup: 'back', category: 'big' },
      { id: 'chest-supported-row', name: 'Chest Supported Row', muscleGroup: 'back', category: 'big' },
    ],
  },
  {
    position: 4,
    muscleGroup: 'back',
    category: 'big',
    options: [
      { id: 'assisted-chin-ups', name: 'Assisted Chin Ups', muscleGroup: 'back', category: 'big' },
      { id: 'chin-ups', name: 'Chin Ups', muscleGroup: 'back', category: 'big' },
      { id: 'pull-ups', name: 'Pull Ups', muscleGroup: 'back', category: 'big' },
    ],
  },
  {
    position: 5,
    muscleGroup: 'biceps',
    category: 'small',
    options: [
      { id: 'seated-bicep-curl-machine', name: 'Seated Bicep Curl Machine', muscleGroup: 'biceps', category: 'small' },
      { id: 'ez-bar-curl', name: 'EZ Bar Curl', muscleGroup: 'biceps', category: 'small' },
      { id: 'barbell-curl', name: 'Barbell Curl', muscleGroup: 'biceps', category: 'small' },
    ],
  },
  {
    position: 6,
    muscleGroup: 'biceps',
    category: 'small',
    options: [
      { id: 'hammer-db-curl', name: 'Hammer Dumbbell Curl', muscleGroup: 'biceps', category: 'small' },
      { id: 'rope-hammer-curl', name: 'Rope Hammer Curl', muscleGroup: 'biceps', category: 'small' },
      { id: 'cross-body-curl', name: 'Cross Body Hammer Curl', muscleGroup: 'biceps', category: 'small' },
    ],
  },
];

// LEGS + ABS DAY EXERCISES
const legsExercises: ExerciseSlot[] = [
  {
    position: 1,
    muscleGroup: 'quads',
    category: 'big',
    options: [
      { id: 'squat', name: 'Squat', muscleGroup: 'quads', category: 'big' },
      { id: 'hack-squat', name: 'Hack Squat', muscleGroup: 'quads', category: 'big' },
      { id: 'smith-squat', name: 'Smith Machine Squat', muscleGroup: 'quads', category: 'big' },
    ],
  },
  {
    position: 2,
    muscleGroup: 'hamstrings',
    category: 'big',
    options: [
      { id: 'romanian-deadlift', name: 'Romanian Deadlift', muscleGroup: 'hamstrings', category: 'big' },
      { id: 'db-romanian-deadlift', name: 'Dumbbell Romanian Deadlift', muscleGroup: 'hamstrings', category: 'big' },
      { id: 'stiff-leg-deadlift', name: 'Stiff Leg Deadlift', muscleGroup: 'hamstrings', category: 'big' },
    ],
  },
  {
    position: 3,
    muscleGroup: 'quads',
    category: 'big',
    options: [
      { id: 'leg-press', name: 'Leg Press', muscleGroup: 'quads', category: 'big' },
      { id: 'bulgarian-split-squat', name: 'Bulgarian Split Squat', muscleGroup: 'quads', category: 'big' },
      { id: 'leg-extension', name: 'Leg Extension', muscleGroup: 'quads', category: 'big' },
    ],
  },
  {
    position: 4,
    muscleGroup: 'hamstrings',
    category: 'big',
    options: [
      { id: 'leg-curl', name: 'Leg Curl', muscleGroup: 'hamstrings', category: 'big' },
      { id: 'seated-leg-curl', name: 'Seated Leg Curl', muscleGroup: 'hamstrings', category: 'big' },
      { id: 'lying-leg-curl', name: 'Lying Leg Curl', muscleGroup: 'hamstrings', category: 'big' },
    ],
  },
  {
    position: 5,
    muscleGroup: 'abs',
    category: 'small',
    options: [
      { id: 'hanging-leg-raises', name: 'Hanging Leg Raises', muscleGroup: 'abs', category: 'small' },
      { id: 'captain-chair-raises', name: 'Captain Chair Raises', muscleGroup: 'abs', category: 'small' },
      { id: 'lying-leg-raises', name: 'Lying Leg Raises', muscleGroup: 'abs', category: 'small' },
    ],
  },
  {
    position: 6,
    muscleGroup: 'abs',
    category: 'small',
    options: [
      { id: 'hanging-knee-raises', name: 'Hanging Knee Raises', muscleGroup: 'abs', category: 'small' },
      { id: 'cable-crunch', name: 'Cable Crunch', muscleGroup: 'abs', category: 'small' },
      { id: 'ab-wheel', name: 'Ab Wheel Rollout', muscleGroup: 'abs', category: 'small' },
    ],
  },
];

// UPPER DAY EXERCISES
const upperExercises: ExerciseSlot[] = [
  {
    position: 1,
    muscleGroup: 'chest',
    category: 'big',
    options: [
      { id: 'upper-incline-db-press', name: 'Incline Dumbbell Press', muscleGroup: 'chest', category: 'big' },
      { id: 'upper-incline-barbell', name: 'Incline Barbell Press', muscleGroup: 'chest', category: 'big' },
      { id: 'upper-incline-machine', name: 'Incline Machine Press', muscleGroup: 'chest', category: 'big' },
    ],
  },
  {
    position: 2,
    muscleGroup: 'chest',
    category: 'big',
    options: [
      { id: 'decline-db-press', name: 'Decline Dumbbell Press', muscleGroup: 'chest', category: 'big' },
      { id: 'decline-machine-press', name: 'Decline Machine Press', muscleGroup: 'chest', category: 'big' },
      { id: 'dip-machine', name: 'Dip Machine', muscleGroup: 'chest', category: 'big' },
    ],
  },
  {
    position: 3,
    muscleGroup: 'back',
    category: 'big',
    options: [
      { id: 'upper-t-bar-row', name: 'T-Bar Row', muscleGroup: 'back', category: 'big' },
      { id: 'upper-chest-supported-row', name: 'Chest Supported Row', muscleGroup: 'back', category: 'big' },
      { id: 'upper-seated-row', name: 'Seated Cable Row', muscleGroup: 'back', category: 'big' },
    ],
  },
  {
    position: 4,
    muscleGroup: 'back',
    category: 'big',
    options: [
      { id: 'lat-pullover-machine', name: 'Lat Pullover Machine', muscleGroup: 'back', category: 'big' },
      { id: 'straight-arm-pulldown', name: 'Straight Arm Pulldown', muscleGroup: 'back', category: 'big' },
      { id: 'db-pullover', name: 'Dumbbell Pullover', muscleGroup: 'back', category: 'big' },
    ],
  },
  {
    position: 5,
    muscleGroup: 'biceps',
    category: 'small',
    options: [
      { id: 'cable-bicep-curl', name: 'Cable Bicep Curl', muscleGroup: 'biceps', category: 'small' },
      { id: 'upper-ez-bar-curl', name: 'EZ Bar Curl', muscleGroup: 'biceps', category: 'small' },
      { id: 'concentration-curl', name: 'Concentration Curl', muscleGroup: 'biceps', category: 'small' },
    ],
  },
  {
    position: 6,
    muscleGroup: 'triceps',
    category: 'small',
    options: [
      { id: 'tricep-assist-machine', name: 'Tricep Assist Machine', muscleGroup: 'triceps', category: 'small' },
      { id: 'upper-dip-machine', name: 'Dip Machine', muscleGroup: 'triceps', category: 'small' },
      { id: 'close-grip-bench', name: 'Close Grip Bench Press', muscleGroup: 'triceps', category: 'small' },
    ],
  },
];

// ARMS + SHOULDERS DAY EXERCISES
const armsExercises: ExerciseSlot[] = [
  {
    position: 1,
    muscleGroup: 'shoulders',
    category: 'big',
    options: [
      { id: 'shoulder-press-machine', name: 'Shoulder Press Machine', muscleGroup: 'shoulders', category: 'big' },
      { id: 'db-shoulder-press', name: 'Dumbbell Shoulder Press', muscleGroup: 'shoulders', category: 'big' },
      { id: 'barbell-ohp', name: 'Barbell Overhead Press', muscleGroup: 'shoulders', category: 'big' },
    ],
  },
  {
    position: 2,
    muscleGroup: 'shoulders',
    category: 'big',
    options: [
      { id: 'db-lateral-raise', name: 'Dumbbell Lateral Raise', muscleGroup: 'shoulders', category: 'big' },
      { id: 'cable-lateral-raise', name: 'Cable Lateral Raise', muscleGroup: 'shoulders', category: 'big' },
      { id: 'machine-lateral-raise', name: 'Machine Lateral Raise', muscleGroup: 'shoulders', category: 'big' },
    ],
  },
  {
    position: 3,
    muscleGroup: 'shoulders',
    category: 'big',
    options: [
      { id: 'rear-delt-machine', name: 'Rear Delt Machine', muscleGroup: 'shoulders', category: 'big' },
      { id: 'reverse-pec-deck', name: 'Reverse Pec Deck', muscleGroup: 'shoulders', category: 'big' },
      { id: 'face-pulls', name: 'Face Pulls', muscleGroup: 'shoulders', category: 'big' },
    ],
  },
  {
    position: 4,
    muscleGroup: 'biceps',
    category: 'small',
    options: [
      { id: 'arms-seated-bicep-curl', name: 'Seated Bicep Curl', muscleGroup: 'biceps', category: 'small' },
      { id: 'preacher-curl', name: 'Preacher Curl', muscleGroup: 'biceps', category: 'small' },
      { id: 'incline-db-curl', name: 'Incline Dumbbell Curl', muscleGroup: 'biceps', category: 'small' },
    ],
  },
  {
    position: 5,
    muscleGroup: 'biceps',
    category: 'small',
    options: [
      { id: 'hammer-cable-curl', name: 'Hammer Cable Curl', muscleGroup: 'biceps', category: 'small' },
      { id: 'arms-db-hammer-curl', name: 'Dumbbell Hammer Curl', muscleGroup: 'biceps', category: 'small' },
      { id: 'reverse-curl', name: 'Reverse Curl', muscleGroup: 'biceps', category: 'small' },
    ],
  },
  {
    position: 6,
    muscleGroup: 'traps',
    category: 'small',
    options: [
      { id: 'db-shrugs', name: 'Dumbbell Shrugs', muscleGroup: 'traps', category: 'small' },
      { id: 'smith-shrugs', name: 'Smith Machine Shrugs', muscleGroup: 'traps', category: 'small' },
      { id: 'barbell-shrugs', name: 'Barbell Shrugs', muscleGroup: 'traps', category: 'small' },
    ],
  },
];

// Big 3 exercises for tracking
export const big3Exercises: Exercise[] = [
  { id: 'big3-bench', name: 'Bench Press', muscleGroup: 'chest', category: 'big' },
  { id: 'big3-squat', name: 'Squat', muscleGroup: 'quads', category: 'big' },
  { id: 'big3-deadlift', name: 'Deadlift', muscleGroup: 'back', category: 'big' },
];

// Complete workout split
export const workoutDays: WorkoutDay[] = [
  {
    id: 'push',
    name: 'Push',
    shortName: 'Push',
    exercises: pushExercises,
  },
  {
    id: 'pull',
    name: 'Pull',
    shortName: 'Pull',
    exercises: pullExercises,
  },
  {
    id: 'legs',
    name: 'Legs + Abs',
    shortName: 'Legs',
    exercises: legsExercises,
  },
  {
    id: 'upper',
    name: 'Upper',
    shortName: 'Upper',
    exercises: upperExercises,
  },
  {
    id: 'arms',
    name: 'Arms + Shoulders',
    shortName: 'Arms',
    exercises: armsExercises,
  },
];

// Get all exercises as flat array
export function getAllExercises(): Exercise[] {
  const exercises: Exercise[] = [];
  workoutDays.forEach(day => {
    day.exercises.forEach(slot => {
      slot.options.forEach(exercise => {
        if (!exercises.find(e => e.id === exercise.id)) {
          exercises.push(exercise);
        }
      });
    });
  });
  return [...exercises, ...big3Exercises];
}

// Get exercise by ID
export function getExerciseById(id: string): Exercise | undefined {
  return getAllExercises().find(e => e.id === id);
}
