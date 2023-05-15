import { useRouter } from 'next/router'
import { FiLogOut } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

const Searchbar = () => {
  const router = useRouter()
  const toggleNavbar = () => {
    $("#sidenav-main").toggleClass("left-100")
  }
  const toggleNotification = () => {
    $("#notification").toggleClass("show")
  }
const searchInquiry=(e)=>{
        const value = e.target.value.toLowerCase();
        $(".inquiry-card").filter(function () {
            $(this).toggle($(this).text().toLowerCase().includes(value))
        });
}
  const logout = () => {
    Cookies.remove("authtoken")
    toast.error('Logging Out', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setTimeout(() => {
      router.push('/login')
    }, 1000);
  }
  return (
    <>
      <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl top-2 z-index-sticky shadow-none " id="navbarBlur" data-scroll="true">
        <div className="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li className="breadcrumb-item text-sm text-white"><a className="opacity-5 text-white" href="">Role</a></li>
              <li className="breadcrumb-item text-sm active text-white" aria-current="page">{router.pathname.split('/')[1]}</li>
            </ol>
            <h6 className="font-weight-bolder mb-0 text-white">{router.pathname.split('/')[2] == undefined ? "DashBoard" : router.pathname.split('/').splice(2, 3).join('/')}</h6>
          </nav>
          <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
            <div className="ms-md-auto pe-md-3 d-flex align-items-center ">
              <div className="input-group my-2 my-sm-2 my-md-0">
                <span className="input-group-text text-body"><i className="ni ni-atom" ></i></span>
                <input type="text" className="form-control" placeholder="Type here..." onInput={searchInquiry}/>
              </div>
            </div>
            <div className="pe-md-3 d-flex align-items-center  position-relative">
              <a className="nav-link text-white p-0 cursor-pointer mx-3 fs-3" id="iconNavbarSidenav" onClick={toggleNavbar}>
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line bg-white"></i>
                  <i className="sidenav-toggler-line bg-white"></i>
                  <i className="sidenav-toggler-line bg-white"></i>
                </div>
              </a>
              <FaUserAlt className='fs-5 text-white' onClick={toggleNotification} />
              <ul className="bg-dark dropdown-menu dropdown-menu-end px-2 position-absolute" id='notification' aria-labelledby="dropdownMenuButton" data-bs-popper="static">
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md">
                    <div className="d-flex py-1">
                      <div className="my-auto">
                        <span className="nav-link-text text-white cursor-pointer d-flex gap-3" onClick={logout}>
                          <FiLogOut className='fs-4 text-white'/>
                          Logout
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

          </div>


        </div>
      </nav>
    </>
  )
}

export default Searchbar
