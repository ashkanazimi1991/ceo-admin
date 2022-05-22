import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import { MainLink } from '../../components/BaseUrl/BaseUrl'
import AddNews from '../../components/news/AddNews'

const add_news = ({userList}) => {
  return (
    <Layout>
        <Head>
            <title>لیست اخبار</title>
        </Head>
        <AddNews userList={userList} />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const userList = await axios.get(`${MainLink}/user/ad-op/`);



  const userListResponse = userList.data;
  return{
    props:{userList: userListResponse }
  }
}

export default add_news