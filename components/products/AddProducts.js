import React,{useState , useRef} from 'react'
import { useRouter } from 'next/dist/client/router';

//import modules
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import styles
import styles from "./addproduct.module.css"

//import components
import { MainLink } from '../BaseUrl/BaseUrl';


const AddProducts = ({categoriesList}) => {

    const redirect = new useRouter();

    const firstFileUpload = useRef(null);
    const secoundFileUpload = useRef(null);
    const thridFileUpload = useRef(null);
    const [photo , setPhoto] = useState(null);
    const [photo1 , setPhoto1] = useState(null);
    const [photo2 , setPhoto2] = useState(null);
    const [video , setVideo] = useState(null);
    const [pdf , setPdf] = useState(null);

    const [data , setData] = useState({
        name: '',
        category: '',
        subCategory: '',
        buyPrice: '',
        sellPrice: '',
        creator: '',
        description: '',
        quantity: '',
        pdffile: '',
        firstImg: null ,
        secoundImg: null,
        thirdImg: null,
        video: null
    })

    const setDataValue = (event) =>{
        if (event.target.name !== "pdffile") {
            setData({...data , [event.target.name]: event.target.value});
        }else{
            setPdf(event.target.files[0]);
            setData({...data, pdffile: event.target.files[0]});
        }
    }

    const categoryHandler = (e) =>{ 
        setData({...data ,category: [e.target.value]});
    }
    const subCategoryHandler = (e) =>{ 
        setData({...data , subCategory: [e.target.value]});
    }

        // set kardan img ha dar state ha 
    const fileuploadHandler = async (event) =>{
    if(event.target.name === "firstImg"){
        setData({...data , firstImg: URL.createObjectURL(event.target.files[0])})
        setPhoto(event.target.files[0]);
    }else if(event.target.name === "secoundImg"){
        setData({...data ,secoundImg: URL.createObjectURL(event.target.files[0])})
        setPhoto1(event.target.files[0]);
    }else if(event.target.name === "thirdImg"){
        setData({...data ,thirdImg: URL.createObjectURL(event.target.files[0])})
        setPhoto2(event.target.files[0]);
    }else if(event.target.name === "video"){
        setData({...data ,video: URL.createObjectURL(event.target.files[0])})
        setVideo(event.target.files[0]);
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
        const thirdHandleUpload = () => {
        thridFileUpload.current.click();
        };
    // 
    // in baxsh baraye btn hazf mibashad ke aks preview pakshode va div nemayesh dade shavad
    const clickHandler = (event) =>{
        if(event.target.id === "firstImgBtn"){
        setData({...data , firstImg: null});
        }else if(event.target.id === "secoundImgBtn"){
        setData({...data , secoundImg: null});
        }else if(event.target.id === "thirdImgBtn"){
        setData({...data , thirdImg: null});
        }
    }
    // 

    const sendData = (event) =>{
        const formData = new FormData();
        data.firstImg  && photo && formData.append('image' , photo , photo.name);
        data.secoundImg  && photo1 && formData.append('image2' , photo1 , photo1.name );
        data.thirdImg  && photo2 && formData.append('image3' , photo2 , photo2.name );
        data.video  && video && formData.append('product_video' , video , video.name );
        formData.append('name' , data.name);
        formData.append('categories' , data.category);
        formData.append('categories' , data.subCategory);
        formData.append('repository_quantity ' , data.quantity);
        formData.append('body' , data.description);
        formData.append('price' , data.sellPrice);
        formData.append('company_price' , data.buyPrice);
        formData.append('manufacturer_company' , data.creator);
        data.pdffile && formData.append('pdf_file' , pdf , pdf.name);
        fetch(`${MainLink}/product/create/`,{
            method:"POST",
            body:formData
        })
        .then(response => {
                if(response.status !== 400){
                    response.json().then(json => {
                        toast.success("محصول با موفقیت ساخته شد")
                        setTimeout(() => {
                            redirect.push("/products")
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
            <h4 className="card-title">ایجاد محصول</h4>
            <div className="forms-sample">
                <div className="form-group">
                <label htmlFor="exampleInputName">نام محصول</label>
                <input type="text" name='name' className="form-control form-control-lg" id="exampleInputName" placeholder="نام محصول"  onChange={setDataValue}/>
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputCategory" >دسته بندی</label>
                    <select name='category' id='exampleInputCategory' className="form-control form-control-lg" onChange={e => categoryHandler(e)}>
                        <option selected hidden value="0">دسته بندی</option>
                        {categoriesList.map(item => item.parent.length > 0 && <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputSubCategory" >زیر شاخه</label>
                    <select name='subcategory' id='exampleInputSubCategory' className="form-control form-control-lg" onChange={e => subCategoryHandler(e)}>
                        <option selected hidden value="0">زیرشاخه</option>
                       {data.category && categoriesList.find(item => item.id == data.category).parent.map(data => <option key={data.id} value={data.id}>{data.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputquantity">تعداد</label>
                <input name='quantity' type="text" className="form-control form-control-lg" id="exampleInputquantity" placeholder="تعداد "  onChange={setDataValue}/>
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputBuyPrice">قیمت خرید</label>
                <input name='buyPrice' type="text" className="form-control form-control-lg" id="exampleInputBuyPrice" placeholder="قیمت خرید"  onChange={setDataValue}/>
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputSellPrice">قیمت فروش</label>
                <input name='sellPrice' type="text" className="form-control form-control-lg" id="exampleInputSellPrice" placeholder="قیمت فروش"  onChange={setDataValue}/>
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputCreator">تولید کننده</label>
                <input name='creator' type="text" className="form-control form-control-lg" id="exampleInputCreator" placeholder="تولید کننده" onChange={setDataValue} />
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputPdffile">آپلود فایل </label>
                <input name='pdffile' type="file" className="form-control form-control-lg" id="exampleInputPdffile" placeholder="اپلود فایل " onChange={setDataValue} />
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputvideo">آپلود ویدیو </label>
                <input name='video' type="file" className="form-control form-control-lg" id="exampleInputPvideo" placeholder="اپلود ویدیو " onChange={fileuploadHandler} />
                </div>
                <div className="form-group">
                <label htmlFor="exampleTextarea">توضیحات</label>
                <textarea name='description' className="form-control form-control-lg" id="exampleTextarea" rows="10" onChange={setDataValue}></textarea>
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
                    {data.thirdImg ?
                        <div className={styles.thirdImg}>
                            <img
                            src={data.thirdImg}
                            alt="Thumb"
                            />
                            <button id="thirdImgBtn" onClick={clickHandler}>حدف عکس</button>
                        </div>
                        :
                        <div className={styles.imgBox}>
                        <input style={{display:"none"}} name="thirdImg" onChange={fileuploadHandler} type="file" 
                        ref={thridFileUpload} />
                        <section onClick={() => thirdHandleUpload()} className={styles.divImg}>
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

export default AddProducts