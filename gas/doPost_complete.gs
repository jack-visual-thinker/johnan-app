// ===== 似ているレジェンド紹介文（フォールバック用に残す） =====
const LEGENDS = {
  lion:   { name: '山本 松雄さん', role: '創業者', eps: [
    { t: '人格尊重の原点', c: '14歳の丁稚奉公時代、食事が土間で「かまちがお膳」、風呂の順番が女中さんの次という非人道的な扱いを受けた経験から、「どんな立場でも人格を尊重する」という強い信念を持つに至った。' },
    { t: '天からの仕事', c: 'トランジスタとの出会いを「生涯の仕事」「天からの仕事」と捉え、その仕事に魂と祈りを込めることを従業員に説いた。' },
    { t: '経営姿勢', c: '松下電器の賀詞交換会では、案内役の課長一人ひとりに頭を下げ「お寒うございます」と声をかける謙虚な気配りを見せた。' } ] },
  dove:   { name: '山本 春子さん', role: '愛の精神的支柱', eps: [
    { t: '創業の原点', c: '宇治へ転居後、生活を支えるためトランジスタ部品の半田付けの内職を始め、これが会社の源流となった。' },
    { t: '品質と対話', c: '不良品が戻った際、「どこが悪いか説明してほしい」と納入先に求め、松下電器の技術者が自宅に指導に来るという品質への真剣な対話を実現した。' },
    { t: '組織文化', c: '従業員のために、こひつじ保育園を工場内に併設させた。' } ] },
  eagle:  { name: '山本 光世さん', role: '変革の4代目', eps: [
    { t: '入社の動機', c: '米国留学中に、自社製品「エコアクアクリーン」が環境保全や社会の役に立つ商品であると知り、入社を決意した。' },
    { t: '新しいリーダーシップ', c: '若者が成長する姿を見るのが一番嬉しいとし、旧世代では活用しなかった人材も戦力とする経営感覚を持つ。多能工化を100年企業存続の最重要課題と位置づけている。' } ] },
  deer:   { name: '山本 高春さん', role: '誠実な3代目', eps: [
    { t: '心の拠り所', c: '社長時代、問題が山積する中で「我が社の社主は主イエスなり」と心に掲げ、信仰を心の拠り所として困難を乗り越えた。' },
    { t: '犠牲と発展', c: '4代目にバトンタッチするため悪者役を引き受け、古株社員の整理や新社屋建設など、20年分の気力を使うほどの難題を6年間で成し遂げた。' } ] },
  bull:   { name: '稲葉 和雄さん', role: '製造のレジェンド', eps: [
    { t: '人格尊重と暖かさ', c: '資金繰りが苦しい時期に辞意を伝えた際、創業者から「飯くらい食わす。心配すんな！」と一喝され、腹を括る。創業者の気配りから商売の根本を学んだ。' },
    { t: '責任を持ってやり切る', c: '棚卸では徹夜も責任者として現場と一緒にやり切った。' } ] },
  ant:    { name: '村上 英子さん', role: '財務の礎を築いた人', eps: [
    { t: '暖かな支援', c: '入社当初、社内のこひつじ保育園を活用し家庭と仕事を両立。忙しい時期は夜中まで工場作業を支援した。' },
    { t: '厳しさと優しさ', c: '創業者から「事業者は一面非情でないといかん」と叱られ、優しさと厳しさを含む経営のリアルを学んだ。' },
    { t: '徹底と新しい挑戦', c: '工場経理を基礎から教育し、税務調査で褒められる体制を構築。オンライン接続やシステム導入を主導した。' } ] },
  serpent:{ name: '佐野 好男さん', role: '開発のパイオニア', eps: [
    { t: '広い視野での行動', c: '「作業者を椅子から立たせるな」という方針のもと、目配り・気配りをしながら走り回り、稼働率向上に努めた。' },
    { t: '創意工夫による改善', c: '手動設備を合体させて自動化設備を製作したり、遊休部品で半自動設備をつくるなど、ローコスト高効率な改善を常態化させた。' },
    { t: '安全への配慮', c: '新規設備導入の際は安全装置を重視し、メンテナンス作業者にも事故が起こらないよう教育を徹底した。' } ] },
  lamb:   { name: '山本 勝さん', role: '2代目社長', eps: [
    { t: '責任と実行', c: '給料支払いが厳しくなった際、週3回、夜間の運転代行のアルバイトを行い、従業員の給与を補填した。' },
    { t: '退任後の行動', c: '退任後、2年間専門学校に通い、長年の希望であった介護福祉士の資格を取得し、高齢者介護の仕事に就いた。' } ] },
  horse:  { name: '金光 宏さん', role: 'デバイス事業の開拓者', eps: [
    { t: '徹底した立ち上げ', c: '若手6名で備前工場を立上げ、当時珍しかった2名交替24時間稼働を実現。受注拡大に貢献した。' },
    { t: 'チームワーク', c: '製造部門との連携を重視。納期危機では工場横断で対応し、無事間に合わせた。' },
    { t: '広い視野と向上心', c: '足が震えるほど緊張しながらQCサークル発表をした経験を語り、向上心を持つことの大切さを説く。' } ] },
  camel:  { name: '阿部 和幸さん', role: '生産管理の守り神', eps: [
    { t: '仕組みを作る', c: '工数管理、在庫管理、売掛/入金照合システムなど多数の仕組みを構築し、顧客からの問い合わせに即答できる土台を造った。' },
    { t: '失敗からの学習', c: '作成したシステムが入力負荷などで効果がなかった失敗を経験し、改善を重ねた。' },
    { t: '相手目線での設計', c: '現場で使えるようデータは必ずExcel出力できるよう設計。上司からの「ありがとう」が嬉しかった。' } ] },
  donkey: { name: '井口 江利子さん & 吉岡 三重子さん', role: '奉仕のレジェンド', eps: [
    { t: '奉仕の心', c: '一見地味でも、誰かがやらねばならない「平和」と「安心」を作る仕事を責任を持ってやり遂げた。謙虚で温かい奉仕の心が組織の安心感を支え続けた。' } ] },
  fish:   { name: '小泉 由佳さん & 高見 恵美さん', role: '可能性のレジェンド', eps: [
    { t: '発言しやすい職場', c: '上司に対しても素直に言え、皆が発言できる雰囲気の良い職場を評価している。' },
    { t: '観察する習慣', c: 'ものづくり全般に興味が広がり、電化製品を分解して中身を観察したいと思うようになった。' },
    { t: '改善への第一歩', c: '手順やルールが明確でない部分を課題化し、上司と相談しながらルール整備を進めた。' } ] }
};

