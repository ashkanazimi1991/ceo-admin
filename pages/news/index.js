import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import { MainLink } from '../../components/BaseUrl/BaseUrl'
import NewsList from '../../components/news/NewsList'

const index = ({newsList}) => {
  return (
    <Layout>
        <Head>
            <title>لیست اخبار</title>
        </Head>
        <NewsList newsList={newsList} />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const {page} = context.query;
  const {search} = context.query;
  const newsList = await axios.get(encodeURI(`${MainLink}/news/?page=${page ? page : 1}&search=${search ? search : ''}`));



  const newsListResponse = newsList.data;
  return{
    props:{newsList: newsListResponse }
  }
}

export default index