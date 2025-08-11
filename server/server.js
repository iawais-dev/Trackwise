import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { ConnectDb } from './config/db.js'
import cookieparser from 'cookie-parser'

import userRoutes from './routes/userRoutes.js'
import skillRoutes from './routes/skillRoutes.js'


dotenv.config()


const app = express()
ConnectDb()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())


app.use('/api/user',userRoutes)
app.use('/api/skill',skillRoutes)

app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(3000)