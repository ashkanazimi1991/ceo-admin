//import modules
import React from "react";
import Head from "next/head";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <script src="/assets/vendors/js/vendor.bundle.base.js"></script>
        <script src="/assets/vendors/js/vendor.bundle.addons.js"></script>
        <script src="/assets/js/shared/off-canvas.js"></script>
        <script src="/assets/js/shared/misc.js"></script>
        <script src="/assets/js/demo_1/dashboard.js"></script>
      </Head>

      <div className="container-scroller">
        <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <div className="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
            <a className="navbar-brand brand-logo" href="index.html">
              <img src="/assets/images/logo.svg" alt="logo" />{" "}
            </a>
            <a className="navbar-brand brand-logo-mini" href="index.html">
              <img src="/assets/images/logo-mini.svg" alt="logo" />{" "}
            </a>
          </div>
          <div className="navbar-menu-wrapper d-flex align-items-center">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown d-none d-xl-inline-block user-dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="UserDropdown"
                  href="#"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    className="img-xs rounded-circle"
                    src="/assets/images/faces/face8.jpg"
                    alt="Profile image"
                  />{" "}
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right navbar-dropdown"
                  aria-labelledby="UserDropdown"
                >
                  <div className="dropdown-header text-center">
                    <img
                      className="img-md rounded-circle"
                      src="/assets/images/faces/face8.jpg"
                      alt="Profile image"
                    />
                    <p className="mb-1 mt-3 font-weight-semibold">
                      فرحان احمدی
                    </p>
                    <p className="font-weight-light text-muted mb-0">
                      farhan@gmail.com
                    </p>
                  </div>
                  <a className="dropdown-item">
                    خروج<i className="dropdown-item-icon ti-power-off"></i>
                  </a>
                </div>
              </li>
            </ul>
            <button
              className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
              type="button"
              data-toggle="offcanvas"
            >
              <span className="mdi mdi-menu"></span>
            </button>
          </div>
        </nav>
        <div className="container-fluid page-body-wrapper">
          <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
              <li className="nav-item nav-profile">
                <a href="#" className="nav-link">
                  <div className="profile-image">
                    <img
                      className="img-xs rounded-circle"
                      src="/assets/images/faces/face8.jpg"
                      alt="profile image"
                    />
                    <div className="dot-indicator bg-success"></div>
                  </div>
                  <div className="text-wrapper">
                    <p className="profile-name">فرحان احمدی</p>
                    <p className="designation">مدیریت سایت</p>
                  </div>
                </a>
              </li>
              <li className="nav-item nav-category">منو پنل ادمین</li>
              <li className="nav-item">
                <a className="nav-link">صفحه اصلی</a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#products"
                  aria-expanded="false"
                  aria-controls="products"
                >
                  <i className="menu-icon typcn typcn-coffee"></i>
                  <span className="menu-title">محصولات</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="products">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <Link href="/products/">
                        <a className="nav-link">لیست محصولات</a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href={"/products/add_products/"}>
                        <a className="nav-link">افزردن محصول</a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href={"/products/add_template/"}>
                        <a className="nav-link">افزردن باکس محصول</a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href={"/products/templateList/"}>
                        <a className="nav-link">لیست باکس محصول</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <Link href={"/orders/"}>
                  <a className="nav-link">سفارشات</a>
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#users"
                  aria-expanded="false"
                  aria-controls="users"
                >
                  <i className="menu-icon typcn typcn-coffee"></i>
                  <span className="menu-title">کاربران</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="users">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <Link href={"/users/"}>
                        <a className="nav-link">لیست کاربران</a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href={"/users/newUser"}>
                        <a
                          className="nav-link"
                          href="pages/ui-features/dropdowns.html"
                        >
                          افزردن کاربر
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <Link href={"/reports"}>
                  <a className="nav-link">گزارشات</a>
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#discount"
                  aria-expanded="false"
                  aria-controls="discount"
                >
                  <i className="menu-icon typcn typcn-coffee"></i>
                  <span className="menu-title">تخفیفات</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="discount">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <Link href={"/discount/"}>
                        <a className="nav-link">لیست تخفیفات</a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href={"/discount/add_discount"}>
                        <a
                          className="nav-link"
                          href="pages/ui-features/dropdowns.html"
                        >
                          افزردن تخفیف
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#categories"
                  aria-expanded="false"
                  aria-controls="categories"
                >
                  <i className="menu-icon typcn typcn-coffee"></i>
                  <span className="menu-title">دسته بندی</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="categories">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <Link href={"/categories"}>
                        <a
                          className="nav-link"
                          href="pages/ui-features/buttons.html"
                        >
                          لیست دسته بندی ها
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href={"/categories"}>
                        <a
                          className="nav-link"
                          href="pages/ui-features/dropdowns.html"
                        >
                          افزردن دسته بندی
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#news"
                  aria-expanded="false"
                  aria-controls="news"
                >
                  <i className="menu-icon typcn typcn-coffee"></i>
                  <span className="menu-title">اخبار</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="news">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <Link href={"/news"}>
                        <a
                          className="nav-link"
                          href="pages/ui-features/buttons.html"
                        >
                          لیست اخبار
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href={"/news/add_news"}>
                        <a
                          className="nav-link"
                          href="pages/ui-features/dropdowns.html"
                        >
                          افزردن خبر{" "}
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <Link href={"/returned/"}>
                  <a className="nav-link">لیست مرجوعی</a>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row page-title-header">
                <div className="col-12">
                  <div className="page-header">
                    <h4 className="page-title">اسم وب سایت</h4>
                  </div>
                </div>
              </div>

              {children}
            </div>
            <footer className="footer">
              <div className="container-fluid clearfix">
                <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
                  Copyright © 2019{" "}
                  <a href="http://www.bootstrapdash.com/" target="_blank">
                    Bootstrapdash
                  </a>
                  . All rights reserved.
                </span>
                <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                  Hand-crafted & made with{" "}
                  <i className="mdi mdi-heart text-danger"></i>
                </span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
