import Link from 'next/link'
import React from 'react'

const Home = ({isAdmin}) => {
  return (
        <div className="container d-flex align-items-center justify-content-center" style={{height:'100vh !important'}}>
            <Link href={"/login"} className='btn btn-info btn-lg'>Login</Link>
        </div>
  )
}

export default Home
