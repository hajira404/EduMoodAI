import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      mood_entries: {
        Row: {
          id: string
          user_id: string
          mood: string
          emoji: string
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mood: string
          emoji: string
          timestamp?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mood?: string
          emoji?: string
          timestamp?: string
          created_at?: string
        }
      }
      learning_progress: {
        Row: {
          id: string
          user_id: string
          content_title: string
          content_type: string
          mood_context: string
          completed: boolean
          completion_date: string | null
          time_spent: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content_title: string
          content_type: string
          mood_context: string
          completed?: boolean
          completion_date?: string | null
          time_spent?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content_title?: string
          content_type?: string
          mood_context?: string
          completed?: boolean
          completion_date?: string | null
          time_spent?: number | null
          created_at?: string
        }
      }
    }
  }
}