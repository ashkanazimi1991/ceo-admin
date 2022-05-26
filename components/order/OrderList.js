import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { MainLink } from "../BaseUrl/BaseUrl";

//import modules
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as shamsi from "shamsi-date-converter";
import ReactPaginate from "react-paginate";

const OrderList = ({ ordersList }) => {
  const [pageCount, setPageCount] = useState(ordersList.count / 20);
  const [search, setSearch] = useState("");

  //refresh page
  const router = useRouter();
  const paginationNumber = router.query.page;
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const productDeleteHandler = (id, order_id) => {
    if (confirm(`آیا مطمعن هستید که سفارش (${order_id}) پاک شود`)) {
      axios.delete(`${MainLink}/order/rd/${id}/`);
      toast.success("سفارش با موفقیت حذف شد");
      setTimeout(() => {
        refreshData();
      }, 2500);
    }
  };

  useEffect(() => {
    setPageCount(Math.round(ordersList.count / 20));
  }, [ordersList]);

  const handlePageClick = (event) => {
    router.replace(`orders/?page=${event.selected ? event.selected +1 : 1}&search=${search}`);
  };

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <div className="col-md-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div className="form-group">
              <input
                type="text"
                name="username"
                className="form-control form-control-lg searchInput"
                placeholder="جستجو ..."
                value={search}
                onChange={searchHandler}
              />
              <button className="serachBtn" onClick={handlePageClick}>
                جستجو
              </button>
            </div>
            <div className="d-flex justify-content-between">
              <h4 className="card-title mb-0">لیست سفارشات</h4>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>خریدار</th>
                    <th>قیمت</th>
                    <th>وضعیت پرداخت</th>
                    <th>تایید خرید</th>
                    <th>تاریخ</th>
                    <th>عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersList.results.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.owner.username}</td>
                      <td>{item.total_price}</td>
                      <td>
                        {item.payment_status == "p" ? (
                          <label
                            style={{ color: "white" }}
                            className="badge badge-success"
                          >
                            پرداخت شده
                          </label>
                        ) : (
                          <label className="badge badge-warning">مرجوعی</label>
                        )}
                      </td>
                      <td>
                        {item.confirmation ? (
                          <label
                            style={{ color: "white" }}
                            className="badge badge-success"
                          >
                            تایید شده
                          </label>
                        ) : (
                          <label className="badge badge-danger">
                            تایید نشده
                          </label>
                        )}
                      </td>
                      <td>
                        {shamsi
                          .gregorianToJalali(item.payment_date.split("-"))
                          .join("-")}
                      </td>
                      <td>
                        <Link href={`/orders/edit_order/?id=${item.order_id}`}>
                          <label className="badge badge-warning">ویرایش</label>
                        </Link>
                        <label
                          onClick={() =>
                            productDeleteHandler(item.id, item.order_id)
                          }
                          className="badge badge-danger"
                        >
                          حذف
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="styles.pagination">
        <ReactPaginate
          nextLabel="بعدی >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          forcePage={router.query.page ? Number(paginationNumber - 1) : 0}
          previousLabel="< قبلی"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderList;
