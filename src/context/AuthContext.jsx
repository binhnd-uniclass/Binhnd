import { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { getUser, setUser, clearUser } from '../utils/storage'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = getUser()
    if (stored) setUserState(stored)
    setLoading(false)
  }, [])

  const loginWithGoogleCredential = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential)
      const u = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        loggedAt: new Date().toISOString()
      }
      setUser(u)
      setUserState(u)
    } catch (e) {
      console.error('Decode JWT failed', e)
    }
  }

  const logout = () => {
    clearUser()
    setUserState(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogleCredential, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
