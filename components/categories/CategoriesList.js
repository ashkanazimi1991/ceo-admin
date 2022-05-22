import Link from 'next/link'
import React,{useState} from 'react'
import { useRouter } from 'next/router';
import axios from 'axios'
import { MainLink } from '../BaseUrl/BaseUrl'

//import modules
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';



const CategoriesList = ({categoriesList}) => {

  const [pageCount, setPageCount] = useState(categoriesList.count / 20);

    
  //refresh page
  const router = useRouter();
  const paginationNumber = router.query.page;
  const refreshData = () => {
    router.replace(router.asPath);
  }

  const categoriesDeleteHandler = (id , categoryName) =>{
    if (confirm(`آیا مطمعن هستید که دسته بندی (${categoryName}) پاک شود`)) {
        axios.delete(`${MainLink}/categories/${id}/`);
        toast.success("دسته بندی با موفقیت حذف شد");
       setTimeout(() =>{
          refreshData();
       },2500)
    }
  }

  const handlePageClick = (event) =>{
    router.replace(`categories/?page=${event.selected + 1}`);
  }

    return (
        <div>
            <div className="col-md-12 grid-margin">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h4 className="card-title mb-0">لیست محصولات</h4>
                          </div>
                          <div className="table-responsive">
                            <table className="table table-striped table-hover">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>نام دسته بندی</th>
                                  <th>موقعیت</th>
                                  <th>عملیات</th>
                                </tr>
                              </thead>
                              <tbody>
                                {categoriesList.results.map(item =>
                                <React.Fragment key={item.id}>
                                     <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>دسته بندی</td>
                                        <td>
                                            <Link href={`/categories/edit_parent_category/?id=${item.id}`}><label className="badge badge-warning">ویرایش</label></Link>
                                            <label onClick={() => categoriesDeleteHandler(item.id , item.name)} className="badge badge-danger">حذف</label>
                                        </td>
                                   </tr>
                                   {item.parent.map(subcategory =>
                                     <tr key={subcategory.id}>
                                       <td>{subcategory.id}</td>
                                       <td>{subcategory.name}</td>
                                       <td>زیرشاخه </td>
                                       <td>
                                            <Link href={`/categories/edit_parent_category/?id=${subcategory.id}`}><label className="badge badge-warning">ویرایش</label></Link>
                                            <label onClick={() => categoriesDeleteHandler(subcategory.id , subcategory.name)} className="badge badge-danger">حذف</label>
                                        </td>
                                    </tr>
                                       )}
                                   </React.Fragment>
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
      )
    }


export default CategoriesList