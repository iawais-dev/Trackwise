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
      const res = await addSkill(data);
      console.log('Skill added:', res.data);
      toast.success("New Skill added successfully")
      navigate('/skills');
    } catch (error) {
      console.log('Error adding skill:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Add New Skill</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm mb-1">Skill Title</label>
            <input
              type="text"
              {...register("title",{required:"Title is required"})}
              placeholder="Enter skill name"
              className="w-full px-4 py-2 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p> }
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">Category</label>
            <input
              type="text"
              {...register("category",{required:"Category is required"})}
              placeholder="Enter category"
              className="w-full px-4 py-2 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p> }
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">Description</label>
            <input
              type="text"
              {...register("description")}
              placeholder="Short description"
              className="w-full px-4 py-2 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Add Skill
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSkillComp;
