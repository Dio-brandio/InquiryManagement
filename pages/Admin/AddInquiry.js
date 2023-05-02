import {Suspense} from 'react'
import Layout from '@/components/Layout'
import Head from 'next/head'
import AddInquiryForm from '@/components/AddInquiryForm';




const AdminAddInquiry = (props) => {
   
    return (
        <>
            
            <Layout>
            
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header text-center pb-0 px-3">
                                <h3 className="mb-0">{props.isUpdate?"Update":"Add"} Inquiry</h3>
                            </div>

                            <div className="card-body p-3 d-flex align-items-center justify-content-center flex-column">
                               <Suspense 
                               fallback={<>"Loading..."</>}>
                                <AddInquiryForm {...props}/>
                               </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default AdminAddInquiry