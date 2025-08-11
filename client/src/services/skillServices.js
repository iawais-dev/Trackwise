import axios from "axios";

const Api = axios.create({
    baseURL:'http://localhost:3000/api/skill',
    withCredentials:true
})

export const viewSkills = ()=>{
    return Api.get('/')
}

export const addSkill = (formdata)=>{
    return Api.post('/add',formdata)
}

export const detailSkill = (id)=>{
    return Api.get(`/${id}`)
}

export const editSkill = (id,data)=>{
   return Api.put(`/edit/${id}`,data)
}

export const updateSkill = (id,data)=>{
    return Api.put(`/${id}`,data)
}

export const deletSkill = (id) =>{
    return Api.delete(`/delete/${id}`)
}

//resources
export const addnewresource = (id,data)=>{
    return Api.put(`/addnewresource/${id}`,data)
}

export const editResource = (id,data)=>{
    return Api.put(`/editresource/${id}`,data)
}

export const deleteResource = (id,resourceId)=>{
    return Api.delete(`/deleteresource/${id}`,{data:{resourceId}})
}