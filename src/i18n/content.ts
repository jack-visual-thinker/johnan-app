import type { AnimalType } from '../data/types';
import type { LegendEpisode } from '../data/legends';
import type { ParameterKey } from '../data/questions';
import type { Language } from './LanguageContext';

export const HEADER_COPY = {
  ja: {
    menuLabel: 'メニュー',
    items: {
      about: 'じょうずかんとは？',
      start: '診断する',
      encyclopedia: '愉快な仲間たちの動物集',
      faq: 'FAQ',
    },
  },
  en: {
    menuLabel: 'Menu',
    items: {
      about: 'About Jouzukan',
      start: 'Take the Quiz',
      encyclopedia: 'Meet the Animals',
      faq: 'FAQ',
    },
  },
} as const;

export const START_COPY = {
  ja: {
    eyebrow: '動物診断アプリ じょうずかん',
    heroAlt: 'あなたはどのレジェンドタイプ？',
    heroTitle: 'あなたはどのレジェンドタイプ？',
    introLead: 'JOHNAN（ジョウナン）の長い歴史の中には、今の私たちを作ってくれた『レジェンド』たちがいます。',
    introBody: 'あなたの性格は、歴史上の誰に似ているかな？',
    introBodySecond: '質問に答えて、あなたの中に眠るレジェンドの魂を見つけよう！',
    formTitle: 'ニックネームだけで診断できます',
    nickname: 'ニックネーム',
    nicknamePlaceholder: '例：ジャック',
    nicknameError: 'ニックネームを入力してください',
    terms: '利用規約',
    agreement: 'を確認し、同意します',
    agreementError: '利用規約への同意が必要です',
    start: '診断を始める',
  },
  en: {
    eyebrow: 'Animal Personality Quiz · Jouzukan',
    heroAlt: 'Which legendary type are you?',
    heroTitle: 'Which legendary type are you?',
    introLead: 'Throughout JOHNAN’s long history, legendary people have helped shape who we are today.',
    introBody: 'Which legend does your personality resemble?',
    introBodySecond: 'Answer the questions and discover the legendary spirit within you!',
    formTitle: 'Start with just a nickname',
    nickname: 'Nickname',
    nicknamePlaceholder: 'e.g. Jack',
    nicknameError: 'Please enter a nickname.',
    terms: 'Terms of Use',
    agreement: 'I have read and agree to the ',
    agreementError: 'You need to agree to the Terms of Use.',
    start: 'Start the Quiz',
  },
} as const;

export const QUIZ_COPY = {
  ja: {
    disagree: 'そう\n思わない',
    agree: 'そう思う',
    illustrationAlt: '質問のイラスト',
    optionLabel: (value: number) => `回答 ${value}`,
  },
  en: {
    disagree: 'Disagree',
    agree: 'Agree',
    illustrationAlt: 'Question illustration',
    optionLabel: (value: number) => `Response ${value} of 5`,
  },
} as const;

export const ABOUT_COPY = {
  ja: {
    title: 'じょうずかんとは？',
    sections: [
      {
        title: 'あなたらしさを、動物で見える化',
        body: '「じょうずかん」は、あなたの得意なこと、あなたらしさを発見するための診断ツールです。簡単な質問に直感で答えるだけで、あなたの性格や個性を動物のタイプとして可視化します。',
      },
      {
        title: '自己理解を深めるきっかけに',
        body: '診断結果は、あなたの強みや個性を再発見するヒントになります。自分では気づかなかった一面や、大切にしている価値観が見えてくるかもしれません。',
      },
      {
        title: '楽しみながら、学ぶ',
        body: '診断は楽しく、気軽に。でも、その結果には意味があります。仲間とシェアして、お互いの個性を理解し合う機会にもなります。',
      },
    ],
    closing: 'さぁ、あなたの中に眠る動物を\n見つけに行きましょう！',
  },
  en: {
    title: 'What is Jouzukan?',
    sections: [
      {
        title: 'See your personality as an animal',
        body: 'Jouzukan is a personality quiz designed to help you discover what you do well and what makes you unique. Answer a few simple questions intuitively, and your personality will appear as an animal type.',
      },
      {
        title: 'A starting point for self-discovery',
        body: 'Your result offers clues for rediscovering your strengths and individuality. You may notice qualities you had overlooked or values that matter deeply to you.',
      },
      {
        title: 'Learn while having fun',
        body: 'The quiz is light and enjoyable, but its result can still be meaningful. Share it with teammates and use it as a way to understand one another better.',
      },
    ],
    closing: 'Ready to meet the animal\nwaiting inside you?',
  },
} as const;

