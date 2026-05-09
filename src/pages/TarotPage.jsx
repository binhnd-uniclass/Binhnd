import { useAuth } from '../context/AuthContext'
import TarotReading from '../components/TarotReading'

export default function TarotPage() {
  const { user } = useAuth()
  return (
    <div className="page tarot-page">
      <TarotReading email={user?.email} />
    </div>
  )
}
