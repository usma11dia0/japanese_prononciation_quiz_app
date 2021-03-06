/* 以下 Youtube_Quiz動画内容 */
/* SelectField.ts */
export interface TSelectField {
  label: string;
  options: CATEGORY["trivia_categories"] | DIFFICULTY[] | TYPE[] | undefined;
}

/* useAxios.ts */
export interface URL {
  url: string;
}
export interface CATEGORY {
  trivia_categories: [
    {
      id: number;
      name: string;
    }
  ];
}
export interface DIFFICULTY {
  id: string;
  name: string;
}
export interface TYPE {
  id: string;
  name: string;
}
export interface QUIZ {
  response_code: number;
  results: [
    {
      category: string;
      type: string;
      difficulty: string;
      question: string;
      incorrect_answers: string[];
      correct_answer: string;
    }
  ];
}

/* reducer.ts */
export interface TState {
  question_category: string;
  question_difficulty: string;
  question_type: string;
  amount_of_question: number;
  score: number;
}
