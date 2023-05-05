import {Suspense} from 'react'
import Layout from '@/components/Layout'

import Head from 'next/head'

import AddUserForm from '@/components/AddUserForm';

const addUserApi = 'http://localhost:3000/api/addUser';
const updateUserApi = 'http://localhost:3000/api/updateUser/';

const AdminAddUser = (props) => {
    return (<>
        <Layout>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header text-center pb-0 px-3">
                            <h3 className="mb-0">
                                {props.isUpdate ? "Update User" : "Add User"}
                            </h3>
                        </div>
                        <div className="card-body pt-4 p-3 d-flex justify-content-center align-items-center flex-column">
                                    <AddUserForm {...props}/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    </>
    )
}

export default AdminAddUser

