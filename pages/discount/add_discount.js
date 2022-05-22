import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import AddDiscount from '../../components/discount/AddDiscount'
import { MainLink } from '../../components/BaseUrl/BaseUrl'

const add_discount = ({productsList}) =>{
    return (
        <Layout>
            <Head>
                <title>ایجاد تخفیف</title>
            </Head>
            <AddDiscount productsList={productsList} />
        </Layout>
      )
    }

export async function getServerSideProps(context){
    const productsList = await axios.get(`${MainLink}/products/`);

    
    
    const productsListResponse = productsList.data;
    return{
        props:{productsList: productsListResponse }
    }
}

export default add_discount