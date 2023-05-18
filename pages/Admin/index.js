import Layout from "@/components/Layout";
import Head from "next/head";
import axios from 'axios';
import InquiryCard from '@/components/InquiryCard';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import Count from "@/components/Count";

const allInquiresApi = process.env.API_ROUTE+'getAllInquires'
export default function AdminHome(props) {
  
  const fetcher = async()=>{
        const data =await axios.get(allInquiresApi)
        return (data.data.inquires[0])
      }
  const {data,error} =useSWR(['fetchInquiry', props.userPath],fetcher,{revalidate:true}) 
  if (error) return(<h3>There is Some Error </h3>)
  
  return (
    <>
      <Head>
        <title>Inqury app</title>
      </Head>
      <Layout>
     
       <Count/>
        <div className="row p-3">
        {!data?<Loading/>:
        data.map((item) => {
            return <InquiryCard item={item} key={item.id} {...props}/>
          })}
        </div>
      </Layout>
    </>
  );
}
