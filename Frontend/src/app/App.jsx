import React from 'react'
import AppRoutes from './AppRoutes'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useEffect } from 'react'

const App = () => {

  const auth = useAuth()

  useEffect(()=>{
    auth.handleGetMe()
  },[])

  return (
    <div>
      <AppRoutes/>
    </div>
  )
}

export default App