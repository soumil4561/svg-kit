import { readdirSync, writeFileSync } from 'fs'
import { join, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const iconsDir = join(__dirname, '../assets/icons')
const files = readdirSync(iconsDir).filter(f => f.endsWith('.svg'))

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('')
}

const runtimeExports = files
  .map(file => {
    const name = toPascalCase(basename(file, '.svg'))
    return `export { default as ${name} } from '../assets/icons/${file}'`
  })
  .join('\n')

writeFileSync(
  join(__dirname, '../src/index.ts'),
  runtimeExports + '\n'
)

const typeExports = files
  .map(file => {
    const name = toPascalCase(basename(file, '.svg'))
    return `export const ${name}: Icon`
  })
  .join('\n')

const dts = `
import * as React from 'react'

type Icon = React.FC<React.SVGProps<SVGSVGElement>>

${typeExports}
`

writeFileSync(
  join(__dirname, '../src/index.d.ts'),
  dts.trim() + '\n'
)

console.log(`Generated ${files.length} icons (runtime + types).`)
