import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const Protected = ({children}) => {
  
    const user = useSelector(state=> state.auth.user)
     const loading = useSelector(state=> state.auth.loading)

    if (loading) {
  return (
    <div className="flex h-screen items-center justify-center bg-[#050b11]">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Perplexity" className="h-8 w-8" />

          <h1 className="text-xl font-semibold tracking-[0.3em] text-[#d6f3ff]">
            PERPLEXITY
          </h1>
        </div>

        {/* Loader */}
        <div className="flex gap-2">
          <span className="h-3 w-3 animate-bounce rounded-full bg-[#8ce3ff]"></span>
          <span
            className="h-3 w-3 animate-bounce rounded-full bg-[#8ce3ff]"
            style={{ animationDelay: "0.15s" }}
          ></span>
          <span
            className="h-3 w-3 animate-bounce rounded-full bg-[#8ce3ff]"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>

        <p className="text-sm text-[#7fa9af]">
          Preparing your workspace...
        </p>
      </div>
    </div>
  );
}

     if(!user){
        return <Navigate to="/login" replace />
     }

  return children
}

export default Protected