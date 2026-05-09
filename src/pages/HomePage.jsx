import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import DailyQuote from '../components/DailyQuote'

export default function HomePage() {
  const { user } = useAuth()
  return (
    <div className="page home-page">
      <DailyQuote email={user?.email} />
      <Link to="/tarot" className="btn primary big-cta">
        🔮 Rút bài Tarot hôm nay
      </Link>
      <p className="footnote">
        Mục đích vui và truyền động lực — không phải dự đoán tương lai.
      </p>
    </div>
  )
}
