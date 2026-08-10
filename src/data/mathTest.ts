export type Category = 'Number Sense' | 'Algebra & Patterns' | 'Geometry & Measurement' | 'Problem Solving';

export interface MathQuestion {
  id: string;
  grade: number;
  difficulty: number; // 1 (Very easy) to 5 (Advanced)
  category: Category;
  skill: string;
  question: string;
  options: string[];
  correctAnswerIndex: number; // 0-based index of `options`
  explanation: string;
}

export const questionBank: MathQuestion[] = [
  // --- Grade 1-5 Examples ---
  {
    id: "g2-ns-01",
    grade: 2,
    difficulty: 2,
    category: "Number Sense",
    skill: "Addition",
    question: "What is 15 + 8?",
    options: ["22", "23", "24", "25"],
    correctAnswerIndex: 1,
    explanation: "15 plus 5 is 20, plus 3 more is 23."
  },
  {
    id: "g5-ps-01",
    grade: 5,
    difficulty: 3,
    category: "Problem Solving",
    skill: "Word Problems",
    question: "Liam has 24 pencils and wants to put the same number in 6 boxes. How many pencils go in each box?",
    options: ["3", "4", "5", "6"],
    correctAnswerIndex: 1,
    explanation: "24 divided by 6 equals 4."
  },
  // --- Grade 6-8 Examples ---
  {
    id: "g7-ns-01",
    grade: 7,
    difficulty: 3,
    category: "Number Sense",
    skill: "Fractions",
    question: "What is 3/4 + 1/4?",
    options: ["1/2", "1", "3/8", "4/8"],
    correctAnswerIndex: 1,
    explanation: "Three quarters plus one quarter equals four quarters, which simplifies to 1."
  },
  {
    id: "g8-alg-01",
    grade: 8,
    difficulty: 3,
    category: "Algebra & Patterns",
    skill: "Linear Equations",
    question: "Solve for x: 3x + 6 = 21",
    options: ["3", "5", "7", "9"],
    correctAnswerIndex: 1,
    explanation: "Subtract 6 from both sides to get 3x = 15. Divide by 3 to get x = 5."
  },
  {
    id: "g8-alg-02",
    grade: 8,
    difficulty: 4,
    category: "Algebra & Patterns",
    skill: "Multi-step Equations",
    question: "Solve for y: 2(y - 3) = 14",
    options: ["4", "7", "10", "14"],
    correctAnswerIndex: 2,
    explanation: "Divide both sides by 2 to get y - 3 = 7. Add 3 to both sides to get y = 10."
  },
  // --- Grade 9-12 Examples ---
  {
    id: "g10-alg-01",
    grade: 10,
    difficulty: 4,
    category: "Algebra & Patterns",
    skill: "Quadratics",
    question: "Which of the following is a factor of x² + 5x + 6?",
    options: ["(x - 2)", "(x - 3)", "(x + 2)", "(x + 6)"],
    correctAnswerIndex: 2,
    explanation: "The quadratic factors to (x + 2)(x + 3)."
  },
  {
    id: "g11-geo-01",
    grade: 11,
    difficulty: 4,
    category: "Geometry & Measurement",
    skill: "Trigonometry",
    question: "In a right triangle, if the side opposite an angle is 3 and the hypotenuse is 5, what is the sine of the angle?",
    options: ["3/4", "3/5", "4/5", "5/3"],
    correctAnswerIndex: 1,
    explanation: "Sine is defined as Opposite over Hypotenuse, so it is 3/5."
  }
  // Add more questions here to ensure 12-18 questions can be drawn per grade.
];
