import React,{useState , useEffect,useRef} from 'react'
import { MainLink } from '../BaseUrl/BaseUrl';
import { useRouter } from 'next/router';

//import styles
import styles from "./returned.module.css"

//import modules
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import * as shamsi from 'shamsi-date-converter';


const Editreturned = ({id ,returnedDetails}) =>{

    const redirect = useRouter();
    const [data , setData] = useState({
        id:'',
        order_id: '',
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        state: '',
        city: '',
        address: '',
        plate: '',
        zipCode: '',
        is_admin: false,
        is_oprator: false,
        created_at: '',
        message: '',
        Confirmation: false,
    });

    useEffect(() =>{
        setData({...data , 
            id: returnedDetails.user.id,
            order_id: returnedDetails.order_id,
            username: returnedDetails.user.username,
            email: returnedDetails.user.email,
            firstName: returnedDetails.user.first_name,
            lastName: returnedDetails.user.last_name,
            state: returnedDetails.user.state,
            city: returnedDetails.user.city,
            address: returnedDetails.user.address,
            plate: returnedDetails.user.plate,
            zipCode: returnedDetails.user.zip_code,
            is_admin: returnedDetails.user.is_admin,
            is_oprator: returnedDetails.user.is_operator,
            created_at: returnedDetails.created_at,
            message: returnedDetails.message,
            Confirmation: returnedDetails.Confirmation,
        })
    },[]);


    const checkboxHandler = (event) =>{
        setData({...data , Confirmation: event.target.checked});
    }

    const sendData = () =>{
        axios.put(`${MainLink}/refunds/u/${id}/`,{
            order_id: data.order_id,
            message: data.message,
            Confirmation: data.Confirmation,
        }).then(response => {if (response) {
            toast.success("تغییرات با موفقیت ثبت شد");
            setTimeout(() =>{
                redirect.push("/returned");
            },2500)
        }}).catch(error => {
            toast.error("موارد وارد شده صحیح نمیباشد");
        })
        ;
    }

    return(
        <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
            <div className="card-body">
            <h4 className="card-title">ویرایش مرجوعی</h4>
            <div className='forms-sample'>
                <div className={styles.container}>
                    <div className="form-group">
                    <label htmlFor="usernameInput">نام کاربری</label>
                    <input disabled  type="text" className="form-control form-control-lg" id="usernameInput" placeholder="نام کاربری" value={data.username} />
                    </div>
                    <div className="form-group">
                    <label htmlFor="emailInput">ایمیل </label>
                    <input disabled  type="text"className="form-control form-control-lg" id="emailInput" placeholder="ایمیل" value={data.email} />
                    </div>
                    <div className="form-group">
                    <label htmlFor="nameInput">نام </label>
                    <input disabled  type="text" name='firstName' className="form-control form-control-lg" id="nameInput" placeholder="نام "  value={data.firstName}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="familiyNameInput">نام خانوادگی</label>
                    <input  disabled type="text" className="form-control form-control-lg" id="familiyNameInput" placeholder="نام خانوادگی" value={data.lastName} />
                    </div>
                    <div className="form-group">
                    <label htmlFor="stateInput"> استان</label>
                    <input disabled  type="text" className="form-control form-control-lg" id="stateInput" placeholder=" استان" value={data.state} />
                    </div>
                    <div className="form-group">
                    <label htmlFor="cityInput"> شهر</label>
                    <input disabled  type="text" className="form-control form-control-lg" id="cityInput" placeholder=" شهر"  value={data.city}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="addressInput"> آدرس</label>
                    <input disabled  type="text" className="form-control form-control-lg" id="addressInput" placeholder=" آدرس" value={data.address} />
                    </div>
                    <div className="form-group">
                    <label htmlFor="plateInput"> پلاک</label>
                    <input  disabled type="text" className="form-control form-control-lg" id="plateInput" placeholder=" پلاک"  value={data.plate}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="zipCodeInput">کد پستی</label>
                    <input  disabled type="text"className="form-control form-control-lg" id="zipCodeInput" placeholder=" کد پستی" value={data.zipCode} />
                    </div>
                    <div className="form-group">
                    <label htmlFor="dateInput">تاریخ</label>
                    <input  disabled type="text"  className="form-control form-control-lg" id="dateInput" placeholder=" کد پستی" value={shamsi.gregorianToJalali(data.created_at.split("-")).join("-")} />
                    </div>
                </div>
                <textarea disabled name='description' className="form-control form-control-lg" id="exampleTextarea" rows="10" value={data.message}></textarea>
                    <div className="form-check form-check-flat">
                        <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" onChange={checkboxHandler} name='confirmation' checked={data.Confirmation} value={data.Confirmation} /> تایید شده ؟  <i className="input-helper"></i></label>
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

export default Editreturned