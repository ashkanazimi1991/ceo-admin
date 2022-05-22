import React,{useState , useEffect,useRef} from 'react'
import { MainLink } from '../BaseUrl/BaseUrl';
import { useRouter } from 'next/router';


//import styles
import styles from "./discount.module.css"

//import modules
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import * as shamsi from 'shamsi-date-converter';


export default function EditDiscount({id , discountDetails , productsList}) {

    const redirect = useRouter();

    const [data , setData] = useState({
        productsIds: [],
        products: [],
        startDate: '',
        endDate: '',
        discount_percent: ''
    })
    const [update , setUpdate] = useState(true);

    useEffect(() =>{
        setData({...data , 
            products: discountDetails.products,
            productsIds: discountDetails.products.map(item => item.id),
            startDate: shamsi.gregorianToJalali(discountDetails.valid_from.split("-")).join("-"),
            endDate: shamsi.gregorianToJalali(discountDetails.valid_to.split("-")).join("-"),
            discount_percent: discountDetails.discount_percent
        });
    },[]);

    const dataHandler = (event) =>{
        setData({...data , [event.target.name]: event.target.value});

    }

    const productsHandler = (event) =>{
        data.productsIds.push(Number(event.target.value));
        setUpdate(!update);
    }

    const sendData = () =>{
        axios.put(`${MainLink}/discount_update/${id}/`,{
            products: data.productsIds,
            valid_from: data.startDate,
            valid_to: data.endDate,
            discount_percent: data.discount_percent
        }).then(response => {if (response.statusText === 'ok') {
            toast.success("تغغیرات با موفقیت ثبت شد");
            redirect.push("/discount")
        }}).catch(error => {
            toast.error("موارد وارد شده صحیح نمیباشد");
        })
        ;
    }

  return (
    <div className="col-md-12 grid-margin stretch-card">
    <div className="card">
        <div className="card-body">
        <h4 className="card-title">ایجاد تخفیف</h4>
        <div className="forms-sample">
            <div className="form-group">
            <label htmlFor="exampleInputCategory" >محصولات</label>
                <select name='category' id='exampleInputCategory' className="form-control form-control-lg" onChange={productsHandler} >
                    <option   value="0">محصولات</option>
                    {productsList.results.map((item , index) => data.productsIds.indexOf(item.id) >= 0  ?  <option className={styles.selected } key={item.id} value={item.id}>{item.name}</option> : <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
            </div>
            <div className="form-group">
            <label htmlFor="exampleInputpercent">درصد تخفیف</label>
            <input name='discount_percent' type="text" className="form-control form-control-lg" id="exampleInputpercent" placeholder="مثال (20) "  value={data.discount_percent} onChange={dataHandler} />
            </div>
            <div className="form-group">
            <label htmlFor="exampleInputstartDate">تاریخ شروع</label>
            <input name='startDate' type="text" className="form-control form-control-lg" id="exampleInputstartDate" placeholder="مثال (1-1-1401)  "  value={data.startDate} onChange={dataHandler} />
            </div>
            <div className="form-group">
            <label htmlFor="exampleInputendDate">تاریخ پایان</label>
            <input name='endDate' type="text" className="form-control form-control-lg" id="exampleInputendDate" placeholder=" مثال (30-12-1401)" value={data.endDate}  onChange={dataHandler} />
            </div>
            <button onClick={sendData} className="btn btn-success mr-2">ثبت</button>
            <button className="btn btn-light">انصراف</button>
        </div>
        </div>
    </div>
    <ToastContainer />
</div>
  )
}
