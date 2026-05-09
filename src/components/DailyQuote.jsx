import { useMemo, useState } from 'react'
import { quotes } from '../data/quotes'
import { getDailySeed } from '../utils/dailySeed'
import Toast from './Toast'

export default function DailyQuote({ email }) {
  const dailyIndex = useMemo(
    () => Math.abs(getDailySeed(email, 'quote')) % quotes.length,
    [email]
  )
  const [extraIndex, setExtraIndex] = useState(null)
  const [toast, setToast] = useState('')

  const showing = extraIndex == null ? quotes[dailyIndex] : quotes[extraIndex]
  const isExtra = extraIndex != null

  const randomOther = () => {
    let next = Math.floor(Math.random() * quotes.length)
    if (next === dailyIndex) next = (next + 1) % quotes.length
    setExtraIndex(next)
  }

  const reset = () => setExtraIndex(null)

  const copyText = async () => {
    const text = showing.author ? `"${showing.text}" — ${showing.author}` : `"${showing.text}"`
    try {
      await navigator.clipboard.writeText(text)
      setToast('Đã sao chép quote ✓')
    } catch {
      setToast('Trình duyệt không cho phép copy')
    }
  }

  return (
    <section className="daily-quote">
      <div className="quote-card">
        <div className="quote-mark">"</div>
        <p className="quote-text">{showing.text}</p>
        <p className="quote-author">
          {showing.author ? `— ${showing.author}` : isExtra ? '— Quote bonus' : '— Quote của ngày hôm nay'}
        </p>
      </div>
      <div className="quote-actions">
        <button className="btn ghost" onClick={copyText}>📋 Sao chép</button>
        {isExtra ? (
          <>
            <button className="btn ghost" onClick={randomOther}>🎲 Quote khác</button>
            <button className="btn ghost" onClick={reset}>↩ Về quote hôm nay</button>
          </>
        ) : (
          <button className="btn ghost" onClick={randomOther}>🎲 Quote khác</button>
        )}
      </div>
      <Toast message={toast} onDone={() => setToast('')} />
    </section>
  )
}
