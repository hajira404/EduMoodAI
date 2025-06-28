import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, Brain, BookOpen, Users, Zap, BarChart3, ChevronDown, ChevronUp, Loader2, AlertCircle, Play, FileText, Code, Download, Globe, ArrowLeft, CheckCircle, User } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useMoodData } from './hooks/useMoodData';
import { useLearningProgress } from './hooks/useLearningProgress';
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';

interface LearningContent {
  title: string;
  description: string;
  type: string;
  duration: string;
  link: string;
  fullContent?: FullContentData;
}

interface FullContentData {
  introduction: string;
  sections: ContentSection[];
  exercises?: Exercise[];
  resources?: Resource[];
  conclusion: string;
}

interface ContentSection {
  title: string;
  content: string;
  codeExample?: string;
  tips?: string[];
}

interface Exercise {
  question: string;
  answer: string;
  type: 'multiple-choice' | 'coding' | 'reflection';
  options?: string[];
}

interface Resource {
  title: string;
  url: string;
  type: string;
}

// Full content generation based on mood and topic
const generateFullContent = (title: string, mood: string, type: string): FullContentData => {
  const contentMap: Record<string, Record<string, FullContentData>> = {
    happy: {
      "Creative Problem Solving Workshop": {
        introduction: "Welcome to the Creative Problem Solving Workshop! Your positive energy is perfect for exploring innovative thinking techniques. Let's channel that enthusiasm into breakthrough solutions.",
        sections: [
          {
            title: "The Creative Mindset",
            content: "Creative problem solving starts with embracing curiosity and optimism. When you're in a positive mood, your brain is more open to making unexpected connections and seeing possibilities others might miss.",
            tips: [
              "Ask 'What if?' questions frequently",
              "Embrace wild ideas without immediate judgment",
              "Look for patterns in unrelated fields",
              "Use your positive energy to fuel brainstorming"
            ]
          },
          {
            title: "Brainstorming Techniques",
            content: "Effective brainstorming leverages your current positive state. Here are proven methods to generate innovative solutions:",
            tips: [
              "Mind mapping: Start with your problem in the center",
              "SCAMPER method: Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse",
              "Six thinking hats: Explore different perspectives",
              "Rapid ideation: Set a timer for 10 minutes and generate as many ideas as possible"
            ]
          },
          {
            title: "Implementation Strategy",
            content: "Transform your creative ideas into actionable solutions. Your positive mindset gives you the confidence to take risks and try new approaches.",
            codeExample: `// Creative Problem Solving Framework
function solveProblem(problem) {
  const ideas = brainstorm(problem);
  const filtered = filterIdeas(ideas);
  const prototype = createPrototype(filtered[0]);
  return testAndIterate(prototype);
}

function brainstorm(problem) {
  // Generate multiple creative solutions
  return ideas.map(idea => ({
    concept: idea,
    feasibility: assessFeasibility(idea),
    impact: assessImpact(idea)
  }));
}`
          }
        ],
        exercises: [
          {
            question: "Think of a current challenge you're facing. Use the SCAMPER method to generate 3 different approaches to solve it.",
            answer: "This is a reflection exercise. Consider how you can Substitute elements, Combine different approaches, Adapt existing solutions, Modify current methods, Put the problem to other uses, Eliminate unnecessary parts, or Reverse the typical approach.",
            type: "reflection"
          }
        ],
        resources: [
          { title: "Creative Confidence by IDEO", url: "https://www.ideo.com/post/creative-confidence", type: "Article" },
          { title: "Brainstorming Toolkit", url: "https://www.designkit.org/methods", type: "Toolkit" }
        ],
        conclusion: "Your positive energy is a powerful catalyst for creative problem solving. Keep nurturing that optimistic mindset and remember that every great solution started with someone willing to think differently!"
      },
      "Team Leadership Masterclass": {
        introduction: "Your positive energy makes you a natural leader! This masterclass will help you harness that enthusiasm to inspire and guide teams effectively.",
        sections: [
          {
            title: "Positive Leadership Principles",
            content: "Great leaders spread positivity and create environments where teams thrive. Your current mood is perfect for learning these essential leadership skills.",
            tips: [
              "Lead by example with your positive attitude",
              "Celebrate small wins to maintain team morale",
              "Practice active listening and empathy",
              "Provide constructive feedback with encouragement"
            ]
          },
          {
            title: "Communication Strategies",
            content: "Effective communication is the cornerstone of leadership. Learn how to convey your vision clearly and inspire others to follow.",
            tips: [
              "Use 'we' language to build team unity",
              "Ask open-ended questions to encourage participation",
              "Share your enthusiasm for the project's goals",
              "Adapt your communication style to different team members"
            ]
          }
        ],
        exercises: [
          {
            question: "What are the three most important qualities of a positive leader?",
            options: ["Empathy, Vision, Integrity", "Authority, Control, Efficiency", "Intelligence, Speed, Perfection", "Charisma, Wealth, Experience"],
            answer: "Empathy, Vision, Integrity",
            type: "multiple-choice"
          }
        ],
        conclusion: "Your positive energy is your greatest leadership asset. Use it to inspire, motivate, and create positive change in your team and organization!"
      }
    },
    neutral: {
      "Deep Learning Fundamentals": {
        introduction: "Your focused, neutral state is perfect for absorbing complex technical concepts. Let's dive deep into the fascinating world of neural networks and artificial intelligence.",
        sections: [
          {
            title: "What is Deep Learning?",
            content: "Deep learning is a subset of machine learning that uses artificial neural networks with multiple layers to model and understand complex patterns in data. It's inspired by how the human brain processes information.",
            tips: [
              "Think of neural networks as interconnected nodes, like neurons",
              "Each layer learns increasingly complex features",
              "Deep learning excels at pattern recognition",
              "It requires large amounts of data to train effectively"
            ]
          },
          {
            title: "Neural Network Architecture",
            content: "Understanding the basic structure of neural networks is crucial. Each network consists of input layers, hidden layers, and output layers.",
            codeExample: `import tensorflow as tf
from tensorflow import keras

# Simple neural network model
model = keras.Sequential([
    keras.layers.Dense(128, activation='relu', input_shape=(784,)),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])`,
            tips: [
              "Start with simple architectures before going complex",
              "Activation functions introduce non-linearity",
              "Dropout helps prevent overfitting",
              "Choose the right optimizer for your problem"
            ]
          },
          {
            title: "Training Process",
            content: "Training a neural network involves feeding it data, calculating errors, and adjusting weights through backpropagation. This process repeats until the model learns the patterns.",
            tips: [
              "Split your data into training, validation, and test sets",
              "Monitor both training and validation loss",
              "Use early stopping to prevent overfitting",
              "Experiment with different learning rates"
            ]
          }
        ],
        exercises: [
          {
            question: "Write a simple Python function that implements a basic perceptron (single neuron) with sigmoid activation.",
            answer: `def perceptron(inputs, weights, bias):
    import math
    weighted_sum = sum(x * w for x, w in zip(inputs, weights)) + bias
    return 1 / (1 + math.exp(-weighted_sum))  # Sigmoid activation`,
            type: "coding"
          }
        ],
        conclusion: "Deep learning is a powerful tool that's revolutionizing AI. Your methodical approach to learning these concepts will serve you well as you explore more advanced topics!"
      }
    },
    sad: {
      "Fun Python Projects": {
        introduction: "Sometimes when we're feeling down, the best medicine is creating something fun and engaging. Let's build some delightful Python projects that will lift your spirits and boost your confidence!",
        sections: [
          {
            title: "Simple Calculator",
            content: "Let's start with a friendly calculator that can perform basic operations. Building something functional always feels rewarding!",
            codeExample: `def calculator():
    print("🧮 Welcome to your friendly calculator! 🧮")
    
    while True:
        try:
            num1 = float(input("Enter first number: "))
            operation = input("Choose operation (+, -, *, /) or 'quit': ")
            
            if operation == 'quit':
                print("Thanks for calculating with me! 😊")
                break
                
            num2 = float(input("Enter second number: "))
            
            if operation == '+':
                result = num1 + num2
            elif operation == '-':
                result = num1 - num2
            elif operation == '*':
                result = num1 * num2
            elif operation == '/':
                result = num1 / num2 if num2 != 0 else "Cannot divide by zero!"
            
            print(f"Result: {result} ✨")
            
        except ValueError:
            print("Please enter valid numbers! 🤗")

calculator()`,
            tips: [
              "Add colorful emojis to make it more cheerful",
              "Include error handling for a smooth experience",
              "Consider adding more operations like square root",
              "Make the interface friendly and encouraging"
            ]
          },
          {
            title: "Mood Tracker",
            content: "Create a simple mood tracking app that helps you monitor your emotional journey. Sometimes seeing patterns can be surprisingly uplifting!",
            codeExample: `import datetime
import json

def mood_tracker():
    moods = []
    
    print("🌈 Daily Mood Tracker 🌈")
    print("Track your feelings and see your progress!")
    
    while True:
        action = input("\\n1. Log mood\\n2. View history\\n3. Quit\\nChoose: ")
        
        if action == '1':
            mood = input("How are you feeling? (1-10): ")
            note = input("Any notes about today? ")
            
            entry = {
                'date': str(datetime.date.today()),
                'mood': mood,
                'note': note
            }
            moods.append(entry)
            print("Mood logged! You're doing great! 🌟")
            
        elif action == '2':
            print("\\n📊 Your Mood History:")
            for entry in moods:
                print(f"{entry['date']}: {entry['mood']}/10 - {entry['note']}")
                
        elif action == '3':
            print("Keep tracking your journey! You've got this! 💪")
            break

mood_tracker()`
          }
        ],
        exercises: [
          {
            question: "Create a simple compliment generator that displays a random encouraging message each time it's run.",
            answer: `import random

compliments = [
    "You're doing amazing! 🌟",
    "Your code is getting better every day! 💻",
    "You have great problem-solving skills! 🧩",
    "Keep up the fantastic work! 🚀",
    "You're more capable than you know! 💪"
]

def compliment_generator():
    return random.choice(compliments)

print(compliment_generator())`,
            type: "coding"
          }
        ],
        conclusion: "Remember, every expert was once a beginner. These small projects are building blocks to bigger achievements. You're doing better than you think! 🌈"
      }
    },
    angry: {
      "Emotional Intelligence Mastery": {
        introduction: "Your intense feelings right now are actually a powerful source of energy. Let's learn how to channel that intensity into emotional intelligence and better decision-making.",
        sections: [
          {
            title: "Understanding Your Emotions",
            content: "Anger often signals that something important to you is being threatened or violated. Instead of suppressing it, let's learn to understand and redirect this energy constructively.",
            tips: [
              "Recognize anger as information, not just emotion",
              "Identify the underlying need or value being threatened",
              "Use the energy to fuel positive change",
              "Practice the pause between trigger and response"
            ]
          },
          {
            title: "The STOP Technique",
            content: "When you feel anger rising, use this powerful technique to regain control and respond thoughtfully rather than react impulsively.",
            tips: [
              "S - Stop what you're doing",
              "T - Take a deep breath",
              "O - Observe your thoughts and feelings",
              "P - Proceed with intention and wisdom"
            ]
          },
          {
            title: "Transforming Anger into Action",
            content: "Your anger can be a catalyst for positive change. Learn to harness this energy to solve problems and improve situations.",
            codeExample: `// Emotional Processing Algorithm
function processEmotion(trigger, intensity) {
  const analysis = {
    trigger: trigger,
    intensity: intensity,
    underlyingNeed: identifyNeed(trigger),
    actionPlan: createActionPlan(trigger)
  };
  
  return {
    emotion: 'anger',
    energy: intensity,
    constructiveAction: analysis.actionPlan,
    growth: 'increased emotional intelligence'
  };
}

function identifyNeed(trigger) {
  // What value or need is being threatened?
  return analyzeCore(trigger);
}`
          }
        ],
        exercises: [
          {
            question: "Think about what triggered your current anger. What underlying need or value might be threatened? How can you address this constructively?",
            answer: "This is a personal reflection. Consider whether it's about fairness, respect, autonomy, security, or another core value. Then think of one constructive action you can take to address the root cause.",
            type: "reflection"
          }
        ],
        conclusion: "Your anger is not your enemy - it's information and energy. Use it wisely, and it becomes a powerful tool for positive change and personal growth."
      }
    },
    tired: {
      "Quick Learning Bites": {
        introduction: "When energy is low, we can still make meaningful progress with bite-sized learning. These micro-lessons are designed to be gentle on your tired mind while still being valuable.",
        sections: [
          {
            title: "The Power of Micro-Learning",
            content: "Research shows that learning in small chunks can be more effective than long study sessions, especially when you're tired. Your brain can process and retain information better in short bursts.",
            tips: [
              "Focus on one concept at a time",
              "Use the Pomodoro technique: 10 minutes learning, 5 minutes rest",
              "Choose visual or audio content when reading feels difficult",
              "Celebrate small wins to maintain motivation"
            ]
          },
          {
            title: "5-Minute Productivity Hack",
            content: "Even when tired, you can boost your productivity with this simple technique that works with your low energy rather than against it.",
            tips: [
              "Choose the easiest task on your list",
              "Set a timer for just 5 minutes",
              "Give yourself permission to stop after 5 minutes",
              "Often you'll find you want to continue once you start"
            ]
          },
          {
            title: "Gentle Learning Strategies",
            content: "When your energy is low, adapt your learning style to match your current capacity. This isn't giving up - it's being smart about your resources.",
            codeExample: `// Energy-Adaptive Learning Function
function adaptLearning(energyLevel) {
  if (energyLevel < 3) {
    return {
      method: 'passive',
      duration: '5-10 minutes',
      content: ['audio', 'visual', 'review'],
      breaks: 'frequent'
    };
  } else if (energyLevel < 6) {
    return {
      method: 'light-active',
      duration: '15-20 minutes',
      content: ['reading', 'simple exercises'],
      breaks: 'regular'
    };
  }
  // Higher energy levels...
}`
          }
        ],
        exercises: [
          {
            question: "What's one small thing you can learn or accomplish in the next 5 minutes that would make you feel good?",
            answer: "This could be reading one article paragraph, organizing one folder, writing one sentence, or learning one new word. The key is choosing something achievable that gives you a sense of progress.",
            type: "reflection"
          }
        ],
        conclusion: "Rest is productive too. By honoring your energy levels and learning gently, you're building sustainable habits that will serve you well in the long run."
      }
    }
  };

  return contentMap[mood]?.[title] || {
    introduction: "Welcome to this learning experience!",
    sections: [
      {
        title: "Getting Started",
        content: "This content is being generated based on your current mood and learning preferences.",
        tips: ["Take your time", "Learn at your own pace", "Apply what you learn"]
      }
    ],
    conclusion: "Keep learning and growing!"
  };
};