export const ENCYCLOPEDIA_COPY = {
  ja: {
    title: '〇〇じょうずな仲間たち',
    intro: 'JOHNANの歴史と価値観を受けつぐ、それぞれに役割と強みをもった「じょうずな動物たち」のご紹介。',
    closing: 'すべての動物たちに、それぞれの個性と魅力があります。\nあなたの周りの人はどのタイプかな？',
  },
  en: {
    title: 'Meet the Jouzukan Animals',
    intro: 'Meet the animals that carry JOHNAN’s history and values, each with a distinctive role and strength.',
    closing: 'Every animal has its own personality and appeal.\nWhich types do you see in the people around you?',
  },
} as const;

export const FAQ_COPY = {
  ja: {
    title: 'よくある質問',
    intro: 'じょうずかんについての疑問にお答えします',
    closing: 'その他のご質問がありましたら、お気軽にお問い合わせください。',
    items: [
      ['じょうずかんとは何ですか？', 'あなたの得意なことや個性を、動物のタイプとして可視化する診断ツールです。簡単な質問に答えるだけで、あなたらしさを発見できます。'],
      ['診断にはどれくらい時間がかかりますか？', '全18問で、約3分程度で完了します。直感で答えていただくのがおすすめです。'],
      ['入力したニックネームや回答は保存されますか？', 'ニックネームと回答は、現在の診断結果を表示して画像を作るためだけに使います。アカウントや診断履歴としてサーバーに保存することはありません。'],
      ['診断結果はどのように残せますか？', '診断完了後に画面で確認できるほか、要約版を1枚のPNG画像として保存できます。対応するスマートフォンでは共有メニューも利用できます。'],
      ['何度も診断を受けられますか？', 'はい、何度でも診断を受けることができます。時期によって結果が変わることもあるので、定期的に試してみるのも面白いかもしれません。'],
      ['結果が自分に合っていないと感じたら？', 'この診断は、あくまで一つの見方を提供するものです。結果はヒントとして捉え、自己理解を深めるきっかけにしていただければ幸いです。'],
    ],
  },
  en: {
    title: 'Frequently Asked Questions',
    intro: 'Answers to common questions about Jouzukan',
    closing: 'If you have another question, please feel free to contact us.',
    items: [
      ['What is Jouzukan?', 'It is a personality quiz that turns your strengths and individuality into an animal type. A few simple questions can help you discover what makes you unique.'],
      ['How long does the quiz take?', 'There are 18 questions, and most people finish in about three minutes. We recommend answering intuitively.'],
      ['Are my nickname and answers saved?', 'They are used only to show your current result and create the result image. They are not stored on a server as an account or diagnosis history.'],
      ['How can I keep my result?', 'You can view it on screen and save a one-page PNG summary. Supported smartphones can also open the device share menu.'],
      ['Can I take the quiz more than once?', 'Yes. You can take it as often as you like. Your result may change over time, so trying it again later can be interesting.'],
      ['What if the result does not feel like me?', 'This quiz offers only one perspective. Treat the result as a clue and a starting point for deeper self-understanding.'],
    ],
  },
} as const;

