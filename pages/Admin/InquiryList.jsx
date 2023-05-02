import DataTableList from '@/components/DataTableList'
import Layout from '@/components/Layout'
import Head from 'next/head'
import React,{Suspense} from 'react'

const getAllInquiry = process.env.API_ROUTE+"getAllInquires"
const AdminInquiryList = (props) => {
    return (
        <div>
            <Head>
                <title>List Of Inquires</title>
            </Head>
            <Layout>

                <div className="row ">
                    <div className="col-12 my-5">
                        <div className="card rounded">
                            <div className="card-header text-center p-3">
                                <h3 className="mb-0">List Of Inquires</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 my-5">
                    <div className="card rounded">
                            <div className="card-header text-center p-3">
                              <DataTableList tableid={"inquiryTable"} api={getAllInquiry} 
                                     apifield ={"inquires"}
                                    columns={["id","fname","lname","contact","email","refrence","inquiry_date","upcoming_date","course","created_at","intrested","branchname"]}
                                    {...props}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

        </div>
    )
}

export default AdminInquiryList