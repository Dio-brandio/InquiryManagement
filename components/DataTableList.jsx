import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import useSWR from 'swr';
import  DataTable  from 'react-data-table-component';
const DataTableList = ({ tableid, api, columns, apifield, userPath }) => {
    const getAllData = async () => {
        const data = await fetch(api)
        const resposnse = await data.json()
       
          return resposnse[`${apifield}`][0]
    }
     const {data , error} = useSWR(`get${apifield}`,getAllData)
     if (error) return <h3>There is some error :{error.message}</h3>
     if (!data) return <Loading/>
        
    const createTable = () => {
        const feilds = Object.keys(data[0])
        const columnsintable = []
        columns.forEach(((field, i) => {
            if (feilds.includes(field)) {
                if (field == "inquiry_date" || field == "upcoming_date" || field == "created_at" ) {
                    columnsintable.push({
                         name: field, selector: o => o[`${field}`].split("T")[0]+`<br>`+o[`${field}`].split("T")[1]
                    })
                } else {
                    columnsintable.push({ name: field, selector:row=>row[`${field}`] ,sortable:true })

                }
            }

        }))
        columnsintable.push({
            data: null, render: function (data, type, row) {
                return `<a target="_blank" href="/${userPath}/action/update/${apifield}/${data.id}" class="btn btn-info" >Edit</a>`
            }, title: "Action"
        })
       data.forEach(object => {
            feilds.forEach(((field) => {
                if (!columns.includes(field)) {
                    delete object[`${field}`];
                }
            }))
        });

      return columnsintable
    }
 
       const columnsintable= createTable()
       console.log(data);
    return (<>
            {!data ? <Loading/> : <div className="table-responsive">
                <DataTable columns={columnsintable} data={data} pagination className='table' id={tableid}/>
                </div>}
    </>
    )
}

export default DataTableList