import axios from 'axios'
import React,{useState} from 'react'

const CallApi = () => {
    const [loading, setLoading] = useState(false)
    const getApiKey =async()=>{
        setLoading(true)
        const response = await axios.get(process.env.API_ROUTE+"getApiHit",{
            headers:{
                api_key:"642957bb-2b90-4006-81be-7f41daa4f037"
            }
        })
        console.log(response.data);
        setLoading(false)
    }
  return (<>
    <div className="container d-flex align-items-center justify-content-center flex-column" style={{height:'100vh !important'}}>

        {loading?<h1>Loading...</h1>:null}
        <button onClick={getApiKey} className='btn btn-info btn-lg'> Call ApiKey</button>
    </div>
  </>
  )
}

export default CallApi