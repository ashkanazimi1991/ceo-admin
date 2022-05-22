import Link from 'next/link'
import React,{useState , useEffect} from 'react'
import { useRouter } from 'next/router';
import axios from 'axios'
import { MainLink } from '../BaseUrl/BaseUrl'

//import modules
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';



const TemplateList = ({templateList}) => {

//   const [pageCount, setPageCount] = useState(productsList.count / 20);
//   const [search, setSearch] = useState('');


  //refresh page
  const router = useRouter();
//   const paginationNumber = router.query.page;
  const refreshData = () => {
    router.replace(router.asPath);
  }

//   useEffect(() =>{
//     setPageCount(Math.round(productsList.count / 20));
//   },[productsList])

  const productDeleteHandler = (id , productName) =>{
    if (confirm(`آیا مطمعن هستید که محصول (${productName}) پاک شود`)) {
        axios.delete(`${MainLink}/project/${id}/`);
        toast.success("محصول با موفقیت حذف شد");
       setTimeout(() =>{
          refreshData();
       },2500)
    }
  }

//   const handlePageClick = (event) =>{
//     router.replace(`/products/?page=${event.selected ? event.selected +1 : 1}&search=${search}`);
//   }

//   const searchHandler = (event) =>{
//       setSearch(event.target.value);
//   }


  return (
    <div>
        <div className="col-md-12 grid-margin">
                  <div className="card">
                    <div className="card-body">
                    <div className="form-group">
                    <input type="text" name='username' className="form-control form-control-lg searchInput" placeholder="جستجو ..."  />
                    <button className='serachBtn' >جستجو</button>
                    </div>
                      <div className="d-flex justify-content-between">
                        <h4 className="card-title mb-0">لیست محصولات</h4>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-striped table-hover">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>نام آیتم</th>
                              <th>لینک</th>
                              <th>عملیات</th>
                            </tr>
                          </thead>
                          <tbody>
                            {templateList.map(item =>
                                 <tr key={item.id}>
                                 <td>{item.id}</td>
                                 <td>{item.title}</td>
                                 <td>{item.link}</td>
                                 <td>
                                     <Link href={`/products/edit_template/?id=${item.id}`}><label className="badge badge-warning">ویرایش</label></Link>
                                     <label onClick={() => productDeleteHandler(item.id , item.title)} className="badge badge-danger">حذف</label>
                                 </td>
                               </tr>
                              )}
                          </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className="styles.pagination">
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
        </div> */}
        <ToastContainer />
    </div>
  )
}

export default TemplateList