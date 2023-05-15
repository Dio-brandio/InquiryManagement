import React from 'react'
import Loading from './Loading'
import useSWR from 'swr'
import axios from 'axios'

const fetchInquiryCountApi =process.env.API_ROUTE+"fetchInquiryCount" 
const totalUsersCountApi = process.env.API_ROUTE+"totalUsersCount"  
const Count = () => {
    const getStringDate=(date)=>{
        return new Date(date).toISOString().split('T')[0]
    }
    function subtractMonths(date, months) {
        date.setMonth(date.getMonth() - months);
        return date;
      }
    const totalCountfetcher = async()=>{
        const {data} =await axios.get(fetchInquiryCountApi)
        return data.counts[0]
      }
      const todayCountfetcher = async()=>{
        const {data} =await axios.get(fetchInquiryCountApi+'?sdate='+getStringDate(new Date()))
        return data.counts[0]
      }
      const MonthlyCountfetcher = async()=>{
        const {data} =await axios.get(fetchInquiryCountApi+'?sdate='+getStringDate(subtractMonths(new Date(),1)))
        return data.counts[0]
      }
      const totalUsersfetcher=async()=>{
        const {data} = await axios.get(totalUsersCountApi);
        return data.counts[0]

      }
     
  const totalCount =useSWR("fetchTotalCount",totalCountfetcher,{revalidate:true})
  const todayCount =useSWR("fetchTodayCount",todayCountfetcher,{revalidate:true})
  const MonthlyCount =useSWR("fetchMonthlyCount",MonthlyCountfetcher,{revalidate:true})
  const totalUsers =useSWR("fetchtotalUsers",totalUsersfetcher,{revalidate:true})
  if(!totalCount.data || !todayCount.data || !MonthlyCount.data || !totalUsers.data) return <Loading/> 
  if(totalCount.error || todayCount.error || MonthlyCount.error|| totalUsers.error) return <h1>There is error</h1> 
  
  return (
    <div className="row">
    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
      <div className="card">
        <div className="card-body p-3">
          <div className="row">
            <div className="col-8">
              <div className="numbers">
                <p className="text-sm mb-0 text-uppercase font-weight-bold">
                  Today's Inquires
                </p>
                <h5 className="font-weight-bolder">{todayCount.data[0].inquirycount}</h5>
            
              </div>
            </div>
            <div className="col-4 text-end">
              <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                <i
                  className="ni ni-money-coins text-lg opacity-10"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
      <div className="card">
        <div className="card-body p-3">
          <div className="row">
            <div className="col-8">
              <div className="numbers">
                <p className="text-sm mb-0 text-uppercase font-weight-bold">
                Monthly Inquiry
                </p>
                <h5 className="font-weight-bolder">{MonthlyCount.data[0].inquirycount}</h5>
              </div>
            </div>
            <div className="col-4 text-end">
              <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                <i
                  className="ni ni-world text-lg opacity-10"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
      <div className="card">
        <div className="card-body p-3">
          <div className="row">
            <div className="col-8">
              <div className="numbers">
                <p className="text-sm mb-0 text-uppercase font-weight-bold">
                  Total Inquires
                </p>
                <h5 className="font-weight-bolder">{totalCount.data[0].inquirycount}</h5>
                
              </div>
            </div>
            <div className="col-4 text-end">
              <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                <i
                  className="ni ni-paper-diploma text-lg opacity-10"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-sm-6">
      <div className="card">
        <div className="card-body p-3">
          <div className="row">
            <div className="col-8">
              <div className="numbers">
                <p className="text-sm mb-0 text-uppercase font-weight-bold">
                 Total  Users 
                </p>
                <h5 className="font-weight-bolder">{totalUsers.data[0].usercount}</h5>
                
              </div>
            </div>
            <div className="col-4 text-end">
              <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                <i
                  className="ni ni-cart text-lg opacity-10"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Count