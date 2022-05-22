import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import DiscountList from '../../components/discount/DiscountList'
import { MainLink } from '../../components/BaseUrl/BaseUrl'

export default function index({discountList}) {
    return (
        <Layout>
            <Head>
                <title>لیست تخفیف ها</title>
            </Head>
            <DiscountList discountList={discountList} />
        </Layout>
      )
    }
    
    export async function getServerSideProps(context){
      const {page} = context.query;
      const discountList = await axios.get(`${MainLink}/discount/list/?page=${page ? page : 1}`);
    
    
    
      const discountResponse = discountList.data;
      return{
        props:{discountList: discountResponse }
      }
}
