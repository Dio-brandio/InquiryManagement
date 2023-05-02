import DataTableList from '@/components/DataTableList'
import Layout from '@/components/Layout'
import Head from 'next/head'
import React,{Suspense} from 'react'

const getAllUsers = "http://localhost:3000/api/getAllUsers"
const AdminUserList = (props) => {
    return (
        <div>
            <Head>
                <title>List Of Users</title>
            </Head>
            <Layout>

                <div className="row">
                    <div className="col-12 my-5">
                        <div className="card rounded">
                            <div className="card-header text-center  p-3">
                                <h3 className="mb-0">List Of Users</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 my-5">
                    <div className="card rounded">
                            <div className="card-header text-center p-3">
                              <DataTableList tableid={"usersTable"} api={getAllUsers} 
                              apifield ={"users"} {...props}
                              columns={["id","fname","lname","email","contact","branchname","created_at","role","createdBy"]}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

        </div>
    )
}

export default AdminUserList