import React, {  useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { extractDataFeilds } from '@/middleware';
import axios from 'axios';
import useSWR from 'swr';
import Head from 'next/head';
import Loading from './Loading';


const updateUserApi = process.env.API_ROUTE + "updateUser/"
const addUserApi = process.env.API_ROUTE + "addUser"

const AddUserForm = ({ isUpdate, id, allbranches, isAdmin }) => {
  // const [selectedUser, setSelectedUser] = useState({})
  // const [branches, setbranches] = useState(null)
  // const [loading, setLoading] = useState(isUpdate)
  let userData=null;
  
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
    console.log(update ? updateUserApi + id : addUserApi, formData);
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


  const fethAllUsers = async () => {
    const { data } = await axios.get(process.env.API_ROUTE + "getAllUsers?id="+id)
    return data.users[0][0]
  }
  const branchData = useSWR("fetchBranches",allbranches)
  if (isUpdate){
     userData = useSWR(['fetchuser', 'user', id], fethAllUsers,{revalidate:true})
    if (!userData.data) return <><Loading />  <Head><title>Loading...</title></Head></>
    if (userData.error) return <h3>Error:- {userData.error.message}</h3>

    if (Object.keys(userData.data).length< 1) {
      return (<>
        <Head>
          <title>404</title>
        </Head>
        <h2 className='text-secondary'>Not Available</h2>
      </>)
    }
    // if (Object.keys(userData.data).length > 0) {
    //   fnameRef.current.value = userData.data.fname
    //   lnameRef.current.value = userData.data.lname
    //   contactRef.current.value = userData.data.contact
    //   emailRef.current.value = userData.data.email
    //   passwordRef.current.value = userData.data.password
    //   branchRef.current.value = userData.data.branchid
    //   roleRef.current.value = userData.data.role
    // }
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

    <Head>
      <title>{isUpdate ? "Edit-" + userData.data.fname : "Add New User"}</title>
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
                  defaultValue={userData?userData.data.fname:null}
                />
              </div>
            </div>

            <div className="col-lg-5 mb-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="form6Example2">Last name<span className="text-danger"> * </span></label>
                <input type="text" id="lname" className="form-control" name='lname' required
                 defaultValue={userData?userData.data.lname:null}
                />
              </div>
            </div>

            <div className="col-lg-5 mb-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="form6Example2">Mobile<span className="text-danger"> * </span></label>
                <input type="text" id="contact" className="form-control"
                  name='contact'
                  defaultValue={userData?userData.data.contact:null}
                />
              </div>
            </div>

            <div className="col-lg-5 mb-3">
              <div className="dropdown ">
                <div><label className="form-label" htmlFor="form6Example2">Branch<span className="text-danger">* </span></label>
                </div>
                <select className="form-select" aria-label="Default select example" name='branchid' id='branchid'
                  defaultValue={userData?userData.data.branchid:null}
                >
                  {branchData.data? branchData.data.length >= 1 ? branchData.data.map((branch) => {
                    return <option value={branch.id} key={branch.id}>
                      {branch.name}
                    </option>
                  }) : <p>No branchData</p> : <option>Loading</option>}
                </select>
              </div>
            </div>

            <div className="col-lg-5 mb-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="">Email<span className="text-danger"> * </span></label>
                <input type="email" id="email" className="form-control" name='email' required
                 defaultValue={userData?userData.data.email:null}
                 />
              </div>
            </div>

            <div className="col-lg-5 mb-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="">Password<span className="text-danger"> * </span></label>
                <input type="password" id="password" className="form-control" name='password'
                 defaultValue={userData?userData.data.password:null} />
              </div>
            </div>

            <div className="col-lg-5 mb-3">
              <div className="dropdown mx-0">
                <div><label className="form-label" htmlFor="form6Example2">Role<span className="text-danger">* </span></label>
                </div>
                <select className="form-select" aria-label="Default select example" name='role'
                  id='role'
                  defaultValue={userData?userData.data.role:null}>
                  <option value="employee">Employee</option>
                  {isAdmin ? <option value="manager">Manager</option> : null}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col mt-2">
                <div className="">
                  <button type="button" onClick={() => { addUserOrrUpdateUserApiCall(isUpdate) }}
                    className="btn btn-primary btn-block mb-4" disabled={isUpdate &&userData && !(Object.keys(userData.data).length > 0)}>
                    { isUpdate && userData? Object.keys(userData.data).length > 0 ? "Update" : "No User Found" : "Submit"}
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