export const TERMS_COPY = {
  ja: {
    title: '診断をはじめる前に',
    intro: '＼ 使用上の注意点をチェックしてね ／',
    notices: [
      ['タイプ分類は「補助線」です', 'この診断のラベリング（タイプ分類）は、あなたを決めつけるものではありません。お互いを理解するための「補助線」、対話のきっかけとして使ってください。'],
      ['おみくじのようなものです', '結果は、その時どきの暫定的なもの。正確にあなたを言い当てるものではありません。気分や状況で変わる「今日のあなた」を映すおみくじ感覚で楽しんでください。'],
      ['入力内容は診断中だけ使います', 'ニックネームと回答内容は、診断結果の表示と画像作成に必要な範囲でのみ使います。アカウントとの紐づけや、診断履歴の保存は行いません。'],
    ],
    agreement: '上記の利用規約を確認し、同意しました',
    agreementError: '同意のチェックを入れると診断に進めます',
    agreeAndBack: '同意してホームへ戻る',
    backWithoutAgreeing: '同意せずにホームへ戻る',
  },
  en: {
    title: 'Before You Begin',
    intro: 'Please review these important notes',
    notices: [
      ['Types are guide lines, not labels', 'The animal type does not define who you are. Use it as a guide for understanding one another and as a starting point for conversation.'],
      ['Think of the result like a fortune slip', 'Your result is a snapshot of this moment, not a perfect description of you. Enjoy it as a reflection of today’s mood and circumstances.'],
      ['Your input is used only during this quiz', 'Your nickname and answers are used only to display the result and create its image. We do not connect them to an account or save a diagnosis history.'],
    ],
    agreement: 'I have reviewed and agree to the Terms of Use',
    agreementError: 'Please check the agreement box to continue.',
    agreeAndBack: 'Agree and Return Home',
    backWithoutAgreeing: 'Return Without Agreeing',
  },
} as const;

export const LOADING_COPY = {
  ja: {
    title: '歴史を紐解いています...',
    body: 'あなたの魂に近いレジェンドを探しています',
  },
  en: {
    title: 'Exploring the history...',
    body: 'Finding the legend closest to your spirit',
  },
} as const;

export const RESULT_COPY = {
  ja: {
    fallbackName: 'あなた',
    typeIntro: (name: string) => `${name}のタイプは...`,
    titlePrefix: (name: string) => `${name}のタイプは、`,
    titleResult: (typeName: string) => `${typeName}タイプです`,
    diagnosisType: '診断タイプ',
    flipHint: 'タップで能力を見る',
    summary: '診断結果の要約',
    features: '主な特徴',
    strengths: '強み',
    recommendation: 'おすすめの行動',
    doctor: 'じょうずかん博士',
    similarLegend: '似ているレジェンド',
    connection: 'キミとの繋がり',
    fortuneTitle: 'この結果は「おみくじ」のようなもの',
    fortuneBody: '診断結果は、その時どきの暫定的なものです。あなたを正確に決めるものではありません。タイプはお互いを知るための「補助線」。まわりの人との対話のきっかけにしてみてくださいね。',
    save: '結果を画像で保存する',
    saving: '画像を作成中…',
    retry: 'もう一度診断する',
    creating: '保存用の画像を作成しています…',
    shared: '共有メニューへ診断結果を渡しました。',
    shareCancelled: '共有をキャンセルしました。',
    saved: 'PNG画像を保存しました。',
    saveFailed: '画像を保存できませんでした。もう一度お試しください。',
    shareTitle: 'じょうずかん 診断結果',
    shareText: (name: string) => `${name}の診断結果`,
    filenameSuffix: '診断結果',
    featureOne: (catchphrase: string) => `${catchphrase}を活かせる`,
    featureTwo: (strength: string) => `${strength}が自然に表れる`,
    recommendationBody: (strength: string) => `今日の仕事で「${strength}」を活かせる小さな一歩を決め、身近な人に声をかけてみましょう。`,
    connectionBody: (legendName: string, catchphrase: string, strength: string) => `${legendName}は、${catchphrase}のような人じゃ。あなたの中から湧き出る「${strength}」は、まさに${legendName}の生きた証と重なるじゃろう！`,
    card: {
      brand: '動物診断アプリ じょうずかん',
      typeLine: (name: string) => `${name}のタイプは、`,
      typeResult: (typeName: string) => `${typeName}タイプです`,
      diagnosisType: 'あなたの診断タイプ',
      summary: '診断結果の要約',
      features: '主な特徴',
      strengths: '強み',
      recommendation: 'おすすめの行動',
      footer: '今日の自分を知る、対話のきっかけに。',
    },
  },
  en: {
    fallbackName: 'You',
    typeIntro: (name: string) => `${name}’s type is...`,
    titlePrefix: (name: string) => `${name}’s type is`,
    titleResult: (typeName: string) => typeName,
    diagnosisType: 'Your Diagnosis Type',
    flipHint: 'Tap to view your strengths',
    summary: 'Result Summary',
    features: 'Key Traits',
    strengths: 'Strengths',
    recommendation: 'Recommended Action',
    doctor: 'Professor Jouzukan',
    similarLegend: 'A Similar JOHNAN Legend',
    connection: 'Your Connection',
    fortuneTitle: 'Think of this result like a fortune slip',
    fortuneBody: 'This result is a snapshot of this moment. It does not define you precisely. Use the type as a guide for understanding one another and as a starting point for conversation.',
    save: 'Save Result as an Image',
    saving: 'Creating image…',
    retry: 'Take the Quiz Again',
    creating: 'Creating your shareable result image…',
    shared: 'Your result was sent to the share menu.',
    shareCancelled: 'Sharing was cancelled.',
    saved: 'The PNG image has been saved.',
    saveFailed: 'The image could not be saved. Please try again.',
    shareTitle: 'Jouzukan Quiz Result',
    shareText: (name: string) => `${name}’s Jouzukan result`,
    filenameSuffix: 'quiz-result',
    featureOne: (catchphrase: string) => catchphrase,
    featureTwo: (strength: string) => `${strength} comes naturally`,
    recommendationBody: (strength: string) => `Choose one small way to use your ${strength.toLowerCase()} at work today, and invite someone nearby to join you.`,
    connectionBody: (legendName: string, catchphrase: string, strength: string) => `${legendName} lived with the spirit of “${catchphrase}.” Your natural ${strength.toLowerCase()} echoes that same legacy.`,
    card: {
      brand: 'Animal Personality Quiz · Jouzukan',
      typeLine: (name: string) => `${name}’s type is`,
      typeResult: (typeName: string) => typeName,
      diagnosisType: 'YOUR DIAGNOSIS TYPE',
      summary: 'RESULT SUMMARY',
      features: 'KEY TRAITS',
      strengths: 'STRENGTHS',
      recommendation: 'RECOMMENDED ACTION',
      footer: 'Know yourself today. Start a conversation tomorrow.',
    },
  },
} as const;

