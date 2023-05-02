import React from 'react'
import AdminAddBranch from '@/pages/Admin/AddBranch'
import { useRouter } from 'next/router'

const AdminUpdateBranch = (props) => {
    const router = useRouter()
  const {id} = router.query
  return (
     <AdminAddBranch {...props} isUpdate={true} id={id}/>
  )
}

export default AdminUpdateBranch