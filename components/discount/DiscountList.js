import Link from 'next/link'
import React,{useState} from 'react'
import { useRouter } from 'next/router';
import axios from 'axios'
import { MainLink } from '../BaseUrl/BaseUrl'

//import modules
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as shamsi from 'shamsi-date-converter';
import ReactPaginate from 'react-paginate';


export default function DiscountList({discountList}) {

  const [pageCount, setPageCount] = useState(discountList.count / 20);

      //refresh page
  const router = useRouter();
  const refreshData = () => {
    const paginationNumber = router.query.page;
    router.replace(router.asPath);
  }

  const productDeleteHandler = (id , productName) =>{
    if (confirm(`آیا مطمعن هستید که تخفیف پاک شود`)) {
        axios.delete(`${MainLink}/discount_delete/${id}/`);
        toast.success("تخفیف با موفقیت حذف شد");
       setTimeout(() =>{
          refreshData();
       },2500)
    }
  }

  const handlePageClick = (event) =>{
    router.replace(`discount/?page=${event.selected + 1}`);
  }

  

  return (
    <div>
        <div className="col-md-12 grid-margin">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h4 className="card-title mb-0">لیست تخفیفات</h4>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-striped table-hover">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>تاریخ شروع</th>
                              <th> تاریخ پایان</th>
                              <th>عملیات</th>
                            </tr>
                          </thead>
                          <tbody>
                            {discountList.results.map(item =>
                                 <tr key={item.id}>
                                 <td>{item.id}</td>
                                 <td>{shamsi.gregorianToJalali(item.valid_from.split("-")).join("-")}</td>
                                 <td>{shamsi.gregorianToJalali(item.valid_to.split("-")).join("-")}</td>
                                 <td>
                                     <Link href={`/discount/edit_discount/?id=${item.id}`}><label className="badge badge-warning">ویرایش</label></Link>
                                     <label onClick={() => productDeleteHandler(item.id , item.name)} className="badge badge-danger">حذف</label>
                                 </td>
                               </tr>
                              )}
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
          forcePage={router.query.page ? Number(paginationNumber - 1) : 0}
          pageCount={pageCount}
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
  )
}

