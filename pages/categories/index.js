import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import { MainLink } from '../../components/BaseUrl/BaseUrl'
import CategoriesList from '../../components/categories/CategoriesList'

const index = ({categoriesList}) => {
  return (
    <Layout>
        <Head>
            <title>لیست دسته بندی ها</title>
        </Head>
        <CategoriesList categoriesList={categoriesList} />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const {page} = context.query;
  const categoriesList = await axios.get(`${MainLink}/categories-m2/?page=${page ? page : 1}`);



  const categoriesListResponse = categoriesList.data;
  return{
    props:{categoriesList: categoriesListResponse }
  }
}

export default index