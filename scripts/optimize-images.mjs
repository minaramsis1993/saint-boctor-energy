// Converts any .jpg/.jpeg/.png in assets/images/gallery to optimised 1200px-wide .webp, then removes the original.
// Usage: npm run optimize-images
import sharp from 'sharp'
import { readdirSync, unlinkSync } from 'node:fs'

const dir = 'assets/images/gallery/'
const files = readdirSync(dir).filter(f => /\.(jpe?g|png)$/i.test(f))

for (const f of files) {
  const out = f.replace(/\.(jpe?g|png)$/i, '.webp')
  await sharp(dir + f).rotate().resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dir + out)
  unlinkSync(dir + f)
  console.log(`${f} -> ${out}`)
}
if (!files.length) console.log('No jpg/png files to convert.')
