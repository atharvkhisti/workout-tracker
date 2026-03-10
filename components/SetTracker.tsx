'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Minus, Plus } from 'lucide-react';
import type { SetData, DropSetData } from '@/lib/progressUtils';

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number;
  label: string;
  disabled?: boolean;
}

function Counter({ value, onChange, min = 0, step = 1, label, disabled = false }: CounterProps) {
  const handleDecrement = () => {
    onChange(Math.max(min, value - step));
  };

  const handleIncrement = () => {
    onChange(value + step);
  };

  const displayValue = step === 0.5 || step === 2.5 ? value.toFixed(1) : value;

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] text-zinc-500 uppercase">{label}</span>
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={handleDecrement}
          disabled={disabled || value <= min}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="w-16 h-10 flex items-center justify-center bg-zinc-800 rounded-lg text-lg font-semibold">
          {displayValue}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={handleIncrement}
          disabled={disabled}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

interface DropSetInputProps {
  dropSets: DropSetData[];
  onChange: (dropSets: DropSetData[]) => void;
  disabled?: boolean;
}

function DropSetInput({ dropSets, onChange, disabled = false }: DropSetInputProps) {
  const handleChange = (index: number, field: 'weight' | 'reps', value: number) => {
    const newDropSets = [...dropSets];
    newDropSets[index] = { ...newDropSets[index], [field]: value };
    onChange(newDropSets);
  };

  return (
    <div className="mt-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
      <p className="text-xs text-zinc-400 mb-3 text-center">Drop Set (3 drops)</p>
      <div className="space-y-3">
        {dropSets.map((dropSet, index) => (
          <div key={index} className="flex items-center gap-3 justify-center">
            <span className="text-xs text-zinc-500 w-8">#{index + 1}</span>
            <div className="flex items-center gap-2">
              <Counter
                value={dropSet.weight}
                onChange={(v) => handleChange(index, 'weight', v)}
                step={2.5}
                label="kg"
                disabled={disabled}
              />
              <span className="text-zinc-500 text-lg">×</span>
              <Counter
                value={dropSet.reps}
                onChange={(v) => handleChange(index, 'reps', v)}
                step={1}
                label="reps"
                disabled={disabled}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SetTrackerProps {
  sets: SetData[];
  onSetChange: (setIndex: number, data: SetData) => void;
  disabled?: boolean;
}

export function SetTracker({ sets, onSetChange, disabled = false }: SetTrackerProps) {
  const handleWeightChange = (index: number, weight: number) => {
    const currentSet = sets[index];
    if (!currentSet) return;
    onSetChange(index, { ...currentSet, weight });
  };

  const handleRepsChange = (index: number, reps: number) => {
    const currentSet = sets[index];
    if (!currentSet) return;
    onSetChange(index, { ...currentSet, reps });
  };

  const handleSetTypeChange = (index: number, setType: 'normal' | 'drop') => {
    const currentSet = sets[index];
    if (!currentSet) return;

    const newSet: SetData = { ...currentSet, setType };

    if (setType === 'drop' && !newSet.dropSets) {
      newSet.dropSets = [
        { weight: Math.max(0, currentSet.weight - 5), reps: currentSet.reps || 8 },
        { weight: Math.max(0, currentSet.weight - 10), reps: currentSet.reps || 8 },
        { weight: Math.max(0, currentSet.weight - 15), reps: currentSet.reps || 8 },
      ];
    }

    onSetChange(index, newSet);
  };

  const handleDropSetsChange = (index: number, dropSets: DropSetData[]) => {
    const currentSet = sets[index];
    if (!currentSet) return;
    onSetChange(index, { ...currentSet, dropSets });
  };

  return (
    <div className="space-y-4">
      {sets.map((set, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-sm font-bold">
                {index + 1}
              </div>
              <span className="text-sm text-zinc-400">Set {index + 1}</span>
            </div>

            {index === sets.length - 1 && (
              <Select
                value={set.setType}
                onValueChange={(value) => handleSetTypeChange(index, value as 'normal' | 'drop')}
                disabled={disabled}
              >
                <SelectTrigger className="w-24 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="drop">Drop</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="flex items-center justify-center gap-4">
            <Counter
              value={set.weight}
              onChange={(v) => handleWeightChange(index, v)}
              step={2.5}
              label="Weight (kg)"
              disabled={disabled}
            />
            <span className="text-zinc-400 text-2xl font-light mt-4">×</span>
            <Counter
              value={set.reps}
              onChange={(v) => handleRepsChange(index, v)}
              step={1}
              label="Reps"
              disabled={disabled}
            />
          </div>

          {set.setType === 'drop' && index === sets.length - 1 && (
            <DropSetInput
              dropSets={set.dropSets || [
                { weight: 0, reps: 0 },
                { weight: 0, reps: 0 },
                { weight: 0, reps: 0 },
              ]}
              onChange={(dropSets) => handleDropSetsChange(index, dropSets)}
              disabled={disabled}
            />
          )}

          {index < sets.length - 1 && (
            <div className="border-b border-zinc-800 my-3" />
          )}
        </div>
      ))}
    </div>
  );
}