// Mock API data for different moods
const mockApiData: Record<string, LearningContent[]> = {
  happy: [
    {
      title: "Creative Problem Solving Workshop",
      description: "Channel your positive energy into innovative thinking techniques and brainstorming methods.",
      type: "Interactive Course",
      duration: "25 mins",
      link: "generated-content"
    },
    {
      title: "Team Leadership Masterclass",
      description: "Learn to spread positivity and lead effective group projects with confidence.",
      type: "Video Series",
      duration: "35 mins",
      link: "generated-content"
    },
    {
      title: "Public Speaking Confidence",
      description: "Use your upbeat mood to master the art of presentation and communication.",
      type: "Live Workshop",
      duration: "40 mins",
      link: "generated-content"
    },
    {
      title: "Innovation Challenge",
      description: "Participate in creative challenges that spark new ideas and solutions.",
      type: "Code Playground",
      duration: "30 mins",
      link: "generated-content"
    }
  ],
  neutral: [
    {
      title: "Deep Learning Fundamentals",
      description: "Perfect focus state for absorbing complex AI concepts and neural networks.",
      type: "Article Series",
      duration: "45 mins",
      link: "generated-content"
    },
    {
      title: "Data Analysis with Python",
      description: "Methodical approach to understanding data patterns and statistical analysis.",
      type: "Code Tutorial",
      duration: "50 mins",
      link: "generated-content"
    },
    {
      title: "Research Methodology Guide",
      description: "Build systematic thinking and analytical skills for academic success.",
      type: "Downloadable PDF",
      duration: "30 mins",
      link: "generated-content"
    },
    {
      title: "Algorithm Design Patterns",
      description: "Learn efficient problem-solving approaches in computer science.",
      type: "Interactive Course",
      duration: "60 mins",
      link: "generated-content"
    }
  ],
  sad: [
    {
      title: "Fun Python Projects",
      description: "Try small creative projects like a calculator or quiz game to lift your spirits.",
      type: "Code Playground",
      duration: "20 mins",
      link: "generated-content"
    },
    {
      title: "Motivational TED Talk",
      description: "Watch an inspiring talk on growth through learning and overcoming challenges.",
      type: "Video",
      duration: "18 mins",
      link: "generated-content"
    },
    {
      title: "Self-Care Checklist for Learners",
      description: "Simple steps to balance stress and study while maintaining mental wellness.",
      type: "Downloadable PDF",
      duration: "5 mins",
      link: "generated-content"
    },
    {
      title: "Mindfulness & Focus Meditation",
      description: "Gentle introduction to concentration and self-awareness practices.",
      type: "Audio Guide",
      duration: "15 mins",
      link: "generated-content"
    },
    {
      title: "Personal Growth Stories",
      description: "Inspiring journeys of resilience and transformation from real people.",
      type: "Article",
      duration: "12 mins",
      link: "generated-content"
    }
  ],
  angry: [
    {
      title: "Emotional Intelligence Mastery",
      description: "Transform intense feelings into productive energy and better decision-making.",
      type: "Interactive Course",
      duration: "25 mins",
      link: "generated-content"
    },
    {
      title: "Conflict Resolution Strategies",
      description: "Channel frustration into effective problem-solving and communication skills.",
      type: "Video Workshop",
      duration: "30 mins",
      link: "generated-content"
    },
    {
      title: "Stress Management Techniques",
      description: "Learn healthy ways to process and redirect strong emotions.",
      type: "Article",
      duration: "15 mins",
      link: "generated-content"
    },
    {
      title: "Physical Wellness Break",
      description: "Movement and exercise routines to release tension productively.",
      type: "Video Guide",
      duration: "20 mins",
      link: "generated-content"
    },
    {
      title: "Assertiveness Training",
      description: "Learn to express yourself clearly and confidently in challenging situations.",
      type: "Interactive Course",
      duration: "35 mins",
      link: "generated-content"
    }
  ],
  tired: [
    {
      title: "Quick Learning Bites",
      description: "Bite-sized lessons perfect for low-energy moments and easy absorption.",
      type: "Micro-Learning",
      duration: "10 mins",
      link: "generated-content"
    },
    {
      title: "Relaxing Audio Learning",
      description: "Passive learning through engaging podcasts and soothing educational content.",
      type: "Podcast",
      duration: "25 mins",
      link: "generated-content"
    },
    {
      title: "Gentle Productivity Tips",
      description: "Low-intensity skills for maintaining momentum without overwhelming yourself.",
      type: "Article",
      duration: "8 mins",
      link: "generated-content"
    },
    {
      title: "Power Nap Science",
      description: "Learn the optimal way to rest and recharge for better learning.",
      type: "Video",
      duration: "12 mins",
      link: "generated-content"
    },
    {
      title: "Energy Boosting Snacks Guide",
      description: "Nutrition tips to naturally increase your energy and focus.",
      type: "Downloadable PDF",
      duration: "5 mins",
      link: "generated-content"
    }
  ]
};

