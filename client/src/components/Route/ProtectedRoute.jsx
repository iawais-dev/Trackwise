import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { me } from '../../services/authServices'
import Navbar from '../Navbar'

function ProtectedRoute({children}) {
    let [loading, setLoading] = useState(true)
    let [auth, setAuth] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await me()
                setAuth(true)
            } catch {
                setAuth(false)
            }
            finally {
                setLoading(false)
            }
        }
checkAuth()
    },[])

if(loading){
   return <div>Checking auth....</div>
}
else if(!auth){
   return <Navigate to='/register'/>
}
else{
    return (
      <>
        <Navbar />
        {children}
      </>
    )
}
}

export default ProtectedRoute