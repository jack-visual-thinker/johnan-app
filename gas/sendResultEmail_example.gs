/**
 * じょうずかん 結果メール送信（GAS側 組み込み例）
 *
 * フロントエンドから送られるJSONに以下のフィールドが追加された:
 *   animalCard: 診断結果カード（正方形1080px PNG, base64・プレフィックスなし）
 *   legendCard: レジェンドカード（同上）
 *
 * 既存のdoPost内の「chartImage / animalImage を生成して添付する処理」を
 * 以下のように置き換える。スプレッドシートへの記録処理はそのまま残すこと。
 * 古い診断（カード無しペイロード）も来る可能性があるためフォールバックを残す。
 */
function sendResultEmail_(data) {
  var htmlBody =
    '<p>' + data.name + ' 様</p>' +
    '<p>じょうずかんを受けていただき、ありがとうございます！<br>' +
    'あなたの診断結果をお届けします。</p>';

  var inlineImages = {};

  if (data.animalCard && data.legendCard) {
    inlineImages.animalCard = Utilities.newBlob(
      Utilities.base64Decode(data.animalCard), 'image/png', 'animalCard.png');
    inlineImages.legendCard = Utilities.newBlob(
      Utilities.base64Decode(data.legendCard), 'image/png', 'legendCard.png');

    htmlBody +=
      '<p><img src="cid:animalCard" style="width:100%;max-width:480px;border-radius:16px;" alt="診断結果"></p>' +
      '<p><img src="cid:legendCard" style="width:100%;max-width:480px;border-radius:16px;" alt="似ているレジェンド"></p>';
  } else {
    // フォールバック: カードが無い旧ペイロードは従来の添付処理を使う
    // （既存のchartImage/animalImage生成コードをここに残す）
    htmlBody += '<p>あなたのタイプは「' + data.animal + '」です。</p>';
  }

  htmlBody += '<p>まわりの人との対話のきっかけにしてみてくださいね。</p>';

  GmailApp.sendEmail(data.email, '【じょうずかん】動物診断結果のお知らせ', '', {
    htmlBody: htmlBody,
    inlineImages: inlineImages,
    name: 'じょうずかん'
  });
}

/*
 * doPost内での呼び出し例:
 *
 * function doPost(e) {
 *   var data = JSON.parse(e.postData.contents);
 *   // （既存）スプレッドシートへの記録
 *   appendToSheet_(data);
 *   // メール送信（この例の関数に差し替え）
 *   sendResultEmail_(data);
 *   return ContentService.createTextOutput('ok');
 * }
 */
