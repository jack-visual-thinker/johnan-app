import type { AnimalType } from '../data/types';

const WIDTH = 1080;
const HEIGHT = 1350;
const FONT = '"Hiragino Maru Gothic ProN", "Hiragino Sans", "Yu Gothic", sans-serif';

const COLORS = {
  orange: '#F2A81D',
  orangeDeep: '#D98E00',
  cream: '#FBF3DC',
  creamDark: '#F1E4C4',
  brown: '#5D4037',
  brownSoft: '#80674F',
  white: '#FFFFFF',
  paleYellow: '#FFF8DE',
};

export type ResultCardContent = {
  displayName: string;
  summary: string;
  features: string[];
  strengths: string[];
  recommendation: string;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`画像を読み込めませんでした: ${src}`));
    image.src = src;
  });
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
) {
  const lines: string[] = [];
  let currentLine = '';

  for (const character of Array.from(text.replace(/\s+/g, ' ').trim())) {
    const candidate = currentLine + character;
    if (currentLine && ctx.measureText(candidate).width > maxWidth) {
      lines.push(currentLine.trim());
      currentLine = character;
      if (lines.length === maxLines) break;
    } else {
      currentLine = candidate;
    }
  }

  if (lines.length < maxLines && currentLine.trim()) {
    lines.push(currentLine.trim());
  }

  if (lines.length === maxLines) {
    const joinedLength = lines.join('').length;
    const sourceLength = Array.from(text.replace(/\s+/g, ' ').trim()).length;
    if (joinedLength < sourceLength) {
      let lastLine = lines[maxLines - 1];
      while (lastLine && ctx.measureText(`${lastLine}…`).width > maxWidth) {
        lastLine = lastLine.slice(0, -1);
      }
      lines[maxLines - 1] = `${lastLine}…`;
    }
  }

  return lines;
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
  align: CanvasTextAlign = 'left',
) {
  ctx.textAlign = align;
  ctx.textBaseline = 'top';
  const lines = wrapText(ctx, text, maxWidth, maxLines);
  lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
  return y + lines.length * lineHeight;
}

function drawContainedImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  ctx.drawImage(
    image,
    x + (width - drawWidth) / 2,
    y + (height - drawHeight) / 2,
    drawWidth,
    drawHeight,
  );
}

function drawSection(
  ctx: CanvasRenderingContext2D,
  options: {
    x: number;
    y: number;
    width: number;
    height: number;
    title: string;
    body: string;
    bodyFontSize?: number;
    maxLines?: number;
  },
) {
  const { x, y, width, height, title, body, bodyFontSize = 29, maxLines = 4 } = options;

  roundedRect(ctx, x, y, width, height, 32);
  ctx.fillStyle = COLORS.white;
  ctx.fill();

  ctx.fillStyle = COLORS.orangeDeep;
  ctx.font = `bold 30px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(title, x + 34, y + 26);

  ctx.fillStyle = COLORS.brown;
  ctx.font = `500 ${bodyFontSize}px ${FONT}`;
  drawWrappedText(ctx, body, x + 34, y + 74, width - 68, bodyFontSize * 1.55, maxLines);
}

function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('PNG画像を作成できませんでした'));
      }
    }, 'image/png');
  });
}

export async function generateResultCard(
  animal: AnimalType,
  content: ResultCardContent,
): Promise<Blob> {
  if ('fonts' in document) {
    await document.fonts.ready;
  }

  const animalImage = await loadImage(`/images/animals/${animal.id}.png`);
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('画像作成機能を利用できません');

  // 4:5のカード背景
  ctx.fillStyle = COLORS.cream;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = 'rgba(242, 168, 29, 0.13)';
  ctx.beginPath();
  ctx.arc(68, 210, 150, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(WIDTH - 30, 1110, 190, 0, Math.PI * 2);
  ctx.fill();

  // ブランド名
  roundedRect(ctx, 290, 34, 500, 62, 31);
  ctx.fillStyle = COLORS.orange;
  ctx.fill();
  ctx.fillStyle = COLORS.white;
  ctx.font = `bold 28px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('動物診断アプリ じょうずかん', WIDTH / 2, 65);

  // ニックネーム入りタイトル
  roundedRect(ctx, 64, 118, WIDTH - 128, 230, 42);
  ctx.fillStyle = COLORS.white;
  ctx.fill();
  ctx.fillStyle = COLORS.brownSoft;
  ctx.font = `bold 43px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(`${content.displayName}のタイプは、`, WIDTH / 2, 150);
  ctx.fillStyle = COLORS.orangeDeep;
  ctx.font = `900 49px ${FONT}`;
  drawWrappedText(ctx, `${animal.name}タイプです`, WIDTH / 2, 215, WIDTH - 220, 62, 2, 'center');

  // タイプを表すイラスト
  ctx.save();
  ctx.shadowColor = 'rgba(93, 64, 55, 0.16)';
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 12;
  ctx.beginPath();
  ctx.arc(WIDTH / 2, 505, 134, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.white;
  ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.beginPath();
  ctx.arc(WIDTH / 2, 505, 128, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = COLORS.paleYellow;
  ctx.fillRect(412, 377, 256, 256);
  drawContainedImage(ctx, animalImage, 390, 355, 300, 300);
  ctx.restore();

  ctx.fillStyle = COLORS.brownSoft;
  ctx.font = `bold 28px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('あなたの診断タイプ', WIDTH / 2, 655);

  // 要約・特徴・強み・おすすめ行動
  drawSection(ctx, {
    x: 64,
    y: 680,
    width: WIDTH - 128,
    height: 200,
    title: '診断結果の要約',
    body: content.summary,
    bodyFontSize: 28,
    maxLines: 3,
  });

  drawSection(ctx, {
    x: 64,
    y: 895,
    width: 456,
    height: 184,
    title: '主な特徴',
    body: content.features.slice(0, 2).map((feature) => `・${feature}`).join('  '),
    bodyFontSize: 28,
    maxLines: 3,
  });

  drawSection(ctx, {
    x: 560,
    y: 895,
    width: 456,
    height: 184,
    title: '強み',
    body: content.strengths.slice(0, 3).map((strength) => `・${strength}`).join('  '),
    bodyFontSize: 28,
    maxLines: 3,
  });

  drawSection(ctx, {
    x: 64,
    y: 1102,
    width: WIDTH - 128,
    height: 168,
    title: 'おすすめの行動',
    body: content.recommendation,
    bodyFontSize: 28,
    maxLines: 2,
  });

  ctx.fillStyle = COLORS.brownSoft;
  ctx.font = `bold 25px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('今日の自分を知る、対話のきっかけに。', WIDTH / 2, 1313);

  return canvasToBlob(canvas);
}
