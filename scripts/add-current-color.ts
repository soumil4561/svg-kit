import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const iconsDir = join(process.cwd(), 'assets/icons')
const files = readdirSync(iconsDir).filter(f => f.endsWith('.svg'))

files.forEach(file => {
  const filePath = join(iconsDir, file)
  let content = readFileSync(filePath, 'utf-8')

  content = content.replace(
    /<svg([^>]*?)>/,
    (match, attrs) => {
      // If fill already exists, leave it
      if (/fill=/.test(attrs)) return match
      return `<svg${attrs} fill="currentColor">`
    }
  )

  writeFileSync(filePath, content, 'utf-8')
  console.log(`Updated ${file}`)
})

console.log(`Updated ${files.length} SVGs with fill="currentColor"`)
