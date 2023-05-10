import Link from 'next/link'
import React from 'react'

const InquiryCard = ({item,userPath}) => {
  return (
    <div className=" col-lg-4 col-md-6 inquiry-card  p-3 " key={item.id}>
    <div className="bg-white border border-dark-50 rounded px-4 py-1 ">
      <div className="project-box">
        <span className="badge badge-primary">Pending</span>
        <h4>{item.course.toUpperCase().slice(0,10)} ...</h4>
        <div className="d-flex align-items-center my-3">
          <img className="img-10 me-2 w-25 rounded"
            src="../assets/img/team-1.jpg"
            alt="image" />
          <div className="flex-grow-1 mb-0">
            <p className="fs-5mb-0">{item.fname} {item.lname}</p>
          </div>
        </div>
        <div className="flex-grow-1 mb-3">
          <p className="mb-0">{item.branchname}</p>
        </div>
        <hr className="hr bg-white" />
        <p>
          {item.feedback.slice(0,10)} ...
        </p>
        <div className="row details">
          <div className="col-6">
            <span>Inquiry date </span>
          </div>
          <div className="col-6 font-primary">{item.inquiry_date.split('T')[0]} </div>
          <div className="col-6">
            <span>Next Inquiry</span>
          </div>
          <div className="col-6 font-primary">{item.upcoming_date.split('T')[0]} </div>
          <div className="col-6">
            <span>Intrested</span>
          </div>
          <div className="col-6 font-primary">{item.intrested}</div>
        </div>
        <Link className="btn btn-primary mt-3" href={`${userPath}/inquiry/details/${item.id}`}>Details</Link>
      </div>
    </div>
  </div>
  )
}

export default InquiryCard