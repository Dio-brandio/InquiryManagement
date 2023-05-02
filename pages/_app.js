import "@/styles/globals.css";
import "@/styles/assets/css/nucleo-icons.css" 
import "@/styles/assets/css/nucleo-svg.css" 
import "@/styles/assets/css/nucleo-svg.css"; 

import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";

const allBranchApi = process.env.API_ROUTE+'getAllBranches';

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const allbranches =async()=>{
    console.log("start fetching");
    const response = await fetch(process.env.API_ROUTE+"getAllBranches");
    const branches = await response.json();
    return branches.branches[0]
  }
  const isAdmin = router.pathname.includes("/Admin")
  const isManager = router.pathname.includes("/Manager")
  const isEmployee = router.pathname.includes("/Employee")
  let userPath;
  if (isAdmin) {
    userPath = "Admin"
  } else if (isManager) {
    userPath = "Manager"
  }
  else if (isEmployee) {
    userPath = "Employee"
  }
  const token = isAdmin || isManager || isEmployee ? Cookies.get('authtoken') : null;

  return (
    <>
      <Component 
      isAdmin={isAdmin} isManager={isManager} userPath={userPath} token={token} 
      allbranches={allbranches}
      isUpdate={false} id={null}
      {...pageProps} />
    </>
  );
}
