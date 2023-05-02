import React, { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { extractDataFeilds } from '@/middleware';
import axios from 'axios';
import Head from 'next/head';


const updateUserApi = process.env.API_ROUTE + "updateUser/"
const addUserApi = process.env.API_ROUTE + "addUser"

const AddUserForm = ({ isUpdate, id, allbranches, isAdmin }) => {
  const [selectedUser, setSelectedUser] = useState({})
  const [branches, setbranches] = useState(null)
  const [loading, setLoading] = useState(isUpdate)
  const fnameRef = useRef()
  const lnameRef = useRef()
  const emailRef = useRef()
  const branchRef = useRef()
  const roleRef = useRef()
  const contactRef = useRef()
  const passwordRef = useRef()

  useEffect(() => {
    if ((id != null || id != undefined) && isUpdate) {

      const getUserByIdApi = process.env.API_ROUTE+`getAllUsers?id=${id}`
      const fethAllUsers = async () => {
        try {
          const fetcheddata = await axios.get(getUserByIdApi)
          if (fetcheddata.data.ok) {
            setSelectedUser(fetcheddata.data.users[0][0] == undefined ? {} : fetcheddata.data.users[0][0])
          }
          else {
            setSelectedUser({})
          }
        } catch(err) {
         setSelectedUser({})
        }

        setLoading(false)

      }
      fethAllUsers()

    }
    const setBranches = async () => {
      setbranches(await allbranches())

    }
    setBranches()
  }, [id])
  if (Object.keys(selectedUser).length > 0 && !loading) {
    fnameRef.current.value = selectedUser.fname
    lnameRef.current.value = selectedUser.lname
    contactRef.current.value = selectedUser.contact
    emailRef.current.value = selectedUser.email
    passwordRef.current.value = selectedUser.password
    branchRef.current.value = selectedUser.branchid
    roleRef.current.value = selectedUser.role
  }

  const addUserOrrUpdateUserApiCall = async (update) => {
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
    const formData = extractDataFeilds($("#adduserForm").serializeArray())
    const res = await axios.post(update ? updateUserApi + id : addUserApi, formData)
    try {
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
        if (!isUpdate) {
          $("#adduserForm").trigger("reset")
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
      toast.error("There Is Some Error In Server Side " + error.message, {
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
    for (let i = 0; i < $("#adduserForm input").length; i++) {
      const ele = $("#adduserForm input")[i];
      if (ele.type == "text" || ele.type == "email" || ele.type == "password" || ele.type == "number") {
        if ($(ele).val() == null || $(ele).val() == '' || $(ele).val() == ' ' || $(ele).val() == undefined) {
          ele.focus()
          return false
        }
      }
    }
    return true
  }
  if (Object.keys(selectedUser).length < 1 && !loading && isUpdate) {
    return (<>
      <Head>
        <title>404</title>
      </Head>
      <h2 className='text-secondary'>Not Available</h2>
    </>)
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

    {loading ? <p className='text-primary'>Loading...</p> : null}
    <Head>
      <title>{loading ? "Loading" : isUpdate ? "Edit-" + selectedUser.fname : "Add New User"}</title>
    </Head>
    <form className="form-card" id='adduserForm'>
      <div className="row">
        <div className="col-lg-3 col-sm-5 col-12 text-center">
          <div>
            <label className="form-label d-flex justify-content-center mt-2" htmlFor="">Id Proof
              Photo</label>
            <div className="d-flex justify-content-center mt-0 mb-4">
              <img src="/assets/img/team-4.jpg" className="rounded-circle w-100" alt="example placeholder" />
            </div>
            <div className="d-flex justify-content-center">
              <div className="btn btn-primary btn-rounded">
                <label className="form-label text-white m-1" htmlFor="customFile2">Choose file</label>
                <input type="file" className="form-control d-none" id="customFile2" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-12">

          <div className="row">
            <div className="col-lg-5 mb-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="">First name<span className="text-danger"> * </span></label>
                <input type="text" id="fname" className="form-control" name='fname' required
                  ref={fnameRef}
                />
              </div>
            </div>

            <div className="col-lg-5 mb-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="form6Example2">Last name<span className="text-danger"> * </span></label>
                <input type="text" id="lname" className="form-control" name='lname' required
                  ref={lnameRef}
                />
              </div>
            </div>

            <div className="col-lg-5 mb-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="form6Example2">Mobile<span className="text-danger"> * </span></label>
                <input type="text" id="contact" className="form-control"
                  name='contact'
                  ref={contactRef}
                />
              </div>
            </div>

            <div className="col-lg-5 mb-3">
              <div className="dropdown ">
                <div><label className="form-label" htmlFor="form6Example2">Branch<span className="text-danger">* </span></label>
                </div>
                <select className="form-select" aria-label="Default select example" name='branchid' id='branchid'
                  ref={branchRef}>
                  {branches ? branches.length >= 1 ? branches.map((branch) => {
                    return <option value={branch.id} key={branch.id}>
                      {branch.name}
                    </option>
                  }) : <p>No branches</p> : <option>Loading</option>}
                </select>
              </div>
            </div>

            <div className="col-lg-5 mb-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="">Email<span className="text-danger"> * </span></label>
                <input type="email" id="email" className="form-control" name='email' required
                  ref={emailRef} />
              </div>
            </div>

            <div className="col-lg-5 mb-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="">Password<span className="text-danger"> * </span></label>
                <input type="password" id="password" className="form-control" name='password'
                  ref={passwordRef} />
              </div>
            </div>

            <div className="col-lg-5 mb-3">
              <div className="dropdown mx-0">
                <div><label className="form-label" htmlFor="form6Example2">Role<span className="text-danger">* </span></label>
                </div>
                <select className="form-select" aria-label="Default select example" name='role'
                  id='role'
                  ref={roleRef}>
                  <option value="employee">Employee</option>
                  {isAdmin ? <option value="manager">Manager</option> : null}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col mt-2">
                <div className="">
                  <button type="button" onClick={() => { addUserOrrUpdateUserApiCall(isUpdate) }}
                    className="btn btn-primary btn-block mb-4" disabled={isUpdate && !(Object.keys(selectedUser).length > 0 && !loading)}>
                    {loading ? "Loading" : isUpdate ? Object.keys(selectedUser).length > 0 ? "Update" : "No User Found" : "Submit"}
                  </button>
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

export default AddUserForm