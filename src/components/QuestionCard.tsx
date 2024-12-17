import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  isActive: boolean;
}

export function QuestionCard({ question, isActive }: QuestionCardProps) {
  return (
    <div className={`p-6 rounded-lg ${isActive ? 'bg-white shadow-lg' : 'bg-gray-50'}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Question {question.order + 1}
      </h3>
      <p className="text-gray-700 mb-4">{question.text}</p>
      <div className="text-sm text-gray-500">
        Time limit: {Math.floor(question.timeLimit / 60)}:{(question.timeLimit % 60).toString().padStart(2, '0')}
      </div>
    </div>
  );
}