import React from 'react';
import { addSkill } from '../../services/skillServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useForm} from 'react-hook-form'

const AddSkillComp = () => {
  const navigate = useNavigate();

  const {register,handleSubmit,formState:{errors}} = useForm()

  const onSubmit = async (data) => {
    try {
      await addSkill(data);
      toast.success("New Skill added successfully")
      navigate('/skills');
    } catch {
      toast.error('Failed to add skill');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white border border-orange-100 rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Add New Skill</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Skill Title</label>
            <input
              type="text"
              {...register("title",{required:"Title is required"})}
              placeholder="Enter skill name"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p> }
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Category</label>
            <input
              type="text"
              {...register("category",{required:"Category is required"})}
              placeholder="Enter category"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p> }
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Description</label>
            <input
              type="text"
              {...register("description")}
              placeholder="Short description"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Add Skill
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSkillComp;
