// Compresses source images (assets-source/) to WebP < 200KB into public/images/.
// Crops reproduce the crops applied in the Figma design (fractions of the source image).
import sharp from 'sharp';
import { mkdirSync, statSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'assets-source';
const OUT = 'public/images';
const MAX = 200 * 1024;

// [source, output name, output width (2x display size), crop {x0,x1,y0,y1} fractions]
const jobs = [
  ['about/about-1.png', 'about-studio.webp', 1242],
  ['about/about-2.png', 'about-mission.webp', 1242],
  ['services/service-1.png', 'service-digital-marketing.webp', 1400],
  ['services/service-2.png', 'service-product-strategy.webp', 1400],
  ['services/service-3.png', 'service-ui-ux-design.webp', 1400],
  ['services/service-4.png', 'service-web-development.webp', 1400],
  ['services/service-5.png', 'service-brand-identity.webp', 1400],
  ['work/work-1.png', 'work-studio-reverie.webp', 1466],
  ['work/work-2.png', 'work-bloom-journal.webp', 1466],
  ['work/work-3.png', 'work-pixelmint.webp', 1466, { x0: 0, x1: 1, y0: 0.01976, y1: 0.5655 }],
  ['team/team-1.png', 'team-lina-marquez.webp', 800, { x0: 0.28, x1: 0.7192, y0: 0, y1: 1 }],
  ['team/team-2.png', 'team-elliot-tanaka.webp', 592, { x0: 0.1918, x1: 0.6304, y0: 0, y1: 1 }],
  ['team/team-3.png', 'team-rosa-kim.webp', 592, { x0: 0.3726, x1: 0.8112, y0: 0, y1: 1 }],
  ['team/team-4.png', 'team-noah-castell.webp', 592, { x0: 0.4926, x1: 0.9312, y0: 0, y1: 1 }],
];

mkdirSync(OUT, { recursive: true });
for (const [src, name, width, crop] of jobs) {
  let img = sharp(join(SRC, src));
  const { width: w, height: h } = await img.metadata();
  if (crop) {
    img = sharp(await img.extract({
      left: Math.round(crop.x0 * w), top: Math.round(crop.y0 * h),
      width: Math.round((crop.x1 - crop.x0) * w), height: Math.round((crop.y1 - crop.y0) * h),
    }).toBuffer());
  }
  const resized = await img.resize({ width, withoutEnlargement: true }).toBuffer();
  let q = 80, out;
  do { out = await sharp(resized).webp({ quality: q }).toBuffer(); q -= 5; } while (out.length > MAX && q >= 20);
  await sharp(out).toFile(join(OUT, name));
  console.log(name.padEnd(34), `${w}x${h}`, '->', `${Math.round(out.length / 1024)}KB q${q + 5}`);
}
copyFileSync('images/logo.svg', join(OUT, 'logo.svg'));
