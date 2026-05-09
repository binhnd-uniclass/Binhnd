import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getHistory, clearHistory } from '../utils/storage'

export default function HistoryPage() {
  const { user } = useAuth()
  const [refreshKey, setRefreshKey] = useState(0)
  const history = user ? getHistory(user.email) : []

  const onClear = () => {
    if (window.confirm('Xoá toàn bộ lịch sử? Hành động này không thể hoàn tác.')) {
      clearHistory(user.email)
      setRefreshKey((k) => k + 1)
    }
  }

  // group theo dateKey
  const byDate = history.reduce((acc, h) => {
    if (!acc[h.dateKey]) acc[h.dateKey] = []
    acc[h.dateKey].push(h)
    return acc
  }, {})
  const dateKeys = Object.keys(byDate).sort((a, b) => (a < b ? 1 : -1))

  if (history.length === 0) {
    return (
      <div className="page history-page empty">
        <div className="empty-illustration">📜</div>
        <h2>Chưa có lịch sử</h2>
        <p>Hãy rút bài hoặc xem quote hôm nay để bắt đầu chuỗi ngày của bạn nhé.</p>
      </div>
    )
  }

  return (
    <div className="page history-page" key={refreshKey}>
      <div className="history-header">
        <h2>Lịch sử của bạn</h2>
        <button className="btn ghost danger" onClick={onClear}>🗑 Xoá tất cả</button>
      </div>

      {dateKeys.map((dk) => {
        const entries = byDate[dk]
        const main = entries.find((e) => e.type === 'main')
        const extras = entries.filter((e) => e.type === 'extra')
        return (
          <div key={dk} className="history-day">
            <div className="day-header">
              <span className="day-date">{formatDate(dk)}</span>
            </div>
            {main && (
              <div className="history-card main">
                <div className="hc-icon">{main.cardIcon}</div>
                <div className="hc-body">
                  <p className="hc-title">{main.cardName}</p>
                  <p className="hc-meaning">{main.meaning}</p>
                  <p className="hc-advice">▸ {main.advice}</p>
                </div>
              </div>
            )}
            {extras.length > 0 && (
              <div className="extras-list">
                <p className="extras-title">Bài tham khảo trong ngày:</p>
                {extras.map((e, i) => (
                  <div key={i} className="history-card extra">
                    <span className="hc-icon-sm">{e.cardIcon}</span>
                    <span className="hc-name-sm">{e.cardName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function formatDate(key) {
  const [y, m, d] = key.split('-')
  return `${d}/${m}/${y}`
}
