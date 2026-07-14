import type { AnimalType } from '../data/types';
import type { ParameterKey } from '../data/questions';
import type { LegendEpisode } from '../data/legends';
import { PARAM_LABELS } from './diagnosis';

// 取扱説明書PDFの世界観に合わせたパレット
const ORANGE = '#F2A81D';
const ORANGE_DEEP = '#D98E00';
const CREAM = '#FBF3DC';
const BROWN = '#5D4037';
const BROWN_SOFT = '#8A6A55';
const YELLOW_BAR = '#F8D77E';
const WHITE = '#FFFFFF';

const SIZE = 1080;
const FONT = '"Hiragino Maru Gothic ProN", "Hiragino Sans", "Yu Gothic", sans-serif';

const RADAR_KEYS: ParameterKey[] = [
  'Warmth', 'Responsibility', 'UniversalTruth', 'DivineGuidance',
  'Mission', 'HeavenlyWork', 'Thoroughness', 'Innovation', 'Respect',
];

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// 白丸＋その中に画像（画像は円いっぱいの正方形素材を想定）
function drawImageInCircle(ctx: CanvasRenderingContext2D, img: HTMLImageElement, cx: number, cy: number, radius: number) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = WHITE;
  ctx.fill();
  ctx.clip();
  const pad = radius * 0.06;
  const d = (radius - pad) * 2;
  ctx.drawImage(img, cx - d / 2, cy - d / 2, d, d);
  ctx.restore();
}

