import express from 'express'
import { addResource, addSkill, AllSkills, deleteResource, deleteSkill,  detailSkills,  editResource,  editSkill, updateStatus } from '../controllers/skillController.js'
import { verifyToken } from '../middleware/authMiddleware.js'


const router = express.Router()

router.get('/',verifyToken, AllSkills)
router.get('/:id',verifyToken, detailSkills)
router.post('/add', verifyToken ,addSkill)
router.put('/:id',verifyToken,updateStatus)
router.put('/edit/:id',verifyToken,editSkill)
router.put('/addnewresource/:id',verifyToken,addResource)
router.put('/editresource/:id',verifyToken,editResource)
router.delete('/delete/:id',verifyToken,deleteSkill)
router.delete('/deleteresource/:id',verifyToken,deleteResource)


export default router