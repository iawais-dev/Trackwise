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
    <div className="flex flex-col justify-between w-full h-64 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border border-orange-100">

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
        <span className="text-sm text-orange-500 font-medium">{skill.category}</span>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {skill.description}
        </p>

        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Progress</span>
            <span>{skill.progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all ${
                skill.status === 'Completed' ? 'bg-green-500' :
                skill.status === 'In Progress' ? 'bg-yellow-400' : 'bg-gray-300'
              }`}
              style={{ width: `${skill.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between items-center mt-4">
        <Link to={`/skill/${skill._id}`} className="text-orange-500 hover:text-orange-700" title="View Details">
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
