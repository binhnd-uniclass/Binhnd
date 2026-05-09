// Tạo "seed" cố định theo email + ngày để mỗi sale mỗi ngày được 1 quote/1 bài cố định
// (deterministic — tránh sale spam refresh để đổi quote/bài chính)

export const getTodayKey = (date = new Date()) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Hash đơn giản (djb2) — đủ cho mục đích chia random theo seed
export const hashString = (s) => {
  let hash = 5381
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) + hash) + s.charCodeAt(i)
    hash = hash & 0xffffffff
  }
  return hash
}

export const getDailySeed = (email = 'guest', salt = '') => {
  return hashString(`${email}::${getTodayKey()}::${salt}`)
}
