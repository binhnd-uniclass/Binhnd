// Component hiển thị 1 lá tarot — có 2 mặt: úp & ngửa, dùng CSS 3D flip

export default function TarotCard({ card, flipped, onClick, size = 'md' }) {
  const cls = `tarot-card size-${size}` + (flipped ? ' flipped' : '')
  return (
    <div className={cls} onClick={onClick} role="button" tabIndex={0}>
      <div className="card-inner">
        <div className="card-back">
          <div className="back-pattern">
            <span>✦</span>
            <span>☾</span>
            <span>✦</span>
          </div>
        </div>
        <div className="card-front" style={{ '--accent': card?.color || '#FF8C42' }}>
          <div className="card-icon">{card?.icon}</div>
          <div className="card-name">{card?.name}</div>
          <div className="card-name-en">{card?.nameEn}</div>
        </div>
      </div>
    </div>
  )
}
