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
          const result = await query(`select * from branch where id=${id}`)
          if (result.length>0) {
            const { email, address, name ,contact} = req.body
            console.log(email, address, name ,contact);
            const rowcount = await query(`update branch set 
            email='${email.toString()}',
            name='${name.toString()}',
            contact='${contact.toString()}',
            address='${address.toString()}'
            where id=${id}`)
            if (rowcount.affectedRows==1) {
                return res.status(200).json({ message: 'Successfully Updated', ok: true })
            }else{
                return res.status(500).json({ message: "Server Error ", ok: false })
            }
          }
          else{
                return res.status(403).json({ message: 'No Branch From This Id', ok: false })
          }
         

    } catch (error) {
        return res.status(500).json({ message: error.message, ok: false })
    }

}
