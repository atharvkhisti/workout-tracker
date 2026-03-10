'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { ProgressStatus } from '@/lib/progressUtils';

interface ProgressIndicatorProps {
  status: ProgressStatus;
  onToggle: () => void;
  disabled?: boolean;
}

export function ProgressIndicator({
  status,
  onToggle,
  disabled = false,
}: ProgressIndicatorProps) {
  const getStyles = () => {
    switch (status) {
      case 'increase':
        return {
          bg: disabled ? 'bg-emerald-800 opacity-60' : 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700',
          icon: <TrendingUp className="h-6 w-6" />,
          label: 'Increased',
        };
      case 'decrease':
        return {
          bg: disabled ? 'bg-red-800 opacity-60' : 'bg-red-600 hover:bg-red-500 active:bg-red-700',
          icon: <TrendingDown className="h-6 w-6" />,
          label: 'Decreased',
        };
      default:
        return {
          bg: disabled ? 'bg-zinc-800 opacity-60' : 'bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-800',
          icon: <Minus className="h-6 w-6" />,
          label: 'Same',
        };
    }
  };

  const styles = getStyles();

  return (
    <button
      type="button"
      className={`${styles.bg} h-14 w-14 rounded-full text-white transition-all flex items-center justify-center shrink-0 ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={disabled ? undefined : onToggle}
      title={disabled ? 'Start workout to track progress' : `Progress: ${styles.label} - Tap to change`}
    >
      {styles.icon}
    </button>
  );
}
