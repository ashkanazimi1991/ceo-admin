import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import ReturnedList from '../../components/returned/ReturnedList'
import { MainLink } from '../../components/BaseUrl/BaseUrl'

const index = ({returnedList}) => {
  return (
    <Layout>
        <Head>
            <title>لیست مرجوعی</title>
        </Head>
        <ReturnedList returnedList={returnedList} />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const {page} = context.query;
  const {search} = context.query;
  const returnedList = await axios.get(`${MainLink}/refunds/?page=${page ? page : 1}&search=${search ? search : ''}`);


  const returnedListResponse = returnedList.data;
  return{
    props:{returnedList: returnedListResponse }
  }
}

export default index