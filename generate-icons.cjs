const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createCRC32Table() {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }
  return table;
}

const crcTable = createCRC32Table();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crcVal = crc32(buf.slice(4, 8 + len));
  buf.writeUInt32BE(crcVal, 8 + len);
  return buf;
}

// Generate PNG Icon mathematically matching the exact Navbar Monitor & Keyboard SVG Logo
function generatePng(size) {
  const width = size;
  const height = size;
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);

  const cornerRadius = width * 0.22; // Squircle corner radius
  const innerBorderInset = width * 0.04;
  const innerBorderWidth = width * 0.015;

  const emblemPadding = width * 0.15625; // 80/512 padding ratio
  const emblemScale = (width - 2 * emblemPadding) / 24;

  // Monitor frame rounded rect: <rect x="3" y="4" width="18" height="12" rx="2.5" />
  const rectCx = 12;
  const rectCy = 10;
  const rectHwCore = 9 - 2.5; // 6.5
  const rectHhCore = 6 - 2.5; // 3.5
  const rectRx = 2.5;
  const strokeHw = 2.2 / 2; // 1.1 in 24x24 stroke units

  // Line segments in 24x24 space (round line caps)
  const segments = [
    { x1: 8, y1: 9, x2: 16, y2: 9 },   // Keyboard top row
    { x1: 10, y1: 12, x2: 14, y2: 12 }, // Keyboard bottom row
    { x1: 12, y1: 16, x2: 12, y2: 20 }, // Stand neck
    { x1: 7, y1: 20, x2: 17, y2: 20 },  // Stand base
  ];

  function distToSegment(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const l2 = dx * dx + dy * dy;
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * dx + (py - y1) * dy) / l2;
    t = Math.max(0, Math.min(1, t));
    const projX = x1 + t * dx;
    const projY = y1 + t * dy;
    return Math.hypot(px - projX, py - projY);
  }

  function distToRoundedRectStroke(nx, ny) {
    const qx = Math.max(Math.abs(nx - rectCx) - rectHwCore, 0);
    const qy = Math.max(Math.abs(ny - rectCy) - rectHhCore, 0);
    const distToCenterCurve = Math.hypot(qx, qy);
    return Math.abs(distToCenterCurve - rectRx);
  }

  // Anti-aliasing feathering width in 24x24 space (~1.2 pixels in canvas space)
  const feather24 = (1.2 * 24) / (width - 2 * emblemPadding);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // PNG filter 0 (none)

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // 1. Outer Squircle bounds check
      const sqx = Math.max(Math.abs(x + 0.5 - width / 2) - (width / 2 - cornerRadius), 0);
      const sqy = Math.max(Math.abs(y + 0.5 - height / 2) - (height / 2 - cornerRadius), 0);
      const distSquircle = Math.hypot(sqx, sqy) - cornerRadius;

      // Anti-aliased outer squircle mask alpha (0.0 to 1.0)
      const squircleAlpha = Math.max(0, Math.min(1, 0.5 - distSquircle / 1.2));

      if (squircleAlpha <= 0) {
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
        continue;
      }

      // Background Gradient: #F39C12 (top-left) to #E67E22 to #D68910 (bottom-right)
      const gradFactor = (x + y) / (width + height);
      let r = Math.round(243 - gradFactor * 29); // 243 -> 214
      let g = Math.round(156 - gradFactor * 19); // 156 -> 137
      let b = Math.round(18 - gradFactor * 2);   // 18 -> 16
      let a = Math.round(squircleAlpha * 255);

      // 2. Inner border glow
      const distInnerBorder = Math.abs(distSquircle + innerBorderInset);
      if (distInnerBorder <= innerBorderWidth / 2 + 0.6) {
        const borderAlpha = Math.max(0, Math.min(1, 0.5 + (innerBorderWidth / 2 - distInnerBorder) / 0.6)) * 0.25;
        r = Math.round(r * (1 - borderAlpha) + 255 * borderAlpha);
        g = Math.round(g * (1 - borderAlpha) + 255 * borderAlpha);
        b = Math.round(b * (1 - borderAlpha) + 255 * borderAlpha);
      }

      // 3. Monitor & Keyboard Emblem in 24x24 relative coords
      const nx = (x + 0.5 - emblemPadding) / emblemScale;
      const ny = (y + 0.5 - emblemPadding) / emblemScale;

      if (nx >= -1 && nx <= 25 && ny >= -1 && ny <= 25) {
        let minEmblemDist = distToRoundedRectStroke(nx, ny);

        for (let i = 0; i < segments.length; i++) {
          const seg = segments[i];
          const dSeg = distToSegment(nx, ny, seg.x1, seg.y1, seg.x2, seg.y2);
          if (dSeg < minEmblemDist) {
            minEmblemDist = dSeg;
          }
        }

        const emblemAlpha = Math.max(0, Math.min(1, 0.5 + (strokeHw - minEmblemDist) / feather24));

        if (emblemAlpha > 0) {
          r = Math.round(r * (1 - emblemAlpha) + 255 * emblemAlpha);
          g = Math.round(g * (1 - emblemAlpha) + 255 * emblemAlpha);
          b = Math.round(b * (1 - emblemAlpha) + 255 * emblemAlpha);
        }
      }

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

function makeIcoFromPng(pngBuffer, width, height) {
  const header = Buffer.alloc(6 + 16);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Image type ICO
  header.writeUInt16LE(1, 4); // 1 image

  header.writeUInt8(width >= 256 ? 0 : width, 6);
  header.writeUInt8(height >= 256 ? 0 : height, 7);
  header.writeUInt8(0, 8); // Color count
  header.writeUInt8(0, 9); // Reserved
  header.writeUInt16LE(1, 10); // Color planes
  header.writeUInt16LE(32, 12); // Bits per pixel
  header.writeUInt32LE(pngBuffer.length, 14); // PNG size
  header.writeUInt32LE(22, 18); // Offset to PNG data

  return Buffer.concat([header, pngBuffer]);
}

const publicDir = path.join(__dirname, 'public');

try {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const icon192 = generatePng(192);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192);

  const icon512 = generatePng(512);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512);

  const appleIcon = generatePng(180);
  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), appleIcon);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);

  const icon64 = generatePng(64);
  const icoFile = makeIcoFromPng(icon64, 64, 64);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoFile);

  console.log('✅ Ultra-crisp PWA & Favicon Icons matching Navbar Monitor & Keyboard Logo generated in public/');
} catch (err) {
  console.error('Failed to generate PWA icons:', err);
}

