export interface Question {
  id: string;
  text: string;
  timeLimit: number; // in seconds
  order: number;
}

export interface Recording {
  questionId: string;
  videoBlob: Blob;
  duration: number;
}

export interface InterviewSession {
  id: string;
  candidateEmail: string;
  questions: Question[];
  currentQuestionIndex: number;
  completed: boolean;
}