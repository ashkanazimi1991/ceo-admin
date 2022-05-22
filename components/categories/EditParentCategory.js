import React,{useState , useEffect,useRef} from 'react'
import { MainLink } from '../BaseUrl/BaseUrl';
import { useRouter } from 'next/router';

//import syles
import styles from "./category.module.css"

//import modules
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const EditParentCategory = ({id ,parentCategoriesList , categoriesList}) => {

    const redirect = useRouter();
    const [category , setCategory] = useState({
        category: '',
        name: '' ,
    })

    const categoryHandler = (e) =>{ 
        setCategory({...category ,category: e.target.value});
    }

    const subCategoryHandler = (event) =>{ 
        setCategory({...category ,name: event.target.value});
    }

    useEffect(() =>{
        setCategory({...category , name: categoriesList.name , category: categoriesList.parent});
    },[])

    const sendData = (event) =>{
       axios.put(`${MainLink}/categories/${id}/` , {
           name: category.name,
           parent: category.category 
       }).then(response => {if (response.status === 200) {
           toast.success("تغییرات با موفقیت اعمال شد");
            setTimeout(() =>{
                redirect.push("/categories");
            },2500)
       }});
    }


  return (
    <div className="col-md-12 grid-margin stretch-card">
    <div className="card">
        <div className="card-body">
        <h4 className="card-title">ویرایش دسته بندی</h4>
        <div className='forms-sample'>
            <div className={styles.container}>
              {categoriesList.parent ?
                <select name='category' id='exampleInputCategory' className="form-control form-control-lg" onChange={e => categoryHandler(e)}>
                <option selected hidden value={parentCategoriesList.find(item => item.id == categoriesList.parent).id}>{parentCategoriesList.find(item => item.id == categoriesList.parent).name}</option>
                {parentCategoriesList.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
                :  null
                }
                <div className="form-group">
                <input type="text" name='name' className="form-control form-control-lg" id="categoryInput" value={category.name} onChange={subCategoryHandler} placeholder="نام زیرشاخه "  />
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

export default EditParentCategory