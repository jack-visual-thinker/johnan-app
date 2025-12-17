import type { ParameterKey } from './questions';

export type AnimalType = {
  id: string;
  name: string;
  catchphrase: string;
  description: string;
  legendName: string;
  legendRole: string;
  idealProfile: Record<ParameterKey, number>;
};

export const ANIMAL_TYPES: AnimalType[] = [
  {
    id: 'lion',
    name: 'ライオン (Lion)',
    catchphrase: '「信念つらぬき」じょうずなライオン',
    legendName: '山本 松雄さん',
    legendRole: '創業者',
    description: 'あなたは百獣の王ライオンタイプ！JOHNANの歴史を切り開く創業者のように、「こうあるべきだ！」という強い信念と、みんなを引っ張るリーダーシップを持っています。',
    idealProfile: {
      UniversalTruth: 10,
      Responsibility: 9,
      Mission: 9,
      Respect: 5, Warmth: 5, DivineGuidance: 5, HeavenlyWork: 5, Thoroughness: 5, Innovation: 5
    }
  },
  {
    id: 'dove',
    name: 'ハト (Dove)',
    catchphrase: '「愛をとどけ」じょうずなハト',
    legendName: '山本 春子さん',
    legendRole: '愛の精神的支柱',
    description: 'あなたは平和のシンボル、ハトタイプ！みんなの心を癒やす、優しさの塊のような人です。組織の歴史の中で、みんなが安心して働ける場所を守り続ける慈愛の精神を持っています。',
    idealProfile: {
      Warmth: 10,
      Respect: 9,
      HeavenlyWork: 8,
      UniversalTruth: 5, Responsibility: 5, DivineGuidance: 5, Mission: 5, Thoroughness: 5, Innovation: 5
    }
  },
  {
    id: 'eagle',
    name: 'ワシ (Eagle)',
    catchphrase: '「未来見通し」じょうずなワシ',
    legendName: '山本 光世さん',
    legendRole: '変革の4代目',
    description: 'あなたは空の王者ワシタイプ！遠くまで見渡す目を持っていて、「次はこれが来る！」と未来を見通すのが得意。新しい時代に向かって、JOHNANを大きく飛躍させる先見の明があります。',
    idealProfile: {
      Mission: 10,
      Innovation: 9,
      DivineGuidance: 8,
      Respect: 5, Warmth: 5, Responsibility: 5, UniversalTruth: 5, HeavenlyWork: 5, Thoroughness: 5
    }
  },
  {
    id: 'deer',
    name: 'シカ (Deer)',
    catchphrase: '「バランス」じょうずなシカ',
    legendName: '山本 高春さん',
    legendRole: '誠実な3代目',
    description: 'あなたはスマートなシカタイプ！高い理想を持ちながらも、足元もしっかり見ることができるバランス感覚の持ち主。組織の規律を守り、誠実さで信頼を築くリーダーと同じ精神を持っています。',
    idealProfile: {
      Thoroughness: 9,
      UniversalTruth: 8,
      Respect: 8,
      Warmth: 5, Responsibility: 6, DivineGuidance: 5, Mission: 6, HeavenlyWork: 6, Innovation: 5
    }
  },
  {
    id: 'bull',
    name: 'オウシ (Bull)',
    catchphrase: '「現場をまもり」じょうずなオウシ',
    legendName: '稲葉 和雄さん',
    legendRole: '製造のレジェンド',
    description: 'あなたはパワフルなオウシタイプ！「任せとけ！」という頼もしさはナンバーワン。JOHNANのモノづくりを支え、どんな困難な仕事も完遂する、現場の守護神のような存在です。',
    idealProfile: {
      Responsibility: 10,
      Thoroughness: 8,
      Warmth: 7,
      Respect: 5, UniversalTruth: 5, DivineGuidance: 5, Mission: 5, HeavenlyWork: 6, Innovation: 5
    }
  },
  {
    id: 'ant',
    name: 'アリ (Ant)',
    catchphrase: '「コツコツ積み上げ」じょうずなアリ',
    legendName: '村上 英子さん',
    legendRole: '財務の礎を築いた人',
    description: 'あなたは働き者のアリさんタイプ！小さなことでもコツコツと積み上げ、いつの間にか大きな成果を出しています。派手ではなくとも、組織の土台をしっかり支える縁の下の偉人です。',
    idealProfile: {
      Thoroughness: 10,
      HeavenlyWork: 9,
      Responsibility: 8,
      Respect: 5, Warmth: 5, UniversalTruth: 5, DivineGuidance: 5, Mission: 5, Innovation: 4
    }
  },
  {
    id: 'serpent',
    name: 'ヘビ (Serpent)',
    catchphrase: '「知恵みがき」じょうずなヘビ',
    legendName: '佐野 好男さん',
    legendRole: '開発のパイオニア',
    description: 'あなたは知恵者なヘビタイプ！冷静に物事を見つめ、技術や知識を深めるのが得意なスペシャリスト。技術の力で新しい価値を生み出す、探求心あふれる開拓者と同じタイプです。',
    idealProfile: {
      Innovation: 9,
      Thoroughness: 9,
      UniversalTruth: 7,
      Respect: 5, Warmth: 4, Responsibility: 6, DivineGuidance: 6, Mission: 6, HeavenlyWork: 5
    }
  },
  {
    id: 'lamb',
    name: 'コヒツジ (Lamb)',
    catchphrase: '「愛され応援され」じょうずなコヒツジ',
    legendName: '山本 勝さん',
    legendRole: '2代目社長',
    description: 'あなたはピュアなコヒツジタイプ！純粋な心を持っていて、新しいことにも素直に挑戦できます。創業の精神を受け継ぎつつ、みんなから愛され応援される若きリーダーの素質があります。',
    idealProfile: {
      Warmth: 9,
      HeavenlyWork: 10,
      Innovation: 8,
      Respect: 7, Responsibility: 5, UniversalTruth: 6, DivineGuidance: 6, Mission: 6, Thoroughness: 4
    }
  },
  {
    id: 'horse',
    name: 'ウマ (Horse)',
    catchphrase: '「目標駆け抜け」じょうずなウマ',
    legendName: '金光 宏さん',
    legendRole: 'デバイス事業の開拓者',
    description: 'あなたは駆け抜けるウマタイプ！行動力がバツグンで、目標に向かって一直線に走ります。新しい事業や困難な現場にいち早く駆けつけ、道を切り開くスピードスターと同じ魂を持っています。',
    idealProfile: {
      Responsibility: 9,
      Mission: 8,
      Innovation: 9,
      Respect: 5, Warmth: 5, UniversalTruth: 5, DivineGuidance: 5, HeavenlyWork: 5, Thoroughness: 5
    }
  },
  {
    id: 'camel',
    name: 'ラクダ (Camel)',
    catchphrase: '「忍耐づよく歩き」じょうずなラクダ',
    legendName: '阿部 和幸さん',
    legendRole: '生産管理の守り神',
    description: 'あなたは忍耐強いラクダタイプ！砂漠のような厳しい環境でも、文句を言わずに確実に歩き続けることができます。組織の規律や納期をガッチリ守り続ける、最も信頼できる実直なレジェンドです。',
    idealProfile: {
      Responsibility: 10,
      Thoroughness: 10,
      HeavenlyWork: 8,
      Respect: 5, Warmth: 4, UniversalTruth: 5, DivineGuidance: 4, Mission: 5, Innovation: 4
    }
  },
  {
    id: 'donkey',
    name: 'ロバ (Donkey)',
    catchphrase: '「平和をはこび」じょうずなロバ',
    legendName: '井口 江利子さん & 吉岡 三重子さん',
    legendRole: '奉仕のレジェンド',
    description: 'あなたは優しいロバタイプ！一見地味に見えるかもしれないけれど、実は一番大切な「平和」と「安心」を運んでいます。地道な仕事を責任を持ってやり遂げ、誰かの荷物をスッと持ってあげるような、謙虚で温かい奉仕の心が輝くレジェンドです。',
    idealProfile: {
      Warmth: 9,
      HeavenlyWork: 9,
      Respect: 8,
      Responsibility: 8, UniversalTruth: 5, DivineGuidance: 5, Mission: 5, Thoroughness: 6, Innovation: 4
    }
  },
  {
    id: 'fish',
    name: 'サカナ (Fish)',
    catchphrase: '「奇跡をおこし」じょうずなサカナ',
    legendName: '小泉 由佳さん & 高見 恵美さん',
    legendRole: '可能性のレジェンド',
    description: 'あなたは可能性を秘めたサカナタイプ！小さなきっかけから、びっくりするような大きな成果（奇跡）を生み出すパワーを持っています。群れ（チーム）の中で自由に泳ぎながら、みんなを楽しい未来へ連れて行くムードメーカーです。',
    idealProfile: {
      DivineGuidance: 10,
      Innovation: 9,
      Mission: 8,
      Respect: 7, Warmth: 7, Responsibility: 5, UniversalTruth: 5, HeavenlyWork: 5, Thoroughness: 4
    }
  }
];
