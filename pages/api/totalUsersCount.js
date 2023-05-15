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
        const branchId = isAdmin.verified ? `null` : isManager.verified ? isManager.data.branchid : isEmployee.verified ? isEmployee.data.branchid : false
        console.log(branchId);
        if (!branchId) return res.status(403).json({ message: 'Bad request', ok: false })
        const counts = await query(`call getAllUsersCountByBranchId(${branchId})`)
        return res.status(200).json({ counts , ok: true })
       
    } catch (error) {
        return res.status(500).json({ message: error.message, ok: false })
    }

}