export const QUESTION_TEXT_EN: Record<number, string> = {
  1: 'When I hear an opinion that conflicts with mine, I try to understand why the person thinks that way before responding.',
  2: 'If it helps the whole team succeed, I am happy to work behind the scenes even when I receive no credit.',
  3: 'Even when I am busy, I stop to check in or help when someone around me seems to be struggling.',
  4: 'I prefer building something through lively discussion with others rather than working silently on my own.',
  5: 'Once I decide to do something, I am determined to finish it even when circumstances become difficult.',
  6: 'When a difficult problem appears, I feel energized by the challenge rather than discouraged.',
  7: 'If my company or team is about to do something wrong, I am prepared to say so even when it is unpopular.',
  8: 'Rules and profit matter, but protecting human freedom and love matters even more to me.',
  9: 'Looking back on turning points in my life, I feel that fortunate encounters beyond planning or effort helped me.',
  10: 'Even without clear evidence, I often feel confident that things will work out in the end.',
  11: 'I approach today’s work while imagining how it might connect to the world ten or one hundred years from now.',
  12: 'I do my best work when there is a meaningful purpose for someone else or for society, rather than personal gain.',
  13: 'When I think about the work or role I have been given, gratitude comes before dissatisfaction.',
  14: 'When creating a product or service, I care as much about whether it improves the world as whether it will sell.',
  15: 'When my desk or data is disorganized, it bothers me so much that I find it difficult to focus.',
  16: 'I feel more satisfied after fully identifying the cause of a failure than after succeeding without knowing why.',
  17: 'Repeating the usual method feels dull; I always want to find a more interesting approach.',
  18: 'I believe even a wild idea that others call impossible can be worth bringing to life.',
};

export const PARAM_LABELS_BY_LANGUAGE: Record<Language, Record<ParameterKey, string>> = {
  ja: {
    Warmth: 'あったかハート',
    Responsibility: 'やりぬく力',
    UniversalTruth: '正義と愛',
    DivineGuidance: '不思議な運',
    Mission: '未来への想い',
    HeavenlyWork: '感謝の心',
    Thoroughness: 'キッチリ徹底',
    Innovation: '新しいこと好き',
    Respect: 'みんなを尊重',
  },
  en: {
    Warmth: 'Warmth',
    Responsibility: 'Follow-through',
    UniversalTruth: 'Justice & Love',
    DivineGuidance: 'Serendipity',
    Mission: 'Future Vision',
    HeavenlyWork: 'Gratitude',
    Thoroughness: 'Thoroughness',
    Innovation: 'Innovation',
    Respect: 'Respect',
  },
};

