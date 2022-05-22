import React, { useState, useEffect, useRef } from "react";
import { MainLink } from "../BaseUrl/BaseUrl";
import { useRouter } from "next/router";

//import styles
import styles from "./orders.module.css";

//import modules
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as shamsi from "shamsi-date-converter";

const EditOrder = ({ id, ordersDetails }) => {
  const redirect = useRouter();
  const [data, setData] = useState({
    id: [],
    ownerId: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    state: "",
    city: "",
    address: "",
    plate: "",
    zipCode: "",
    is_admin: false,
    is_oprator: false,
    payment_date: "",
    payment_status: "",
    total_price: "",
    confirmation: false,
  });

  useEffect(() => {
    setData({
      ...data,
      id: ordersDetails.data_1.products,
      ownerId: ordersDetails.data_1.owner.id,
      username: ordersDetails.data_1.owner.username,
      email: ordersDetails.data_1.owner.email,
      firstName: ordersDetails.data_1.owner.first_name,
      lastName: ordersDetails.data_1.owner.last_name,
      state: ordersDetails.data_1.owner.state,
      city: ordersDetails.data_1.owner.city,
      address: ordersDetails.data_1.owner.address,
      plate: ordersDetails.data_1.owner.plate,
      zipCode: ordersDetails.data_1.owner.zip_code,
      is_admin: ordersDetails.data_1.owner.is_admin,
      is_oprator: ordersDetails.data_1.owner.is_operator,
      payment_date: ordersDetails.data_1.payment_date,
      payment_status: ordersDetails.data_1.payment_status,
      total_price: ordersDetails.data_1.total_price,
      confirmation: ordersDetails.data_1.confirmation,
    });
  }, []);

  const checkboxHandler = (event) => {
    setData({ ...data, confirmation: event.target.checked });
  };
  const statusHandler = (event) => {
    setData({ ...data, payment_status: event.target.value });
  };

  const sendData = () => {
    axios
      .put(`${MainLink}/order/${id}/`, {
        products: data.id,
        confirmation: data.confirmation,
        owner: data.ownerId,
        payment_status: data.payment_status,
      })
      .then((response) => {
        if (response) {
          toast.success("تغییرات با موفقیت ثبت شد");
          setTimeout(() => {
            redirect.push("/orders");
          }, 2500);
        }
      })
      .catch((error) => {
        toast.error("موارد وارد شده صحیح نمیباشد");
        // console.log(error.response.data);
      });
  };

  return (
    <div className="col-md-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">ایجاد کاربر</h4>
          <div className="forms-sample">
            <div className={styles.container}>
              <div className="form-group">
                <label htmlFor="usernameInput">نام کاربری</label>
                <input
                  disabled
                  type="text"
                  className="form-control form-control-lg"
                  id="usernameInput"
                  placeholder="نام کاربری"
                  value={data.username}
                />
              </div>
              <div className="form-group">
                <label htmlFor="emailInput">ایمیل </label>
                <input
                  disabled
                  type="text"
                  className="form-control form-control-lg"
                  id="emailInput"
                  placeholder="ایمیل"
                  value={data.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nameInput">نام </label>
                <input
                  disabled
                  type="text"
                  name="firstName"
                  className="form-control form-control-lg"
                  id="nameInput"
                  placeholder="نام "
                  value={data.firstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="familiyNameInput">نام خانوادگی</label>
                <input
                  disabled
                  type="text"
                  className="form-control form-control-lg"
                  id="familiyNameInput"
                  placeholder="نام خانوادگی"
                  value={data.lastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="stateInput"> استان</label>
                <input
                  disabled
                  type="text"
                  className="form-control form-control-lg"
                  id="stateInput"
                  placeholder=" استان"
                  value={data.state}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cityInput"> شهر</label>
                <input
                  disabled
                  type="text"
                  className="form-control form-control-lg"
                  id="cityInput"
                  placeholder=" شهر"
                  value={data.city}
                />
              </div>
              <div className="form-group">
                <label htmlFor="addressInput"> آدرس</label>
                <input
                  disabled
                  type="text"
                  className="form-control form-control-lg"
                  id="addressInput"
                  placeholder=" آدرس"
                  value={data.address}
                />
              </div>
              <div className="form-group">
                <label htmlFor="plateInput"> پلاک</label>
                <input
                  disabled
                  type="text"
                  className="form-control form-control-lg"
                  id="plateInput"
                  placeholder=" پلاک"
                  value={data.plate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCodeInput">کد پستی</label>
                <input
                  disabled
                  type="text"
                  className="form-control form-control-lg"
                  id="zipCodeInput"
                  placeholder=" کد پستی"
                  value={data.zipCode}
                />
              </div>
              <div className="form-group">
                <label htmlFor="priceTotalInput">قیمت کل</label>
                <input
                  disabled
                  type="text"
                  className="form-control form-control-lg"
                  id="priceTotalInput"
                  placeholder=" کد پستی"
                  value={data.total_price}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmationInput">وضعیت پرداخت</label>
                <input
                  disabled
                  type="text"
                  className="form-control form-control-lg"
                  id="confirmationInput"
                  placeholder=" کد پستی"
                  value={data.payment_status == "p" ? "پرداخت شده" : "مرجوعی"}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateInput">تاریخ</label>
                <input
                  disabled
                  type="text"
                  className="form-control form-control-lg"
                  id="dateInput"
                  placeholder=" کد پستی"
                  value={shamsi
                    .gregorianToJalali(data.payment_date.split("-"))
                    .join("-")}
                />
              </div>
            </div>
            <h4 className="card-title">محصولات خرید شده</h4>
            {ordersDetails.data_2.map((item) => (
              <>
                <div key={item.id} className="form-group">
                  <label htmlFor="nameInput">نام محصول</label>
                  <input
                    disabled
                    type="text"
                    className="form-control form-control-lg"
                    id="nameInput"
                    placeholder="نام کاربری"
                    value={item.product.name}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="priceInput">قیمت محصول </label>
                  <input
                    disabled
                    type="text"
                    className="form-control form-control-lg"
                    id="priceInput"
                    placeholder="ایمیل"
                    value={item.product_price}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantityInput">تعداد انتخاب شده </label>
                  <input
                    disabled
                    type="text"
                    className="form-control form-control-lg"
                    id="quantityInput"
                    placeholder="نام "
                    value={item.quantity}
                  />
                </div>
                <hr />
              </>
            ))}
            <div className="form-group">
              <label htmlFor="exampleInputCategory">دسته بندی</label>
              <select
                name="category"
                id="exampleInputCategory"
                className="form-control form-control-lg"
                onChange={(e) => statusHandler(e)}
              >
                {data.payment_status === "p" ? (
                  <option selected hidden value={"p"}>
                    پرداخت موفق
                  </option>
                ) : (
                  <option selected hidden value={"r"}>
                    مرجوعی
                  </option>
                )}
                <option value={"p"}>پرداخت موفق</option>
                <option value={"r"}>مرجوعی</option>
              </select>
            </div>
            <div className="form-check form-check-flat">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={checkboxHandler}
                  name="confirmation"
                  checked={data.confirmation}
                  value={data.confirmation}
                />{" "}
                تایید شده ؟ <i className="input-helper"></i>
              </label>
            </div>
            <button onClick={sendData} className="btn btn-success mr-2">
              ثبت
            </button>
            <button className="btn btn-light">انصراف</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditOrder;
