import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { extractDataFeilds } from '@/middleware'
import axios from 'axios'
import Head from 'next/head';

const addInquiryApi = process.env.API_ROUTE+'addInquiry';
const updateInquiryApi = process.env.API_ROUTE+'updateInquiry/';

const AddInquiryForm = ({ isUpdate, id, allbranches }) => {

  const [selectedInquiry, setselectedInquiry] = useState({})
  const [branches, setbranches] = useState(null)
  const [loading, setLoading] = useState(isUpdate)

  const fnameRef = useRef()
  const lnameRef = useRef()
  const emailRef = useRef()
  const branchRef = useRef()
  const refrenceRef = useRef()
  const contactRef = useRef()
  const inquiry_date_Ref = useRef()
  const upcoming_date_Ref = useRef()
  const coursesRef = useRef()
  const intrestedRef = useRef()
  const feedbackRef = useRef()

  useEffect(() => {
    if ((id != null || id != undefined) && isUpdate) {
      const getUserByIdApi = process.env.API_ROUTE+`getAllInquires?id=${id}`
      const fetchAllInquires = async () => {
        const parse = await fetch(getUserByIdApi)
        const data = await parse.json()
        if (data.ok) {
          setselectedInquiry(data.inquires[0].length<1 ? {} : data.inquires[0][0])
        }
        else{
          setselectedInquiry({})
        }
        setLoading(false)
      }
      fetchAllInquires()
    }
    const setBranches = async () => {
      setbranches(await allbranches())
    }
    setBranches()
  }, [id])
  if (Object.keys(selectedInquiry).length>0 && isUpdate) {
    fnameRef.current.value = selectedInquiry.fname
    lnameRef.current.value = selectedInquiry.lname
    emailRef.current.value = selectedInquiry.email
    branchRef.current.value = selectedInquiry.branch
    refrenceRef.current.value = selectedInquiry.refrence
    contactRef.current.value = selectedInquiry.contact
    inquiry_date_Ref.current.value = selectedInquiry.inquiry_date.split('T')[0]
    upcoming_date_Ref.current.value = selectedInquiry.upcoming_date.split('T')[0]
    coursesRef.current.value = selectedInquiry.course
    intrestedRef.current.value = selectedInquiry.intrested
    feedbackRef.current.value = selectedInquiry.feedback
  }
  const addOrUpdateInquiryApiCall = async () => {
    if (!formValidation()) {
      toast.warn('Fill All The Required Values !', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return
    }
    const formData = extractDataFeilds($("#addInquiryForm").serializeArray())
    console.log(formData);
    if (dateValidation(formData.inquiry_date, formData.upcoming_date)) {
      toast.warn('Dates Are in Wrong order !', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return
    }
    try {
      const res = await axios.post(isUpdate ? updateInquiryApi + id : addInquiryApi, formData)
      if (res.data.ok) {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(res);
        if (!isUpdate) {
          $("#addInquiryForm").trigger("reset")
        }
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("There Is Some Error  " + error.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
  const formValidation = () => {
    for (let i = 0; i < $("#addInquiryForm input").length; i++) {
      const ele = $("#addInquiryForm input")[i];
      if (ele.type == "text" || ele.type == "email" || ele.type == "password" || ele.type == "number") {
        if ($(ele).val() == null || $(ele).val() == '' || $(ele).val() == ' ' || $(ele).val() == undefined) {
          ele.focus()
          return false
        }
      }
    }
    return true
  }
  const dateValidation = (start, end) => {
    return new Date(start) > new Date(end)
  }
  if (Object.keys(selectedInquiry).length < 1 && !loading && isUpdate){
    return( <h2 className='text-secondary'>Not Available</h2> )
  }
  return (<>
    <ToastContainer
      position="top-center"
      autoClose={1000}
      limit={1}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="colored"
    />
    {loading?<p className='text-primary'>Loading...</p>:null}
    <Head>
      <title>{loading?"Loading":isUpdate?selectedInquiry.fname+"-Inquiry":"Add New Inquiry"}</title>
    </Head>
    <form className="form-card" id='addInquiryForm'>
      <div className="row">
        <div className="col-3">
          <div>
            <label className="form-label d-flex justify-content-center mt-2" htmlFor="form6Example1">Id Proof
              Photo</label>
            <div className="d-flex justify-content-center mt-0 mb-4">
              <img src="/assets/img/team-2.jpg" className="rounded-circle w-100" alt="example placeholder" />
            </div>

            <div className="d-flex justify-content-center">
              <div className="btn btn-primary btn-rounded">
                <label className="form-label text-white m-1" htmlFor="customFile2">Choose file</label>
                <input type="file" className="form-control d-none" id="customFile2" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-9">
          <div className="row">
            <div className="col-5 mb-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="fname">First name<span className="text-danger"> *</span></label>
                <input type="text" id="fname" name='fname' ref={fnameRef} className="form-control" />
              </div>
            </div>

            <div className="col-5 mb-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="lname">Last name<span className="text-danger"> *</span></label>
                <input type="text" id="lname" name='lname' ref={lnameRef} className="form-control" />
              </div>
            </div>

            <div className="col-5 mb-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="contact">Mobile<span className="text-danger"> *</span></label>
                <input type="text" id="contact" name='contact' className="form-control" ref={contactRef} />
              </div>
            </div>

            <div className="col-5 mb-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="email">Email<span className="text-danger"> *</span></label>
                <input type="email" id="email" name='email' ref={emailRef} className="form-control" />
              </div>
            </div>

            <div className="col-5 mb-3">
              <div className="dropdown ">
                <div><label className="form-label" htmlFor="form6Example2">Reference By<span
                  className="text-danger">*</span></label>
                </div>
                <input type="text" id="reference" name='refrence' ref={refrenceRef} className="form-control" />
              </div>
            </div>

            <div className="col-5 mb-3">
              <div className="dropdown mx-0">
                <div><label className="form-label" htmlFor="form6Example2">Select Branch<span className="text-danger">*</span></label></div>
                <select className="form-select" aria-label="Default select example" name='branchid' id='branchid' ref={branchRef}>
                  {branches ? branches.length >= 1 ? branches.map((branch) => {
                    return <option value={branch.id} key={branch.id}>{branch.name}</option>
                  }) : null : <option>Loading...</option>}
                </select>
              </div>
            </div>

            <div className="col-5  mb-3">
              <label className="form-label" htmlFor="form6Example2">Inquiry Date<span className="text-danger"> *</span></label>
              <input type="date" id="inquiry_date" name='inquiry_date' className="form-control" ref={inquiry_date_Ref} />
            </div>

            <div className="col-5 mb-3">
              <label className="form-label" htmlFor="upcoming_date">Upcoming Date<span className="text-danger">
                *</span></label>
              <input type="date" id="upcoming_date" name='upcoming_date' className="form-control"
                onInput={() => {
                  dateValidation($('#inquiry_date').val(), $('#upcoming_date').val()) ? alert("wrong") : null
                }} ref={upcoming_date_Ref} />
            </div>

            <div className="col-5 mb-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="form6Example1">Courses<span className="text-danger"> *</span></label>
                <input type="text" id="course" name='course' className="form-control" ref={coursesRef} />
              </div>
            </div>

            <div className="col-5 mb-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="form6Example1">Feedback<span className="text-danger"> *</span></label>
                <textarea type="text" id="feedback" name='feedback' className="form-control" ref={feedbackRef}></textarea>
              </div>
            </div>
            <div className="col-5 mb-3">
              <div className="dropdown mx-0">
                <div>
                  <label className="form-label" htmlFor="form6Example2">
                    Intrested
                    <span className="text-danger">*</span>
                  </label>
                </div>
                <select className="form-select" aria-label="Default select example" name='intrested' id='intrested' ref={intrestedRef}>
                  <option value='yes' >Yes</option>
                  <option value='no' >No</option>
                  <option value='later' >later</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col mt-2">
                <div className="">
                  <button type="button" onClick={addOrUpdateInquiryApiCall} className="btn btn-primary btn-block mb-4"
                   disabled={isUpdate && !(Object.keys(selectedInquiry).length > 0 && !loading)}>
                  {loading ? "Loading" : isUpdate ? Object.keys(selectedInquiry).length > 0 ? "Update" : "No Inquiry Found" : "Submit"}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </>
  )
}

export default AddInquiryForm