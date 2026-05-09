import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { loginWithGoogleCredential } = useAuth()

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo">✨</div>
        <h1>Sale Motivation Daily</h1>
        <p className="tagline">Khởi đầu ngày mới đầy năng lượng</p>

        <ul className="login-features">
          <li>📝 Quote tiếng Việt truyền động lực mỗi ngày</li>
          <li>🔮 Rút bài Tarot tích cực dành riêng cho sale</li>
          <li>📈 Lưu lịch sử và streak theo ngày</li>
        </ul>

        <div className="google-login-wrap">
          <GoogleLogin
            onSuccess={loginWithGoogleCredential}
            onError={() => alert('Đăng nhập thất bại. Vui lòng thử lại.')}
            useOneTap
            shape="pill"
            text="signin_with"
            locale="vi"
          />
        </div>

        <p className="disclaimer">
          App chỉ lưu thông tin cơ bản (tên, email, ảnh đại diện) trên trình duyệt của bạn.
          Không gửi đi đâu khác.
        </p>
      </div>
    </div>
  )
}
