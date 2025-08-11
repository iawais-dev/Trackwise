import React from 'react';
import { useForm } from 'react-hook-form';
import { addnewresource } from '../../services/skillServices';
import { useNavigate, useParams } from 'react-router-dom';

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
      const res = await addnewresource(id, data);
      navigate(`/skill/${id}`);
      console.log('response', res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Add New Resource</h2>

        <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-white/80 text-sm mb-1">Title</label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              placeholder="Resource title"
              className="w-full px-4 py-2 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Tag */}
          <div>
            <label className="block text-white/80 text-sm mb-1">Tag</label>
            <input
              type="text"
              {...register('tag', { required: 'Tag is required' })}
              placeholder="Resource tag"
              className="w-full px-4 py-2 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.tag && <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-white/80 text-sm mb-1">Notes</label>
            <input
              type="text"
              {...register('notes', { required: 'Notes are required' })}
              placeholder="Add notes"
              className="w-full px-4 py-2 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes.message}</p>}
          </div>

          {/* Link */}
          <div>
            <label className="block text-white/80 text-sm mb-1">Link</label>
            <input
              type="url"
              {...register('link', {
                pattern: {
                  value: /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
                  message: 'Enter a valid URL',
                },
              })}
              placeholder="https://example.com"
              className="w-full px-4 py-2 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Add Resource
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewResource;
