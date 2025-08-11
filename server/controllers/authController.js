import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const signUp = async (req,res)=>{
    try {
         let {username,email,password} = req.body

    let alreadyUser = await UserModel.findOne({email:email})

    if(alreadyUser){
          return res.status(409).json({message:"The user already exists"})
    }
    else{
        let hashPassword = await bcrypt.hash(password,10)
          let user = await UserModel.create({
                username,
                email,
                password:hashPassword
               })
        
               //Generate jwt token
            let token = jwt.sign({email:user.email, userId:user._id},process.env.JWT_SECRET_KEY)

               //Setting token in cookie
            res.cookie("token",token,{
                httpOnly:true, //save access from js
                sameSite:"strict",
                maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
                // secure:true, for production not development
            })

            return res.status(201).json({message:"Account created successfully", 
                user: {
        username: user.username,
        email: user.email
      }})
            
    }  
    } catch (error) {
       res.status(500).json(({error:"Signup failed",details:error.message}))
    }
 
}


export const Login = async (req,res)=>{
    try {
         let {email,password} = req.body

    let user = await UserModel.findOne({email:email})
    if(user){
          
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            let token = jwt.sign({userId:user._id,email:user.email},process.env.JWT_SECRET_KEY)

            res.cookie("token",token,{
                httpOnly:true,
                // secure:true,
                maxAge:24*60*60*1000,
                sameSite:"strict"
            })
            res.status(200).json({message:"loggedIn"})
        }
        else{
          return res.status(400).json({message:"email or password wrong!"})
        }

    }
    else{
      return  res.status(404).json({message:"user not found"})
    }
    } catch (error) {
      return  res.status(500).json({message:"login failed",details:error.message})
    }
   
}

export const logout = (req,res)=>{
    res.clearCookie("token")
    res.status(200).json({message:"logged out successfully"})
}

export const me = async(req,res)=>{
  try {
      const user = await UserModel.findById(req.user.userId)
  if (!user) return res.status(404).json({ message: "User not found" });

  res.send(user)
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

export const verifyPassword = async (req,res)=>{
  const {id} = req.params
  const {oldPassword} = req.body
  try {
    const user = await UserModel.findById(id)

    if(!user) return res.status(404).json({message:"user not found"})

    const verifyPassword = await bcrypt.compare(oldPassword,user.password)
    if(verifyPassword){
           res.status(200).json({success: true, message:'password verified'})
    }
    else{
           res.status(200).json({success: false, message:'password not verified'})
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({message:error})
  }
}

export const updateUser = async(req,res)=>{
  //getting user details from req.body
  const {id} = req.params
  const {username,password} = req.body
  
  try {
    const user = await UserModel.findById(id)

    if(!user) return res.status(404).json({message:"user not found"})

    //checking if there is newpassword or not
    if(password && username){
    try {
      //hashing the password before adding it to database
      const salt = 10
      const hashPass = await bcrypt.hash(password,salt) 
       const user = await UserModel.findByIdAndUpdate(id,{
       password:hashPass,
       username: username
     },{new:true})
     res.status(200).json({user})
    } catch (error) {
      console.log(error)
      res.status(404).json({message:"user not found"})
    }

    }
 else if(password){

    try {
      //hashing the password before adding it to database
      const salt = 10
      const hashPass = await bcrypt.hash(password,salt) 
       const user = await UserModel.findByIdAndUpdate(id,{
       password:hashPass
     },{new:true})
     res.status(200).json({user})
    } catch (error) {
      console.log(error)
      res.status(404).json({message:"user not found"})
    }
  }
  //checking if user asked for change username or not
 else if(username){
    try {
      const user = await UserModel.findByIdAndUpdate(id,{
      username:username
    },{new:true})
    res.status(200).json({user})
    } catch (error) {
      console.log('error',error)
      res.status(500).json({message:error})
    }
  }
  }

 catch (error) {
    res.status(500).json({message:error})
  }
}

export const dashboard = async(req,res)=>{
try {
    let user = req.user;
    res.status(200).json({
        user
    })
} catch (error) {
    res.status(500).json({message:error})
}
}

// export const editUser = async(req,res)=>{

//   try {
//     const newUser = await UserModel.findOneAndUpdate
//   } catch (error) {
    
//   }
// }