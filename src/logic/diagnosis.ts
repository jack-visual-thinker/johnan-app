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

// Calculate scores based on the new logic (Base 10 + Weights)
export function calculateScores(answers: Record<number, number>): Record<ParameterKey, number> {
  // 1. Initialize base scores to 10.0
  const scores: Record<ParameterKey, number> = {
    Respect: 10, Warmth: 10, Responsibility: 10, UniversalTruth: 10, DivineGuidance: 10,
    Mission: 10, HeavenlyWork: 10, Thoroughness: 10, Innovation: 10
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
export function determineAnimal(s: Record<ParameterKey, number>): AnimalType {
  // Helper to find animal object by ID
  const find = (id: string) => ANIMAL_TYPES.find(a => a.id === id) || ANIMAL_TYPES[0];

  // --- Priority Check: 9 Legend Animals ---

  // 1. Lion: P4>=13.5 && P3>=12.5 && P9>=11.5
  if (s.UniversalTruth >= 13.5 && s.Responsibility >= 12.5 && s.Innovation >= 11.5) return find('lion');

  // 2. Dove: P3>=12.5 && (2 or more of P4, P7, P8, P2 >= 12.0)
  const doveCount = [s.UniversalTruth, s.HeavenlyWork, s.Thoroughness, s.Warmth].filter(v => v >= 12.0).length;
  if (s.Responsibility >= 12.5 && doveCount >= 2) return find('dove');

  // 3. Eagle: P9>=13.0 && P6>=13.0 && (2 or more of P1, P7, P3 >= 11.5)
  const eagleCount = [s.Respect, s.HeavenlyWork, s.Responsibility].filter(v => v >= 11.5).length;
  if (s.Innovation >= 13.0 && s.Mission >= 13.0 && eagleCount >= 2) return find('eagle');

  // 4. Deer: P4>=12.5 && P3>=12.0 && P8>=12.0
  if (s.UniversalTruth >= 12.5 && s.Responsibility >= 12.0 && s.Thoroughness >= 12.0) return find('deer');

  // 5. Bull: P3>=13.5 && (2 or more of P2, P1, P8 >= 11.5)
  const bullCount = [s.Warmth, s.Respect, s.Thoroughness].filter(v => v >= 11.5).length;
  if (s.Responsibility >= 13.5 && bullCount >= 2) return find('bull');

  // 6. Ant: P7>=12.0 && P8>=12.0 && P3>=12.0 && P9>=10.5
  if (s.HeavenlyWork >= 12.0 && s.Thoroughness >= 12.0 && s.Responsibility >= 12.0 && s.Innovation >= 10.5) return find('ant');

  // 7. Serpent: P7>=12.0 && P8>=12.0 && P9>=12.0
  if (s.HeavenlyWork >= 12.0 && s.Thoroughness >= 12.0 && s.Innovation >= 12.0) return find('serpent');

  // 8. Lamb: P1>=12.5 && P9>=12.0 && P7>=11.0
  if (s.Respect >= 12.5 && s.Innovation >= 12.0 && s.HeavenlyWork >= 11.0) return find('lamb');

  // 9. Horse: P8>=12.5 && P3>=11.5 && P2>=11.0
  if (s.Thoroughness >= 12.5 && s.Responsibility >= 11.5 && s.Warmth >= 11.0) return find('horse');


  // --- Fallback: Group Comparison ---

  // Group A (Warmth/Respect): P1 + P2 + P7
  const groupA = s.Respect + s.Warmth + s.HeavenlyWork;

  // Group B (Innovation/Future): P5 + P6 + P9
  const groupB = s.DivineGuidance + s.Mission + s.Innovation;

  // Group C (Solid/Responsibility): (P3 + P8) * 1.5
  const groupC = (s.Responsibility + s.Thoroughness) * 1.5;

  if (groupA >= groupB && groupA >= groupC) {
    return find('donkey'); // Donkey (平和をはこび)
  } else if (groupB > groupA && groupB >= groupC) {
    return find('fish');   // Fish (奇跡をおこし)
  } else {
    return find('camel');  // Camel (忍耐づよく歩き)
  }
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