type AnimalTranslation = Pick<AnimalType, 'name' | 'catchphrase' | 'description' | 'legendName' | 'legendRole'>;

const ANIMAL_TRANSLATIONS_EN: Record<string, AnimalTranslation> = {
  lion: {
    name: 'The Conviction Lion',
    catchphrase: 'Standing Firm in Conviction',
    description: 'You are a Lion—the king of beasts. Like the founder who opened new paths in JOHNAN’s history, you hold strong beliefs about how things should be and have the leadership to bring others with you.',
    legendName: 'Matsuo Yamamoto',
    legendRole: 'Founder',
  },
  dove: {
    name: 'The Caring Dove',
    catchphrase: 'Sharing Love',
    description: 'You are a Dove, a symbol of peace. Your kindness helps people feel safe and at ease. You carry the caring spirit that has protected a welcoming place for everyone throughout the organization’s history.',
    legendName: 'Haruko Yamamoto',
    legendRole: 'A spiritual pillar of love',
  },
  eagle: {
    name: 'The Visionary Eagle',
    catchphrase: 'Seeing the Future',
    description: 'You are an Eagle, ruler of the skies. You see far ahead and often sense what is coming next. Your foresight can help JOHNAN soar into a new era.',
    legendName: 'Mitsuyo Yamamoto',
    legendRole: 'Fourth-generation transformer',
  },
  deer: {
    name: 'The Balanced Deer',
    catchphrase: 'Finding Balance',
    description: 'You are a graceful Deer. You can hold high ideals while keeping your feet firmly on the ground. Your discipline and sincerity help you build lasting trust.',
    legendName: 'Takaharu Yamamoto',
    legendRole: 'Sincere third-generation leader',
  },
  bull: {
    name: 'The Steadfast Bull',
    catchphrase: 'Protecting the Front Line',
    description: 'You are a powerful Bull. Your dependable “leave it to me” spirit stands out. You complete difficult work and protect the people who keep manufacturing moving.',
    legendName: 'Kazuo Inaba',
    legendRole: 'Manufacturing legend',
  },
  ant: {
    name: 'The Diligent Ant',
    catchphrase: 'Building Step by Step',
    description: 'You are a hardworking Ant. By steadily building small achievements, you create something significant over time. You may not seek the spotlight, but you form a reliable foundation for the whole organization.',
    legendName: 'Eiko Murakami',
    legendRole: 'Builder of the financial foundation',
  },
  serpent: {
    name: 'The Wise Serpent',
    catchphrase: 'Sharpening Wisdom',
    description: 'You are a wise Serpent. You observe calmly and enjoy deepening your technical knowledge. Your curiosity and expertise turn ideas into new value.',
    legendName: 'Yoshio Sano',
    legendRole: 'Development pioneer',
  },
  lamb: {
    name: 'The Beloved Lamb',
    catchphrase: 'Earning Love and Support',
    description: 'You are a pure-hearted Lamb. You approach new challenges openly and honestly. While carrying forward the founding spirit, you have the potential to become a young leader people genuinely want to support.',
    legendName: 'Masaru Yamamoto',
    legendRole: 'Second-generation president',
  },
  horse: {
    name: 'The Driven Horse',
    catchphrase: 'Racing Toward Goals',
    description: 'You are a fast-moving Horse. Your energy takes you straight toward a goal. You arrive early at new ventures and difficult worksites, opening paths with speed and courage.',
    legendName: 'Hiroshi Kanemitsu',
    legendRole: 'Device business pioneer',
  },
  camel: {
    name: 'The Resilient Camel',
    catchphrase: 'Walking with Patience',
    description: 'You are a resilient Camel. Even in harsh conditions, you keep moving forward calmly and reliably. Your discipline and respect for commitments make you someone others can trust.',
    legendName: 'Kazuyuki Abe',
    legendRole: 'Guardian of production management',
  },
  donkey: {
    name: 'The Peace-Bearing Donkey',
    catchphrase: 'Carrying Peace',
    description: 'You are a gentle Donkey. Your work may look modest, but it carries the peace and reassurance a team needs most. Your humility, warmth, and willingness to share another person’s load make you shine.',
    legendName: 'Eriko Iguchi',
    legendRole: 'Legend of service',
  },
  fish: {
    name: 'The Miracle-Making Fish',
    catchphrase: 'Creating Miracles',
    description: 'You are a Fish full of possibility. You can turn a small opportunity into a surprising achievement. Moving freely within the team, you lift the mood and guide others toward an exciting future.',
    legendName: 'Yuka Koizumi',
    legendRole: 'Legend of possibility',
  },
};

