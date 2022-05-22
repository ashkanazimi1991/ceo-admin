import React from 'react'
import Head from 'next/head'
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import OrderList from '../../components/order/OrderList'
import { MainLink } from '../../components/BaseUrl/BaseUrl'


const index = ({ordersList}) => {
  return (
    <Layout>
        <Head>
            <title>لیست سفارشات</title>
        </Head>
        <OrderList ordersList={ordersList} />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const {page} = context.query;
  const {search} = context.query;
  const ordersList = await axios.get(`${MainLink}/orders/?page=${page ? page : 1}&search=${search ? search : ''}`);



  const ordersListResponse = ordersList.data;
  return{
    props:{ordersList: ordersListResponse }
  }
}

export default index