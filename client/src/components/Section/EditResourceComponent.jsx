import React from 'react'
import { detailSkill, editResource } from '../../services/skillServices';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useState } from 'react';

function EditResourceComponent() {
  const {id} = useParams()

  const Query = new URLSearchParams(location.search)
  const resourceId = Query.get('resourceId')

  const navigate = useNavigate()


  const [resource,setResource] =useState(null)


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({defaultValues:resource});

  useEffect(()=>{
       const fetchDetails = async()=>{
        const res =await detailSkill(id)
        const matched = res.data.resources.find(r=>r._id === resourceId)
        setResource(matched)
        reset(matched)
        
        console.log(res.data)
        console.log('usestate',resource)
       }
       fetchDetails()

  },[id])

  const onsubmit = async (data) => {

    const container ={...data,resourceId}
    try {
        const res = await editResource(id,container)
        navigate(`/skill/${id}`)
        console.log('response',res)
    } catch (error) {
        navigate(`/skill/${id}`)

        console.log(error)
    }
    console.log('form data', data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Edit a Resource</h2>

        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              {...register('title')}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Tag */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tag</label>
            <input
              type="text"
              {...register('tag')}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.tag && <p className="text-red-500 text-sm">{errors.tag.message}</p>}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <input
              type="text"
              {...register('notes')}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.notes && <p className="text-red-500 text-sm">{errors.notes.message}</p>}
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Link</label>
            <input
              type="url"
              {...register('link', {
                pattern: {
                  value: /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
                  message: 'Enter a valid URL',
                },
              })}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Edit Resource
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditResourceComponent