import React, { useEffect, useState } from 'react';
import { detailSkill, editSkill } from '../../services/skillServices';
import { useParams, useNavigate } from 'react-router-dom';

function EditSkill() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const res = await detailSkill(id);
        const data = res.data;
        setTitle(data.title);
        setCategory(data.category);
        setDescription(data.description);
      } catch (error) {
        console.log('Error fetching skill data:', error);
      }
    };
    fetchValues();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editSkill(id, { title, category, description });
      alert('Skill updated successfully');
      navigate('/skills');
    } catch (error) {
      console.log('Error updating skill:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Edit Skill</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm mb-1">Skill Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter skill name"
              className="w-full px-4 py-2 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
              className="w-full px-4 py-2 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
