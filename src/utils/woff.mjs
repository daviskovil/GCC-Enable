import { inflateSync } from 'node:zlib';

/** Minimal WOFF 1.0 to TTF/OTF unpacker. */
export function woffToTtf(buf) {
  const n = buf.readUInt16BE(12);
  let es = 1;
  let sel = 0;
  while (es * 2 <= n) {
    es *= 2;
    sel++;
  }
  const head = Buffer.alloc(12 + 16 * n);
  head.writeUInt32BE(buf.readUInt32BE(4), 0);
  head.writeUInt16BE(n, 4);
  head.writeUInt16BE(es * 16, 6);
  head.writeUInt16BE(sel, 8);
  head.writeUInt16BE(n * 16 - es * 16, 10);
  let offset = head.length;
  const chunks = [];
  for (let i = 0; i < n; i++) {
    const o = 44 + i * 20;
    const [tag, off, comp, orig, checksum] = [0, 4, 8, 12, 16].map((k) => buf.readUInt32BE(o + k));
    let data = buf.subarray(off, off + comp);
    if (comp !== orig) data = inflateSync(data);
    const h = 12 + i * 16;
    head.writeUInt32BE(tag, h);
    head.writeUInt32BE(checksum, h + 4);
    head.writeUInt32BE(offset, h + 8);
    head.writeUInt32BE(orig, h + 12);
    const pad = (4 - (data.length % 4)) % 4;
    chunks.push(data, Buffer.alloc(pad));
    offset += data.length + pad;
  }
  return Buffer.concat([head, ...chunks]);
}
