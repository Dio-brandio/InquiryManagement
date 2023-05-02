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

                    <div className="col">
                        <div className="card bg-white ">
                            <div className="card-header bg pb-1 px-3">
                                <h3 className="mb-1 ">{isUpdate?"Edit Branch":"Add Branch"}</h3>
                            </div>

                                  
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <Suspense fallback={<h1>Loading...</h1>}>
                                    <AddBranchForm isUpdate={isUpdate} id={id}/>
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default AdminAddBranch