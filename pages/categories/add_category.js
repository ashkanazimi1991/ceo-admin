import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import { MainLink } from '../../components/BaseUrl/BaseUrl'
import AddCategory from '../../components/categories/AddCategory'

const index = ({categoriesList}) => {
  return (
    <Layout>
        <Head>
            <title>لیست دسته بندی ها</title>
        </Head>
        <AddCategory categoriesList={categoriesList} />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const categoriesList = await axios.get(`${MainLink}/categories-m4/`);



  const categoriesListResponse = categoriesList.data;
  return{
    props:{categoriesList: categoriesListResponse }
  }
}

export default index