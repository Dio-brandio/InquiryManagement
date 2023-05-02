import { splitToken ,checkCookie} from "./middleware"
const query = require('./dbconnect')
export default async function handler(req, res) {
    const token = splitToken(req.headers.cookie)
    const isAdmin = await checkCookie(token, "admin");
    const isManager = await checkCookie(token, "manager");
    
    if (req.method !== 'POST' || !req.body || !token ) {
        return res.status(403).json({ message: 'Bad request', ok: false })
    }
    if ( !isAdmin.verified && !isManager.verified ) {
        return res.status(401).json({ message: 'Not Authenticated', ok: false })
    }
    try {
        const created_by = Number(isAdmin.verified?isAdmin.data.uid:isManager.verified?isManager.data.uid:null)
        const { email, password, fname, lname, branchid, role ,contact} = req.body
        
        const rowcount = await query(`insert into users (email,password,fname,lname,branchid,role,created_by,contact)
            values('${email.toString()}',
            '${password.toString()}',
            '${fname.toString()}',
            '${lname.toString()}',
            '${Number(branchid)}',
            '${role.toString()}',
            '${created_by}',
            '${contact}')`)
            if (rowcount.affectedRows==1) {
                return res.status(200).json({ message: 'Successfully Created', ok: true })
            }else{
                return res.status(500).json({ message: "Server Error ", ok: false })
            }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message, ok: false })
    }

}
