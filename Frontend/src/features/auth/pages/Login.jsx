import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useSelector } from 'react-redux'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state =>state.auth.user)
  const loading = useSelector(state =>state.auth.loading)

  const {handleLogin} = useAuth()

  const navigate = useNavigate()

 

  const handleSubmit = async (e) => {
    e.preventDefault()
    
  await handleLogin({ email, password })

  setEmail('')
  setPassword('')

  navigate("/")
  }
   if(!loading && user){
    return <Navigate to="/" replace/>
  }

  return (
    <div
      style={{ minHeight: '100vh', background: '#060b11', color: '#e4edf4' }}
      className="flex items-center justify-center p-6"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[#0f1720] border border-[#1f363f] rounded-[28px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.35em] text-[#7da3aa] mb-2">Secure access</p>
          <h2 className="text-3xl font-semibold text-white">Sign in</h2>
          <p className="mt-2 text-sm text-[#b8cad6]">Use your credentials to access the application.</p>
        </div>

        <label className="block text-sm mb-2 text-[#c0d0db]">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="w-full px-4 py-2.5 mb-3 rounded-2xl bg-[#0c1420] border border-[#23434d] text-[#e9f1f8] placeholder:text-[#7fa9af] focus:outline-none focus:ring-2 focus:ring-[#4e99a3]"
        />

        <label className="block text-sm mb-2 text-[#c0d0db]">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
          className="w-full px-4 py-2.5 mb-4 rounded-2xl bg-[#0c1420] border border-[#23434d] text-[#e9f1f8] placeholder:text-[#7fa9af] focus:outline-none focus:ring-2 focus:ring-[#4e99a3]"
        />

        <button
          type="submit"
          className="w-full py-2.5 rounded-2xl bg-[#4e99a3] text-white font-semibold shadow-[0_12px_30px_rgba(78,153,163,0.35)] hover:bg-[#438382] transition-colors duration-200"
        >
          Sign in
        </button>

        <p className="mt-5 text-sm text-[#9abac6] text-center">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-[#4e99a3] hover:text-[#7cc3c8]"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login