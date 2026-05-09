import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './components/Login'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import TarotPage from './pages/TarotPage'
import HistoryPage from './pages/HistoryPage'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

function Shell() {
  const { user, loading } = useAuth()
  if (loading) {
    return <div className="loading-screen">⏳ Đang tải…</div>
  }
  if (!user) return <Login />
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tarot" element={<TarotPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}

export default function App() {
  if (!CLIENT_ID) {
    return (
      <div className="config-error">
        <h2>⚠️ Chưa cấu hình Google Client ID</h2>
        <p>Hãy tạo file <code>.env</code> ở thư mục gốc và thêm:</p>
        <pre>VITE_GOOGLE_CLIENT_ID=your_id.apps.googleusercontent.com</pre>
        <p>Sau đó chạy lại <code>npm run dev</code>.</p>
      </div>
    )
  }
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <Shell />
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}
