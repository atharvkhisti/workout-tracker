'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useWorkoutStore } from '@/store/workoutStore';

export function BodyMetricsForm() {
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [muscleMass, setMuscleMass] = useState('');
  const [saved, setSaved] = useState(false);

  const { addBodyMetric } = useWorkoutStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const weightNum = parseFloat(weight);
    const bodyFatNum = parseFloat(bodyFat);
    const muscleMassNum = parseFloat(muscleMass);

    if (isNaN(weightNum) || weightNum <= 0) {
      return;
    }

    addBodyMetric({
      weight: weightNum,
      bodyFat: isNaN(bodyFatNum) ? 0 : bodyFatNum,
      muscleMass: isNaN(muscleMassNum) ? 0 : muscleMassNum,
    });

    setWeight('');
    setBodyFat('');
    setMuscleMass('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Log Body Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor="weight" className="text-xs">
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="75"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="bodyFat" className="text-xs">
                Body Fat %
              </Label>
              <Input
                id="bodyFat"
                type="number"
                step="0.1"
                placeholder="15"
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="muscle" className="text-xs">
                Muscle %
              </Label>
              <Input
                id="muscle"
                type="number"
                step="0.1"
                placeholder="40"
                value={muscleMass}
                onChange={(e) => setMuscleMass(e.target.value)}
                className="h-12"
              />
            </div>
          </div>
          <Button type="submit" className="w-full h-12">
            {saved ? 'Saved!' : 'Log Metrics'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
