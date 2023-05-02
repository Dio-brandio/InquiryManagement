import { splitToken, checkCookie } from "./middleware"
const query = require('./dbconnect')
export default async function handler(req, res) {

    const token = splitToken(req.headers.cookie)
    const isAdmin = await checkCookie(token, "admin");
    const isManager = await checkCookie(token, "manager");
    const isEmployee = await checkCookie(token, "employee");
    if (!isAdmin.verified && !isManager.verified && !isEmployee.verified) {
        return res.status(200).json({ message: 'Not Authenticated', ok: false })
    }
    if (req.method !== 'GET' || !token || isEmployee.verified) {
        return res.status(403).json({ message: 'Bad request', ok: false })
    }
    try {
        let id = req.query.id
        if (id==undefined) {
            id=null
        }
            if (isAdmin.verified) {
                const users = await query(`call getAllUsersBranchId(${isAdmin.data.branchid},${id})`)
                return res.status(200).json({ users: users, ok: true })
            }

            if (isManager.verified) {
                const users = await query(`call getAllUsersBranchId(${isManager.data.branchid},${id})`)
                return res.status(200).json({ users: users, ok: true })
            }
    } catch (error) {
        return res.status(500).json({ message: error.message, ok: false })
    }

}
