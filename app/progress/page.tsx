'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraphSection, MultiLineGraph } from '@/components/GraphSection';
import { BodyMetricsForm } from '@/components/BodyMetricsForm';
import { Big3Section } from '@/components/Big3Section';
import { useWorkoutStore } from '@/store/workoutStore';
import { Dumbbell, BarChart2, ArrowLeft } from 'lucide-react';

export default function ProgressPage() {
  const [mounted, setMounted] = useState(false);
  const { workoutLogs, getBodyMetricsHistory } = useWorkoutStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate total volume by date
  const volumeData = useMemo(() => {
    const volumeByDate: { [date: string]: number } = {};

    workoutLogs.forEach((log) => {
      if (!volumeByDate[log.date]) {
        volumeByDate[log.date] = 0;
      }
      volumeByDate[log.date] += log.totalVolume;
    });

    return Object.entries(volumeByDate)
      .map(([date, value]) => ({ date, value }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [workoutLogs]);

  // Body metrics chart data
  const bodyMetricsData = useMemo(() => {
    const metrics = getBodyMetricsHistory(30).reverse();
    return metrics.map((m) => ({
      date: m.date,
      weight: m.weight,
      bodyFat: m.bodyFat,
      muscle: m.muscleMass,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBodyMetricsHistory]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse">
          <BarChart2 className="h-12 w-12 text-emerald-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-zinc-800">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/workout">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Progress</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="px-4 py-4 space-y-6">
        {/* Total Volume Chart */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Workout Volume</h2>
          {volumeData.length >= 2 ? (
            <GraphSection
              title="Total Volume Over Time"
              data={volumeData}
              color="#10b981"
              type="area"
              height={200}
            />
          ) : (
            <div className="bg-zinc-900 rounded-lg p-8 text-center text-zinc-400">
              <p>Complete at least 2 workouts to see volume trends</p>
            </div>
          )}
        </section>

        {/* Body Metrics Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Body Metrics</h2>
          <div className="space-y-4">
            <BodyMetricsForm />

            {bodyMetricsData.length >= 2 ? (
              <MultiLineGraph
                title="Body Composition"
                data={bodyMetricsData}
                lines={[
                  { dataKey: 'weight', color: '#10b981', name: 'Weight (kg)' },
                  { dataKey: 'bodyFat', color: '#ef4444', name: 'Body Fat %' },
                  { dataKey: 'muscle', color: '#3b82f6', name: 'Muscle %' },
                ]}
                height={250}
              />
            ) : (
              <div className="bg-zinc-900 rounded-lg p-8 text-center text-zinc-400">
                <p>Log at least 2 measurements to see trends</p>
              </div>
            )}
          </div>
        </section>

        {/* Big 3 Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Big 3 Lifts</h2>
          <Big3Section />
        </section>
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-4 py-3 safe-area-inset-bottom">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <Link href="/workout" className="flex flex-col items-center gap-1">
            <Dumbbell className="h-6 w-6 text-zinc-400" />
            <span className="text-xs text-zinc-400">Workout</span>
          </Link>
          <Link href="/progress" className="flex flex-col items-center gap-1">
            <BarChart2 className="h-6 w-6 text-emerald-500" />
            <span className="text-xs text-emerald-500">Progress</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
