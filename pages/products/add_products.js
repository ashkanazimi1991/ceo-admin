import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import AddProducts from '../../components/products/AddProducts'
import { MainLink } from '../../components/BaseUrl/BaseUrl'


const add_products = ({categoriesList}) => {
  return (
    <Layout>
        <Head>
            <title>ایجاد محصول</title>
        </Head>
        <AddProducts categoriesList={categoriesList} />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const categories = await axios.get(`${MainLink}/categories-m2/`);



  const categoriesResponse = categories.data.results;
  return{
    props:{categoriesList: categoriesResponse }
  }
}


export default add_products