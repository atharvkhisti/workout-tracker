-- Workout Tracker Database Schema
-- Run this in your Supabase SQL editor to create the tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Workout logs table
CREATE TABLE IF NOT EXISTS workout_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  date DATE NOT NULL,
  day_id TEXT NOT NULL,
  exercise_id TEXT NOT NULL,
  sets JSONB NOT NULL,
  total_volume NUMERIC NOT NULL,
  user_id UUID REFERENCES auth.users(id)
);

-- Body metrics table
CREATE TABLE IF NOT EXISTS body_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  date DATE NOT NULL,
  weight NUMERIC NOT NULL,
  body_fat NUMERIC DEFAULT 0,
  muscle_percent NUMERIC DEFAULT 0,
  user_id UUID REFERENCES auth.users(id)
);

-- Big 3 lifts tracking table
CREATE TABLE IF NOT EXISTS big3_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  date DATE NOT NULL,
  exercise_id TEXT NOT NULL,
  weight NUMERIC NOT NULL,
  reps INTEGER NOT NULL,
  estimated_1rm NUMERIC NOT NULL,
  user_id UUID REFERENCES auth.users(id)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_workout_logs_date ON workout_logs(date DESC);
CREATE INDEX IF NOT EXISTS idx_workout_logs_exercise ON workout_logs(exercise_id);
CREATE INDEX IF NOT EXISTS idx_body_metrics_date ON body_metrics(date DESC);
CREATE INDEX IF NOT EXISTS idx_big3_logs_date ON big3_logs(date DESC);
CREATE INDEX IF NOT EXISTS idx_big3_logs_exercise ON big3_logs(exercise_id);

-- Enable Row Level Security (optional, for multi-user support)
ALTER TABLE workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE body_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE big3_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies (uncomment when adding authentication)
-- CREATE POLICY "Users can view their own workout logs"
--   ON workout_logs FOR SELECT
--   USING (auth.uid() = user_id);

-- CREATE POLICY "Users can insert their own workout logs"
--   ON workout_logs FOR INSERT
--   WITH CHECK (auth.uid() = user_id);
