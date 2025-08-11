import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { detailSkill, deleteResource, updateSkill } from '../../services/skillServices';
import { Pencil, Trash2 } from 'lucide-react';

function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [skill, setSkill] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    status: '',
    progress: 0,
    isCompleted: false,
    resources: [],
  });

  useEffect(() => {
    if (form.status === 'Completed' && form.progress !== 100) {
      setForm((prev) => ({ ...prev, progress: 100, isCompleted: true }));
    } else if (form.status === 'In Progress' && form.progress === 100) {
      setForm((prev) => ({ ...prev, progress: 50 }));
    } else {
      setForm((prev) => ({ ...prev, progress: 0 }));
    }
  }, [form.status]);

  const handleSubmit = async () => {
    try {
      await updateSkill(id, form);
      alert('Updated successfully');
      if (form.isCompleted) navigate('/skills');
    } catch (error) {
      console.error(error);
      alert('Update failed');
    }
  };

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await detailSkill(id);
        const data = res.data;
        setSkill(data);
        setForm({
          status: data.status || 'Not Started',
          progress: data.progress || 0,
          resources: data.resources || [],
        });
      } catch (error) {
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddResource = () => {
    navigate(`/addresource/${id}`);
  };

  const handleResourceDelete = async (rid) => {
    const updated = form.resources.filter((r) => r._id !== rid);
    setForm((prev) => ({ ...prev, resources: updated }));
    await deleteResource(id, rid);
  };

  const handleResourceUpdate = (resourceId) => {
    navigate(`/editresource/${id}?resourceId=${resourceId}`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-800 text-white">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 px-4 py-12 text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Skill Info */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-1">{skill.title}</h1>
          <p className="text-white/60 text-sm mb-4">Category: {skill.category}</p>
          <p className="text-white/80 mb-6">{skill.description}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/70 text-sm mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-1">Progress</label>
              <input
                name="progress"
                disabled={form.status === 'Completed'}
                type="range"
                min="0"
                max="100"
                value={form.progress}
                onChange={handleChange}
                className="w-full accent-indigo-500"
              />
              <p className="text-sm text-white/60 mt-1">{form.progress}% complete</p>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handleAddResource}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              + Add Resource
            </button>
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
            >
              Save Progress
            </button>
          </div>
        </div>

        {/* Resource Section */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Resources</h2>
          {form.resources.length > 0 ? (
            <div className="space-y-4">
              {form.resources.map((res, i) => (
                <div
                  key={i}
                  className="bg-white/10 p-4 rounded-xl flex justify-between items-start"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white">{res.title}</h3>
                    <p className="text-blue-400 text-sm">{res.tag}</p>
                    <p className="text-white/80 text-sm mt-1">{res.notes}</p>
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-indigo-400 hover:underline block mt-1 truncate max-w-xs"
                    >
                      {res.link}
                    </a>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleResourceUpdate(res._id)}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleResourceDelete(res._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/60">No resources added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
