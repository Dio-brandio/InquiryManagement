import React from 'react'
import axios from 'axios';
import { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { extractDataFeilds } from '@/middleware';
import Head from 'next/head';
import Loading from './Loading';
const addBranchApi = process.env.API_ROUTE + "addBranch";
const updateBranchApi = process.env.API_ROUTE + 'updateBranch/';
const AddBranchForm = ({ isUpdate, id }) => {
    const [selectedBranch, setSelectedBranch] = useState({})
    const [loading, setLoading] = useState(isUpdate)

 

    useEffect(() => {
        if (id != null && id != undefined && isUpdate) {
            console.log("use effect");
            const getBranchByIdApi = process.env.API_ROUTE + `getAllBranches?id=${id}`
            const setBranch = async () => {
                const parse = await fetch(getBranchByIdApi)
                const data = await parse.json()
                if (data.ok) {
                    setSelectedBranch(data.branches[0].length < 1 ? {} : data.branches[0][0])
                } else {
                    setSelectedBranch({})
                }
                setLoading(false)

            }
            setBranch()
        }

    }, [id])
    if (loading) {
        return <Loading/>
    }
  
    if (Object.keys(selectedBranch).length < 1 && !loading && isUpdate) {
        return (<h2 className='text-secondary'>Not Available</h2>)
    }
    const addOrUpdateBranchApiCall = async (update) => {
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

        const formData = extractDataFeilds($("#addBranchForm").serializeArray())
        try {
console.log(updateBranchApi + id);
            const res = await axios.post(update ? (updateBranchApi + id) : addBranchApi, formData)
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
                if (!update) {
                    $("#addBranchForm").trigger("reset")
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
        for (let i = 0; i < $("#addBranchForm input").length; i++) {
            const ele = $("#addBranchForm input")[i];
            if (ele.type == "text" || ele.type == "email" || ele.type == "password" || ele.type == "number") {
                if ($(ele).val() == null || $(ele).val() == '' || $(ele).val() == ' ' || $(ele).val() == undefined) {
                    ele.focus()
                    return false
                }
            }
        }
        return true
    }

    // const nameRef = useRef()
    // const numberRef = useRef()
    // const emailRef = useRef()
    // const addresRef = useRef()

    // if (Object.keys(selectedBranch).length > 0 && !loading) {
    //     nameRef.current.value = selectedBranch.name
    //     numberRef.current.value = Number(selectedBranch.contact)
    //     emailRef.current.value = selectedBranch.email
    //     addresRef.current.value = selectedBranch.address
    // }
    return (<>
        <Head>
            <title>{ isUpdate ?"Edit-"+selectedBranch.name  : "Add New Branch"}</title>
        </Head>
        <form className='row p-4 w-lg-50 w-100 p-4  rounded' id='addBranchForm'>

            <div className="form-outline d-flex  text-center mb-4  col-12">
                <input  type="text" id="name" className="form-control"
                    placeholder="Name" name='name'
                    defaultValue={selectedBranch?selectedBranch.name:null}
                />
            </div>

            <div className="form-outline d-flex  text-center mb-4  col-12">
                <input 
                defaultValue={selectedBranch?selectedBranch.contact:null}
                 type="number" name='contact' id="contact" className="form-control" placeholder="Mobile" />
            </div>

            <div className="form-outline d-flex  text-center mb-4  col-12">
                <input 
                 defaultValue={selectedBranch?selectedBranch.email:null}
                 type="email" name='email' id="email" className="form-control" placeholder="Branch Email" />
            </div>

            <div className="form-outline d-flex  text-center mb-4 col-12">
                <textarea 
                 defaultValue={selectedBranch?selectedBranch.address:null}
                 className="form-control" name='address' id="address" rows="4" placeholder="Enter Branch Address..."></textarea>
            </div>
            <div className="form-outline d-flex  justify-content-center col-12 ">
                <button type="button" onClick={() => { addOrUpdateBranchApiCall(isUpdate) }} className="btn btn-lg btn-primary  btn-block mb-4"
                    disabled={isUpdate && !(Object.keys(selectedBranch).length > 0 )}>
                    { isUpdate ? Object.keys(selectedBranch).length > 0 ? "Update" : "No Branch Found" : "Submit"}
                </button>
            </div>
        </form>
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
    </>
    )
}

export default AddBranchForm