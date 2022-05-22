import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import { MainLink } from '../../components/BaseUrl/BaseUrl'
import EditUsers from '../../components/users/EditUsers'

const edit_users = ({id , userData}) => {
  return (
    <Layout>
        <Head>
            <title>ویرایش کاربران</title>
        </Head>
        <EditUsers id={id} userData={userData} />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const { id } = context.query;
  const userData = await axios.get(`${MainLink}/user/${id}/`);



  const userDataResponse = userData.data;
  return{
    props:{id: id , userData : userDataResponse }
  }
}

export default edit_users