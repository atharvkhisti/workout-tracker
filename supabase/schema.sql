-- Workout Tracker Database Schema with Authentication
-- Run this in your Supabase SQL editor

-- First, drop existing tables and policies (if any)
DROP POLICY IF EXISTS "Allow all access to workout_logs" ON workout_logs;
DROP POLICY IF EXISTS "Allow all access to body_metrics" ON body_metrics;
DROP POLICY IF EXISTS "Allow all access to big3_logs" ON big3_logs;
DROP TABLE IF EXISTS workout_logs;
DROP TABLE IF EXISTS body_metrics;
DROP TABLE IF EXISTS big3_logs;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Workout logs table with user_id
CREATE TABLE workout_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  date TEXT NOT NULL,
  day_id TEXT NOT NULL,
  slot_position INTEGER DEFAULT 0,
  exercise_id TEXT NOT NULL,
  sets JSONB NOT NULL,
  total_volume NUMERIC NOT NULL,
  progress_status TEXT DEFAULT 'same'
);

-- Body metrics table with user_id
CREATE TABLE body_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  date TEXT NOT NULL,
  weight NUMERIC NOT NULL,
  body_fat NUMERIC DEFAULT 0,
  muscle_percent NUMERIC DEFAULT 0
);

-- Big 3 lifts tracking table with user_id
CREATE TABLE big3_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  date TEXT NOT NULL,
  exercise_id TEXT NOT NULL,
  weight NUMERIC NOT NULL,
  reps INTEGER NOT NULL,
  estimated_1rm NUMERIC NOT NULL
);

-- Create indexes for faster queries
CREATE INDEX idx_workout_logs_user ON workout_logs(user_id);
CREATE INDEX idx_workout_logs_date ON workout_logs(date DESC);
CREATE INDEX idx_workout_logs_exercise ON workout_logs(exercise_id);
CREATE INDEX idx_body_metrics_user ON body_metrics(user_id);
CREATE INDEX idx_body_metrics_date ON body_metrics(date DESC);
CREATE INDEX idx_big3_logs_user ON big3_logs(user_id);
CREATE INDEX idx_big3_logs_date ON big3_logs(date DESC);
CREATE INDEX idx_big3_logs_exercise ON big3_logs(exercise_id);

-- Enable Row Level Security
ALTER TABLE workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE body_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE big3_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own data
CREATE POLICY "Users can view own workout_logs"
  ON workout_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own workout_logs"
  ON workout_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workout_logs"
  ON workout_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own workout_logs"
  ON workout_logs FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own body_metrics"
  ON body_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own body_metrics"
  ON body_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own body_metrics"
  ON body_metrics FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own body_metrics"
  ON body_metrics FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own big3_logs"
  ON big3_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own big3_logs"
  ON big3_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own big3_logs"
  ON big3_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own big3_logs"
  ON big3_logs FOR DELETE
  USING (auth.uid() = user_id);
