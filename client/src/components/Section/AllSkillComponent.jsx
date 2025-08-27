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
      // toast.error('Something went Wrong')
    }
  }

  const handleAddSkill = () => {
    navigate('/addskill')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 text-white">
        <div className="text-xl animate-pulse">Loading your skills...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 py-12 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Add Skill Button */}
        <div
          className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 w-12 h-12 text-white cursor-pointer flex items-center justify-center rounded-full absolute right-6 top-6 transition"
          onClick={handleAddSkill}
        >
          <PlusCircleIcon />
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-7xl font-bold mb-2 mt-10 md:mt-0">All Your Skills</h1>
          <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
        </div>

        {/* Floating Filter Button */}
        <div
          onClick={() => setShowCategory(!showCategory)}
          className="bg-white/10 hover:bg-white/20 border border-white/20 
             backdrop-blur rounded-full w-12 h-12 flex items-center 
             justify-center cursor-pointer absolute right-20 top-6 
             transition"
          title="Filter skills by category"
        >
          <Filter className="text-white" size={20} />
        </div>

        {/* Dropdown Menu */}
        {showCategory && (
          <div className="absolute right-20 top-20 bg-gray-800/90 backdrop-blur 
                  border border-white/10 rounded-xl shadow-lg p-3">
            <p className="text-sm text-gray-300 mb-2">Choose a category:</p>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded-lg w-48 outline-none"
            >
              <option value="All">All</option>
              {Array.from(new Set(skills.map(s => s.category))).map((category, idx) => (
                <option key={idx} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-300 my-2">Choose a Status:</p>
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded-lg w-48 outline-none"
            >
              <option value="">All</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        )}


        {/* Skill List */}
        {skills.length  > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills
            .sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
            .map((skill, index) => (
              <SkillCard key={index} skill={skill} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className=" text-white/60 absolute top-1/2 left-1/2 font-semibold text-2xl md:text-5xl -translate-1/2  ">
            You haven’t added any skills yet.
          </div>
        )}
        {
          filteredSkills.length === 0 && skills.length >0 ? <div className="absolute top-1/2 left-1/2 font-semibold text-2xl md:text-5xl -translate-1/2">No skills found.</div> : null
        }
      </div>
    </div>
  )
}

export default AllSkillComponent
