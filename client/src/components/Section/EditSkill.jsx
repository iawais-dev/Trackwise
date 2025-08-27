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
        console.log(initialData)
      } catch (error) {
        console.log('Error fetching skill data:', error);
      }
    };
    fetchValues();
  }, [id,reset]);

  useEffect(() => {
  if (initialData) {
    console.log("Initial data updated:", initialData);
  }
}, [initialData]);



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
    } catch (error) {
      console.log('Error updating skill:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Edit Skill</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm mb-1">Skill Title</label>
            <input
              type="text"
              {...register("title")}
              placeholder="Enter skill name"
              className="w-full px-4 py-2 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">Category</label>
            <input
              type="text"
              {...register("category")}
              placeholder="Enter category"
              className="w-full px-4 py-2 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
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
            Update Skill
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditSkill;
