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

// Generate PNG Icon matching the exact Navbar Monitor & Keyboard Logo
function generatePng(size) {
  const width = size;
  const height = size;
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);

  const cornerRadius = width * 0.22; // Squircle corner radius for modern app icon
  const strokeWidth = Math.max(2, Math.round(width * 0.045)); // Scale stroke width

  // Helper for stroke distance check
  function isNearSegment(px, py, x1, y1, x2, y2, maxDist) {
    const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    if (l2 === 0) {
      const d = Math.hypot(px - x1, py - y1);
      return d <= maxDist;
    }
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    const projX = x1 + t * (x2 - x1);
    const projY = y1 + t * (y2 - y1);
    return Math.hypot(px - projX, py - projY) <= maxDist;
  }

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // PNG filter 0 (none)

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // Squircle bounds check
      let inBounds = true;
      if (x < cornerRadius && y < cornerRadius) {
        inBounds = Math.hypot(x - cornerRadius, y - cornerRadius) <= cornerRadius;
      } else if (x > width - cornerRadius && y < cornerRadius) {
        inBounds = Math.hypot(x - (width - cornerRadius), y - cornerRadius) <= cornerRadius;
      } else if (x < cornerRadius && y > height - cornerRadius) {
        inBounds = Math.hypot(x - cornerRadius, y - (height - cornerRadius)) <= cornerRadius;
      } else if (x > width - cornerRadius && y > height - cornerRadius) {
        inBounds = Math.hypot(x - (width - cornerRadius), y - (height - cornerRadius)) <= cornerRadius;
      }

      if (!inBounds) {
        // Transparent pixel outside squircle
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
        continue;
      }

      // Background Gradient: #F39C12 (top-left) to #E67E22 to #D68910 (bottom-right)
      const gradFactor = (x + y) / (width + height);
      let r = Math.floor(243 - gradFactor * 29); // 243 -> 214 (#D68910)
      let g = Math.floor(156 - gradFactor * 19); // 156 -> 137
      let b = Math.floor(18 - gradFactor * 2);   // 18 -> 16
      let a = 255;

      // Inner subtle glow border
      const borderPadding = width * 0.04;
      const isInnerBorder =
        (x >= borderPadding && x <= borderPadding + 2) ||
        (x <= width - borderPadding && x >= width - borderPadding - 2) ||
        (y >= borderPadding && y <= borderPadding + 2) ||
        (y <= height - borderPadding && y >= height - borderPadding - 2);

      if (isInnerBorder) {
        r = Math.min(255, r + 30);
        g = Math.min(255, g + 30);
        b = Math.min(255, b + 30);
      }

      // Render Navbar Monitor & Keyboard Icon inside 24x24 relative coordinate system
      const nx = (x / width) * 24;
      const ny = (y / height) * 24;
      const hw = strokeWidth / (width / 24) / 2; // Half stroke width in 24x24 scale

      let isWhiteEmblem = false;

      // 1. Monitor Frame: rect x=3, y=4, width=18, height=12, rx=2.5
      const rectLeft = 3, rectTop = 4, rectRight = 21, rectBottom = 16;
      // Outer rect stroke
      if (
        (nx >= rectLeft - hw && nx <= rectRight + hw && ny >= rectTop - hw && ny <= rectBottom + hw) &&
        !(nx > rectLeft + hw && nx < rectRight - hw && ny > rectTop + hw && ny < rectBottom - hw)
      ) {
        isWhiteEmblem = true;
      }

      // 2. Stand neck: M12 16v4 (x: 12, y: 16 to 20)
      if (isNearSegment(nx, ny, 12, 16, 12, 20, hw)) {
        isWhiteEmblem = true;
      }

      // 3. Stand base: M7 20h10 (x: 7 to 17, y: 20)
      if (isNearSegment(nx, ny, 7, 20, 17, 20, hw)) {
        isWhiteEmblem = true;
      }

      // 4. Keyboard top row line: M8 9h8 (x: 8 to 16, y: 9)
      if (isNearSegment(nx, ny, 8, 9, 16, 9, hw)) {
        isWhiteEmblem = true;
      }

      // 5. Keyboard bottom row line: M10 12h4 (x: 10 to 14, y: 12)
      if (isNearSegment(nx, ny, 10, 12, 14, 12, hw)) {
        isWhiteEmblem = true;
      }

      if (isWhiteEmblem) {
        r = 255;
        g = 255;
        b = 255;
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

const publicDir = path.join(__dirname, 'public');

try {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const icon192 = generatePng(192);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192);

  const icon512 = generatePng(512);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512);

  console.log('✅ PWA Icons matching Navbar Monitor & Keyboard Logo generated in public/');
} catch (err) {
  console.error('Failed to generate PWA icons:', err);
}
