import { useRouter } from 'next/router'
import React from 'react'

const Searchbar = () => {
  const router= useRouter()

  return (
    <>
      <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl top-2 z-index-sticky shadow-none " id="navbarBlur" data-scroll="true">
        <div className="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li className="breadcrumb-item text-sm text-white"><a className="opacity-5 text-white" href="">Role</a></li>
              <li className="breadcrumb-item text-sm active text-white" aria-current="page">{router.pathname.split('/')[1]}</li>
            </ol>
            <h6 className="font-weight-bolder mb-0 text-white">{router.pathname.split('/')[2]==undefined?"DashBoard":router.pathname.split('/').splice(2,3).join('/')}</h6>
          </nav>
          <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
            <div className="ms-md-auto pe-md-3 d-flex align-items-center">
              <div className="input-group">
                <span className="input-group-text text-body"><i className="ni ni-atom" ></i></span>
                <input type="text" className="form-control" placeholder="Type here..." />
              </div>
            </div>
            <ul className="navbar-nav ">
              <li className="nav-item  ps-3 d-flex align-items-center">
                <a className="nav-link text-white p-0 cursor-pointer " id="iconNavbarSidenav">
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line bg-white"></i>
                    <i className="sidenav-toggler-line bg-white"></i>
                    <i className="sidenav-toggler-line bg-white"></i>
                  </div>
                </a>
              </li>
              <li className="nav-item px-3 d-flex align-items-center">
                <a className="nav-link p-0 text-white">
                </a>
              </li>
              <li className="nav-item dropdown pe-2 d-flex align-items-center">
                <a href="" className="nav-link p-0 text-white" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Searchbar
