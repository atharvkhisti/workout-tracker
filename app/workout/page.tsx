'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ExerciseCard } from '@/components/ExerciseCard';
import { useWorkoutStore } from '@/store/workoutStore';
import { workoutDays } from '@/lib/exercises';
import { Dumbbell, BarChart2, Play, Save } from 'lucide-react';

export default function WorkoutPage() {
  const [mounted, setMounted] = useState(false);
  const [activeDay, setActiveDay] = useState(workoutDays[0].id);

  const { currentWorkout, startWorkout, saveWorkout, clearCurrentWorkout } =
    useWorkoutStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStartWorkout = () => {
    startWorkout(activeDay);
  };

  const handleSaveWorkout = () => {
    saveWorkout();
  };

  const handleCancelWorkout = () => {
    clearCurrentWorkout();
  };

  const isWorkoutActive = currentWorkout !== null;
  const isCurrentDayActive = currentWorkout?.dayId === activeDay;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse">
          <Dumbbell className="h-12 w-12 text-emerald-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-zinc-800">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-emerald-500" />
            <h1 className="text-lg font-semibold">Workout Tracker</h1>
          </div>
          <Link href="/progress">
            <Button variant="ghost" size="icon">
              <BarChart2 className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="px-4 py-4">
        <Tabs
          value={activeDay}
          onValueChange={(value) => {
            if (!isWorkoutActive || value === currentWorkout?.dayId) {
              setActiveDay(value);
            }
          }}
        >
          {/* Day tabs */}
          <TabsList className="w-full mb-4">
            {workoutDays.map((day) => (
              <TabsTrigger
                key={day.id}
                value={day.id}
                disabled={isWorkoutActive && currentWorkout?.dayId !== day.id}
                className="flex-1"
              >
                {day.shortName}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Day content */}
          {workoutDays.map((day) => (
            <TabsContent key={day.id} value={day.id} className="space-y-4">
              {/* Day header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{day.name}</h2>
                  <p className="text-sm text-zinc-400">
                    {day.exercises.filter((e) => e.category === 'big').length}{' '}
                    compound •{' '}
                    {day.exercises.filter((e) => e.category === 'small').length}{' '}
                    isolation
                  </p>
                </div>

                {/* Workout controls */}
                {!isCurrentDayActive ? (
                  <Button
                    onClick={handleStartWorkout}
                    disabled={isWorkoutActive}
                    className="gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Start
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleCancelWorkout}
                      size="sm"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveWorkout} className="gap-2" size="sm">
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                )}
              </div>

              {/* Exercise cards */}
              <div className="space-y-3">
                {day.exercises.map((slot) => (
                  <ExerciseCard key={slot.position} dayId={day.id} slot={slot} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-4 py-3 safe-area-inset-bottom">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <Link href="/workout" className="flex flex-col items-center gap-1">
            <Dumbbell className="h-6 w-6 text-emerald-500" />
            <span className="text-xs text-emerald-500">Workout</span>
          </Link>
          <Link href="/progress" className="flex flex-col items-center gap-1">
            <BarChart2 className="h-6 w-6 text-zinc-400" />
            <span className="text-xs text-zinc-400">Progress</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
