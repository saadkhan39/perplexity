import { useDispatch, useSelector } from "react-redux";
import {register ,login ,getMe ,logout} from "../service/auth.api"
import {setUser, setLoading ,setError,logoutUser } from "../auth.slice"
import { useNavigate } from "react-router";


export function useAuth(){

    const navigate = useNavigate();
    const dispatch = useDispatch()

    async function handleRegister({email,username,password}) {
        try {
            dispatch(setLoading(true))
            const data = await register({email,username,password})
        } catch (error) {
           dispatch(setError(error.response?.data?.message || "Registration failed")) 
        }finally{
            dispatch(setLoading(false))
        }
    }

     async function handleLogin({email,password}) {
        try {
            dispatch(setLoading(true))
            const data = await login({email,password})
            dispatch(setUser(data.user))
        } catch (error) {
           dispatch(setError(error.response?.data?.message || "Login failed")) 
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        } catch (error) {
           dispatch(setError(error.response?.data?.message || "Failed to fetched user data")) 
        }finally{
            dispatch(setLoading(false))
        }
    }


   async function handleLogout() {
  try {
    await logout();

 dispatch(logoutUser());
    navigate("/login");
  } catch (error) {
    console.log(error);
  }
   }

    return {
        handleRegister,handleLogin, handleGetMe ,handleLogout
    }
}