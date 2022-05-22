import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import { MainLink } from '../../components/BaseUrl/BaseUrl'
import EditParentCategory from '../../components/categories/EditParentCategory'

const edit_parent_category = ({id , parentCategoriesList , categoriesList}) => {
  return (
    <Layout>
        <Head>
            <title>ویرایش دسته بندی ها</title>
        </Head>
        <EditParentCategory id={id} parentCategoriesList={parentCategoriesList} categoriesList={categoriesList} />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const { id } = context.query;
  const categoriesList = await axios.get(`${MainLink}/categories/${id}/`);
  const parentCategoriesList = await axios.get(`${MainLink}/categories-m3/`);



  const categoriesListResponse = categoriesList.data;
  const parentCategoriesListResponse = parentCategoriesList.data;
  return{
    props:{id: id , categoriesList: categoriesListResponse , parentCategoriesList: parentCategoriesListResponse }
  }
}

export default edit_parent_category