const motivationalQuotes = [
  "Every emotion is a step toward growth.",
  "Your feelings are valid, and so is your potential.",
  "Learning adapts to you, not the other way around.",
  "Progress isn't linear, but it's always meaningful.",
  "Today's mood is tomorrow's strength."
];

// Mock API function to simulate real API calls
const fetchLearningContent = async (mood: string): Promise<LearningContent[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // Simulate occasional API failures (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('API Error');
  }
  
  return mockApiData[mood] || [];
};

const getContentTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'video':
    case 'video series':
    case 'video workshop':
    case 'video guide':
      return <Play className="w-4 h-4" />;
    case 'article':
    case 'article series':
      return <FileText className="w-4 h-4" />;
    case 'code playground':
    case 'code tutorial':
      return <Code className="w-4 h-4" />;
    case 'downloadable pdf':
      return <Download className="w-4 h-4" />;
    case 'podcast':
    case 'audio guide':
      return <Zap className="w-4 h-4" />;
    case 'interactive course':
    case 'live workshop':
      return <Users className="w-4 h-4" />;
    default:
      return <Globe className="w-4 h-4" />;
  }
};

const getContentTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'video':
    case 'video series':
    case 'video workshop':
    case 'video guide':
      return 'bg-red-100 text-red-700';
    case 'article':
    case 'article series':
      return 'bg-blue-100 text-blue-700';
    case 'code playground':
    case 'code tutorial':
      return 'bg-green-100 text-green-700';
    case 'downloadable pdf':
      return 'bg-purple-100 text-purple-700';
    case 'podcast':
    case 'audio guide':
      return 'bg-orange-100 text-orange-700';
    case 'interactive course':
    case 'live workshop':
      return 'bg-indigo-100 text-indigo-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

