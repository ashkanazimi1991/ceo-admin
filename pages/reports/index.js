import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import Reports from '../../components/reports/Reports'
import { MainLink } from '../../components/BaseUrl/BaseUrl'

const index = ({totalGain , categoriesList}) => {
  return (
    <Layout>
        <Head>
            <title>گزارشتات</title>
        </Head>
        <Reports totalGain={totalGain} categoriesList={categoriesList} />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const totalGain = await axios.get(`${MainLink}/total_gains/`);
  const categoriesList = await axios.get(`${MainLink}/categories-m3/`);



  const totalGainResponse = totalGain.data;
  const categoriesListResponse = categoriesList.data;
  return{
    props:{categoriesList: categoriesListResponse , totalGain: totalGainResponse }
  }
}

export default index