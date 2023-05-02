import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'


export default async function middleware(req) {
  const { cookies } = req
  const ck = cookies.get('authtoken')?.value
  const isAdmin = await checkCookieAndRedirect("admin", ck)
  const isManager = await checkCookieAndRedirect("manager", ck)
  const isEmployee = await checkCookieAndRedirect("employee", ck)
  const userPath = isAdmin.verified ? "Admin" : isManager.verified ? "Manager" : "Employee"

  if (req.nextUrl.pathname.startsWith('/Admin')) {
    if (!isAdmin.verified) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }
  if (req.nextUrl.pathname.startsWith('/Manager')) {
    if (!isManager.verified) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }
  if (req.nextUrl.pathname.startsWith('/Employee')) {
    if (!isEmployee.verified) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }
  if (req.nextUrl.pathname.startsWith('/login')) {
    if (isAdmin.verified || isEmployee.verified || isManager.verified) {
      return NextResponse.redirect(new URL(`/${userPath}`, req.url))
    }
  }


}

export async function checkCookieAndRedirect(role, ck) {
  if (ck == undefined || ck == null || ck == ' ') {
    return {
      verified: false,
      data: ''
    }
  }
  if (ck) {
    const { payload } = await jwtVerify(ck, new TextEncoder().encode(process.env.JWT_SECRET)).catch((err) => {
      return {
        verified: false,
        data: ''
      }
    })
    if (payload == undefined) {
      return {
        verified: false,
        data: ''
      }
    }
    if (payload.role === role) {
      return {
        verified: true,
        data: payload
      }
    }
    else {
      return {
        verified: false,
        data: ''
      }
    }
  }
}

export function extractDataFeilds(formdata) {
  let apiData={}
  for (const key in formdata) {
    if (Object.hasOwnProperty.call(formdata, key)) {
      const feild = formdata[key].name;
      const value = formdata[key].value;
      apiData[`${feild}`] = value
    }
  }
  return apiData
}

