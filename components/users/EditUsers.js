import React,{useState , useEffect,useRef} from 'react'
import { MainLink } from '../BaseUrl/BaseUrl';
import { useRouter } from 'next/router';

//import styles
import styles from "./adduser.module.css"

//import modules
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUsers = ({id , userData}) =>{
    const redirect = new useRouter();

    const [avatar , setAvatar]  = useState(null);

    const [data , setData] = useState({
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
    });

    useEffect(() =>{
        setData({...data , 
            username: userData.username,
            email: userData.email,
            firstName: userData.first_name,
            lastName: userData.last_name,
            state: userData.state,
            city: userData.city,
            address: userData.address,
            plate: userData.plate,
            zipCode: userData.zip_code,
            is_admin: userData.is_admin,
            is_oprator: userData.is_operator,
        })
    },[]);

     const inputsHandler = (event) => {
        if (event.target.name !== "avatar") {
           setData({...data , [event.target.name] : event.target.value})
        }else{
            setAvatar(event.target.files[0])
        }
    }
       

    const checkboxHandler = () =>{
        setData({...data ,[event.target.name] : event.target.checked })
    }
    

    const sendData = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('username' , data.username);
        formData.append('email' , data.email);
        formData.append('first_name' , data.firstName);
        formData.append('last_name' , data.lastName);
        avatar && formData.append('avatar' , avatar , avatar.name);
        formData.append('state' , data.state);
        formData.append('city' , data.city);
        formData.append('address' , data.address);
        formData.append('plate' , data.plate);
        formData.append('zip_code' , data.zipCode);
        formData.append('is_admin' , data.is_admin);
        formData.append('is_operator' , data.is_oprator);
        fetch(`${MainLink}/user/${id}/`,{
            headers:{
                'Authorization': 'Token '+ localStorage.getItem('token'), 
            },
            method:"PUT",
            body:formData
        }).then(response => {
            if(response.status !== 401 & response.status !== 400 ){
                response.json().then(json => {
                    toast.success("کاربر با موفقیت ساخته شد")
                    setTimeout(() => {
                        redirect.push(`/users`)
                    },5000)
                  });
            }else{
                    toast.error("موارد وارد شده صحیح نمیباشد")
            }
      })
    }


  return (
        <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
            <div className="card-body">
            <h4 className="card-title">ایجاد کاربر</h4>
            <div className='forms-sample'>
                <div className={styles.container}>
                    <div className="form-group">
                    <label htmlFor="usernameInput">نام کاربری</label>
                    <input type="text" name='username' className="form-control form-control-lg" id="usernameInput" placeholder="نام کاربری" value={data.username}  onChange={inputsHandler}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="emailInput">ایمیل </label>
                    <input type="text" name='email' className="form-control form-control-lg" id="emailInput" placeholder="ایمیل" value={data.email}  onChange={inputsHandler}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="nameInput">نام </label>
                    <input type="text" name='firstName' className="form-control form-control-lg" id="nameInput" placeholder="نام "  value={data.firstName} onChange={inputsHandler}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="familiyNameInput">نام خانوادگی</label>
                    <input type="text" name='lastName' className="form-control form-control-lg" id="familiyNameInput" placeholder="نام خانوادگی" value={data.lastName} onChange={inputsHandler} />
                    </div>
                    <div className="form-group">
                    <label htmlFor="profileInput">پروفایل </label>
                    <input type="file" name='avatar' className="form-control form-control-lg" id="profileInput" placeholder="پروفایل "  onChange={inputsHandler} />
                    </div>
                    <div className="form-group">
                    <label htmlFor="stateInput"> استان</label>
                    <input type="text" name='state' className="form-control form-control-lg" id="stateInput" placeholder=" استان" value={data.state}  onChange={inputsHandler}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="cityInput"> شهر</label>
                    <input type="text" name='city' className="form-control form-control-lg" id="cityInput" placeholder=" شهر"  value={data.city} onChange={inputsHandler}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="addressInput"> آدرس</label>
                    <input type="text" name='address' className="form-control form-control-lg" id="addressInput" placeholder=" آدرس" value={data.address}  onChange={inputsHandler}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="plateInput"> پلاک</label>
                    <input type="text" name='plate' className="form-control form-control-lg" id="plateInput" placeholder=" پلاک"  value={data.plate} onChange={inputsHandler}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="zipCodeInput">کد پستی</label>
                    <input type="text" name='zipCode' className="form-control form-control-lg" id="zipCodeInput" placeholder=" کد پستی" value={data.zipCode} onChange={inputsHandler} />
                    </div>
                    <div className="form-check form-check-flat">
                        <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" name='is_admin' checked={data.is_admin} value={data.is_admin} onChange={checkboxHandler} /> کاربر ادمین <i className="input-helper"></i></label>
                    </div>
                    <div className="form-check form-check-flat">
                        <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" name='is_oprator' checked={data.is_oprator} value={data.is_oprator} onChange={checkboxHandler} /> کاربر اپراتور <i className="input-helper"></i></label>
                    </div>
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

export default EditUsers