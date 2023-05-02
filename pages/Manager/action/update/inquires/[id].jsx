import React from 'react'
import AdminAddInquiry from '@/pages/Admin/AddInquiry'
import { useRouter } from 'next/router'

const AdminUpdateInquiry = (props) => {
    const router = useRouter()
  const {id} = router.query
  return (
     <AdminAddInquiry {...props} isUpdate={true} id={id}/>
  )
}

export default AdminUpdateInquiry