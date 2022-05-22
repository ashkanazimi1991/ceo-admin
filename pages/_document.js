// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="/assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css" />
        <link rel="stylesheet" href="/assets/vendors/iconfonts/ionicons/css/ionicons.css" />
        <link rel="stylesheet" href="/assets/vendors/iconfonts/typicons/src/font/typicons.css" />
        <link rel="stylesheet" href="/assets/vendors/iconfonts/flag-icon-css/css/flag-icon.min.css" />
        <link rel="stylesheet" href="/assets/vendors/css/vendor.bundle.base.css" />
        <link rel="stylesheet" href="/assets/vendors/css/vendor.bundle.addons.css" />
        <link rel="stylesheet" href="/assets/css/shared/style.css" />
        <link rel="stylesheet" href="/assets/css/demo_1/style.css" />
        <link rel="shortcut icon" href="/assets/images/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}