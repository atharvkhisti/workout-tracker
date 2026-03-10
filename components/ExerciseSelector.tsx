'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ExerciseSlot } from '@/lib/exercises';

interface ExerciseSelectorProps {
  slot: ExerciseSlot;
  selectedExerciseId?: string;
  onSelect: (exerciseId: string) => void;
  disabled?: boolean;
}

export function ExerciseSelector({
  slot,
  selectedExerciseId,
  onSelect,
  disabled = false,
}: ExerciseSelectorProps) {
  const selectedExercise = slot.options.find((e) => e.id === selectedExerciseId);

  return (
    <Select
      value={selectedExerciseId || ''}
      onValueChange={onSelect}
      disabled={disabled}
    >
      <SelectTrigger className="w-full h-12 text-left">
        <SelectValue placeholder="Select Exercise">
          {selectedExercise?.name || 'Select Exercise'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {slot.options.map((exercise) => (
          <SelectItem key={exercise.id} value={exercise.id}>
            <div className="flex flex-col">
              <span>{exercise.name}</span>
              <span className="text-xs text-zinc-400 capitalize">
                {exercise.muscleGroup}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