export const localizeAnimal = (animal: AnimalType, language: Language): AnimalType => {
  if (language === 'ja') return animal;
  return { ...animal, ...ANIMAL_TRANSLATIONS_EN[animal.id] };
};

export const LEGEND_EPISODES_EN: Record<string, LegendEpisode[]> = {
  lion: [
    { title: 'The origin of respect for every person', content: 'After being treated inhumanely as a 14-year-old apprentice, he developed a firm belief that every person deserves respect regardless of position.' },
    { title: 'Work received from heaven', content: 'He regarded his encounter with transistors as his life’s work and encouraged employees to bring their whole spirit and care to the job.' },
    { title: 'Leadership through humility', content: 'At a Matsushita Electric New Year gathering, he bowed to every section manager guiding guests and greeted each one with thoughtful humility.' },
  ],
  dove: [
    { title: 'The starting point of the company', content: 'After moving to Uji, she began soldering transistor components at home to support the family. That work became the origin of the company.' },
    { title: 'Quality through honest dialogue', content: 'When defective items were returned, she asked the customer to explain the problem. Her seriousness led a Matsushita engineer to visit her home and provide guidance.' },
    { title: 'A caring workplace culture', content: 'She helped establish the Kohitsuji nursery inside the factory for employees and their families.' },
  ],
  eagle: [
    { title: 'A purpose-driven decision', content: 'While studying in the United States, she learned that the company’s Eco Aqua Clean product could help the environment and society, inspiring her to join.' },
    { title: 'A new kind of leadership', content: 'She finds the greatest joy in watching young people grow and values talent previous generations might have overlooked. She sees multi-skilled teams as vital to becoming a 100-year company.' },
  ],
  deer: [
    { title: 'A source of inner strength', content: 'While serving as president amid many problems, his Christian faith became a source of strength that helped him overcome hardship.' },
    { title: 'Sacrifice for the next generation', content: 'To prepare the transition to the fourth generation, he took on difficult reforms and major construction, completing years of demanding work in a short period.' },
  ],
  bull: [
    { title: 'Respect and warmth', content: 'He learned that business begins with consideration for people. During a financial crisis, the founder’s assurance that everyone would still be fed gave him the resolve to stay.' },
    { title: 'Finishing with responsibility', content: 'During inventory counts, he stayed through the night and completed the work alongside the people on site.' },
  ],
  ant: [
    { title: 'Warm support', content: 'She used the company nursery to balance family and work, and supported factory operations late into the night during busy periods.' },
    { title: 'Kindness with discipline', content: 'The founder taught her that management sometimes requires hard decisions, showing her the reality of leading with both kindness and rigor.' },
    { title: 'Thorough systems and new challenges', content: 'She built a strong accounting system, led online connections and computer adoption, and created practices praised during tax inspections.' },
  ],
  serpent: [
    { title: 'Acting with a wide view', content: 'Following the principle that operators should not need to leave their chairs, he moved around the floor attentively to improve uptime.' },
    { title: 'Improvement through ingenuity', content: 'He combined manual equipment and reused idle parts to create low-cost automated and semi-automated systems.' },
    { title: 'Safety first', content: 'When introducing new equipment, he emphasized safeguards and trained both operators and maintenance staff to prevent accidents.' },
  ],
  lamb: [
    { title: 'Responsibility in action', content: 'Soon after joining, he faced severe financial conditions. When payroll became difficult, he worked nights as a substitute driver to help cover employee wages.' },
    { title: 'A new path after leadership', content: 'After stepping down, he studied for two years, earned a care-worker qualification, and began working in elder care.' },
  ],
  horse: [
    { title: 'Launching with determination', content: 'Soon after joining, he helped six young colleagues launch the Bizen factory, introduced round-the-clock operations, and established a new dicing process.' },
    { title: 'Teamwork across factories', content: 'He valued close coordination with manufacturing teams. When a deadline was at risk, multiple factories worked together and delivered on time.' },
    { title: 'A broad view and desire to improve', content: 'He shared how nervous he felt presenting at a QC circle event and used the experience to teach the importance of continuous growth.' },
  ],
  camel: [
    { title: 'Building useful systems', content: 'He created systems for labor, inventory, accounts receivable, and payment matching, making it possible to answer customer questions quickly.' },
    { title: 'Learning from failure', content: 'Some early systems created too much input work and produced little benefit. He learned from those failures and kept improving them.' },
    { title: 'Designing from the user’s viewpoint', content: 'He made sure shop-floor data could always be exported to Excel, and treasured hearing a supervisor say, “Thank you for going this far.”' },
  ],
  donkey: [
    { title: 'A spirit of service', content: 'She took responsibility for quiet but essential work that created peace and reassurance. Her humble willingness to carry another person’s load supported the whole organization.' },
  ],
  fish: [
    { title: 'A workplace where people can speak', content: 'She valued a positive workplace where anyone could speak honestly, including with supervisors.' },
    { title: 'A habit of observation', content: 'Her work broadened her interest in manufacturing and made her curious to take apart appliances and understand how they worked.' },
    { title: 'The first step toward improvement', content: 'She identified unclear procedures and rules as an issue, then worked with her supervisor to put better standards in place.' },
  ],
};

