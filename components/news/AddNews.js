import React,{useState , useRef} from 'react'
import { useRouter } from 'next/dist/client/router';

//import modules
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import styles
import styles from "./addnews.module.css"

//import components
import { MainLink } from '../BaseUrl/BaseUrl';


const AddNews = ({userList}) => {
    const redirect = new useRouter();

    const firstFileUpload = useRef(null);
    const secoundFileUpload = useRef(null);
    const [photo , setPhoto] = useState(null);
    const [photo1 , setPhoto1] = useState(null);

    const [data , setData] = useState({
        title: '',
        author: '',
        body: '',
        firstImg: null ,
        secoundImg: null,
    })


    const setDataValue = (event) =>{
            setData({...data , [event.target.name]: event.target.value});
    }

    const authorHandler = (event) =>{
        setData({...data , author: event.target.value});
    }

        // set kardan img ha dar state ha 
    const fileuploadHandler = async (event) =>{
    if(event.target.name === "firstImg"){
        setData({...data , firstImg: URL.createObjectURL(event.target.files[0])})
        setPhoto(event.target.files[0]);
    }else if(event.target.name === "secoundImg"){
        setData({...data ,secoundImg: URL.createObjectURL(event.target.files[0])})
        setPhoto1(event.target.files[0]);
    }
    }
    // 

    // baraye inke input hide shode az tarig div karkone
    const firstHandleUpload = () => {
        firstFileUpload.current.click();
        };
        const secoundHandleUpload = () => {
        secoundFileUpload.current.click();
        };
    // 
    // in baxsh baraye btn hazf mibashad ke aks preview pakshode va div nemayesh dade shavad
    const clickHandler = (event) =>{
        if(event.target.id === "firstImgBtn"){
        setData({...data , firstImg: null});
        }else if(event.target.id === "secoundImgBtn"){
        setData({...data , secoundImg: null});
        }
    }
    // 

    const sendData = (event) =>{
        const formData = new FormData();
        data.firstImg  && photo && formData.append('title_image' , photo , photo.name);
        data.secoundImg  && photo && formData.append('title_video' , photo1 , photo1.name );
        formData.append('title' , data.title);
        formData.append('author' , data.author);
        formData.append('body' , data.body);
        fetch(`${MainLink}/news/create/`,{
            method:"POST",
            body:formData
        })
        .then(response => {
                if(response.status !== 400){
                    response.json().then(json => {
                        toast.success("اخبار با موفقیت ساخته شد")
                        setTimeout(() => {
                            redirect.push("/news")
                        },5000)
                        });
                }else{
                    response.json().then(json => {
                        toast.error("موارد وارد شده صحیح نمیباشد")
                        });
                }
            })
    }


  return (
    <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
            <div className="card-body">
            <h4 className="card-title">ایجاد خبر</h4>
            <div className="forms-sample">
                <div className="form-group">
                <label htmlFor="exampleInputTitle">تیتر خبر</label>
                <input type="text" name='title' className="form-control form-control-lg" id="exampleInputTitle" placeholder="تیتر خبر"  onChange={setDataValue}/>
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputAuthor" >نویسنده</label>
                    <select name='category' id='exampleInputAuthor' className="form-control form-control-lg" onChange={e => authorHandler(e)}>
                        <option selected hidden value="0">نویسنده</option>
                        {userList.map(item => <option key={item.id} value={item.id}>{item.first_name} {item.last_name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                <label htmlFor="exampleTextarea">توضیحات</label>
                <textarea name='body' className="form-control form-control-lg" id="exampleTextarea" rows="10" onChange={setDataValue}></textarea>
                </div>
                <div className={styles.imageContainer} dir="rtl">
                    {data.firstImg ?
                        <div className={styles.firstImg}>
                            <img
                            src={data.firstImg}
                            alt="Thumb"
                            />
                            <button id="firstImgBtn" onClick={clickHandler}>حدف عکس</button>
                        </div>
                        :
                        <div className={styles.imgBox}>
                            <input style={{display:"none"}} name="firstImg" onChange={fileuploadHandler} type="file" 
                            ref={firstFileUpload} />
                            <section onClick={() => firstHandleUpload()} className={styles.divImg}>
                                <p>کلیک برای آپلود عکس</p>
                            </section>
                        </div>
                    }
                    {data.secoundImg ?
                        <div className={styles.secoundImg}>
                           
                        <img
                            src={data.secoundImg}
                            alt="Thumb"
                            />
                            <button id="secoundImgBtn" onClick={clickHandler}>حدف عکس</button>
                            
                        </div>
                        :
                        <div className={styles.imgBox}>
                        <input style={{display:"none"}} name="secoundImg" onChange={fileuploadHandler} type="file" 
                        ref={secoundFileUpload} />
                        <section onClick={() => secoundHandleUpload()} className={styles.divImg}>
                            <p>کلیک برای آپلود عکس</p>
                        </section>
                        </div>
                    }
                </div>
                <button className="btn btn-success mr-2" onClick={sendData}>ثبت</button>
                <button className="btn btn-light">انصراف</button>
            </div>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default AddNews