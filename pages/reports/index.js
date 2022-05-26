import React from 'react'
import Head from 'next/head'
import * as cookie from 'cookie'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import Reports from '../../components/reports/Reports'
import { MainLink } from '../../components/BaseUrl/BaseUrl'

const index = ({ totalGain, categoriesList }) => {
  return (
    <Layout>
      <Head>
        <title>گزارشتات</title>
      </Head>
      <Reports totalGain={totalGain} categoriesList={categoriesList} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  let parsedCookies = context.req.headers.cookie ? cookie.parse(context.req.headers.cookie) : false;
  let token = parsedCookies ? parsedCookies.token : null;


  const userStatus = await axios.get(`${MainLink}/user_t_d/`, {
    headers: {
      'Authorization': 'Token ' + token,
    }
  });

  if (userStatus.data.is_admin) {
    const totalGain = await axios.get(`${MainLink}/total_gains/`);
    const categoriesList = await axios.get(`${MainLink}/categories-m3/`);



    const totalGainResponse = totalGain.data;
    const categoriesListResponse = categoriesList.data;
    return {
      props: { categoriesList: categoriesListResponse, totalGain: totalGainResponse }
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }


}

export default index