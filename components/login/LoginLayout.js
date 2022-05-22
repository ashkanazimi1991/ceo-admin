import Head from 'next/head'
import React from 'react'

//import styles
import styles from "./login.module.css"

//import modules
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginLayout = ({children}) => {
  return (
    <div>
        <Head>
        <link rel="stylesheet" href="/assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css" />
        <link rel="stylesheet" href="/assets/vendors/iconfonts/ionicons/css/ionicons.css" />
        <link rel="stylesheet" href="/assets/vendors/iconfonts/typicons/src/font/typicons.css" />
        <link rel="stylesheet" href="/assets/vendors/iconfonts/flag-icon-css/css/flag-icon.min.css" />
        <link rel="stylesheet" href="/assets/vendors/css/vendor.bundle.base.css" />
        <link rel="stylesheet" href="/assets/vendors/css/vendor.bundle.addons.css" />
        <link rel="stylesheet" href="/assets/css/shared/style.css" />
        <link rel="shortcut icon" href="/assets/images/favicon.png" />
        <script src="/assets/vendors/js/vendor.bundle.base.js"></script>
        <script src="/assets/vendors/js/vendor.bundle.addons.js"></script>
        <script src="/assets/js/shared/off-canvas.js"></script>
        <script src="/assets/js/shared/misc.js"></script>
        </Head>
        <div className={styles.container}>
        <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
            <div className="row w-100">
                <div className="col-lg-4 mx-auto">
                <div className="auto-form-wrapper">


                    {children}






                </div>
                <ul className="auth-footer">
                    <li>
                    <a href="#">Conditions</a>
                    </li>
                    <li>
                    <a href="#">Help</a>
                    </li>
                    <li>
                    <a href="#">Terms</a>
                    </li>
                </ul>
                <p className="footer-text text-center">copyright © 2018 Bootstrapdash. All rights reserved.</p>
                </div>
            </div>
            </div>
        </div>
        </div>
        <ToastContainer />
    </div>
    </div>
  )
}

export default LoginLayout