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
    <div className="min-h-screen bg-[#04070c] text-[#e4edf4] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#25b3d3_0%,_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(78,153,163,0.18)_0%,_transparent_30%),linear-gradient(180deg,_rgba(4,7,12,0.96)_0%,_rgba(4,7,12,1)_100%)]" />
      <div className="relative z-10 w-full max-w-[320px] rounded-[20px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_48px_rgba(0,0,0,0.4)] px-5 py-5">
        <div className="flex flex-col items-center gap-1 mb-4 text-center">
          <div className="flex items-center justify-center rounded-full bg-white/10 w-10 h-10 border border-white/15 shadow-[0_6px_18px_rgba(0,0,0,0.16)]">
            <svg className="w-6 h-6 text-[#8ce3ff]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.73486 2L11.4299 7.24715V7.24595V2.01211H12.5385V7.27063L18.2591 2V7.98253H20.6078V16.6118H18.2663V21.9389L12.5385 16.9066V21.9967H11.4299V16.9896L5.74131 22V16.6118H3.39258V7.98253H5.73486V2ZM10.5942 9.0776H4.50118V15.5167H5.73992V13.4856L10.5942 9.0776ZM6.84986 13.9715V19.5565L11.4299 15.5225V9.81146L6.84986 13.9715ZM12.5704 15.4691L17.1577 19.4994V16.6118H17.1518V13.9663L12.5704 9.80608V15.4691ZM18.2663 15.5167H19.4992V9.0776H13.4516L18.2663 13.4399V15.5167ZM17.1505 7.98253V4.51888L13.3911 7.98253H17.1505ZM10.6028 7.98253L6.84346 4.51888V7.98253H10.6028Z"></path></svg>
          </div>
          <p className="uppercase text-[10px] tracking-[0.35em] text-[#7da3aa]">perplexity</p>
          <h1 className="text-2xl font-semibold">Create account</h1>
          <p className="text-sm text-[#acc7d4] max-w-[270px]">Sign up now and start exploring AI-powered search.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-2 text-[#c0d0db]">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Your username"
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-[#7fa9af] focus:border-[#4e99a3] focus:outline-none focus:ring-2 focus:ring-[#4e99a3]/20"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-[#c0d0db]">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@gmail.com"
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-[#7fa9af] focus:border-[#4e99a3] focus:outline-none focus:ring-2 focus:ring-[#4e99a3]/20"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-[#c0d0db]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a strong password"
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-[#7fa9af] focus:border-[#4e99a3] focus:outline-none focus:ring-2 focus:ring-[#4e99a3]/20"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-3xl bg-[#4e99a3] py-2.5 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(78,153,163,0.35)] transition hover:bg-[#3a7b88]"
          >
            Create account
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#9abac6]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#8ce3ff] hover:text-[#aadbf0]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register