import React,{useState} from 'react'
import { useRouter } from 'next/router';


//import styles
import styles from "./login.module.css"

//import modules
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


//import components
import { MainLink } from '../BaseUrl/BaseUrl';
import LoginLayout from './LoginLayout';


const EmailLogin = () => {

    const redirect = new useRouter();

    const emailValidate = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const [email , setEmail] = useState({
        emailAddress: ''
    })

    const emailHandler = (event) =>{
        setEmail({...email , emailAddress: event.target.value});
    }

    const loginHandler = (event) =>{
        event.preventDefault();
        if (emailValidate.test(email.emailAddress)) {
            axios.post(`${MainLink}/otp/email/verify/`,{
                email: email.emailAddress,
            }).then(response => {if (response) {
                localStorage.setItem('key' , response.data.key);
                redirect.push("/login/emailLoginConfirmation")
            }})
        }else{
            toast.error("ایمیل وارد شده صحیح نمیباشد")
        }
    }


  return (
     <LoginLayout>
        <form>
            <div className={styles.title}>
                <h1>ورود / ثبت نام</h1>
                <hr />
                <h6>
                لطفا ایمیل خود را در کادر پایین وارد کنید                           
                </h6>
            </div>
            <div className="form-group">
                <label className="label">ایمیل خود را وارد کنید</label>
                <div className="input-group">
                <input type="text" className={`form-control ${styles.phone_number}`} placeholder="ایمیل" onChange={emailHandler} />
                </div>
            </div>
            <div className="form-group">
                <button onClick={loginHandler} className="btn btn-primary submit-btn btn-block">ادامه</button>
            </div>
            <div className="form-group">
                <button className="btn btn-block g-login">
                <img className="mr-3" src="/assets/images/file-icons/icon-google.svg" alt="" />Log in with phone number</button>
            </div>
            <div className="text-block text-center my-3">
                <span className="text-small font-weight-semibold">اکانت ندارید ؟ </span>
                <a href="register.html" className="text-black text-small">ثبت نام کنید</a>
            </div>
        </form>
    </LoginLayout>
  )
}

export default EmailLogin