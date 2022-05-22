import React from 'react'
import Head from 'next/head'
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import EditOrder from '../../components/order/EditOrder'
import { MainLink } from '../../components/BaseUrl/BaseUrl'


const edit_order = ({id ,ordersDetails}) => {
  return (
    <Layout>
        <Head>
            <title>ویرایش سفارشات</title>
        </Head>
        <EditOrder id={id} ordersDetails={ordersDetails} />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const {id} = context.query;
  const ordersDetails = await axios.get(`${MainLink}/order/${id}/`);



  const ordersDetailsResponse = ordersDetails.data;
  return{
    props:{id ,ordersDetails: ordersDetailsResponse }
  }
}

export default edit_order