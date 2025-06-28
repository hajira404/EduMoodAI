import React, { useState } from 'react'
import { User, LogOut, BarChart3, Calendar, Award, ChevronDown, ChevronUp } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useLearningProgress } from '../hooks/useLearningProgress'
import { useMoodData } from '../hooks/useMoodData'

export function UserProfile() {
  const { user, signOut } = useAuth()
  const { getCompletionStats, progressHistory } = useLearningProgress()
  const { moodHistory } = useMoodData()
  const [showStats, setShowStats] = useState(false)

  if (!user) return null

  const stats = getCompletionStats()
  const recentCompletions = progressHistory.filter(item => item.completed).slice(0, 3)

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-800">
              {user.user_metadata?.full_name || 'Welcome!'}
            </h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>

      <button
        onClick={() => setShowStats(!showStats)}
        className="flex items-center justify-between w-full text-left p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all duration-200"
      >
        <span className="font-medium text-gray-800">Your Learning Stats</span>
        {showStats ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {showStats && (
        <div className="mt-4 space-y-4">
          {/* Stats Overview */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-xl border border-green-200">
              <BarChart3 className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-green-700">{stats.completed}</div>
              <div className="text-xs text-green-600">Completed</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
              <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-blue-700">{moodHistory.length}</div>
              <div className="text-xs text-blue-600">Mood Entries</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-200">
              <Award className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-purple-700">{stats.completionRate}%</div>
              <div className="text-xs text-purple-600">Success Rate</div>
            </div>
          </div>

          {/* Recent Completions */}
          {recentCompletions.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Recent Achievements</h4>
              <div className="space-y-2">
                {recentCompletions.map((completion) => (
                  <div
                    key={completion.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        {completion.content_title}
                      </p>
                      <p className="text-xs text-gray-600">
                        {completion.mood_context} • {completion.content_type}
                      </p>
                    </div>
                    <div className="text-green-600">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}