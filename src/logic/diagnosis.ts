import { QUESTIONS } from '../data/questions';
import type { ParameterKey } from '../data/questions';
import { ANIMAL_TYPES } from '../data/types';
import type { AnimalType } from '../data/types';

export const PARAM_LABELS: Record<ParameterKey, string> = {
  Respect: 'みんなを尊重',
  Warmth: 'あったかハート',
  Responsibility: 'やりぬく力',
  UniversalTruth: '正義と愛',
  DivineGuidance: '不思議な運',
  Mission: '未来への想い',
  HeavenlyWork: '感謝の心',
  Thoroughness: 'キッチリ徹底',
  Innovation: '新しいこと好き',
};

// Calculate scores (1-10 scale per parameter)
export function calculateScores(answers: Record<number, number>): Record<ParameterKey, number> {
  const scores: Record<ParameterKey, number> = {
    Respect: 0, Warmth: 0, Responsibility: 0, UniversalTruth: 0, DivineGuidance: 0,
    Mission: 0, HeavenlyWork: 0, Thoroughness: 0, Innovation: 0
  };

  // Convert 1-5 scale to raw score.
  // 2 questions per param. Max score = 5*2 = 10. Min = 1*2 = 2.
  Object.entries(answers).forEach(([questionIdStr, answerValue]) => {
    const qId = parseInt(questionIdStr);
    const question = QUESTIONS.find(q => q.id === qId);
    if (question) {
      scores[question.parameterKey] += answerValue;
    }
  });

  return scores;
}

// Find closest animal using Euclidean distance
export function determineAnimal(userProfile: Record<ParameterKey, number>): AnimalType {
  let closestAnimal = ANIMAL_TYPES[0];
  let minDistance = Infinity;

  ANIMAL_TYPES.forEach(animal => {
    let distance = 0;
    (Object.keys(userProfile) as ParameterKey[]).forEach(key => {
      const userVal = userProfile[key];
      const idealVal = animal.idealProfile[key];
      distance += Math.pow(userVal - idealVal, 2);
    });
    
    // We can use squared distance for comparison (no need for sqrt)
    if (distance < minDistance) {
      minDistance = distance;
      closestAnimal = animal;
    }
  });

  return closestAnimal;
}

export function generateAIComment(userProfile: Record<ParameterKey, number>, _animal: AnimalType): string {
  // Find highest parameter
  let maxVal = -1;
  let maxKey: ParameterKey = 'Respect';
  
  (Object.keys(userProfile) as ParameterKey[]).forEach(key => {
    if (userProfile[key] > maxVal) {
      maxVal = userProfile[key];
      maxKey = key;
    }
  });

  const paramLabel = PARAM_LABELS[maxKey];
  
  // Simple affirmations based on the parameter
  const affirmations: Record<ParameterKey, string> = {
    Respect: '相手を思いやる心は、信頼を築く最強の武器じゃ。',
    Warmth: 'その優しさが、まわりの空気をあたたかくしておるのう。',
    Responsibility: '最後までやり遂げる力は、誰かが見ておるもんじゃよ。',
    UniversalTruth: '正しさを愛するその心、とても美しいのう。',
    DivineGuidance: '不思議な力に守られておる。流れに身を任せるのもまた一興じゃ。',
    Mission: '遠い未来を思うその眼差しが、道を開いていくんじゃな。',
    HeavenlyWork: '感謝の心を持つ者は、いつまでも愛されるもんじゃよ。',
    Thoroughness: '細部へのこだわりが、神を宿らせるんじゃな。',
    Innovation: '新しい風を吹かせるその勇気が、世界を変えていくんじゃ。'
  };

  return `ふむ…… いまのあなたは、『${paramLabel}』のちからが、じょじょに出てきとるようじゃ。${affirmations[maxKey]}`;
}
