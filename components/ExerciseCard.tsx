'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ExerciseSelector } from './ExerciseSelector';
import { SetTracker } from './SetTracker';
import { ProgressIndicator } from './ProgressIndicator';
import { useWorkoutStore } from '@/store/workoutStore';
import type { SetData, ProgressStatus } from '@/lib/progressUtils';
import type { ExerciseSlot } from '@/lib/exercises';

interface ExerciseCardProps {
  dayId: string;
  slot: ExerciseSlot;
}

export function ExerciseCard({ dayId, slot }: ExerciseCardProps) {
  const [mounted, setMounted] = useState(false);

  const store = useWorkoutStore();
  const {
    selectedExercises,
    currentWorkout,
    workoutLogs,
    selectExercise,
    updateSet,
    toggleProgressStatus,
  } = store;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get selected exercise for this slot
  const selectedExerciseId = selectedExercises.find(
    (se) => se.dayId === dayId && se.slotPosition === slot.position
  )?.exerciseId;

  const selectedExercise = slot.options.find((e) => e.id === selectedExerciseId);

  // Get last workout for the SELECTED exercise (not slot)
  const lastWorkout = selectedExerciseId
    ? workoutLogs
        .filter((log) => log.exerciseId === selectedExerciseId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    : undefined;

  // Get current workout data for this slot
  const currentExerciseData = currentWorkout?.exercises[slot.position];
  const isWorkoutActive = currentWorkout && currentWorkout.dayId === dayId;

  // Determine sets to display - always create a fresh copy to prevent mutations
  let sets: SetData[];
  if (isWorkoutActive && currentExerciseData?.sets) {
    sets = currentExerciseData.sets;
  } else if (lastWorkout?.sets && lastWorkout.sets.length > 0) {
    // Create a deep copy to prevent mutations
    sets = lastWorkout.sets.map(s => ({
      weight: s.weight,
      reps: s.reps,
      setType: s.setType || 'normal',
      dropSets: s.dropSets ? [...s.dropSets] : undefined
    }));
  } else {
    sets = [
      { weight: 0, reps: 0, setType: 'normal' },
      { weight: 0, reps: 0, setType: 'normal' },
      { weight: 0, reps: 0, setType: 'normal' },
    ];
  }

  // Get progress status for this specific exercise
  // When workout is active: use current workout data if exercise matches
  // When workout is not active: show the last saved status for this exercise
  const progressStatus: ProgressStatus = (() => {
    if (isWorkoutActive && currentExerciseData) {
      // During active workout, use current workout data if the exercise ID matches
      if (currentExerciseData.exerciseId === selectedExerciseId) {
        return currentExerciseData.progressStatus || 'same';
      }
    }
    // Not in workout or exercise doesn't match - show last recorded status
    if (lastWorkout && lastWorkout.progressStatus) {
      return lastWorkout.progressStatus;
    }
    return 'same';
  })();

  const handleSelectExercise = (exerciseId: string) => {
    selectExercise(dayId, slot.position, exerciseId);
  };

  const handleSetChange = (setIndex: number, data: SetData) => {
    if (isWorkoutActive) {
      updateSet(slot.position, setIndex, data);
    }
  };

  const handleToggleProgress = () => {
    if (isWorkoutActive) {
      toggleProgressStatus(slot.position);
    }
  };

  if (!mounted) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <div className="h-12 bg-zinc-800 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-zinc-800 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <ExerciseSelector
              slot={slot}
              selectedExerciseId={selectedExerciseId}
              onSelect={handleSelectExercise}
            />
          </div>
          {selectedExerciseId && (
            <ProgressIndicator
              status={progressStatus}
              onToggle={handleToggleProgress}
              disabled={!isWorkoutActive}
            />
          )}
        </div>
        {selectedExercise && (
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-zinc-400 capitalize">
              {selectedExercise.muscleGroup} • {slot.category === 'big' ? 'Compound' : 'Isolation'}
            </p>
            {lastWorkout && (
              <p className="text-xs text-zinc-500">
                Last: {new Date(lastWorkout.date).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </CardHeader>

      {selectedExerciseId && (
        <CardContent>
          <SetTracker
            sets={sets}
            onSetChange={handleSetChange}
            disabled={!isWorkoutActive}
          />
          {!isWorkoutActive && lastWorkout && (
            <p className="text-xs text-center text-zinc-500 mt-3">
              Showing last workout • Press Start to begin
            </p>
          )}
        </CardContent>
      )}
    </Card>
  );
}
