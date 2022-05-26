import React, { useState, useEffect, useRef } from 'react'
import { MainLink } from '../BaseUrl/BaseUrl';
import { useRouter } from 'next/router';

//import syles
import styles from "./category.module.css"

//import modules
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AddCategory = ({ categoriesList }) => {

    const redirect = useRouter();
    const [category, setCategory] = useState({
        category: '',
        name: '',
    })

    const categoryHandler = (e) => {
        setCategory({ ...category, category: e.target.value });
    }

    const subCategoryHandler = (event) => {
        setCategory({ ...category, name: event.target.value });
    }

    const sendData = (event) => {
        axios.post(`${MainLink}/create/category/`, {
            name: category.name,
            parent: category.category
        }).then(response => {
            if (response) {
                toast.success("دسته بندی با موفقیت ساخته شد");
                setTimeout(() => {
                    redirect.push("/categories");
                }, 2500)
            }
        }).catch(error => {
            console.log(error.response);
        })
    }


    return (
        <div className="col-md-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">ساخت دسته بندی</h4>
                    <div className='forms-sample'>
                        <div className={styles.container}>
                            <select name='category' id='exampleInputCategory' className="form-control form-control-lg" onChange={e => categoryHandler(e)}>
                                <option value={null}>خالی</option>
                                {categoriesList.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                            </select>
                            <div className="form-group">
                                <input type="text" name='name' className="form-control form-control-lg" id="categoryInput" value={category.name} onChange={subCategoryHandler} placeholder="نام زیرشاخه " />
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

export default AddCategory