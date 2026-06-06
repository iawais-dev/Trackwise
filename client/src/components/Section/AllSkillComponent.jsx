import React, { useEffect, useState } from 'react'
import SkillCard from './SkillCard'
import { deletSkill, viewSkills } from '../../services/skillServices'
import { useNavigate } from 'react-router-dom'
import { Filter, PlusCircleIcon } from 'lucide-react'
import { toast } from 'react-toastify'

function AllSkillComponent() {
  const [loading, setLoading] = useState(true)
  const [skills, setSkills] = useState([])
  const [showCategory, setShowCategory] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [status, setStatus] = useState('')


  let filteredSkills = skills

  if (selectedCategory !== 'All') {
    filteredSkills = filteredSkills.filter(s => s.category === selectedCategory)
  }
  if (status !== '') {
    filteredSkills = filteredSkills.filter(s => s.status === status)
  }

  const navigate = useNavigate()

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await viewSkills()
        setSkills(res.data)
      } catch (error) {
        console.error('Error fetching skills:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deletSkill(id)
      setSkills(skills.filter(s => s._id !== id))
      toast.success('Successfully Deleted')
    } catch (error) {
      console.error('Error deleting skill:', error)
    }
  }

  const handleAddSkill = () => {
    navigate('/addskill')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-orange-50 text-gray-500">
        <div className="text-xl animate-pulse">Loading your skills...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">All Your Skills</h1>
            <div className="w-16 h-1 bg-orange-500 rounded-full mt-2"></div>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter toggle */}
            <div className="relative">
              <button
                onClick={() => setShowCategory(!showCategory)}
                className="bg-white hover:bg-orange-50 border border-orange-100 rounded-full w-10 h-10 flex items-center justify-center transition text-gray-600 shadow-sm"
                title="Filter skills"
              >
                <Filter size={18} />
              </button>

              {showCategory && (
                <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-10 w-52">
                  <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Category</p>
                  <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-white border border-gray-200 text-gray-900 p-2 rounded-lg w-full outline-none mb-3 text-sm focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="All">All</option>
                    {Array.from(new Set(skills.map(s => s.category))).map((category, idx) => (
                      <option key={idx} value={category}>{category}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Status</p>
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-white border border-gray-200 text-gray-900 p-2 rounded-lg w-full outline-none text-sm focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="">All</option>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              )}
            </div>

            {/* Add skill */}
            <button
              onClick={handleAddSkill}
              className="bg-white hover:bg-orange-50 border border-orange-100 rounded-full w-10 h-10 flex items-center justify-center transition text-gray-600 shadow-sm"
              title="Add new skill"
            >
              <PlusCircleIcon size={20} />
            </button>
          </div>
        </div>

        {/* Skill grid */}
        {skills.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((skill, index) => (
                  <SkillCard key={index} skill={skill} onDelete={handleDelete} />
                ))}
            </div>
            {filteredSkills.length === 0 && (
              <div className="flex justify-center py-20 text-gray-400 text-xl font-medium">
                No skills match your filters.
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <p className="text-2xl font-semibold mb-4">No skills yet</p>
            <p className="text-sm mb-6">Start tracking your learning by adding your first skill.</p>
            <button
              onClick={handleAddSkill}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm transition"
            >
              Add your first skill
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default AllSkillComponent
