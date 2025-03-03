export interface CodeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  result?: {
    score: string;
    explanation: string[];
  };
  isLoading?: boolean;
}

export interface FormErrors {
  question1: string;
  question2: string;
  solution1: string;
  solution2: string;
}

export interface Server {
  id: string;
  name: string;
  url: string | undefined;
}

export interface EvaluationResult {
  score: string;
  explanation: string[];
}

export interface EvaluationPayload {
  questions: { description: string }[];
  solutions: string[][];
}
