import { splitToken ,checkCookie} from "./middleware"
const query = require('./dbconnect')
export default async function handler(req, res) {
    let branchId = req.query.id
    if (branchId==undefined) {
        branchId=null
    }else{
        branchId = parseInt(branchId)
    }
    const token = splitToken(req.headers.cookie)
    const isAdmin = await checkCookie(token, "admin");
    const isManager = await checkCookie(token, "manager");
    const isEmployee = await checkCookie(token, "employee");

    if ( !isAdmin.verified && !isManager.verified && !isEmployee.verified) {
        return res.status(401).json({ message: 'Not Authenticated', ok: false })
    }
    if (req.method !== 'GET' || !token || Number.isNaN(branchId )) {
        return res.status(403).json({ message: 'Bad request', ok: false })
    }
    try {
        if (isAdmin.verified) {
                const branches = await query(`call getAllBranchesByBranchId(${branchId})`)
                return res.status(200).json({ branches: branches, ok: true })
          
        }
        if (isManager.verified) {
            const branches = await query(`call getAllBranchesByBranchId(${isManager.data.branchid})`)
            return res.status(200).json({ branches: branches, ok: true })
        }
        if (isEmployee.verified) {
            const branches = await query(`call getAllBranchesByBranchId(${isEmployee.data.branchid})`)
            return res.status(200).json({ branches: branches, ok: true })
        }
       
    } catch (error) {
        return res.status(500).json({ message: error.message, ok: false })
    }

}
