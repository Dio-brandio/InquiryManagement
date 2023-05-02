import { splitToken ,checkCookie} from "./middleware"
const query = require('./dbconnect')
export default async function handler(req, res) {
    
    const token = splitToken(req.headers.cookie)
    const isAdmin = await checkCookie(token, "admin");
    
    if (req.method !== 'POST' || !req.body || !token ) {
        return res.status(403).json({ message: 'Bad request', ok: false })
    }
    if ( !isAdmin.verified ) {
        return res.status(401).json({ message: 'Not Authenticated', ok: false })
    }
    try {
        const { email, address, name ,contact} = req.body
        
        const rowcount = await query(`INSERT INTO branch( email,name, contact, address) 
            values('${email.toString()}',
            '${name.toString()}',
            '${contact.toString()}',
            '${address.toString()}')`)
            
            if (rowcount.affectedRows==1) {
                return res.status(200).json({ message: 'Successfully Created', ok: true })
            }else{
                return res.status(500).json({ message: "Server Error ", ok: false })
            }

    } catch (error) {
        return res.status(500).json({ message: error.message, ok: false })
    }

}