function drawRadarInCircle(
  ctx: CanvasRenderingContext2D,
  scores: Record<ParameterKey, number>,
  cx: number, cy: number, circleRadius: number,
) {
  // 白丸
  ctx.beginPath();
  ctx.arc(cx, cy, circleRadius, 0, Math.PI * 2);
  ctx.fillStyle = WHITE;
  ctx.fill();

  const n = RADAR_KEYS.length;
  const gridR = circleRadius * 0.56;
  const maxScore = 20;
  const pt = (i: number, value: number): [number, number] => {
    const v = Math.min(Math.max(value, 0), maxScore);
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = (v / maxScore) * gridR;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  };
  const poly = (values: number[]) => {
    ctx.beginPath();
    values.forEach((v, i) => {
      const [x, y] = pt(i, v);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
  };

  // グリッド
  poly(RADAR_KEYS.map(() => maxScore));
  ctx.fillStyle = '#F9FAFB';
  ctx.fill();
  ctx.strokeStyle = '#E5E7EB';
  ctx.lineWidth = 2;
  ctx.stroke();
  [15, 10, 5].forEach(s => {
    poly(RADAR_KEYS.map(() => s));
    ctx.strokeStyle = '#F3F4F6';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // データ
  poly(RADAR_KEYS.map(k => scores[k]));
  ctx.fillStyle = 'rgba(240, 165, 0, 0.4)';
  ctx.fill();
  ctx.strokeStyle = ORANGE_DEEP;
  ctx.lineWidth = 4;
  ctx.stroke();

  // ラベル
  ctx.fillStyle = BROWN_SOFT;
  ctx.font = `bold ${Math.round(circleRadius * 0.085)}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  RADAR_KEYS.forEach((key, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const labelR = gridR * 1.42;
    ctx.fillText(PARAM_LABELS[key], cx + labelR * Math.cos(angle), cy + labelR * Math.sin(angle));
  });
}

function drawFooter(ctx: CanvasRenderingContext2D, onOrange: boolean) {
  ctx.font = `bold 30px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = onOrange ? 'rgba(255,255,255,0.9)' : BROWN_SOFT;
  ctx.fillText('動物診断アプリ じょうずかん', SIZE / 2, SIZE - 52);
}

// カード①: 診断結果（動物タイトル＋動物イラスト＋レーダーチャート）
async function drawAnimalCard(animal: AnimalType, scores: Record<ParameterKey, number>): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  // 背景
  ctx.fillStyle = ORANGE;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // 上部チップ（白ピル）
  ctx.font = `bold 34px ${FONT}`;
  const chipText = 'あなたのタイプは…';
  const chipW = ctx.measureText(chipText).width + 80;
  roundRect(ctx, (SIZE - chipW) / 2, 62, chipW, 72, 36);
  ctx.fillStyle = WHITE;
  ctx.fill();
  ctx.fillStyle = BROWN;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(chipText, SIZE / 2, 100);

  // タイトル（キャッチコピー＋動物名）
  const parts = animal.name.split('じょうずな');
  const catchphrase = (parts[0] || '').replace(/[「」]/g, '');
  const animalName = parts[1] || animal.name;
  ctx.fillStyle = WHITE;
  ctx.font = `bold 46px ${FONT}`;
  ctx.fillText(`『${catchphrase}』じょうずな`, SIZE / 2, 218);
  ctx.font = `900 120px ${FONT}`;
  ctx.shadowColor = 'rgba(0,0,0,0.15)';
  ctx.shadowOffsetY = 6;
  ctx.shadowBlur = 0;
  ctx.fillText(animalName, SIZE / 2, 340);
  ctx.shadowColor = 'transparent';
  ctx.shadowOffsetY = 0;

  // 白丸×2: 動物＋レーダー
  const img = await loadImage(`/images/animals/${animal.id}.png`);
  const circleR = 235;
  const cy = 680;
  drawImageInCircle(ctx, img, 285, cy, circleR);
  drawRadarInCircle(ctx, scores, 795, cy, circleR);

  drawFooter(ctx, true);
  return canvas.toDataURL('image/png');
}

// カード②: 似ているレジェンド（肖像＋名前・役割＋エピソード見出し）
async function drawLegendCard(animal: AnimalType, episodes: LegendEpisode[]): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  // 背景（クリーム）＋外周オレンジ枠
  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.strokeStyle = ORANGE;
  ctx.lineWidth = 28;
  ctx.strokeRect(0, 0, SIZE, SIZE);

  // 上部チップ（オレンジピル・白文字）
  ctx.font = `bold 40px ${FONT}`;
  const chipText = '似ているレジェンド';
  const chipW = ctx.measureText(chipText).width + 96;
  roundRect(ctx, (SIZE - chipW) / 2, 74, chipW, 84, 42);
  ctx.fillStyle = ORANGE;
  ctx.fill();
  ctx.fillStyle = WHITE;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(chipText, SIZE / 2, 118);

  // 肖像（白丸＋オレンジリング）
  const img = await loadImage(animal.legendIcon);
  const cx = 310, cy = 420, r = 190;
  ctx.beginPath();
  ctx.arc(cx, cy, r + 10, 0, Math.PI * 2);
  ctx.fillStyle = WHITE;
  ctx.fill();
  ctx.strokeStyle = ORANGE;
  ctx.lineWidth = 8;
  ctx.stroke();
  drawImageInCircle(ctx, img, cx, cy, r);

  // 名前・役割
  const tx = 560;
  ctx.textAlign = 'left';
  ctx.fillStyle = BROWN;
  ctx.font = `900 64px ${FONT}`;
  ctx.fillText(animal.legendName, tx, 390);
  ctx.fillStyle = ORANGE_DEEP;
  ctx.font = `bold 42px ${FONT}`;
  ctx.fillText(animal.legendRole, tx, 470);

  // エピソード見出し（黄色バー、最大3件）
  const barX = 90, barW = SIZE - barX * 2, barH = 96, gap = 34;
  let y = 680;
  episodes.slice(0, 3).forEach(ep => {
    roundRect(ctx, barX, y, barW, barH, 28);
    ctx.fillStyle = YELLOW_BAR;
    ctx.fill();
    ctx.fillStyle = BROWN;
    ctx.font = `bold 40px ${FONT}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`★ ${ep.title.replace(/[【】]/g, '')}`, barX + 44, y + barH / 2 + 2);
    y += barH + gap;
  });

  drawFooter(ctx, false);
  return canvas.toDataURL('image/png');
}

export type ResultCards = {
  animalCard: string; // data URL (image/png)
  legendCard: string;
};

export async function generateResultCards(
  animal: AnimalType,
  scores: Record<ParameterKey, number>,
  episodes: LegendEpisode[],
): Promise<ResultCards> {
  const [animalCard, legendCard] = await Promise.all([
    drawAnimalCard(animal, scores),
    drawLegendCard(animal, episodes),
  ]);
  return { animalCard, legendCard };
}

// 開発時のみ: ブラウザコンソールからデザイン確認できるように公開
if (import.meta.env.DEV && typeof window !== 'undefined') {
  Promise.all([import('../data/types'), import('../data/legends')]).then(([t, l]) => {
    (window as unknown as Record<string, unknown>).__cardDev = {
      generate: generateResultCards,
      animals: t.ANIMAL_TYPES,
      episodes: l.LEGEND_EPISODES,
    };
  });
}
