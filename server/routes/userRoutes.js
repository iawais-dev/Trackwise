import express from 'express'
import { Login,logout,me,signUp,dashboard, updateUser, verifyPassword} from '../controllers/authController.js'
// import { dashboard } from '../controllers/dashbo
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/signup',signUp)
router.post('/login',Login)
router.get('/logout',verifyToken,logout)
router.get('/dashboard', verifyToken ,dashboard)
router.get('/me',verifyToken,me)
router.put('/:id',verifyToken,updateUser)
router.post('/verifypassword/:id',verifyToken,verifyPassword)
// router.get('/me',verifyToken,edit)

export default router;
