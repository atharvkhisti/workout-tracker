export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      workout_logs: {
        Row: {
          id: string
          created_at: string
          date: string
          day_id: string
          exercise_id: string
          sets: Json
          total_volume: number
          user_id?: string
        }
        Insert: {
          id?: string
          created_at?: string
          date: string
          day_id: string
          exercise_id: string
          sets: Json
          total_volume: number
          user_id?: string
        }
        Update: {
          id?: string
          created_at?: string
          date?: string
          day_id?: string
          exercise_id?: string
          sets?: Json
          total_volume?: number
          user_id?: string
        }
      }
      body_metrics: {
        Row: {
          id: string
          created_at: string
          date: string
          weight: number
          body_fat: number
          muscle_percent: number
          user_id?: string
        }
        Insert: {
          id?: string
          created_at?: string
          date: string
          weight: number
          body_fat?: number
          muscle_percent?: number
          user_id?: string
        }
        Update: {
          id?: string
          created_at?: string
          date?: string
          weight?: number
          body_fat?: number
          muscle_percent?: number
          user_id?: string
        }
      }
      big3_logs: {
        Row: {
          id: string
          created_at: string
          date: string
          exercise_id: string
          weight: number
          reps: number
          estimated_1rm: number
          user_id?: string
        }
        Insert: {
          id?: string
          created_at?: string
          date: string
          exercise_id: string
          weight: number
          reps: number
          estimated_1rm: number
          user_id?: string
        }
        Update: {
          id?: string
          created_at?: string
          date?: string
          exercise_id?: string
          weight?: number
          reps?: number
          estimated_1rm?: number
          user_id?: string
        }
      }
    }
  }
}
