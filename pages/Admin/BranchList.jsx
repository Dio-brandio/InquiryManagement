import DataTableList from '@/components/DataTableList'
import Layout from '@/components/Layout'
import Head from 'next/head'
import React,{Suspense} from 'react'

const getAllBranches = process.env.API_ROUTE+"getAllBranches"
const AdminBranchList = (props) => {
    return (
        <div>
            <Head>
                <title>List Of Branches</title>
            </Head>
            <Layout>

                <div className="row">
                    <div className="col-12 my-5">
                        <div className="card rounded">
                            <div className="card-header text-center p-3">
                                <h3 className="mb-0">List Of Branches</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 my-5">
                    <div className="card rounded">
                            <div className="card-header text-center p-3">
                                <Suspense fallback={"lading..."}>
                              <DataTableList tableid={"branchesTable"} api={getAllBranches} 
                              apifield ={"branches"} {...props}
                              columns={["id","name","email","contact","address","created_at"]}/>
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

        </div>
    )
}

export default AdminBranchList