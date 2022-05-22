import React,{useState , useEffect} from 'react'
import Link from "next/link"
import { useRouter } from 'next/router';
import axios from 'axios'
import { MainLink } from '../BaseUrl/BaseUrl'

//import styles
import styles from "./report.module.css"

//import modules
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as shamsi from 'shamsi-date-converter';

const Reports = ({totalGain , categoriesList}) => {

    const [data , setData] = useState({
        totalGain: '',
        totalSell: '',
        category: '',
        startDate: '',
        endDate: '',
    });

    const [alertOpacity , setAlerOpacity] = useState(false)


    useEffect(() =>{
        setTimeout(() =>{
            setAlerOpacity(false);
        },4000)
    },[alertOpacity])



    const dateHandler = (event) =>{
        setData({...data , [event.target.name]: event.target.value});
        console.log(data);
    }

    const sendData = () =>{
        data.startDate.length > 0 && data.endDate.length > 0 ? 
            axios.post(`${MainLink}/gains/`,{
                slug: data.category,
                date_start: data.startDate,
                date_end: data.endDate
            }).then(response => {if (response) {
                setData({...data , totalGain: response.data.gains , totalSell: response.data.total_sells_per_month });
                setAlerOpacity(true);
            }}).catch(error => {
                toast.error("موارد وارد شده صحیح نمیباشد");
            })
        :
            axios.get(`${MainLink}/gains/${data.category}/`)
            .then(response => {if (response) {
                setData({...data , totalGain: response.data.gains , totalSell: response.data.total_sells_per_month });
                setAlerOpacity(true);
            }}).catch(error => {
                toast.error("موارد وارد شده صحیح نمیباشد");
            });
    }
    
  return (
      <div>
    <div className="col-md-12 grid-margin">
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="d-flex">
              <div className="wrapper">
                <h3 className="mb-0 font-weight-semibold">{totalGain.total_gain}</h3>
                <p className="mb-0 text-muted">سود کل</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-md-0 mt-4">
            <div className="d-flex">
              <div className="wrapper">
                <h3 className="mb-0 font-weight-semibold">{totalGain.total_sells}</h3>
                <p className="mb-0 text-muted">فروش کل</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

<div className={`col-md-12 grid-margin ${alertOpacity ? styles.active : styles.notActive }`}>
    <div class="alert alert-primary" role="alert">
        <h5  style={{display: 'flex' , justifyContent: 'space-evenly' , alignItems: 'center'}}>
<span>
سود کل : {data.totalGain}
</span>
<span>
فروش کل : {data.totalSell}
</span>
        </h5>
    </div>
</div>

  <div className="col-md-12 grid-margin stretch-card">
    <div className="card">
        <div className="card-body">
        <h4 className="card-title">ویرایش دسته بندی</h4>
        <div className='forms-sample'>
            <div>
            <div className="form-group">
                <select name='category' id='exampleInputCategory' className="form-control form-control-lg" onChange={dateHandler}>
                    <option>دسته بندی</option>
                    {categoriesList.map(item => <option key={item.id} value={item.slug}>{item.name}</option>)}
                </select>
                </div>
                <div className="form-group">
                    <input type="text" name='startDate' className="form-control form-control-lg" id="categoryInput" value={data.startDate} onChange={dateHandler} placeholder="تاریخ شروع مثال (1-1-1401)"  />
                    </div>
                <div className="form-group">
                    <input type="text" name='endDate' className="form-control form-control-lg" id="categoryInput" value={data.endDate} onChange={dateHandler} placeholder="تاریخ پایان مثال (30-12-1401)"  />
                </div>
            </div>
            <button onClick={sendData} className="btn btn-success mr-2">ثبت</button>
            <button className="btn btn-light">انصراف</button>
        </div>
        </div>
    </div>
    <ToastContainer />
</div>
          
  </div>
  )
}

export default Reports