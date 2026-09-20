import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

test('every result card renders the shared 18+ age mark', () => {
  const appSource = fs.readFileSync('src/App.jsx', 'utf8')
  const styleSource = fs.readFileSync('src/styles.css', 'utf8')

  assert.equal((appSource.match(/className="age-mark"/g) ?? []).length, 1)
  assert.equal((appSource.match(/>18\+<\/span>/g) ?? []).length, 1)
  assert.match(styleSource, /\.age-mark\s*{[^}]*position:\s*absolute;/s)
  assert.match(styleSource, /\.age-mark\s*{[^}]*left:\s*50%;/s)
})
