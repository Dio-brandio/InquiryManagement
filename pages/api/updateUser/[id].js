import { splitToken ,checkCookie} from "../middleware"
const query = require('../dbconnect')
export default async function handler(req, res) {
    const token = splitToken(req.headers.cookie)
    const isAdmin = await checkCookie(token, "admin");
    let id = parseInt(req.query.id)
  

    if (req.method !== 'POST'  || !req.body || !token ||id==null || id==undefined) {
        return res.status(403).json({ message: 'Bad request', ok: false })
    }
    if ( !isAdmin.verified ) {
        return res.status(401).json({ message: 'Not Authenticated', ok: false })
    }
  
    try {
          const result = await query(`select * from users where id=${id}`)
          if (result.length>0) {
            const { email, password, fname, lname, branchid, role ,contact} = req.body

            const rowcount = await query(`update users set 
            email='${email.toString()}',
            password='${password.toString()}',
            fname='${fname.toString()}',
            lname='${lname.toString()}',
            contact='${contact.toString()}',
            branchid='${parseInt(branchid)}',
            role='${role}'
            where id=${id}`)
            if (rowcount.affectedRows==1) {
                return res.status(200).json({ message: 'Successfully Updated', ok: true })
            }else{
                return res.status(500).json({ message: "Server Error ", ok: false })
            }
          }
          else{
                return res.status(403).json({ message: 'No User', ok: false })
          }
         

    } catch (error) {
        return res.status(500).json({ message: error.message, ok: false })
    }

}
