import AddBranchForm from '@/components/AddBranchForm';
import Layout from '@/components/Layout'
import Head from 'next/head'
import {Suspense} from 'react'






const AdminAddBranch = ({isUpdate,id}) => {
    return (
        <>
            <Head>
                <title>Inqury add</title>
            </Head>
            <Layout>
                <div className="row text-center">
                    <div className="col" style={{marginTop:`70px`}}>
                        <div className="card bg-white bg-branch">
                            <div className=" px-3 py-4">
                                <h3 className="mb-1 text-white">{isUpdate?"Edit Branch":"Add Branch"}</h3>
                            </div>
                            <div className="card-body d-flex flex-column justify-content-center align-items-center ">
                                    <AddBranchForm isUpdate={isUpdate} id={id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default AdminAddBranch