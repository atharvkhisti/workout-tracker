'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { GraphSection } from './GraphSection';
import { useWorkoutStore } from '@/store/workoutStore';
import { big3Exercises } from '@/lib/exercises';
import { calculate1RM } from '@/lib/progressUtils';

export function Big3Section() {
  const { getBig3History, addBig3Log } = useWorkoutStore();
  const [selectedLift, setSelectedLift] = useState(big3Exercises[0].id);
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps, 10);

    if (isNaN(weightNum) || isNaN(repsNum) || weightNum <= 0 || repsNum <= 0) {
      return;
    }

    addBig3Log({
      exerciseId: selectedLift,
      weight: weightNum,
      reps: repsNum,
      estimated1RM: calculate1RM(weightNum, repsNum),
    });

    setWeight('');
    setReps('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Get chart data for each lift
  const getChartData = (exerciseId: string) => {
    return getBig3History(exerciseId, 20)
      .reverse()
      .map((log) => ({
        date: log.date,
        value: log.estimated1RM,
      }));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Big 3 Lifts</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {big3Exercises.map((exercise) => (
                <Button
                  key={exercise.id}
                  type="button"
                  variant={selectedLift === exercise.id ? 'default' : 'outline'}
                  onClick={() => setSelectedLift(exercise.id)}
                  className="h-12"
                >
                  {exercise.name.split(' ')[0]}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="big3Weight" className="text-xs">
                  Weight (kg)
                </Label>
                <Input
                  id="big3Weight"
                  type="number"
                  step="0.5"
                  placeholder="100"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="big3Reps" className="text-xs">
                  Reps
                </Label>
                <Input
                  id="big3Reps"
                  type="number"
                  placeholder="5"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-12">
              {saved ? 'Logged!' : 'Log Lift'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Charts for each Big 3 lift */}
      {big3Exercises.map((exercise) => {
        const data = getChartData(exercise.id);
        if (data.length < 2) {
          return (
            <Card key={exercise.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {exercise.name} (Est. 1RM)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-400 text-center py-8">
                  Log at least 2 sessions to see progress
                </p>
              </CardContent>
            </Card>
          );
        }
        return (
          <GraphSection
            key={exercise.id}
            title={`${exercise.name} (Est. 1RM)`}
            data={data}
            color={
              exercise.id === 'big3-bench'
                ? '#10b981'
                : exercise.id === 'big3-squat'
                ? '#f59e0b'
                : '#ef4444'
            }
            type="area"
          />
        );
      })}
    </div>
  );
}
