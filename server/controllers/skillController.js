import { SkillModel } from "../models/skill.model.js";
import { UserModel } from "../models/user.model.js";

export const AllSkills = async (req, res) => {
      try {
            const user = await UserModel.findOne({ email: req.user.email })
            const skills = await SkillModel.find({ user: user._id });
            res.status(200).json(skills);
      } catch (error) {
            console.error("Error in AllSkills:", error);
            res.status(500).json({ message: error.message });
      }
};

export const detailSkills = async (req, res) => {
      try {
            const { id } = req.params
            const skill = await SkillModel.findById(id)

            if (!skill) return res.status(500).json({ message: 'there is no skill with that id' })

            res.status(200).json(skill)
      } catch (error) {
            console.log("error in detailSkill", error)
            res.status(500).json({ message: error.message })
      }

}


export const addSkill = async (req, res) => {
      const user = await UserModel.findOne({ email: req.user.email })
      let { title, description, category } = req.body


      const newSkill = await SkillModel.create({
            user: user._id,
            title,
            description,
            category
      })
      user.skills.push(newSkill._id)
      await user.save()
      res.status(201).json({ message: "Skill created", skill: newSkill });

}

export const editSkill = async (req, res) => {
      let { id } = req.params
      let { title, description, category } = req.body

      try {
            let editedSkill = await SkillModel.findByIdAndUpdate(id, {
                  title,
                  description,
                  category
            }, { new: true, runValidators: true })

            if (!editedSkill) {
                  return res.status(404).json({ message: "skill not found" })
            }

            res.status(200).json(editedSkill)

      } catch (error) {
            console.log('error in editing skill', error)
            res.status(500).json({ message: error.message })
      }



}

export const updateStatus = async (req, res) => {
      let { id } = req.params
      let { status, progress, isCompleted } = req.body

      try {
            let updatedSkill = await SkillModel.findByIdAndUpdate(id, {
                  status,
                  progress,
                  isCompleted
                  // resources
            }, { runValidators: true, new: true })
            if (!updatedSkill) return res.status(404).json({ message: 'skill not found' })

            res.status(200).json(updatedSkill)
      } catch (error) {
            console.log('error in updating skill', error)
            res.status(500).json({ message: error.message })
      }
}


export const deleteSkill = async (req, res) => {
      const { id } = req.params
      try {
            const deleted = await SkillModel.findByIdAndDelete(id)

            if (!deleted) {
                  return res.status(404), json({ message: 'skill not found' })
            }

            res.status(200).json({ message: 'skill deleted Successfully' })
      } catch (error) {
            console.log('error in deleting skill', error)
            res.status(500).json({ message: error.message })
      }

}
///Resources

export const addResource = async (req, res) => {
      const { id } = req.params
      const { title, tag, link, notes } = req.body

      try {
            const skill = await SkillModel.findById(id)

            if (!skill) return res.status(404).json({ message: 'skill not found' })

            const resource = { title, tag, link, notes }
            skill.resources.push(resource)
            await skill.save()
            res.status(200).json({ resource })
      } catch (error) {
            console.log(error)
            res.status(400).json({ messgae: error })
      }
}

//deleting resource

export const deleteResource = async (req, res) => {
      const { id } = req.params
      const { resourceId } = req.body
      try {
            const skill = await SkillModel.findById(id)

            if (!skill) return res.status(404).json({ message: 'skill not found' })


            // skill.resources = skill.resources.filter((resource) => resource._id.toString() !== resourceId)
            skill.resources.remove(resourceId)
            await skill.save()
            res.status(200).json({ success: true })
      } catch (error) {
            console.log(error)
            res.status(400).json({ message: error })
      }
}

//updatin resource

export const editResource = async (req, res) => {
       const {id} = req.params
       const {title,tag,notes,link, resourceId} =req.body

       try {
            const skill = await SkillModel.findById(id)

          const  singleResource = skill.resources.id(resourceId)

           singleResource.title = title
           singleResource.tag = tag
           singleResource.notes = notes
           singleResource.link = link

            await skill.save()
            res.status(200).json({singleResource})
       } catch (error) {
            console.log(error)
            res.status(400).json({message:error})
       }
}