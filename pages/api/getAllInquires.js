import { splitToken ,checkCookie} from "./middleware"
const query = require('./dbconnect')
export default async function handler(req, res) {
    
    const token = splitToken(req.headers.cookie)
    const isAdmin = await checkCookie(token, "admin");
    const isManager = await checkCookie(token, "manager");
    const isEmployee = await checkCookie(token, "employee");

    
    if ( !isAdmin.verified && !isManager.verified && !isEmployee.verified) {
        return res.status(401).json({ message: 'Not Authenticated', ok: false })
    }
    if (req.method !== 'GET' || !token ) {
        return res.status(403).json({ message: 'Bad request', ok: false })
    }
    try {
        let id = req.query.id
        if (id==undefined) {
            id=null
        }
        if (isAdmin.verified) {
            const inquires = await query(`call getAllInquiresByBranchId(${isAdmin.data.branchid},${id})`)
            return res.status(200).json({ inquires: inquires, ok: true })
        }
        if (isManager.verified) {
            const inquires = await query(`call getAllInquiresByBranchId(${isManager.data.branchid},${id})`)
            return res.status(200).json({ inquires: inquires, ok: true })
        }
        if (isEmployee.verified) {
            const inquires = await query(`call getAllInquiresByBranchId(${isEmployee.data.branchid},${id})`)
            return res.status(200).json({ inquires: inquires, ok: true })
        }
       
    } catch (error) {
        return res.status(500).json({ message: error.message, ok: false })
    }

}
