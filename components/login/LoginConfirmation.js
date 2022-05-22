import React,{useState} from 'react'
import { useRouter } from 'next/router';


//import modules
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

//import styles
import styles from "./login.module.css"

//import components
import { MainLink } from '../BaseUrl/BaseUrl';
import LoginLayout from './LoginLayout';


const LoginConfirmation = () => {

    const redirect = new useRouter();

    const [code , setCode] = useState({
        userCode: ''
    })

    const numberHandler = (event) =>{
        setCode({...code , userCode: event.target.value});
    }

    const loginHandler = (event) =>{
        event.preventDefault();
        axios.post(`${MainLink}/otp/confirm/`,{
            key: localStorage.getItem('key'),
            password: code.userCode,
        }).then(response => {
            if (response.status === 200) {
                localStorage.removeItem('key');
                localStorage.setItem('token' , response.data.token);
                toast.success("با موفقیت وارد شدید");
                setTimeout(() =>{
                    redirect.push("/")
                },3000)
            }
        }).catch((error) =>{
            toast.error("کد وارد شده صحیح نمیباشد")
        })
        
    }


  return (
      <LoginLayout>
        <form>
            <div className={styles.title}>
                <h1>ورود / ثبت نام</h1>
                <hr />
                <h6>
        لطفا کد پیامک شده به تلفنتان را وارد کنید                           
                </h6>
            </div>
            <div className="form-group">
                <label className="label">کد پیامک شده</label>
                <div className="input-group">
                <input type="text" className={`form-control ${styles.phone_number}`} placeholder="کد" onChange={numberHandler} />
                </div>
            </div>
            <div className="form-group">
                <button onClick={loginHandler} className="btn btn-primary submit-btn btn-block">ورود</button>
            </div>
            <div className="form-group">
                <button className="btn btn-block g-login">
                <img className="mr-3" src="/assets/images/file-icons/icon-google.svg" alt="" />Log in with Email</button>
            </div>
            <div className="text-block text-center my-3">
                <span className="text-small font-weight-semibold">اکانت ندارید ؟ </span>
                <a href="register.html" className="text-black text-small">ثبت نام کنید</a>
            </div>
        </form>
    </LoginLayout>
  )
}

export default LoginConfirmation