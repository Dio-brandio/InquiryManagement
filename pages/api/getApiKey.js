import { splitToken, checkCookie } from "./middleware"
import { v4 as uuidv4 } from 'uuid';
const query = require('./dbconnect')
export default async function handler(req, res) {

    const token = splitToken(req.headers.cookie)
    const isAdmin = await checkCookie(token, "admin");

    if (!isAdmin.verified) {
        return res.status(200).json({ message: 'Not Authenticated', ok: false })
    }
    if (req.method !== 'GET') {
        return res.status(403).json({ message: 'Bad request', ok: false })
    }
    try {
        const apiKey = uuidv4()
        const rowcount =await query(`call apiKeyAssign('${isAdmin.data.uid}','${apiKey}')`)
            return res.status(200).json({ apiKey: apiKey, ok: true })
        
    } catch (error) {
        return res.status(500).json({ message: error.message, ok: false })
    }

}
