import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export interface LearningProgressEntry {
  id: string
  content_title: string
  content_type: string
  mood_context: string
  completed: boolean
  completion_date: string | null
  time_spent: number | null
  created_at: string
}

export function useLearningProgress() {
  const { user } = useAuth()
  const [progressHistory, setProgressHistory] = useState<LearningProgressEntry[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchProgressHistory()
    } else {
      setProgressHistory([])
    }
  }, [user])

  const fetchProgressHistory = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error
      setProgressHistory(data || [])
    } catch (error) {
      console.error('Error fetching learning progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveProgress = async (
    contentTitle: string,
    contentType: string,
    moodContext: string,
    completed: boolean = false,
    timeSpent: number | null = null
  ) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('learning_progress')
        .insert({
          user_id: user.id,
          content_title: contentTitle,
          content_type: contentType,
          mood_context: moodContext,
          completed,
          completion_date: completed ? new Date().toISOString() : null,
          time_spent: timeSpent
        })
        .select()
        .single()

      if (error) throw error

      // Update local state
      setProgressHistory(prev => [data, ...prev])
      return data
    } catch (error) {
      console.error('Error saving learning progress:', error)
      throw error
    }
  }

  const markAsCompleted = async (progressId: string, timeSpent: number | null = null) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('learning_progress')
        .update({
          completed: true,
          completion_date: new Date().toISOString(),
          time_spent: timeSpent
        })
        .eq('id', progressId)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error

      // Update local state
      setProgressHistory(prev =>
        prev.map(item => item.id === progressId ? data : item)
      )
      return data
    } catch (error) {
      console.error('Error marking progress as completed:', error)
      throw error
    }
  }

  const getCompletionStats = () => {
    const total = progressHistory.length
    const completed = progressHistory.filter(item => item.completed).length
    const completionRate = total > 0 ? (completed / total) * 100 : 0

    return {
      total,
      completed,
      completionRate: Math.round(completionRate)
    }
  }

  return {
    progressHistory,
    loading,
    saveProgress,
    markAsCompleted,
    fetchProgressHistory,
    getCompletionStats
  }
}