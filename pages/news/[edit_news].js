import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import { MainLink } from '../../components/BaseUrl/BaseUrl'
import EditNews from '../../components/news/EditNews'

const add_news = ({id , userList , newsItem}) => {
  return (
    <Layout>
        <Head>
            <title>ویرایش اخبار</title>
        </Head>
        <EditNews id={id} userList={userList} newsItem={newsItem} />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const {id} = context.query;
  const userList = await axios.get(`${MainLink}/user/ad-op/`);
  const newsItem = await axios.get(`${MainLink}/news/rd/${id}/`);



  const userListResponse = userList.data;
  const newsItemResponse = newsItem.data;
  return{
    props:{id , userList: userListResponse , newsItem: newsItemResponse}
  }
}

export default add_news