import { questionBank, type MathQuestion, type Category } from '../data/mathTest';

export interface TestState {
  targetGrade: number;
  currentDifficulty: number;
  askedQuestionIds: string[];
  responses: {
    questionId: string;
    isCorrect: boolean;
    category: Category;
    skill: string;
  }[];
}

export interface TestResult {
  overallScore: number; // 0-100
  readiness: string;
  estimatedLevel: string;
  strengths: string[];
  reviewAreas: string[];
  categories: Record<Category, number>; // 0.0 to 1.0
}

export const MAX_QUESTIONS = 15;

export function getNextQuestion(state: TestState): MathQuestion | null {
  if (state.askedQuestionIds.length >= MAX_QUESTIONS) return null;

  // Filter pool: Questions we haven't asked, close to the target grade, matching current difficulty
  let pool = questionBank.filter(q => 
    !state.askedQuestionIds.includes(q.id) &&
    Math.abs(q.grade - state.targetGrade) <= 1
  );

  // Try to find a question at the exact current difficulty
  let exactDifficultyPool = pool.filter(q => q.difficulty === state.currentDifficulty);
  
  // Fallback if we run out of exact difficulty questions
  const availableQuestions = exactDifficultyPool.length > 0 ? exactDifficultyPool : pool;
  
  if (availableQuestions.length === 0) return null;

  // Pick a random question from the available pool to keep it varied
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
}

export function updateStateAfterAnswer(state: TestState, question: MathQuestion, isCorrect: boolean): TestState {
  const newState = { ...state };
  newState.askedQuestionIds.push(question.id);
  newState.responses.push({
    questionId: question.id,
    isCorrect,
    category: question.category,
    skill: question.skill
  });

  // Adaptive logic: bump difficulty slightly
  if (isCorrect) {
    newState.currentDifficulty = Math.min(5, state.currentDifficulty + 1);
  } else {
    newState.currentDifficulty = Math.max(1, state.currentDifficulty - 1);
  }

  return newState;
}

export function calculateResults(state: TestState): TestResult {
  const totalQuestions = state.responses.length;
  const correctAnswers = state.responses.filter(r => r.isCorrect).length;
  const overallScore = Math.round((correctAnswers / totalQuestions) * 100);

  // Category breakdowns
  const categories = {
    'Number Sense': 0,
    'Algebra & Patterns': 0,
    'Geometry & Measurement': 0,
    'Problem Solving': 0
  } as Record<Category, number>;

  const categoryCounts = { ...categories };

  state.responses.forEach(r => {
    categoryCounts[r.category]++;
    if (r.isCorrect) categories[r.category]++;
  });

  // Convert to percentages
  (Object.keys(categories) as Category[]).forEach(cat => {
    categories[cat] = categoryCounts[cat] > 0 ? categories[cat] / categoryCounts[cat] : 0;
  });

  // Identify strengths and review areas based on skill performance
  const skillPerformance: Record<string, { total: number; correct: number }> = {};
  state.responses.forEach(r => {
    if (!skillPerformance[r.skill]) skillPerformance[r.skill] = { total: 0, correct: 0 };
    skillPerformance[r.skill].total++;
    if (r.isCorrect) skillPerformance[r.skill].correct++;
  });

  const strengths: string[] = [];
  const reviewAreas: string[] = [];

  Object.entries(skillPerformance).forEach(([skill, stats]) => {
    const ratio = stats.correct / stats.total;
    // Require at least 2 questions to be a "strength" if possible, but fallback to 1 for short tests
    if (ratio >= 0.75) strengths.push(skill);
    else if (ratio <= 0.5) reviewAreas.push(skill);
  });

  // Readiness label
  let readiness = "Needs Significant Review";
  let estimatedLevel = `Below Grade ${state.targetGrade}`;
  
  if (overallScore >= 80) {
    readiness = "Strongly Prepared";
    estimatedLevel = `Grade ${state.targetGrade}–${Math.min(12, state.targetGrade + 1)}`;
  } else if (overallScore >= 65) {
    readiness = "Mostly Prepared";
    estimatedLevel = `Around Grade ${state.targetGrade}`;
  } else if (overallScore >= 50) {
    readiness = "Some Review Recommended";
    estimatedLevel = `Grade ${Math.max(1, state.targetGrade - 1)}–${state.targetGrade}`;
  }

  return {
    overallScore,
    readiness,
    estimatedLevel,
    strengths: strengths.slice(0, 3), // Max 3
    reviewAreas: reviewAreas.slice(0, 3), // Max 3
    categories
  };
}
