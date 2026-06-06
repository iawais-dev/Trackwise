import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { detailSkill, deleteResource, updateSkill } from '../../services/skillServices';
import { Pencil, Trash2, BookOpen } from 'lucide-react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form'

function Details() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [skill, setSkill] = useState(null);
  const [resources, setResources] = useState([])

  const navigate = useNavigate();


  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      status: 'Not Started',
      progress: 0,
      isCompleted: false
    }
  })

  const status = watch('status')
  const progress = watch('progress')

  useEffect(() => {
    if (status === 'Completed' && progress !== 100) {
      setValue("progress", 100)
      setValue("isCompleted", true)
    } else if (status === 'In Progress' && progress === 100) {
      setValue("progress", 50);
    }
    else if(progress > 0 && progress < 100){
      setValue('status',"In Progress")
    }
    else if(progress === 0){
      setValue('status',"Not Started")
    }
    else if(progress > 99){
      setValue('status',"Completed")
    }
    else {
      setValue("progress", 0);
    }
  }, [status,progress]);



  const onSubmit = async (data) => {
    try {
      const payload = { ...data, resources }
      await updateSkill(id, payload);
      toast.success("Updated successfully")
      if (status === "Completed") navigate('/skills');
    } catch {
      toast.error('Update failed');
    }
  };

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await detailSkill(id);
        const data = res.data;
        setSkill(data);
        setResources(data.resources)
        reset({
          status: data.status || 'Not Started',
          progress: data.progress || 0,
          isCompleted: data.isCompleted || false
        })
      } catch (error) {
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
  }, [id]);



  const handleAddResource = () => {
    navigate(`/addresource/${id}`);
  };

  const handleResourceDelete = async (rid) => {
    const updated = resources.filter((r) => r._id !== rid);
    setResources(updated)
    await deleteResource(id, rid);
  };

  const handleResourceUpdate = (resourceId) => {
    navigate(`/editresource/${id}?resourceId=${resourceId}`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50 text-gray-500">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50 text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Skill Info */}
        <div className="bg-white border border-orange-100 p-8 rounded-2xl shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{skill.title}</h1>
          <p className="text-gray-400 text-sm mb-4">Category: {skill.category}</p>
          <p className="text-gray-600 mb-6">{skill.description}</p>

          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 text-sm mb-1">Status</label>
                <select
                  name="status"
                  {...register("status")}
                  className="w-full bg-white border border-gray-200 text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">Progress</label>
                <input
                  name="progress"
                  disabled={status === 'Completed'}
                  type="range"
                  min="0"
                  max="100"
                  {...register("progress")}
                  className="w-full accent-orange-500"
                />
                <p className="text-sm text-gray-400 mt-1">{progress}% complete</p>
              </div>
            </div>
          <div className="flex justify-between mt-8">
            <button
              type='submit'
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
            >
              Save Progress
            </button>
          </div>

          </form>

        </div>

        {/* Resource Section */}
        <div className="bg-white border border-orange-100 flex flex-col p-8 rounded-2xl shadow-sm">
           <button
              onClick={handleAddResource}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-fit ml-auto transition"
            >
              + Add Resource
            </button>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Resources</h2>
          {resources.length > 0 ? (
            <div className="space-y-4">
              {resources.map((res, i) => (
                <div
                  key={i}
                  className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex justify-between items-start"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{res.title}</h3>
                    <p className="text-orange-500 text-sm">{res.tag}</p>
                    <p className="text-gray-600 text-sm mt-1">{res.notes}</p>
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-orange-600 hover:underline block mt-1 truncate max-w-xs"
                    >
                      {res.link}
                    </a>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleResourceUpdate(res._id)}
                      className="text-orange-400 hover:text-orange-600"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleResourceDelete(res._id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-10 text-gray-400">
              <BookOpen size={40} className="mb-3" />
              <p className="font-medium mb-1">No resources yet</p>
              <p className="text-sm mb-5 text-center">Add links, notes, and references to help you learn this skill.</p>
              <button
                onClick={handleAddResource}
                className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition"
              >
                Add your first resource
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
