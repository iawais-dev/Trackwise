import React from 'react'
import { detailSkill, editResource } from '../../services/skillServices';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

function EditResourceComponent() {
  const { id } = useParams()

  const Query = new URLSearchParams(location.search)
  const resourceId = Query.get('resourceId')

  const navigate = useNavigate()

  const [resource, setResource] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues: resource });

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await detailSkill(id)
      const matched = res.data.resources.find(r => r._id === resourceId)
      setResource(matched)
      reset(matched)
    }
    fetchDetails()
  }, [id])

  const onsubmit = async (data) => {
    const container = { ...data, resourceId }
    try {
      if (JSON.stringify(data) === JSON.stringify(resource)) {
        toast.error("Nothing Changed")
      }
      else {
        await editResource(id, container)
        toast.success("Resource updated successfully")
        navigate(`/skill/${id}`)
      }
    } catch {
      navigate(`/skill/${id}`)
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white border border-orange-100 p-8 rounded-2xl shadow-sm w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Edit Resource</h2>

        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              {...register('title')}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <input
              type="text"
              {...register('notes')}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.notes && <p className="text-red-500 text-sm">{errors.notes.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
            <input
              type="url"
              {...register('link', {
                pattern: {
                  value: /^(https?:\/\/)?[\w-]+(\.[\w-]+)+[/#?]?.*$/,
                  message: 'Enter a valid URL',
                },
              })}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition font-semibold"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditResourceComponent
