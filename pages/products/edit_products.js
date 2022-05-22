import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import EditProducts from '../../components/products/EditProducts'
import { MainLink } from '../../components/BaseUrl/BaseUrl'


const edit_products = ({id , selectedProduct , categoriesList}) => {
  return (
    <Layout>
        <Head>
            <title>ویرایش محصول</title>
        </Head>
        <EditProducts id={id} selectedProduct={selectedProduct} categoriesList={categoriesList} />
    </Layout>
  )
}

export async function getServerSideProps(context){
    const { id } = context.query;


    //get data
    const categories = await axios.get(`${MainLink}/categories-m2-wp/`);
    const selectedProduct = await axios.get(`${MainLink}/products/rd/${id}/`);
  
    //response of data
    const categoriesResponse = categories.data;
    const selectedProductResponse = selectedProduct.data;


    return{
      props:{id: id , categoriesList: categoriesResponse  , selectedProduct: selectedProductResponse }
    }
  }
  


export default edit_products