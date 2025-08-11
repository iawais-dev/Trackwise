import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { me } from '../../services/authServices'


function PublicRoute({children}) {

    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()
    
    useEffect(()=>{
         const checkAuth =async ()=>{
            try {
                const res =await me()
                const user = res.data
                if(user){
                    navigate('/dashboard')
                    setIsLoggedIn(true)
                    setLoading(false)
                }
                else{
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
         }
         checkAuth()
    },[navigate,isLoggedIn])

     if (loading) return null;
  if (isLoggedIn) return null;

  return children;

  
}

export default PublicRoute