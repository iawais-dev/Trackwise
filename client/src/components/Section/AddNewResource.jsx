import React from 'react';
import { useForm } from 'react-hook-form';
import { addnewresource } from '../../services/skillServices';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddNewResource() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    try {
      await addnewresource(id, data);
      navigate(`/skill/${id}`);
    } catch {
      toast.error('Failed to add resource');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white border border-orange-100 rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Add New Resource</h2>

        <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Title</label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              placeholder="Resource title"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Notes</label>
            <input
              type="text"
              {...register('notes', { required: 'Notes are required' })}
              placeholder="Add notes"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Link</label>
            <input
              type="url"
              {...register('link', {
                pattern: {
                  value: /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
                  message: 'Enter a valid URL',
                },
              })}
              placeholder="https://example.com"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Add Resource
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewResource;
