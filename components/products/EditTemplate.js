import React, { useState, useRef , useEffect } from "react";
import { useRouter } from "next/dist/client/router";

//import modules
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import styles
import styles from "./addproduct.module.css";

//import components
import { MainLink } from "../BaseUrl/BaseUrl";

const EditTemplate = ({ id , templateList }) => {
  const redirect = new useRouter();

  const firstFileUpload = useRef(null);
  const [photo, setPhoto] = useState(null);

  const [data, setData] = useState({
    name: "",
    body: "",
    link: "",
    firstImg: null,
  });

  useEffect(() =>{
    setData({...data , 
    name: templateList.title,
    body: templateList.body,
    link: templateList.link,
    firstImg: templateList.image
    })
  },[])

  const setDataValue = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  // set kardan img ha dar state ha
  const fileuploadHandler = async (event) => {
    if (event.target.name === "firstImg") {
      setData({
        ...data,
        firstImg: URL.createObjectURL(event.target.files[0]),
      });
      setPhoto(event.target.files[0]);
    }
  };
  //

  // baraye inke input hide shode az tarig div karkone
  const firstHandleUpload = () => {
    firstFileUpload.current.click();
  };
  //
  // in baxsh baraye btn hazf mibashad ke aks preview pakshode va div nemayesh dade shavad
  const clickHandler = (event) => {
    if (event.target.id === "firstImgBtn") {
      setData({ ...data, firstImg: null });
    }
  };
  //

  const sendData = (event) => {
    const formData = new FormData();
    data.firstImg && photo && formData.append("image", photo, photo.name);
    formData.append("title", data.name);
    formData.append("body", data.body);
    fetch(`${MainLink}/project/${id}/`, {
      method: "PUT",
      body: formData,
    }).then((response) => {
      if (response.status !== 400) {
        response.json().then((json) => {
          toast.success("محصول با موفقیت ساخته شد");
          setTimeout(() => {
            redirect.push("/products/templateList");
          }, 5000);
        });
      } else {
        response.json().then((json) => {
          toast.error("موارد وارد شده صحیح نمیباشد");
        });
      }
    });
  };

  return (
    <div className="col-md-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">ایجاد کارت</h4>
          <div className="forms-sample">
            <div className="form-group">
              <label htmlFor="exampleInputName">نام کارت</label>
              <input
                type="text"
                name="name"
                className="form-control form-control-lg"
                id="exampleInputName"
                placeholder="نام کارت"
                value={data.name}
                onChange={setDataValue}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputName">لینک کارت</label>
              <input
                type="text"
                name="link"
                className="form-control form-control-lg"
                id="exampleInputName"
                placeholder="لینک کارت"
                value={data.link}
                onChange={setDataValue}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleTextarea">توضیحات</label>
              <textarea
                name="body"
                className="form-control form-control-lg"
                id="exampleTextarea"
                rows="10"
                value={data.body}
                onChange={setDataValue}
              ></textarea>
            </div>
            <div className={styles.imageContainer} dir="rtl">
              {data.firstImg ? (
                <div className={styles.firstImg}>
                  <img src={data.firstImg} alt="Thumb" />
                  <button id="firstImgBtn" onClick={clickHandler}>
                    حدف عکس
                  </button>
                </div>
              ) : (
                <div className={styles.imgBox}>
                  <input
                    style={{ display: "none" }}
                    name="firstImg"
                    onChange={fileuploadHandler}
                    type="file"
                    ref={firstFileUpload}
                  />
                  <section
                    onClick={() => firstHandleUpload()}
                    className={styles.divImg}
                  >
                    <p>کلیک برای آپلود عکس</p>
                  </section>
                </div>
              )}
            </div>
            <button className="btn btn-success mr-2" onClick={sendData}>
              ثبت
            </button>
            <button className="btn btn-light">انصراف</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditTemplate;
