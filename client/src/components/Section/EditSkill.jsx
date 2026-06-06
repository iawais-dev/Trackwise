import React, { useEffect, useState } from 'react';
import { detailSkill, editSkill } from '../../services/skillServices';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useForm} from 'react-hook-form'

function EditSkill() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData,setInitialData] = useState(null)

  const {register,handleSubmit,reset} = useForm()
  useEffect(() => {
    const fetchValues = async () => {
      try {
        const res = await detailSkill(id);
        const data = res.data;
        const formData = {
          title:data.title,
          category:data.category,
          description:data.description,
        }
        setInitialData(formData)
        reset(formData)
      } catch { /* form stays empty on fetch failure */ }
    };
    fetchValues();
  }, [id,reset]);



  const onSubmit = async (data) => {
    try {
      if(JSON.stringify(data)=== JSON.stringify(initialData)) {
       return toast.error("nothing changed")
      }
      else{
        await editSkill(id, data);
        toast.success("Skill updated successfully")
        navigate('/skills');
      }
    } catch {
      toast.error('Failed to update skill');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white border border-orange-100 rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Edit Skill</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Skill Title</label>
            <input
              type="text"
              {...register("title")}
              placeholder="Enter skill name"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Category</label>
            <input
              type="text"
              {...register("category")}
              placeholder="Enter category"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
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
            Update Skill
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditSkill;
