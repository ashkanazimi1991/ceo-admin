import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import ProductsList from '../../components/products/ProductsList'
import { MainLink } from '../../components/BaseUrl/BaseUrl'

const index = ({productsList}) => {
  return (
    <Layout>
        <Head>
            <title>لیست محصولات</title>
        </Head>
        <ProductsList productsList={productsList} />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const {page} = context.query;
  const {search} = context.query;
  const productsList = await axios.get(encodeURI(`${MainLink}/products/?page=${page ? page : 1}&search=${search ? search : ' '}`));



  const productsResponse = productsList.data;
  return{
    props:{productsList: productsResponse }
  }
}

export default index