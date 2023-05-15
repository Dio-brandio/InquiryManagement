import React from 'react'
import { useRouter } from 'next/router'
import InquiryInfo from '@/components/InquiryInfo'
import Layout from '@/components/Layout'

const AdminViewInquiryDetails = (props) => {
    const router = useRouter()
    const { iid } = router.query
    return (
        <Layout>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <InquiryInfo {...props} iid={iid} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminViewInquiryDetails