import useSWR from 'swr'
import Loading from './Loading';
import axios from 'axios';
const InquiryInfo = ({ iid }) => {

    if (iid != undefined || iid != null) {
        const fetchInquiry = async () => {
            const { data } = await axios.get(process.env.API_ROUTE + "getAllInquires?id=" + iid)
            return data.inquires[0]
        }
        const { data, error } = useSWR("getSingleInquiry", fetchInquiry)
        if (!data) return <Loading />
        if (error) return <h1>Error :- {error.message}</h1>
        if (data.length<1) return <h1>No Inquires</h1>
        const feilds = Object.keys(data[0])
        const Values = Object.values(data[0])
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="card h-100">
                            <div className="card-header pb-0 p-3">
                                <div className="row">
                                    <div className="col-6 d-flex align-items-center">
                                        <h2 className="mb-0 text-capitalize">{data[0].fname + " " + data[0].lname}  </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-3 pb-0">
                                <ul className="list-group">
                                    {feilds.length > 0 ? feilds.map((field, index) => {
                                        return (field != "id" && field != "addedby" && field != "branch") ?
                                            <li className="list-group-item border-0 d-flex gap-5 ps-2 mb-2 border-radius-lg" key={index}>
                                                <p className="mb-1 text-dark fs-5 font-weight-bold text-capitalize">{field} :-</p>
                                                <div className="d-flex align-items-center fs-5">
                                                    {(field=="inquiry_date" ||field=="upcoming_date" ||field=="created_at")?Values[index].split("T")[0]+" : "+Values[index].split("T")[1]:Values[index]}
                                                </div>
                                            </li> : null
                                    }) :
                                        <h1>There Is No Inquiry</h1>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }



}

export default InquiryInfo