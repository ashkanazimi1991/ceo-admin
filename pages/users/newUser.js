import React from 'react'
import Head from 'next/head'


//import components
import Layout from '../../components/layout/Layout'
import AddUser from '../../components/users/Adduser'

const newUser = () => {
  return (
    <Layout>
        <Head>
            <title>افزردن کاربر</title>
        </Head>
        <AddUser />
    </Layout>
  )
}

export default newUser
