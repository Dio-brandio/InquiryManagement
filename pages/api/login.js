import jwt  from "jsonwebtoken"
const query = require('./dbconnect')
export default async function handler(req, res) {
   
    if (req.method!=='POST' || !req.body) {
        return res.status(403).json({ message: 'Bad request',ok:false })
    }
    try {
        const { email,  password } = req.body

        const user = await query(`select * from users where email='${email.toString()}' and password='${password.toString()}'`)
        if (user.length==0) {
            return res.json({ message: 'Invalid credentials',ok:false })
        }
        else if(user.length>0){
            const token = jwt.sign({
                uid: user[0].id,
                email: user[0].email,
                role: user[0].role,
                branchid:user[0].branchid
            },process.env.JWT_SECRET)
            return res.status(200).json({ message: 'Successful',token:token,ok:true })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message,ok:false })
    }
    
  }
  