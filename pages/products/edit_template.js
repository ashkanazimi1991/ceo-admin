import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import EditTemplate from '../../components/products/EditTemplate'
import { MainLink } from '../../components/BaseUrl/BaseUrl'

const index = ({templateList , id}) => {
  return (
    <Layout>
        <Head>
            <title>ویرایش باکس آیتم</title>
        </Head>
        <EditTemplate id={id} templateList={templateList} />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const { id } = context.query;
  const templateList = await axios.get(encodeURI(`${MainLink}/project/${id}`));



  const templateListResponse = templateList.data;
  return{
    props:{id , templateList: templateListResponse }
  }
}

export default index