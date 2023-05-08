import AdminAddUser from '@/pages/Admin/AddUser'
import { useRouter } from 'next/router'

const AdminUpdateUser = (props) => {
    const router = useRouter()
    const {id} = router.query
  return (
     <AdminAddUser {...props} isUpdate={true} id={id} />
  )
}

export default AdminUpdateUser