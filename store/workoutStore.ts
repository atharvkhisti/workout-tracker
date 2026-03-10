import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { workoutDays, type WorkoutDay } from '@/lib/exercises';
import { calculateWorkoutVolume, type SetData, type ProgressStatus } from '@/lib/progressUtils';

// Types
export interface ExerciseLog {
  date: string;
  dayId: string;
  slotPosition: number;
  exerciseId: string;
  sets: SetData[];
  totalVolume: number;
  progressStatus: ProgressStatus; // Save the progress indicator status
}

export interface BodyMetric {
  date: string;
  weight: number;
  bodyFat: number;
  muscleMass: number;
}

export interface Big3Log {
  date: string;
  exerciseId: string;
  weight: number;
  reps: number;
  estimated1RM: number;
}

export interface SelectedExercise {
  dayId: string;
  slotPosition: number;
  exerciseId: string;
}

export interface CurrentWorkout {
  dayId: string;
  date: string;
  exercises: {
    [slotPosition: number]: {
      exerciseId: string;
      sets: SetData[];
      progressStatus: ProgressStatus;
    };
  };
}

// Store interface
interface WorkoutStore {
  // Selected exercises for each day/slot
  selectedExercises: SelectedExercise[];

  // Historical workout logs
  workoutLogs: ExerciseLog[];

  // Body metrics history
  bodyMetrics: BodyMetric[];

  // Big 3 tracking
  big3Logs: Big3Log[];

  // Current workout in progress
  currentWorkout: CurrentWorkout | null;

  // Actions
  selectExercise: (dayId: string, slotPosition: number, exerciseId: string) => void;
  getSelectedExercise: (dayId: string, slotPosition: number) => string | undefined;

  startWorkout: (dayId: string) => void;
  updateSet: (slotPosition: number, setIndex: number, data: SetData) => void;
  toggleProgressStatus: (slotPosition: number) => void;
  saveWorkout: () => void;
  clearCurrentWorkout: () => void;

  getLastWorkoutForExercise: (exerciseId: string) => ExerciseLog | undefined;
  getWorkoutHistory: (exerciseId: string, limit?: number) => ExerciseLog[];

  addBodyMetric: (metric: Omit<BodyMetric, 'date'>) => void;
  getBodyMetricsHistory: (limit?: number) => BodyMetric[];

  addBig3Log: (log: Omit<Big3Log, 'date'>) => void;
  getBig3History: (exerciseId: string, limit?: number) => Big3Log[];

  // Get workout days with selected exercises
  getWorkoutDays: () => WorkoutDay[];
}

// Helper to get current date string with time for proper sorting
const getDateString = () => new Date().toISOString();

