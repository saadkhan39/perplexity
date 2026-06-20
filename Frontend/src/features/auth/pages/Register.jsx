import React, { useState } from 'react'
import { Link } from 'react-router'
const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: replace with real registration call
    console.log('Register submit', { username, email, password })
    // clear form fields
    setUsername('')
    setEmail('')
    setPassword('')
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
          <p className="text-xs uppercase tracking-[0.35em] text-[#7da3aa] mb-2">Create account</p>
          <h2 className="text-3xl font-semibold text-white">Register</h2>
          <p className="mt-2 text-sm text-[#b8cad6]">Sign up to start using the app with secure access.</p>
        </div>

        <label className="block text-sm mb-2 text-[#c0d0db]">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Your username"
          className="w-full px-4 py-2.5 mb-3 rounded-2xl bg-[#0c1420] border border-[#23434d] text-[#e9f1f8] placeholder:text-[#7fa9af] focus:outline-none focus:ring-2 focus:ring-[#4e99a3]"
        />

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
          placeholder="Create a strong password"
          className="w-full px-4 py-2.5 mb-4 rounded-2xl bg-[#0c1420] border border-[#23434d] text-[#e9f1f8] placeholder:text-[#7fa9af] focus:outline-none focus:ring-2 focus:ring-[#4e99a3]"
        />

        <button
          type="submit"
          className="w-full py-2.5 rounded-2xl bg-[#4e99a3] text-white font-semibold shadow-[0_12px_30px_rgba(78,153,163,0.35)] hover:bg-[#438382] transition-colors duration-200"
        >
          Create account
        </button>

        <p className="mt-5 text-sm text-[#9abac6] text-center">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-[#4e99a3] hover:text-[#7cc3c8]"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register