function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    const names = params.name;
    const email = params.email;
    const animal = params.animal;
    const scores = params.scores;
    // アプリ側で生成された正方形カード画像（base64・プレフィックスなし）
    const animalCard = params.animalCard;
    const legendCard = params.legendCard;

    // スプレッドシートへの記録（従来通り）
    SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
      .appendRow([new Date(), names, email, animal, JSON.stringify(scores)]);

    if (email) {
      if (animalCard && legendCard) {
        sendCardEmail_(names, email, animalCard, legendCard);
      } else {
        // 旧形式ペイロードへのフォールバック（従来のメール）
        sendLegacyEmail_(names, email, animal, scores);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== 新メール: 挨拶ひとこと ＋ 正方形カード2枚 =====
function sendCardEmail_(names, email, animalCard, legendCard) {
  const subject = "【じょうずかん】動物診断結果のお知らせ";

  const inlineImages = {
    animalCard: Utilities.newBlob(Utilities.base64Decode(animalCard), 'image/png', 'animalCard.png'),
    legendCard: Utilities.newBlob(Utilities.base64Decode(legendCard), 'image/png', 'legendCard.png')
  };

  const htmlBody =
    "<div style='background-color:#FFFFFF; text-align:center; padding:24px 0;'>" +
    "<div style='display:inline-block; width:92%; max-width:520px; text-align:left; font-family:sans-serif; color:#5D4037; line-height:1.7; background-color:#FFFFFF;'>" +
      "<p>" + names + " 様</p>" +
      "<p>じょうずかんを受けていただき、ありがとうございます！<br>" +
      "あなたの診断結果をお届けします。</p>" +
      "<img src='cid:animalCard' width='480' style='display:block; width:100%; max-width:480px; height:auto; margin:20px auto; border-radius:16px;' alt='診断結果'>" +
      "<img src='cid:legendCard' width='480' style='display:block; width:100%; max-width:480px; height:auto; margin:20px auto; border-radius:16px;' alt='似ているレジェンド'>" +
      "<p>この結果は、いまのあなたの傾向をうつした“おみくじ”のようなものです。<br>" +
      "あなたを決めつけるものではなく、まわりの人との対話や、自分を見つめるきっかけとして、ゆるやかに活かしてみてくださいね。</p>" +
      "<p>またのご利用をお待ちしております！</p>" +
      "<br>" +
      "<p style='text-align:center; color:#999;'>--------------------------------------------------<br>" +
      "JOJOEN飼育委員会<br>" +
      "--------------------------------------------------</p>" +
    "</div>" +
    "</div>";

  GmailApp.sendEmail(email, subject, "", { htmlBody: htmlBody, inlineImages: inlineImages });
}

// ===== 旧メール（カード無しペイロード用フォールバック・従来コードそのまま） =====
function sendLegacyEmail_(names, email, animal, scores) {
  const IMAGE_BASE_URL = "https://johnan-app.vercel.app";

  // 1. 動物画像
  const animalMap = {
    'ライオン': 'lion', 'ハト': 'dove', 'ワシ': 'eagle', 'シカ': 'deer',
    'オウシ': 'bull', 'アリ': 'ant', 'ヘビ': 'serpent', 'コヒツジ': 'lamb',
    'ウマ': 'horse', 'ラクダ': 'camel', 'ロバ': 'donkey', 'サカナ': 'fish'
  };
  let animalId = 'lion';
  for (const [jpName, enId] of Object.entries(animalMap)) {
    if (animal.indexOf(jpName) !== -1) { animalId = enId; break; }
  }
  let animalImageBlob = null;
  try {
    const r = UrlFetchApp.fetch(IMAGE_BASE_URL + "/images/" + animalId + ".png", {muteHttpExceptions: true});
    if (r.getResponseCode() === 200) animalImageBlob = r.getBlob().setName("animalImage");
  } catch (err) { console.error("Animal image fetch failed: " + err); }

  // 2. チャート (QuickChart)
  let chartImageBlob = null;
  try {
    const labelMap = {
      Respect: 'みんなを尊重', Warmth: 'あったかハート', Responsibility: 'やりぬく力',
      UniversalTruth: '正義と愛', DivineGuidance: '不思議な運', Mission: '未来への想い',
      HeavenlyWork: '感謝の心', Thoroughness: 'キッチリ徹底', Innovation: '新しいこと好き'
    };
    const chartConfig = {
      type: 'radar',
      data: { labels: Object.keys(scores).map(function(k){ return labelMap[k] || k }),
        datasets: [{ label: '', data: Object.values(scores),
          backgroundColor: 'rgba(240, 165, 0, 0.4)', borderColor: '#D97706',
          pointBackgroundColor: '#D97706', borderWidth: 2 }] },
      options: { scale: { ticks: { beginAtZero: true, max: 20, stepSize: 5, fontSize: 18 },
        pointLabels: { fontSize: 18 } }, legend: { display: false } }
    };
    const cu = "https://quickchart.io/chart?c=" + encodeURIComponent(JSON.stringify(chartConfig)) + "&w=500&h=500&backgroundColor=white";
    const cr = UrlFetchApp.fetch(cu, {muteHttpExceptions: true});
    if (cr.getResponseCode() === 200) chartImageBlob = cr.getBlob().setName("chartImage");
  } catch (err) { console.error("Chart image fetch failed: " + err); }

  // 3. タイトル分解
  const parts = animal.split('じょうずな');
  let catchphrase = parts[0] ? parts[0].replace(/[「」]/g, '') : '';
  const animalNameOnly = parts[1] || animal;

  // 4. レジェンド紹介ブロック
  let legendBlock = '';
  const lg = LEGENDS[animalId];
  if (lg) {
    const eps = lg.eps.map(function(ep){
      return "<div style='background-color:#FFFBF0; border-radius:10px; padding:12px 16px; margin-bottom:10px; text-align:left;'>" +
             "<div style='color:#D97706; font-weight:bold; margin-bottom:4px;'>" + ep.t + "</div>" +
             "<div style='font-size:14px; line-height:1.7; color:#5D4037;'>" + ep.c + "</div></div>";
    }).join('');
    legendBlock =
      "<p style='text-align:center; color:#5D4037;'>━━━━━━━━━━━━━━━━━━</p>" +
      "<div style='text-align:center; margin-top:8px;'>" +
        "<h3 style='display:inline-block; border-bottom:2px solid #D97706; padding-bottom:6px; color:#5D4037; margin:0;'>似ているレジェンド</h3>" +
        "<p style='font-size:18px; font-weight:bold; margin:12px 0 0; color:#5D4037;'>" + lg.name + "</p>" +
        "<p style='font-size:13px; color:#92400E; margin:2px 0 16px;'>" + lg.role + "</p>" +
      "</div>" +
      eps;
  }

  // 5. メール送信
  const subject = "【じょうずかん】動物診断結果のお知らせ";
  const animalImgTag = animalImageBlob ? '<img src="cid:animalImage" style="display:block; width:70%; max-width:300px; height:auto; margin:16px auto;">' : '';
  const chartImgTag  = chartImageBlob  ? '<img src="cid:chartImage" style="display:block; width:95%; max-width:400px; height:auto; margin:8px auto; border-radius:12px;">' : '';

  const htmlBody =
    "<div style='background-color:#FFFFFF; text-align:center; padding:24px 0;'>" +
    "<div style='display:inline-block; width:92%; max-width:600px; text-align:left; font-family:sans-serif; color:#5D4037; line-height:1.7; background-color:#FFFFFF;'>" +
      "<p>" + names + " 様</p>" +
      "<p>じょうずかんを受けていただき、ありがとうございます！<br>" +
      "あなたの診断結果をお届けします。</p>" +
      "<p style='text-align:center; color:#5D4037;'>━━━━━━━━━━━━━━━━━━</p>" +
      "<p>あなたのタイプは...</p>" +
      "<div style='text-align:center;'>" +
        "<div style='margin:20px 0;'>" +
          "<h3 style='margin:0; color:#8D7456; font-size:18px;'>『" + catchphrase + "』</h3>" +
          "<p style='margin:5px 0; font-weight:bold; color:#5D4037;'>じょうずな</p>" +
          "<h1 style='margin:0; color:#D97706; font-size:32px;'>" + animalNameOnly + "</h1>" +
        "</div>" +
        animalImgTag +
        chartImgTag +
      "</div>" +
      legendBlock +
      "<p style='text-align:center; color:#5D4037;'>━━━━━━━━━━━━━━━━━━</p>" +
      "<p>この結果は、いまのあなたの傾向をうつした“おみくじ”のようなものです。<br>" +
      "あなたを決めつけるものではなく、まわりの人との対話や、自分を見つめるきっかけとして、ゆるやかに活かしてみてくださいね。</p>" +
      "<p>またのご利用をお待ちしております！</p>" +
      "<br>" +
      "<p style='text-align:center; color:#999;'>--------------------------------------------------<br>" +
      "JOJOEN飼育委員会<br>" +
      "--------------------------------------------------</p>" +
    "</div>" +
    "</div>";

  const inlineImages = {};
  if (animalImageBlob) inlineImages['animalImage'] = animalImageBlob;
  if (chartImageBlob) inlineImages['chartImage'] = chartImageBlob;
  GmailApp.sendEmail(email, subject, "", { htmlBody: htmlBody, inlineImages: inlineImages });
}
