export interface DropSetData {
  weight: number;
  reps: number;
}

export interface SetData {
  weight: number;
  reps: number;
  setType: 'normal' | 'drop';
  // For drop sets, track 3 mini-sets
  dropSets?: DropSetData[];
}

export interface ParsedInput {
  weight: number;
  reps: number;
}

// Parse input like "20x9" or "22.5x8" to weight and reps
export function parseSetInput(input: string): ParsedInput | null {
  if (!input || !input.trim()) return null;

  const cleanInput = input.trim().toLowerCase();
  const match = cleanInput.match(/^(\d+\.?\d*)\s*[xX×]\s*(\d+)$/);

  if (!match) return null;

  const weight = parseFloat(match[1]);
  const reps = parseInt(match[2], 10);

  if (isNaN(weight) || isNaN(reps) || weight < 0 || reps < 0) return null;

  return { weight, reps };
}

// Format set data back to display string
export function formatSetDisplay(weight: number, reps: number): string {
  // Remove trailing zeros for cleaner display
  const weightStr = weight % 1 === 0 ? weight.toString() : weight.toFixed(1);
  return `${weightStr}×${reps}`;
}

// Calculate volume for a single set
export function calculateVolume(weight: number, reps: number): number {
  return weight * reps;
}

// Calculate total workout volume for all sets (including drop sets)
export function calculateWorkoutVolume(sets: SetData[]): number {
  return sets.reduce((total, set) => {
    let setVolume = calculateVolume(set.weight, set.reps);

    // Add volume from drop set mini-sets
    if (set.setType === 'drop' && set.dropSets) {
      setVolume += set.dropSets.reduce((dropTotal, dropSet) => {
        return dropTotal + calculateVolume(dropSet.weight, dropSet.reps);
      }, 0);
    }

    return total + setVolume;
  }, 0);
}

// Compare progress between two workout volumes
export type ProgressStatus = 'increase' | 'decrease' | 'same';

export function compareProgress(previousVolume: number, currentVolume: number): ProgressStatus {
  if (currentVolume > previousVolume) return 'increase';
  if (currentVolume < previousVolume) return 'decrease';
  return 'same';
}

// Get color class based on progress status
export function getProgressColor(status: ProgressStatus): string {
  switch (status) {
    case 'increase':
      return 'bg-emerald-600 hover:bg-emerald-700 text-white';
    case 'decrease':
      return 'bg-red-600 hover:bg-red-700 text-white';
    case 'same':
    default:
      return 'bg-zinc-600 hover:bg-zinc-700 text-white';
  }
}

// Get progress status icon
export function getProgressIcon(status: ProgressStatus): string {
  switch (status) {
    case 'increase':
      return '↑';
    case 'decrease':
      return '↓';
    case 'same':
    default:
      return '−';
  }
}

// Calculate percentage change
export function calculatePercentageChange(previous: number, current: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

// Format volume for display (e.g., 1234 -> "1.2k")
export function formatVolume(volume: number): string {
  if (volume >= 1000) {
    return `${(volume / 1000).toFixed(1)}k`;
  }
  return volume.toString();
}

// Calculate estimated 1RM using Brzycki formula
export function calculate1RM(weight: number, reps: number): number {
  if (reps === 0) return 0;
  if (reps === 1) return weight;
  return Math.round(weight * (36 / (37 - reps)));
}
