export type Question = {
  id: number;
  text: string;
  image: string;
  parameterKey: ParameterKey;
};
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

export const QUESTIONS: Question[] = [
  { id: 1, text: '自分の意見と対立する話を聞いたとき、すぐに反論するのではなく「なぜそう思うのか」を深く理解しようとする。', image: '/images/Q2Image.png', parameterKey: 'Respect' },
  { id: 2, text: 'チーム全体がうまくいくなら、自分の手柄にならなくても喜んで裏方に回ることができる。', image: '/images/Q2Image.png', parameterKey: 'Respect' },
  { id: 3, text: '忙しいときでも、周りの人が困っている様子なら、手を止めて声をかけたり手伝ったりする。', image: '/images/Q2Image.png', parameterKey: 'Warmth' },
  { id: 4, text: '一人で黙々と作業するよりも、みんなでわいわい議論しながら作り上げるプロセスが好きだ。', image: '/images/Q2Image.png', parameterKey: 'Warmth' },
  { id: 5, text: '一度「やる」と決めたことは、どんなに状況が悪化しても、意地でも最後までやり遂げる。', image: '/images/Q2Image.png', parameterKey: 'Responsibility' },
  { id: 6, text: '困難なトラブルが起きたとき、「困った」と落ち込むより、「腕の見せ所だ」と逆に燃えてくる。', image: '/images/Q2Image.png', parameterKey: 'Responsibility' },
  { id: 7, text: 'もし会社やチームが間違ったことをしようとしたら、空気を読まずに「それは違う」と言う覚悟がある。', image: '/images/Q2Image.png', parameterKey: 'UniversalTruth' },
  { id: 8, text: 'ルールや利益も大事だが、それ以上に「人としての自由」や「愛」が守られているかを重視する。', image: '/images/Q2Image.png', parameterKey: 'UniversalTruth' },
  { id: 9, text: '人生の転機を振り返ると、自分の計算や努力だけでは説明できない「不思議な巡り合わせ」に助けられたと感じる。', image: '/images/Q2Image.png', parameterKey: 'DivineGuidance' },
  { id: 10, text: '根拠はなくても「最終的には絶対うまくいく」という謎の自信や安心感を持っていることが多い。', image: '/images/Q2Image.png', parameterKey: 'DivineGuidance' },
  { id: 11, text: '目の前の仕事が、10年後や100年後の未来にどうつながるかを想像しながら取り組んでいる。', image: '/images/Q2Image.png', parameterKey: 'Mission' },
  { id: 12, text: '私利私欲のためではなく、「誰かのため」「社会のため」という大義名分があるとき、一番力が出る。', image: '/images/Q2Image.png', parameterKey: 'Mission' },
  { id: 13, text: '今の仕事や役割を与えられていることに対して、不満よりも「ありがたい」という気持ちが先に立つ。', image: '/images/Q2Image.png', parameterKey: 'HeavenlyWork' },
  { id: 14, text: '商品やサービスを作るとき、「売れるか」と同じくらい「それが世の中を良くするか」を大切にしたい。', image: '/images/Q2Image.png', parameterKey: 'HeavenlyWork' },
  { id: 15, text: '机の上やデータの整理整頓がされていないと、どうしても気になって仕事に集中できない。', image: '/images/Q2Image.png', parameterKey: 'Thoroughness' },
  { id: 16, text: 'なんとなく上手くいった時よりも、失敗してもその原因を完全に突き止めた時の方がスッキリする。', image: '/images/Q2Image.png', parameterKey: 'Thoroughness' },
  { id: 17, text: '「いつも通りのやり方」を繰り返すのは退屈で、常に「もっと面白い方法はないか」と工夫したくなる。', image: '/images/Q2Image.png', parameterKey: 'Innovation' },
  { id: 18, text: '前例のない新しいプロジェクトへの参加を求められたら、不安よりもワクワクする好奇心が勝つ。', image: '/images/Q2Image.png', parameterKey: 'Innovation' },
];
