import React, { useState } from 'react';
import { VideoRecorder } from './components/VideoRecorder';
import { QuestionCard } from './components/QuestionCard';
import { Question, Recording } from './types';

// Sample questions (in a real app, these would come from an API)
const sampleQuestions: Question[] = [
  {
    id: '1',
    text: 'Tell us about yourself and your background.',
    timeLimit: 120, // 2 minutes
    order: 0,
  },
  {
    id: '2',
    text: 'What interests you most about this position?',
    timeLimit: 90, // 1.5 minutes
    order: 1,
  },
  {
    id: '3',
    text: 'Describe a challenging situation you've faced and how you handled it.',
    timeLimit: 180, // 3 minutes
    order: 2,
  },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleRecordingComplete = (blob: Blob) => {
    const currentQuestion = sampleQuestions[currentQuestionIndex];
    
    setRecordings(prev => [...prev, {
      questionId: currentQuestion.id,
      videoBlob: blob,
      duration: currentQuestion.timeLimit,
    }]);

    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Interview Complete!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for completing your video interview. Your responses have been recorded.
          </p>
          <p className="text-sm text-gray-500">
            You may now close this window.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Video Interview
          </h1>
          <p className="text-gray-600">
            Question {currentQuestionIndex + 1} of {sampleQuestions.length}
          </p>
        </header>

        <div className="space-y-6">
          {sampleQuestions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              isActive={index === currentQuestionIndex}
            />
          ))}
        </div>

        <VideoRecorder
          onRecordingComplete={handleRecordingComplete}
          timeLimit={sampleQuestions[currentQuestionIndex].timeLimit}
          isActive={true}
        />
      </div>
    </div>
  );
}

export default App;