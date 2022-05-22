import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import TemplateList from '../../components/products/TemplateList'
import { MainLink } from '../../components/BaseUrl/BaseUrl'

const index = ({templateList}) => {
  return (
    <Layout>
        <Head>
            <title>لیست باکس آیتم</title>
        </Head>
        <TemplateList templateList={templateList} />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const {page} = context.query;
  const {search} = context.query;
  const templateList = await axios.get(encodeURI(`${MainLink}/projects/`));



  const templateListResponse = templateList.data;
  return{
    props:{templateList: templateListResponse }
  }
}

export default index