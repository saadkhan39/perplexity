import React from 'react'
import AppRoutes from './AppRoutes'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useEffect } from 'react'
import { useSelector } from "react-redux";


const App = () => {
     const theme = useSelector((state) => state.theme.mode);

      useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  
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