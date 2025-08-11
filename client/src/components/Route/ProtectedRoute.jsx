import axios from 'axios'
import React, { Children, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    let [loading, setLoading] = useState(true)
    let [auth, setAuth] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                let res = await axios.get('http://localhost:3000/api/user/dashboard', {
                    withCredentials: true //must
                })
                setAuth(true)
            } catch (error) {
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
    return children
}
}

export default ProtectedRoute