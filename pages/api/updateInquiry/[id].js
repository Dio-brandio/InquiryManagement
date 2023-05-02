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
          const result = await query(`select * from inquires where id=${id}`)
          if (result.length>0) {
            const { fname,lname,email,contact,refrence,branchid,inquiry_date,upcoming_date,course,feedback,intrested} = req.body
console.log(inquiry_date,upcoming_date);
            const rowcount = await query(`update inquires set 
            email='${email.toString()}',
            fname='${fname.toString()}',
            lname='${lname.toString()}',
            contact='${contact.toString()}',
            refrence='${refrence.toString()}',
            branch='${parseInt(branchid)}',
            inquiry_date='${(inquiry_date).toString()}',
            upcoming_date='${(upcoming_date).toString()}',
            course='${course.toString()}',
            feedback='${feedback.toString()}',
            intrested='${intrested.toString()}'
            where id=${id}`)
            if (rowcount.affectedRows==1) {
                return res.status(200).json({ message: 'Successfully Updated', ok: true })
            }else{
                return res.status(500).json({ message: "Server Error ", ok: false })
            }
          }
          else{
                return res.status(403).json({ message: 'No Inquires', ok: false })
          }
         

    } catch (error) {
        return res.status(500).json({ message: error.message, ok: false })
    }

}
