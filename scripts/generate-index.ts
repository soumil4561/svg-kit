import { readdirSync, writeFileSync } from 'fs'
import { join, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Path to your icon components
const iconsDir = join(__dirname, '../assets/icons')
const files = readdirSync(iconsDir).filter(f => f.endsWith('.svg'))

// Function to convert kebab-case to PascalCase
function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

// Generate export lines
const exportLines = files
  .map(file => {
    const name = toPascalCase(basename(file, '.svg'))
    return `export { default as ${name} } from '../assets/icons/${file}';`
  })
  .join('\n')

// Write to src/index.ts
writeFileSync(join(__dirname, '../src/index.ts'), exportLines)
console.log(`Generated index.ts with ${files.length} icons.`)
