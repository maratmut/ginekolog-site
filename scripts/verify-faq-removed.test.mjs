import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

test('the FAQ section and its unused implementation are removed', () => {
  const appSource = fs.readFileSync('src/App.jsx', 'utf8')
  const styleSource = fs.readFileSync('src/styles.css', 'utf8')

  assert.ok(!appSource.includes('const faq ='))
  assert.ok(!appSource.includes('function FAQItem'))
  assert.ok(!appSource.includes('className="faq'))
  assert.ok(!appSource.includes('ChevronDown'))
  assert.ok(!styleSource.includes('.faq'))
})
