import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import AddTemplate from '../../components/products/AddTemplate'


const add_products = () => {
  return (
    <Layout>
        <Head>
            <title>ایجاد محصول</title>
        </Head>
        <AddTemplate />
    </Layout>
  )
}


export default add_products