import { useAuth } from '../context/AuthContext'
import { greetingsByHour } from '../data/quotes'
import { computeStreak } from '../utils/storage'
import { useMemo, useState } from 'react'

export default function Header() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const greeting = useMemo(() => greetingsByHour(new Date().getHours(), user?.name), [user])
  const streak = user ? computeStreak(user.email) : 0

  return (
    <header className="app-header">
      <div className="hello">
        <p className="greeting">{greeting}</p>
        {streak > 0 && <p className="streak">🔥 Streak {streak} ngày liên tiếp</p>}
      </div>
      <div className="user-block" onClick={() => setMenuOpen((v) => !v)}>
        {user?.picture ? (
          <img src={user.picture} alt={user.name} referrerPolicy="no-referrer" />
        ) : (
          <div className="avatar-fallback">{user?.name?.[0] || '?'}</div>
        )}
        {menuOpen && (
          <div className="user-menu" onClick={(e) => e.stopPropagation()}>
            <div className="menu-name">{user?.name}</div>
            <div className="menu-email">{user?.email}</div>
            <button className="logout-btn" onClick={logout}>Đăng xuất</button>
          </div>
        )}
      </div>
    </header>
  )
}
