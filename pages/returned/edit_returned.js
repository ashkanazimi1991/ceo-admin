import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import Editreturned from '../../components/returned/Editreturned'
import { MainLink } from '../../components/BaseUrl/BaseUrl'

const index = ({id , returnedDetails}) => {
  return (
    <Layout>
        <Head>
            <title>ویرایش مرجوعی</title>
        </Head>
        <Editreturned id={id} returnedDetails={returnedDetails} />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const {id} = context.query;
  const returnedDetails = await axios.get(`${MainLink}/refunds/${id}/`);



  const returnedDetailsResponse = returnedDetails.data;
  return{
    props:{ id , returnedDetails: returnedDetailsResponse }
  }
}

export default index