import AdminAddUser from '@/pages/Admin/AddUser'
import { useRouter } from 'next/router'

const AdminUpdateUser = (props) => {
    const router = useRouter()
    const {id} = router.query
  return (
     <AdminAddUser isUpdate={true} id={id} {...props}/>
  )
}

export default AdminUpdateUser