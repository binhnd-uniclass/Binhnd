import { useEffect, useMemo, useState } from 'react'
import { drawCardBySeed, drawRandomCard } from '../data/tarot'
import { getDailySeed, getTodayKey } from '../utils/dailySeed'
import { addHistoryEntry, getHistory } from '../utils/storage'
import TarotCard from './TarotCard'
import Toast from './Toast'

export default function TarotReading({ email }) {
  const today = getTodayKey()
  const dailyCard = useMemo(
    () => drawCardBySeed(getDailySeed(email, 'tarot')),
    [email]
  )

  const [phase, setPhase] = useState('shuffle') // shuffle -> choose -> revealed
  const [chosenIndex, setChosenIndex] = useState(null)
  const [extra, setExtra] = useState(null)
  const [toast, setToast] = useState('')

  // Kiểm tra xem hôm nay đã rút bài chính chưa — nếu rồi, hiện luôn
  useEffect(() => {
    if (!email) return
    const todayMain = getHistory(email).find(
      (h) => h.dateKey === today && h.type === 'main'
    )
    if (todayMain) {
      setPhase('revealed')
      setChosenIndex(1)
    } else {
      const t = setTimeout(() => setPhase('choose'), 1100)
      return () => clearTimeout(t)
    }
  }, [email, today])

  const onPickCard = (idx) => {
    if (phase !== 'choose') return
    setChosenIndex(idx)
    setPhase('revealed')
    addHistoryEntry(email, {
      dateKey: today,
      type: 'main',
      cardId: dailyCard.id,
      cardName: dailyCard.name,
      cardIcon: dailyCard.icon,
      meaning: dailyCard.meaning,
      advice: dailyCard.advice,
      timestamp: Date.now()
    })
    setToast('Đã lưu vào lịch sử ✓')
  }

  const drawExtra = () => {
    const card = drawRandomCard()
    setExtra(card)
    addHistoryEntry(email, {
      dateKey: today,
      type: 'extra',
      cardId: card.id,
      cardName: card.name,
      cardIcon: card.icon,
      meaning: card.meaning,
      advice: card.advice,
      timestamp: Date.now()
    })
  }

  return (
    <section className="tarot-reading">
      {phase === 'shuffle' && (
        <div className="shuffle-area">
          <p className="prompt">Hít thở sâu 3 nhịp, nghĩ về mục tiêu hôm nay…</p>
          <div className="shuffle-cards">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`shuffle-card s-${i}`} />
            ))}
          </div>
        </div>
      )}

      {phase === 'choose' && (
        <div className="choose-area">
          <p className="prompt">Chạm vào 1 lá để rút bài hôm nay 🔮</p>
          <div className="three-cards">
            {[0, 1, 2].map((i) => (
              <TarotCard
                key={i}
                card={dailyCard}
                flipped={false}
                onClick={() => onPickCard(i)}
                size="lg"
              />
            ))}
          </div>
        </div>
      )}

      {phase === 'revealed' && (
        <div className="revealed-area">
          <p className="prompt revealed-prompt">Lá bài của bạn hôm nay</p>
          <TarotCard card={dailyCard} flipped size="lg" />
          <h2 className="card-meaning-title">{dailyCard.name}</h2>
          <p className="card-meaning">{dailyCard.meaning}</p>
          <p className="card-advice">▸ {dailyCard.advice}</p>

          {extra && (
            <div className="extra-card">
              <p className="extra-label">Bài tham khảo thêm:</p>
              <div className="extra-content">
                <span className="extra-icon" style={{ background: extra.color + '33' }}>{extra.icon}</span>
                <div>
                  <p className="extra-name">{extra.name}</p>
                  <p className="extra-meaning">{extra.meaning}</p>
                  <p className="extra-advice">▸ {extra.advice}</p>
                </div>
              </div>
            </div>
          )}

          <div className="reveal-actions">
            <button className="btn primary" onClick={drawExtra}>
              🔁 Rút thêm 1 lá tham khảo
            </button>
          </div>
        </div>
      )}

      <Toast message={toast} onDone={() => setToast('')} />
    </section>
  )
}
