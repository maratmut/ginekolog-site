import assert from 'node:assert/strict'
import test from 'node:test'
import { buildWhatsAppBookingUrl } from './whatsapp.js'

test('builds a WhatsApp booking link with the selected service name', () => {
  assert.equal(
    buildWhatsAppBookingUrl('Консультация гинеколога-хирурга'),
    'https://wa.me/79387843666?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BD%D0%B0%20%D1%83%D1%81%D0%BB%D1%83%D0%B3%D1%83%20%C2%AB%D0%9A%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8F%20%D0%B3%D0%B8%D0%BD%D0%B5%D0%BA%D0%BE%D0%BB%D0%BE%D0%B3%D0%B0-%D1%85%D0%B8%D1%80%D1%83%D1%80%D0%B3%D0%B0%C2%BB',
  )
})
