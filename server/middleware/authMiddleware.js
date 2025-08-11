import jwt from 'jsonwebtoken'

export const verifyToken = async (req,res,next)=>{

    const token = req.cookies.token

    if(!token){
        res.status(401).json({message:"no token provided"})
    }
    else{
        try {
          let decoded =  jwt.verify(token,process.env.JWT_SECRET_KEY)
          req.user = decoded;
          next()
        } catch (error) {
            res.status(401).json({message:"invalid token or expired token",details:error})
        }
    }
}