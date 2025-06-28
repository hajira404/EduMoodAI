import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export interface MoodEntry {
  id: string
  mood: string
  emoji: string
  timestamp: string
  created_at: string
}

export function useMoodData() {
  const { user } = useAuth()
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchMoodHistory()
    } else {
      setMoodHistory([])
    }
  }, [user])

  const fetchMoodHistory = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error
      setMoodHistory(data || [])
    } catch (error) {
      console.error('Error fetching mood history:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveMoodEntry = async (mood: string, emoji: string) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .insert({
          user_id: user.id,
          mood,
          emoji,
          timestamp: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      // Update local state
      setMoodHistory(prev => [data, ...prev.slice(0, 9)])
      return data
    } catch (error) {
      console.error('Error saving mood entry:', error)
      throw error
    }
  }

  return {
    moodHistory,
    loading,
    saveMoodEntry,
    fetchMoodHistory
  }
}