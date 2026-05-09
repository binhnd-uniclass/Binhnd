// LocalStorage helpers — lưu user, lịch sử rút bài/quote theo email

const KEY = 'sale_motivation_v1'

const readAll = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

const writeAll = (obj) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(obj))
  } catch (e) {
    console.warn('Storage write failed', e)
  }
}

export const getUser = () => readAll().user || null

export const setUser = (user) => {
  const data = readAll()
  data.user = user
  writeAll(data)
}

export const clearUser = () => {
  const data = readAll()
  delete data.user
  writeAll(data)
}

const userBucket = (email) => {
  const data = readAll()
  if (!data.users) data.users = {}
  if (!data.users[email]) data.users[email] = { history: [] }
  return { data, bucket: data.users[email] }
}

export const getHistory = (email) => {
  if (!email) return []
  const { bucket } = userBucket(email)
  return bucket.history || []
}

export const addHistoryEntry = (email, entry) => {
  if (!email) return
  const { data, bucket } = userBucket(email)
  // Nếu đã có entry hôm nay (cùng dateKey + cùng type "main"), update; không thì push
  const existingIdx = bucket.history.findIndex(
    (h) => h.dateKey === entry.dateKey && h.type === entry.type && entry.type === 'main'
  )
  if (existingIdx >= 0) {
    bucket.history[existingIdx] = { ...bucket.history[existingIdx], ...entry }
  } else {
    bucket.history.unshift(entry)
  }
  // giới hạn 200 entry
  bucket.history = bucket.history.slice(0, 200)
  writeAll(data)
}

export const clearHistory = (email) => {
  if (!email) return
  const { data, bucket } = userBucket(email)
  bucket.history = []
  writeAll(data)
}

// Tính streak (chuỗi ngày liên tiếp có entry "main")
export const computeStreak = (email) => {
  const history = getHistory(email).filter((h) => h.type === 'main')
  if (history.length === 0) return 0
  const days = new Set(history.map((h) => h.dateKey))
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    if (days.has(key)) streak++
    else break
  }
  return streak
}
