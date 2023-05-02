import Script from 'next/script'
import React from 'react'

const AllScripts = () => {
  return (
  <>
    <Script defer src="http://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js" />
    {/* <Script defer src='@/styles/assets/js/navbar.js'></Script> */}
  </>
  )
}

export default AllScripts