// Create store with persistence
export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      selectedExercises: [],
      workoutLogs: [],
      bodyMetrics: [],
      big3Logs: [],
      currentWorkout: null,

      selectExercise: (dayId, slotPosition, exerciseId) => {
        set((state) => {
          const filtered = state.selectedExercises.filter(
            (se) => !(se.dayId === dayId && se.slotPosition === slotPosition)
          );

          // If there's an active workout for this day, also update the current workout
          let updatedCurrentWorkout = state.currentWorkout;
          if (state.currentWorkout && state.currentWorkout.dayId === dayId) {
            // Get last workout for this specific exercise
            const lastWorkout = state.workoutLogs
              .filter((log) => log.exerciseId === exerciseId)
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

            let sets: SetData[];
            let lastProgressStatus: ProgressStatus = 'same';

            if (lastWorkout && lastWorkout.sets.length > 0) {
              sets = lastWorkout.sets.map((s) => ({
                weight: s.weight,
                reps: s.reps,
                setType: s.setType || 'normal',
                dropSets: s.dropSets ? [...s.dropSets] : undefined,
              }));
              while (sets.length < 3) {
                const lastSet = sets[sets.length - 1];
                sets.push({
                  weight: lastSet?.weight || 0,
                  reps: lastSet?.reps || 0,
                  setType: 'normal'
                });
              }
              lastProgressStatus = lastWorkout.progressStatus || 'same';
            } else {
              sets = [
                { weight: 0, reps: 0, setType: 'normal' },
                { weight: 0, reps: 0, setType: 'normal' },
                { weight: 0, reps: 0, setType: 'normal' },
              ];
            }

            updatedCurrentWorkout = {
              ...state.currentWorkout,
              exercises: {
                ...state.currentWorkout.exercises,
                [slotPosition]: {
                  exerciseId,
                  sets,
                  progressStatus: lastProgressStatus,
                },
              },
            };
          }

          return {
            selectedExercises: [
              ...filtered,
              { dayId, slotPosition, exerciseId },
            ],
            currentWorkout: updatedCurrentWorkout,
          };
        });
      },

      getSelectedExercise: (dayId, slotPosition) => {
        const state = get();
        return state.selectedExercises.find(
          (se) => se.dayId === dayId && se.slotPosition === slotPosition
        )?.exerciseId;
      },

      startWorkout: (dayId) => {
        const state = get();
        const exercises: CurrentWorkout['exercises'] = {};

        // Initialize with selected exercises and pre-fill from last workout
        for (let i = 1; i <= 6; i++) {
          const selected = state.selectedExercises.find(
            (se) => se.dayId === dayId && se.slotPosition === i
          );
          if (selected) {
            // Get last workout for this exercise to pre-fill weights/reps AND progress status
            const lastWorkout = state.workoutLogs
              .filter((log) => log.exerciseId === selected.exerciseId)
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

            let sets: SetData[];
            let lastProgressStatus: ProgressStatus = 'same';

            if (lastWorkout && lastWorkout.sets.length > 0) {
              // Pre-fill from last workout
              sets = lastWorkout.sets.map((s) => ({
                weight: s.weight,
                reps: s.reps,
                setType: s.setType || 'normal',
                dropSets: s.dropSets,
              }));
              // Ensure we have at least 3 sets
              while (sets.length < 3) {
                const lastSet = sets[sets.length - 1];
                sets.push({
                  weight: lastSet?.weight || 0,
                  reps: lastSet?.reps || 0,
                  setType: 'normal'
                });
              }
              // Get the last progress status
              lastProgressStatus = lastWorkout.progressStatus || 'same';
            } else {
              // No previous workout, start fresh
              sets = [
                { weight: 0, reps: 0, setType: 'normal' },
                { weight: 0, reps: 0, setType: 'normal' },
                { weight: 0, reps: 0, setType: 'normal' },
              ];
            }

            exercises[i] = {
              exerciseId: selected.exerciseId,
              sets,
              progressStatus: lastProgressStatus,
            };
          }
        }

        set({
          currentWorkout: {
            dayId,
            date: getDateString(),
            exercises,
          },
        });
      },

      updateSet: (slotPosition, setIndex, data) => {
        set((state) => {
          if (!state.currentWorkout) return state;

          const exercises = { ...state.currentWorkout.exercises };
          if (!exercises[slotPosition]) return state;

          const sets = [...exercises[slotPosition].sets];
          sets[setIndex] = data;
          exercises[slotPosition] = {
            ...exercises[slotPosition],
            sets,
          };

          return {
            currentWorkout: {
              ...state.currentWorkout,
              exercises,
            },
          };
        });
      },

      toggleProgressStatus: (slotPosition) => {
        set((state) => {
          if (!state.currentWorkout) return state;

          const exercises = { ...state.currentWorkout.exercises };
          if (!exercises[slotPosition]) return state;

          const current = exercises[slotPosition].progressStatus;
          let next: ProgressStatus;

          // Cycle: same -> increase -> decrease -> same
          if (current === 'same') {
            next = 'increase';
          } else if (current === 'increase') {
            next = 'decrease';
          } else {
            next = 'same';
          }

          exercises[slotPosition] = {
            ...exercises[slotPosition],
            progressStatus: next,
          };

          return {
            currentWorkout: {
              ...state.currentWorkout,
              exercises,
            },
          };
        });
      },

      saveWorkout: () => {
        const state = get();
        if (!state.currentWorkout) return;

        const newLogs: ExerciseLog[] = [];
        const { dayId, date, exercises } = state.currentWorkout;

        Object.entries(exercises).forEach(([position, data]) => {
          const validSets = data.sets.filter(
            (s) => s.weight > 0 && s.reps > 0
          );
          if (validSets.length > 0) {
            newLogs.push({
              date,
              dayId,
              slotPosition: parseInt(position),
              exerciseId: data.exerciseId,
              sets: validSets,
              totalVolume: calculateWorkoutVolume(validSets),
              progressStatus: data.progressStatus || 'same', // Ensure it's never undefined
            });
          }
        });

        set((state) => ({
          workoutLogs: [...state.workoutLogs, ...newLogs],
          currentWorkout: null,
        }));
      },

      clearCurrentWorkout: () => {
        set({ currentWorkout: null });
      },

      getLastWorkoutForExercise: (exerciseId) => {
        const state = get();
        const logs = state.workoutLogs
          .filter((log) => log.exerciseId === exerciseId)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return logs[0];
      },

      getWorkoutHistory: (exerciseId, limit = 10) => {
        const state = get();
        return state.workoutLogs
          .filter((log) => log.exerciseId === exerciseId)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, limit);
      },

      addBodyMetric: (metric) => {
        set((state) => ({
          bodyMetrics: [
            ...state.bodyMetrics,
            { ...metric, date: getDateString() },
          ],
        }));
      },

      getBodyMetricsHistory: (limit = 30) => {
        const state = get();
        return state.bodyMetrics
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, limit);
      },

      addBig3Log: (log) => {
        set((state) => ({
          big3Logs: [
            ...state.big3Logs,
            { ...log, date: getDateString() },
          ],
        }));
      },

      getBig3History: (exerciseId, limit = 20) => {
        const state = get();
        return state.big3Logs
          .filter((log) => log.exerciseId === exerciseId)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, limit);
      },

      getWorkoutDays: () => workoutDays,
    }),
    {
      name: 'workout-tracker-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedExercises: state.selectedExercises,
        workoutLogs: state.workoutLogs,
        bodyMetrics: state.bodyMetrics,
        big3Logs: state.big3Logs,
      }),
    }
  )
);
