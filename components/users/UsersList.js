import axios from 'axios'
import React,{useState , useEffect} from 'react'
import { MainLink } from '../BaseUrl/BaseUrl'
import Link from 'next/link'
import { useRouter } from 'next/router';


//import modules
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';


const UsersList = ({userlist}) => {

  const [pageCount, setPageCount] = useState(Math.round(userlist.count / 20));
  const [search, setSearch] = useState('');

    //refresh page
    const router = useRouter();
    const paginationNumber = router.query.page;
    const refreshData = () => {
      router.replace(router.asPath);
    }

    useEffect(() =>{
      setPageCount(Math.round(userlist.count / 20));
    },[userlist])


  const userDeleteHandler = (id , first_name) =>{
    if (confirm(`آیا مطمعن هستید که کاربر (${first_name}) پاک شود`)) {
        axios.delete(`${MainLink}/user/${id}/`);
        toast.success("کاربر با موفقیت حذف شد");
       setTimeout(() =>{
          refreshData();
       },2500)
    }
  }

  const handlePageClick = (event) =>{
    router.replace(`/users/?page=${event.selected ? event.selected +1 : 1}&search=${search}`);
  }

  const searchHandler = (event) =>{
      setSearch(event.target.value);
  }

  return (
    <div>
    <div className="col-md-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <div className="form-group">
                    <input type="text" name='username' className="form-control form-control-lg searchInput" placeholder="جستجو ..." value={search} onChange={searchHandler} />
                    <button className='serachBtn' onClick={handlePageClick}>جستجو</button>
                    </div>
                  <div className="d-flex justify-content-between">
                    <h4 className="card-title mb-0">لیست کاربران</h4>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>نام</th>
                          <th>نام خانوادگی</th>
                          <th>شماره تلفن</th>
                          <th>ایمیل</th>
                          <th>عملیات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userlist.results.map(item => 
                          <tr>
                            <td>{item.id}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>
                                <Link href={`/users/edit_users/?id=${item.id}`}><label className="badge badge-warning">ویرایش</label></Link>
                                <label onClick={() => userDeleteHandler(item.id , item.first_name)} className="badge badge-danger">حذف</label>
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




export default UsersList


