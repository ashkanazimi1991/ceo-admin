import React from 'react'
import Head from 'next/head'

//import modules
import axios from 'axios'

//import components
import Layout from '../../components/layout/Layout'
import EditDiscount from '../../components/discount/EditDiscount'
import { MainLink } from '../../components/BaseUrl/BaseUrl'

const edit_discount = ({id , discountDetails , productsList}) =>{
    return (
        <Layout>
            <Head>
                <title>ایجاد تخفیف</title>
            </Head>
            <EditDiscount id={id} discountDetails={discountDetails} productsList={productsList} />
        </Layout>
      )
    }

export async function getServerSideProps(context){
    const { id } = context.query;
    const discountDetails = await axios.get(`${MainLink}/discount_detail/${id}/`);
    const productsList = await axios.get(`${MainLink}/products/`);

    
    
    const discountDetailsResponse = discountDetails.data;
    const productsListResponse = productsList.data;

    return{
        props:{id , discountDetails: discountDetailsResponse  , productsList:productsListResponse}
    }
}

export default edit_discount