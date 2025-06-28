/*
  # Create learning progress table

  1. New Tables
    - `learning_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `content_title` (text, title of the learning content)
      - `content_type` (text, type like "Video", "Article", etc.)
      - `mood_context` (text, the mood when content was started)
      - `completed` (boolean, whether content was completed)
      - `completion_date` (timestamptz, when content was completed)
      - `time_spent` (integer, time spent in seconds)
      - `created_at` (timestamptz, when the record was created)

  2. Security
    - Enable RLS on `learning_progress` table
    - Add policies for users to manage their own learning progress
*/

CREATE TABLE IF NOT EXISTS learning_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content_title text NOT NULL,
  content_type text NOT NULL,
  mood_context text NOT NULL,
  completed boolean DEFAULT false,
  completion_date timestamptz,
  time_spent integer, -- in seconds
  created_at timestamptz DEFAULT now()
);

ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own learning progress
CREATE POLICY "Users can read own learning progress"
  ON learning_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to insert their own learning progress
CREATE POLICY "Users can insert own learning progress"
  ON learning_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own learning progress
CREATE POLICY "Users can update own learning progress"
  ON learning_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to delete their own learning progress
CREATE POLICY "Users can delete own learning progress"
  ON learning_progress
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS learning_progress_user_id_created_at_idx 
ON learning_progress(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS learning_progress_user_id_completed_idx 
ON learning_progress(user_id, completed);

CREATE INDEX IF NOT EXISTS learning_progress_user_id_mood_context_idx 
ON learning_progress(user_id, mood_context);