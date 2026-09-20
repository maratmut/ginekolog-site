const WHATSAPP_PHONE = '79387843666'

export function buildWhatsAppBookingUrl(serviceTitle) {
  const message = `Здравствуйте! Хочу записаться на услугу «${serviceTitle}»`

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
}
