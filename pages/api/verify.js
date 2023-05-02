import jwt  from "jsonwebtoken"
export default async function handler(req, res) {
    if (req.method!=='POST' || !req.body) {
        return res.status(403).json({ message: 'Bad request',ok:false })
    }
    try {
        const {token} = req.body
        const verify =  jwt.verify(token,process.env.JWT_SECRET)
        return res.status(200).json({ user:verify,ok:true })
        
    } catch (error) {
        return res.status(500).json({ message:"Invalid",ok:false })
    }
  }
  