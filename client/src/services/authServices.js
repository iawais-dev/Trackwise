import axios from "axios";

const Api = axios.create({
    baseURL:'http://localhost:3000/api/user',
    withCredentials:true
})

export const signupUser = (formdata)=>{
   return  Api.post('/signup',formdata)
}
export const loginUser = (formdata)=>{
    return Api.post('/login',formdata)
}

export const logoutUser = ()=>{
    return Api.get('/logout')
}

export const updateUser = (id,data)=>{
    return Api.put(`/${id}`,data)
}

export const verifyPassword = (id,pass)=>{
    return Api.post(`/verifypassword/${id}`,{oldPassword:pass})
}

export const me  = ()=>{
    return Api.get('/me')
}