export const getLegendEpisodes = (
  japaneseEpisodes: Record<string, LegendEpisode[]>,
  animalId: string,
  language: Language,
) => language === 'ja'
  ? japaneseEpisodes[animalId] || []
  : LEGEND_EPISODES_EN[animalId] || [];

export const DOCTOR_AFFIRMATIONS: Record<Language, Record<ParameterKey, string>> = {
  ja: {
    Respect: '相手を思いやる心は、信頼を築く最強の武器じゃ。',
    Warmth: 'その優しさが、まわりの空気をあたたかくしておるのう。',
    Responsibility: '最後までやり遂げる力は、誰かが見ておるもんじゃよ。',
    UniversalTruth: '正しさを愛するその心、とても美しいのう。',
    DivineGuidance: '不思議な力に守られておる。流れに身を任せるのもまた一興じゃ。',
    Mission: '遠い未来を思うその眼差しが、道を開いていくんじゃな。',
    HeavenlyWork: '感謝の心を持つ者は、いつまでも愛されるもんじゃよ。',
    Thoroughness: '細部へのこだわりが、神を宿らせるんじゃな。',
    Innovation: '新しい風を吹かせるその勇気が、世界を変えていくんじゃ。',
  },
  en: {
    Respect: 'Your consideration for others is one of the strongest tools for building trust.',
    Warmth: 'Your kindness makes the atmosphere around you warmer.',
    Responsibility: 'Your ability to follow through is noticed, even when no one says it aloud.',
    UniversalTruth: 'Your love of what is right is a beautiful strength.',
    DivineGuidance: 'You seem to move with a fortunate current. Sometimes trusting the flow is worthwhile.',
    Mission: 'The way you look toward the distant future can open a new path.',
    HeavenlyWork: 'A person who carries gratitude continues to earn lasting affection.',
    Thoroughness: 'Your care for the details is where exceptional work begins.',
    Innovation: 'Your courage to bring in a fresh wind can change the world.',
  },
};

export const getDoctorComment = (
  scores: Record<ParameterKey, number>,
  language: Language,
) => {
  const [topKey] = (Object.entries(scores) as [ParameterKey, number][])
    .sort((a, b) => b[1] - a[1])[0];
  const label = PARAM_LABELS_BY_LANGUAGE[language][topKey];

  if (language === 'ja') {
    return `ふむ…… いまのあなたは、『${label}』のちからが、じょじょに出てきとるようじゃ。${DOCTOR_AFFIRMATIONS.ja[topKey]}`;
  }

  return `Hmm… your strength in ${label.toLowerCase()} is beginning to shine. ${DOCTOR_AFFIRMATIONS.en[topKey]}`;
};
