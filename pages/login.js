import { useRouter } from 'next/router'
import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
    const router = useRouter()
    const handleLogin = async () => {
        const email = $('#email').val().toString()
        const password = $('#password').val().toString()
        if (email.length < 0 || password.length < 0) {
            alert("Fill all the feilds")
            return
        }
try {
    const res = await axios.post(process.env.API_ROUTE+'login', { email, password },{
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin':'*'
          }
    })
    if (res.data.ok) {
        Cookies.set("authtoken", res.data.token)
        toast.success('Login In!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
            setTimeout(()=>{
                router.push('/Admin')
            },1000)
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
    toast.error("There Is Some Error In Server Side "+error.message , {
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
    return (
        <>
            <ToastContainer
               position="top-center"
               autoClose={1000}
               hideProgressBar
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="colored"
            />
            <main className="main-content mt-0 ps">
                <section>
                    <div className="page-header min-vh-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                                    <div className="card card-plain">
                                        <div className="card-header pb-0 text-start">
                                            <h4 className="font-weight-bolder">Sign In</h4>
                                            <p className="mb-0">Enter your email and password to sign in</p>
                                            Admin:admin@gmail.com
                                            Manager:mohit@managernikol
                                            employee:mukesh@employee
                                        </div>
                                        <div className="card-body">
                                            <form role="form">
                                                <div className="mb-3">
                                                    <input type="email" className="form-control form-control-lg" placeholder="Email" aria-label="Email" id='email' />
                                                </div>
                                                <div className="mb-3">
                                                    <input type="password" className="form-control form-control-lg" placeholder="Password" aria-label="Password" id='password' />
                                                </div>

                                                <div className="text-center">
                                                    <button type="button" onClick={handleLogin} className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0">Sign in</button>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                                    <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden bg-image-login">
                                        <span className="mask bg-gradient-primary opacity-6"></span>
                                        <h4 className="mt-5 text-white font-weight-bolder position-relative">"Attention is the new currency"</h4>
                                        <p className="text-white position-relative">The more effortless the writing looks, the more effort the writer actually put into the process.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Login
