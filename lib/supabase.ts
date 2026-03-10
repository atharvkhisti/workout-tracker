import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey);
};

// Create Supabase client only if configured
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Workout log functions
export async function saveWorkoutLog(log: {
  date: string;
  dayId: string;
  slotPosition: number;
  exerciseId: string;
  sets: Array<{ weight: number; reps: number; setType: string }>;
  totalVolume: number;
  progressStatus: string;
}) {
  if (!supabase) {
    console.warn('Supabase not configured, using local storage');
    return null;
  }

  const { data, error } = await supabase
    .from('workout_logs')
    .insert({
      date: log.date,
      day_id: log.dayId,
      slot_position: log.slotPosition,
      exercise_id: log.exerciseId,
      sets: log.sets,
      total_volume: log.totalVolume,
      progress_status: log.progressStatus,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving workout log:', error);
    throw error;
  }

  return data;
}

export async function getWorkoutLogs() {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('workout_logs')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching workout logs:', error);
    throw error;
  }

  return data;
}

// Body metrics functions
export async function saveBodyMetric(metric: {
  date: string;
  weight: number;
  bodyFat: number;
  muscleMass: number;
}) {
  if (!supabase) {
    console.warn('Supabase not configured, using local storage');
    return null;
  }

  const { data, error } = await supabase
    .from('body_metrics')
    .insert({
      date: metric.date,
      weight: metric.weight,
      body_fat: metric.bodyFat,
      muscle_percent: metric.muscleMass,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving body metric:', error);
    throw error;
  }

  return data;
}

export async function getBodyMetrics() {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('body_metrics')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching body metrics:', error);
    throw error;
  }

  return data;
}

// Big 3 log functions
export async function saveBig3Log(log: {
  date: string;
  exerciseId: string;
  weight: number;
  reps: number;
  estimated1RM: number;
}) {
  if (!supabase) {
    console.warn('Supabase not configured, using local storage');
    return null;
  }

  const { data, error } = await supabase
    .from('big3_logs')
    .insert({
      date: log.date,
      exercise_id: log.exerciseId,
      weight: log.weight,
      reps: log.reps,
      estimated_1rm: log.estimated1RM,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving big3 log:', error);
    throw error;
  }

  return data;
}

export async function getBig3Logs(exerciseId?: string) {
  if (!supabase) {
    return [];
  }

  let query = supabase
    .from('big3_logs')
    .select('*')
    .order('date', { ascending: false });

  if (exerciseId) {
    query = query.eq('exercise_id', exerciseId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching big3 logs:', error);
    throw error;
  }

  return data;
}
