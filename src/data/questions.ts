export type ParameterKey =
  | 'Respect'
  | 'Warmth'
  | 'Responsibility'
  | 'UniversalTruth'
  | 'DivineGuidance'
  | 'Mission'
  | 'HeavenlyWork'
  | 'Thoroughness'
  | 'Innovation';

export type WeightConfig = {
  [key in ParameterKey]?: number;
};

export type Question = {
  id: number;
  text: string;
  image: string;
  weights: WeightConfig;
};

export const QUESTIONS: Question[] = [
  { id: 1, text: '自分の意見と対立する話を聞いたとき、すぐに反論するのではなく「なぜそう思うのか」を深く理解しようとする。', image: '/images/Q1Image.png', weights: { Respect: 1.2, Warmth: 0.3, UniversalTruth: -0.3 } },
  { id: 2, text: 'チーム全体がうまくいくなら、自分の手柄にならなくても喜んで裏方に回ることができる。', image: '/images/Q2Image.png', weights: { Respect: 1.0, HeavenlyWork: 0.8, Responsibility: -0.3 } },
  { id: 3, text: '忙しいときでも、周りの人が困っている様子なら、手を止めて声をかけたり手伝ったりする。', image: '/images/Q3Image.png', weights: { Warmth: 1.5, Thoroughness: -0.5, Responsibility: -0.2 } },
  { id: 4, text: '一人で黙々と作業するよりも、みんなでわいわい議論しながら作り上げるプロセスが好きだ。', image: '/images/Q4Image.png', weights: { Warmth: 1.0, Innovation: 0.5, Thoroughness: -0.6 } },
  { id: 5, text: '一度「やる」と決めたことは、どんなに状況が悪化しても、意地でも最後までやり遂げる。', image: '/images/Q5Image.png', weights: { Responsibility: 1.5, UniversalTruth: 0.4, Innovation: -0.5 } },
  { id: 6, text: '困難なトラブルが起きたとき、「困った」と落ち込むより、「腕の見せ所だ」と逆に燃えてくる。', image: '/images/Q6Image.png', weights: { Responsibility: 1.2, Mission: 0.6, Thoroughness: -0.3 } },
  { id: 7, text: 'もし会社やチームが間違ったことをしようとしたら、空気を読まずに「それは違う」と言う覚悟がある。', image: '/images/Q7Image.png', weights: { UniversalTruth: 1.5, Responsibility: 0.3, Respect: -0.5 } },
  { id: 8, text: 'ルールや利益も大事だが、それ以上に「人としての自由」や「愛」が守られているかを重視する。', image: '/images/Q8Image.png', weights: { UniversalTruth: 1.2, Warmth: 0.8, Thoroughness: -0.6 } },
  { id: 9, text: '人生の転機を振り返ると、自分の計算や努力だけでは説明できない「不思議な巡り合わせ」に助けられたと感じる。', image: '/images/Q9Image.png', weights: { DivineGuidance: 1.5, HeavenlyWork: 0.5, Thoroughness: -0.4 } },
  { id: 10, text: '根拠はなくても「最終的には絶対うまくいく」という謎の自信や安心感を持っていることが多い。', image: '/images/Q10Image.png', weights: { DivineGuidance: 1.2, Mission: 0.6, Thoroughness: -0.6 } },
  { id: 11, text: '目の前の仕事が、10年後や100年後の未来にどうつながるかを想像しながら取り組んでいる。', image: '/images/Q11Image.png', weights: { Mission: 1.5, Innovation: 0.5, Thoroughness: -0.3 } },
  { id: 12, text: '私利私欲のためではなく、「誰かのため」「社会のため」という大義名分があるとき、一番力が出る。', image: '/images/Q12Image.png', weights: { Mission: 1.2, UniversalTruth: 0.8, Respect: -0.2 } },
  { id: 13, text: '今の仕事や役割を与えられていることに対して、不満よりも「ありがたい」という気持ちが先に立つ。', image: '/images/Q13Image.png', weights: { HeavenlyWork: 1.5, DivineGuidance: 0.4, Innovation: -0.5 } },
  { id: 14, text: '商品やサービスを作るとき、「売れるか」と同じくらい「それが世の中を良くするか」を大切にしたい。', image: '/images/Q14Image.png', weights: { HeavenlyWork: 1.0, UniversalTruth: 0.8, Thoroughness: -0.4 } },
  { id: 15, text: '机の上やデータの整理整頓がされていないと、どうしても気になって仕事に集中できない。', image: '/images/Q15Image.png', weights: { Thoroughness: 1.5, Responsibility: 0.3, Innovation: -0.8, DivineGuidance: -0.3 } },
  { id: 16, text: 'なんとなく上手くいった時よりも、失敗してもその原因を完全に突き止めた時の方がスッキリする。', image: '/images/Q16Image.png', weights: { Thoroughness: 1.2, UniversalTruth: 0.5, Warmth: -0.4 } },
  { id: 17, text: '「いつも通りのやり方」を繰り返すのは退屈で、常に「もっと面白い方法はないか」と工夫したくなる。', image: '/images/Q17Image.png', weights: { Innovation: 1.5, Mission: 0.4, Thoroughness: -1.0, HeavenlyWork: -0.3 } },
  { id: 18, text: '他の人が「ありえない」と笑うような突飛なアイデアこそ、実現する価値があると思う。', image: '/images/Q18Image.png', weights: { Innovation: 1.2, Responsibility: 0.5, DivineGuidance: 0.3, Respect: -0.3 } },
];
