import React from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';

const SkillCard = ({ skill, onDelete }) => {

  const statusLabels = {
  'Completed': 'Completed',
  'In Progress': 'In progress',
  'Not Started': 'Not Started'
};
  return (
    <div className="flex flex-col justify-between w-[300px] md:w-[350px] lg:w-[300px] h-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 border mx-auto">
      
      {/* Top Section */}
      <div>
        <p
  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
    ${
      skill.status === 'Completed'
        ? 'bg-green-100 text-green-700'
        : skill.status === 'In Progress'
        ? 'bg-yellow-100 text-yellow-700'
        : 'bg-gray-100 text-gray-700'
    }
  `}
>
  {statusLabels[skill.status] || 'Unknown'}
</p>

        
        <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate">{skill.title}</h2>
        <span className="text-sm text-indigo-500 font-medium">{skill.category}</span>
        <p className="text-gray-600 text-sm mt-3 line-clamp-4">
          {skill.description}
        </p>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between items-center mt-4">
        <Link to={`/skill/${skill._id}`} className="text-indigo-600 hover:text-indigo-800" title="View Details">
          <FiEye size={20} />
        </Link>

        <Link to={`/edit/${skill._id}`} className="text-yellow-500 hover:text-yellow-600" title="Edit Skill">
          <FiEdit size={20} />
        </Link>

        <button onClick={() => onDelete(skill._id)} className="text-red-500 cursor-pointer hover:text-red-600" title="Delete Skill">
          <FiTrash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default SkillCard;
