
const query = require('./dbconnect')
export default async function handler(req, res) {
    
    try {
        const result = await query("select * from Orders");
        return res.json({result})
    } catch (error) {
        return res.json({error:error.message})
    }
  }
  