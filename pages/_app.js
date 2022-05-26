import '../styles/globals.css'

import AuthContextProvider from '../components/context/AuthContextProvider'
import { useRouter } from 'next/router';


function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    router.pathname == '/login' || router.pathname == '/login/loginConfirmation' || router.pathname == '/login/emailLogin' || router.pathname == '/login/emailLoginConfirmation'   ?
      <Component {...pageProps} />
      :
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
  )
}

export default MyApp