function App() {
  const { user, loading: authLoading } = useAuth();
  const { moodHistory, saveMoodEntry } = useMoodData();
  const { saveProgress, markAsCompleted } = useLearningProgress();
  
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [showHistory, setShowHistory] = useState(false);
  const [learningContent, setLearningContent] = useState<LearningContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>('');
  const [selectedContent, setSelectedContent] = useState<LearningContent | null>(null);
  const [showFullContent, setShowFullContent] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentProgressId, setCurrentProgressId] = useState<string | null>(null);
  const [contentStartTime, setContentStartTime] = useState<number | null>(null);

  const moods = [
    { key: 'happy', emoji: '😊', label: 'Happy' },
    { key: 'neutral', emoji: '😐', label: 'Neutral' },
    { key: 'sad', emoji: '😔', label: 'Sad' },
    { key: 'angry', emoji: '😠', label: 'Angry' },
    { key: 'tired', emoji: '😴', label: 'Tired' }
  ];

  const handleMoodSelect = async (moodKey: string, emoji: string, label: string) => {
    setSelectedMood(moodKey);
    setIsLoading(true);
    setApiError('');
    setShowFullContent(false);
    
    // Save mood entry if user is authenticated
    if (user) {
      try {
        await saveMoodEntry(label, emoji);
      } catch (error) {
        console.error('Error saving mood entry:', error);
      }
    }

    try {
      const content = await fetchLearningContent(moodKey);
      setLearningContent(content);
    } catch (error) {
      setApiError("Oops! Couldn't load learning content right now.");
      setLearningContent([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentClick = async (content: LearningContent) => {
    if (content.link === "generated-content") {
      const fullContent = generateFullContent(content.title, selectedMood, content.type);
      setSelectedContent({ ...content, fullContent });
      setShowFullContent(true);
      setContentStartTime(Date.now());

      // Save learning progress if user is authenticated
      if (user) {
        try {
          const progressEntry = await saveProgress(
            content.title,
            content.type,
            selectedMood,
            false
          );
          if (progressEntry) {
            setCurrentProgressId(progressEntry.id);
          }
        } catch (error) {
          console.error('Error saving learning progress:', error);
        }
      }
    } else {
      window.open(content.link, '_blank');
    }
  };

  const handleContentCompletion = async () => {
    if (user && currentProgressId && contentStartTime) {
      try {
        const timeSpent = Math.round((Date.now() - contentStartTime) / 1000); // in seconds
        await markAsCompleted(currentProgressId, timeSpent);
        setCurrentProgressId(null);
        setContentStartTime(null);
      } catch (error) {
        console.error('Error marking content as completed:', error);
      }
    }
    setShowFullContent(false);
  };

  const selectedMoodData = moods.find(m => m.key === selectedMood);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 animate-pulse">
          <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-6 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
          <div className="flex justify-between mb-6">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );

  // Full Content View Component
  const FullContentView = () => {
    if (!selectedContent?.fullContent) return null;

    const { fullContent } = selectedContent;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
        <div className="min-h-screen py-8 px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-t-3xl">
              <button
                onClick={() => setShowFullContent(false)}
                className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Learning Path
              </button>
              <h1 className="text-3xl font-bold mb-2">{selectedContent.title}</h1>
              <p className="text-white/90">{selectedContent.description}</p>
              <div className="flex items-center mt-4 space-x-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {selectedContent.type}
                </span>
                <span className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedContent.duration}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Introduction */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-purple-200">
                <h2 className="text-xl font-bold text-purple-800 mb-3">Introduction</h2>
                <p className="text-gray-700 leading-relaxed">{fullContent.introduction}</p>
              </div>

              {/* Sections */}
              {fullContent.sections.map((section, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{section.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
                  
                  {section.codeExample && (
                    <div className="bg-gray-900 text-green-400 p-4 rounded-xl mb-4 overflow-x-auto">
                      <pre className="text-sm"><code>{section.codeExample}</code></pre>
                    </div>
                  )}
                  
                  {section.tips && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">💡 Key Tips:</h4>
                      <ul className="space-y-1">
                        {section.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-yellow-700 text-sm flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              {/* Exercises */}
              {fullContent.exercises && fullContent.exercises.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">🎯 Practice Exercises</h3>
                  {fullContent.exercises.map((exercise, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <p className="font-medium text-green-700 mb-2">{exercise.question}</p>
                      {exercise.options && (
                        <div className="space-y-1 mb-2">
                          {exercise.options.map((option, optIndex) => (
                            <div key={optIndex} className="text-sm text-green-600">
                              {String.fromCharCode(65 + optIndex)}. {option}
                            </div>
                          ))}
                        </div>
                      )}
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm text-green-600 hover:text-green-700">
                          Show Answer
                        </summary>
                        <div className="mt-2 p-3 bg-white rounded-lg border border-green-200">
                          <pre className="text-sm text-gray-700 whitespace-pre-wrap">{exercise.answer}</pre>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              )}

              {/* Resources */}
              {fullContent.resources && fullContent.resources.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">📚 Additional Resources</h3>
                  <div className="space-y-2">
                    {fullContent.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        {resource.title} ({resource.type})
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Conclusion */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
                <h3 className="text-xl font-bold text-purple-800 mb-3">🎉 Conclusion</h3>
                <p className="text-gray-700 leading-relaxed">{fullContent.conclusion}</p>
              </div>

              {/* Completion Button */}
              <div className="text-center">
                <button
                  onClick={handleContentCompletion}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Mark as Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading EduMoodAI...</p>
        </div>
      </div>
    );
  }

  if (showFullContent) {
    return <FullContentView />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20"></div>
        <div className="relative px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              EduMoodAI
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-medium mb-6">
              Your Mood. Your Path. Your Progress.
            </p>
            
            {/* Auth Button */}
            {!user && (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto"
              >
                <User className="w-5 h-5 mr-2" />
                Sign In to Save Progress
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* User Profile Section */}
        {user && <UserProfile />}

        {/* Mood Detection Section */}
        <section className="text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 sm:p-10 transform hover:scale-105 transition-all duration-300">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
              How are you feeling today?
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6 mb-8">
              {moods.map((mood) => (
                <button
                  key={mood.key}
                  onClick={() => handleMoodSelect(mood.key, mood.emoji, mood.label)}
                  disabled={isLoading}
                  className={`group relative p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedMood === mood.key
                      ? 'border-purple-400 bg-purple-50 shadow-xl shadow-purple-200/50'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-lg'
                  }`}
                >
                  <div className="text-3xl sm:text-4xl mb-2 group-hover:animate-bounce">
                    {mood.emoji}
                  </div>
                  <div className={`text-sm sm:text-base font-medium transition-colors ${
                    selectedMood === mood.key ? 'text-purple-700' : 'text-gray-700'
                  }`}>
                    {mood.label}
                  </div>
                  {selectedMood === mood.key && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Hidden input field for selected mood */}
            <input 
              type="hidden" 
              name="selectedMood" 
              value={selectedMood} 
              readOnly 
            />

            {selectedMood && selectedMoodData && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border border-purple-200">
                <p className="text-lg font-medium text-purple-800">
                  You're feeling {selectedMoodData.label}! {selectedMoodData.emoji}
                </p>
                <p className="text-purple-600 mt-2">
                  Let's explore your personalized learning path.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Recommended Learning Path Section */}
        {selectedMood && (
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Recommended for You
              </h2>
              <p className="text-gray-600">
                Curated learning experiences that match your current mood
              </p>
            </div>

            {isLoading && (
              <div className="flex items-center justify-center mb-8">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600 mr-3" />
                <span className="text-lg text-gray-600">Loading personalized content...</span>
              </div>
            )}

            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
                <span className="text-red-700 font-medium">{apiError}</span>
              </div>
            )}

            {isLoading ? (
              <LoadingSkeleton />
            ) : learningContent.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningContent.map((content, index) => (
                  <div
                    key={index}
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 opacity-0 animate-fade-in"
                    style={{ 
                      animationDelay: `${index * 150}ms`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                      {getContentTypeIcon(content.type)}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors">
                      {content.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {content.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {content.duration}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getContentTypeColor(content.type)}`}>
                        {getContentTypeIcon(content.type)}
                        {content.type}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleContentClick(content)}
                      className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                    >
                      Start Learning
                    </button>
                  </div>
                ))}
              </div>
            ) : selectedMood && !isLoading && !apiError && (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No content available for this mood yet.</p>
              </div>
            )}
          </section>
        )}

        {/* Progress Tracker Section */}
        {moodHistory.length > 0 && (
          <section>
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center justify-center w-full text-2xl font-bold text-gray-800 mb-6 hover:text-purple-700 transition-colors"
              >
                Your Mood History
                {showHistory ? (
                  <ChevronUp className="w-6 h-6 ml-2" />
                ) : (
                  <ChevronDown className="w-6 h-6 ml-2" />
                )}
              </button>

              {showHistory && (
                <div className="space-y-4 mb-8">
                  {moodHistory.slice(0, 5).map((entry, index) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 transform hover:scale-102 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{entry.emoji}</span>
                        <div>
                          <p className="font-medium text-gray-800">{entry.mood}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-center p-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-2xl border border-purple-200">
                <p className="text-lg font-medium text-purple-800">
                  {motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}
                </p>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 bg-white/50 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600 font-medium">
            Made with ❤️ by Hajira for the AI Hackathon
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;