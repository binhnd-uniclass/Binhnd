import { NavLink } from 'react-router-dom'

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Trang chính</span>
      </NavLink>
      <NavLink to="/tarot" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
        <span className="nav-icon">🔮</span>
        <span className="nav-label">Tarot</span>
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
        <span className="nav-icon">📜</span>
        <span className="nav-label">Lịch sử</span>
      </NavLink>
    </nav>
  )
}
