import React from 'react'
import Head from 'next/head'


//import components
import Layout from '../../components/layout/Layout'
import AddUser from '../../components/users/AddUser'

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

// export async function getServerSideProps(context) {
//   let parsedCookies = context.req.headers.cookie ? cookie.parse(context.req.headers.cookie) : false;
//   let token = parsedCookies ? parsedCookies.token : null;

//   if (token) {
//     const { page } = context.query;
//     const { search } = context.query;
//     const userList = await axios.get(encodeURI(`${MainLink}/user/?${page ? `page= ${page}` : null}&search=${search ? search : ''}`));
//     console.log(search);



//     const userListResponse = userList.data;
//     return {
//       props: { userlist: userListResponse }
//     }
//   } else {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//     }
//   }
// }

export default newUser
