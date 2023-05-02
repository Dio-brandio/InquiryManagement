import { splitToken ,checkCookie, checkDate, sendMailTo} from "./middleware"
const query = require('./dbconnect')
export default async function handler(req, res) {
    
    const token = splitToken(req.headers.cookie)
    const isAdmin = await checkCookie(token, "admin");
    const isManager = await checkCookie(token, "manager");
    const isEmployee = await checkCookie(token, "employee");

    if (req.method !== 'POST' ||  !req.body) {
        return res.status(403).json({ message: 'Bad request', ok: false })
    }
    if (!token || (!isAdmin.verified && !isManager.verified && !isEmployee.verified)) {
        return res.status(401).json({ message: 'Not Authenticated', ok: false })
    }
    
    try {
        const { fname,lname,email,contact,refrence,branchid,inquiry_date,upcoming_date,course,feedback,intrested} = req.body
     if(checkDate(inquiry_date,upcoming_date)){
        return res.status(403).json({ message: 'Bad request', ok: false })
     }
        let addedBy;
        if (isAdmin.verified) {
            addedBy=isAdmin.data.uid
        }
        if (isManager.verified) {
            addedBy=isManager.data.uid
        }
        if (isEmployee.verified) {
            addedBy=isEmployee.data.uid
        }

        const rowcount =await query(`INSERT INTO inquires(
             fname, lname, contact, email, refrence, branch, inquiry_date, upcoming_date, course, feedback, addedby, intrested
             )
         VALUES (
            '${fname.toString()}',
            '${lname.toString()}',
            '${contact.toString()}',
            '${email.toString()}',
            '${refrence.toString()}',
            '${Number(branchid)}',
            '${inquiry_date.toString()}',
            '${upcoming_date.toString()}',
            '${course.toString()}',
            '${feedback.toString()}',
            '${Number(addedBy)}',
            '${intrested.toString()}')`)

            if (rowcount.affectedRows==1) {

                sendMailTo(email,`Your next inquiry will be on ${upcoming_date}`)
                return res.status(200).json({ message: 'Successfully Added', ok: true })

            }else{
                return res.status(500).json({ message: "Server Error ", ok: false })
            }

    } catch (error) {
        return res.status(500).json({ message: error.message, ok: false })
    }

}
