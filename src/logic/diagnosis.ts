import { QUESTIONS } from '../data/questions';
import type { ParameterKey } from '../data/questions';
import { ANIMAL_TYPES } from '../data/types';
import type { AnimalType } from '../data/types';

export const PARAM_LABELS: Record<ParameterKey, string> = {
  Warmth: 'あったかハート',
  Responsibility: 'やりぬく力',
  UniversalTruth: '正義と愛',
  DivineGuidance: '不思議な運',
  Mission: '未来への想い',
  HeavenlyWork: '感謝の心',
  Thoroughness: 'キッチリ徹底',
  Innovation: '新しいこと好き',
  Respect: 'みんなを尊重',
};

export const PARAM_ORDER: ParameterKey[] = [
  'Warmth',
  'Responsibility',
  'UniversalTruth',
  'DivineGuidance',
  'Mission',
  'HeavenlyWork',
  'Thoroughness',
  'Innovation',
  'Respect',
];

// Calculate scores based on the new logic (Base 10 + Weights)
export function calculateScores(answers: Record<number, number>): Record<ParameterKey, number> {
  // 1. Initialize base scores to 10.0
  const scores: Record<ParameterKey, number> = {
    Warmth: 10, Responsibility: 10, UniversalTruth: 10, DivineGuidance: 10,
    Mission: 10, HeavenlyWork: 10, Thoroughness: 10, Innovation: 10, Respect: 10
  };

  // 2. Map answer (1-5) to multiplier
  // 5 (Yes!) -> +2
  // 4 (Maybe yes) -> +1
  // 3 (Neither) -> 0
  // 2 (Maybe no) -> -1
  // 1 (No!) -> -2
  const getMultiplier = (val: number) => {
    switch (val) {
      case 5: return 2;
      case 4: return 1;
      case 3: return 0;
      case 2: return -1;
      case 1: return -2;
      default: return 0;
    }
  };

  // 3. Apply weights
  Object.entries(answers).forEach(([qIdStr, answerVal]) => {
    const qId = parseInt(qIdStr);
    const question = QUESTIONS.find(q => q.id === qId);

    if (question && question.weights) {
      const multiplier = getMultiplier(answerVal);
      // Iterate over influenced parameters for this question
      (Object.keys(question.weights) as ParameterKey[]).forEach(pkey => {
        const weight = question.weights[pkey] || 0;
        scores[pkey] += weight * multiplier;
      });
    }
  });

  // 4. Round scores to 1 decimal place for cleaner display
  (Object.keys(scores) as ParameterKey[]).forEach(k => {
    scores[k] = Math.round(scores[k] * 10) / 10;
  });

  return scores;
}

// Determine animal type based on priority logic
// Determine animal type based on Euclidean distance to ideal profiles
export function determineAnimal(s: Record<ParameterKey, number>): AnimalType {
  let bestMatch: AnimalType = ANIMAL_TYPES[0];
  let minDistance = Infinity;

  for (const animal of ANIMAL_TYPES) {
    let distance = 0;
    // Calculate Squared Euclidean Distance
    // (We don't need Math.sqrt for comparison purposes)
    const keys = Object.keys(s) as ParameterKey[];
    for (const key of keys) {
      const userVal = s[key];
      // Use idealProfile value if defined, otherwise assume a default 'neutral' value of 5
      // (Though all define most keys, good to be safe)
      const idealVal = animal.idealProfile[key] ?? 5;
      distance += Math.pow(userVal - idealVal, 2);
    }

    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = animal;
    }
  }

  return bestMatch;
}

export function generateAIComment(userProfile: Record<ParameterKey, number>): string {
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
