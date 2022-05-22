import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/dist/client/router";

//import modules
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import styles
import styles from "./addproduct.module.css";

//import components
import { MainLink } from "../BaseUrl/BaseUrl";

const EditProducts = ({ id, selectedProduct, categoriesList }) => {
  const redirect = new useRouter();

  const firstFileUpload = useRef(null);
  const secoundFileUpload = useRef(null);
  const thridFileUpload = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [photoSend, setPhotoSend] = useState(false);
  const [photo1, setPhoto1] = useState(null);
  const [photo1Send, setPhoto1Send] = useState(false);
  const [photo2, setPhoto2] = useState(null);
  const [photo2Send, setPhoto2Send] = useState(false);
  const [video, setVideo] = useState(null);
  const [videoSend, setVideoSend] = useState(false);
  const [pdf, setPdf] = useState(null);

  const [data, setData] = useState({
    name: "",
    category: "",
    subCategory: "",
    buyPrice: "",
    sellPrice: "",
    creator: "",
    description: "",
    quantity: "",
    pdffile: "",
    is_hide: false,
    firstImg: null,
    secoundImg: null,
    thirdImg: null,
    video: null,
  });

  useEffect(() => {
    setData({
      ...data,
      name: selectedProduct.name,
      category: selectedProduct.categories[0],
      subCategory: selectedProduct.categories[1],
      buyPrice: selectedProduct.company_price,
      sellPrice: selectedProduct.price,
      creator: selectedProduct.manufacturer_company,
      description: selectedProduct.body,
      quantity: selectedProduct.repository_quantity,
      is_hide: selectedProduct.hide,
      firstImg: selectedProduct.image,
      secoundImg: selectedProduct.image2,
      thirdImg: selectedProduct.image3,
      video: selectedProduct.product_video,
    });
  }, []);

  const setDataValue = (event) => {
    if (event.target.name !== "pdffile") {
      setData({ ...data, [event.target.name]: event.target.value });
    } else {
      setPdf(event.target.files[0]);
      setData({ ...data, pdffile: event.target.files[0] });
    }
  };

  const categoryHandler = (e) => {
    setData({ ...data, category: [e.target.value] });
  };
  const subCategoryHandler = (e) => {
    setData({ ...data, subCategory: [e.target.value] });
  };

  const checkboxHandler = (event) => {
    setData({ ...data, is_hide: event.target.checked });
  };

  // set kardan img ha dar state ha
  const fileuploadHandler = async (event) => {
    if (event.target.name === "firstImg") {
      setData({
        ...data,
        firstImg: URL.createObjectURL(event.target.files[0]),
      });
      setPhoto(event.target.files[0]);
      setPhotoSend(true);
    } else if (event.target.name === "secoundImg") {
      setData({
        ...data,
        secoundImg: URL.createObjectURL(event.target.files[0]),
      });
      setPhoto1(event.target.files[0]);
      setPhoto1Send(true);
    } else if (event.target.name === "thirdImg") {
      setData({
        ...data,
        thirdImg: URL.createObjectURL(event.target.files[0]),
      });
      setPhoto2(event.target.files[0]);
      setPhoto2Send(true);
    } else if (event.target.name === "video") {
      setData({ ...data, video: URL.createObjectURL(event.target.files[0]) });
      setVideo(event.target.files[0]);
      setVideoSend(true);
    }
  };
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
  const clickHandler = (event) => {
    if (event.target.id === "firstImgBtn") {
      setData({ ...data, firstImg: null });
      setPhotoSend(true);
    } else if (event.target.id === "secoundImgBtn") {
      setData({ ...data, secoundImg: null });
      setPhoto1Send(true);
    } else if (event.target.id === "thirdImgBtn") {
      setData({ ...data, thirdImg: null });
      setPhoto2Send(true);
    } else if (event.target.id === "videoBtn") {
      setData({ ...data, video: null });
      setVideoSend(true);
    }
  };
  //

  const sendData = (event) => {
    const formData = new FormData();
    photoSend
      ? data.firstImg && photo
        ? formData.append("image", photo, photo.name)
        : formData.append("image", "")
      : null;
    photo1Send
      ? data.secoundImg && photo1
        ? formData.append("image2", photo1, photo1.name)
        : formData.append("image2", "")
      : null;
    photo2Send
      ? data.thirdImg && photo2
        ? formData.append("image3", photo2, photo2.name)
        : formData.append("image3", "")
      : null;
    videoSend
      ? data.video && video
        ? formData.append("product_video", video, video.name)
        : formData.append("product_video", "")
      : null;
    formData.append("name", data.name);
    formData.append(
      "categories",
      data.category.id ? data.category.id : data.category
    );
    formData.append(
      "categories",
      data.subCategory.id ? data.subCategory.id : data.subCategory
    );
    formData.append("repository_quantity ", data.quantity);
    formData.append("body", data.description);
    formData.append("price", data.sellPrice);
    formData.append("company_price", data.buyPrice);
    formData.append("manufacturer_company", data.creator);
    data.pdffile && formData.append("pdf_file", pdf, pdf.name);
    formData.append("hide", data.is_hide);
    fetch(`${MainLink}/products/u/${id}/`, {
      method: "PUT",
      body: formData,
    }).then((response) => {
      if (response.status !== 400) {
        response.json().then((json) => {
          toast.success("محصول با موفقیت ویرایش شد");
          setTimeout(() => {
            redirect.push("/products");
          }, 5000);
        });
      } else {
        response.json().then((json) => {
          // toast.error("موارد وارد شده صحیح نمیباشد")
          console.log(json);
        });
      }
    });
  };

  return (
    <div className="col-md-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">ایجاد محصول</h4>
          <div className="forms-sample">
            <div className="form-group">
              <label htmlFor="exampleInputName">نام محصول</label>
              <input
                type="text"
                name="name"
                className="form-control form-control-lg"
                id="exampleInputName"
                placeholder="نام محصول"
                value={data.name}
                onChange={setDataValue}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputCategory">دسته بندی</label>
              <select
                name="category"
                id="exampleInputCategory"
                className="form-control form-control-lg"
                onChange={(e) => categoryHandler(e)}
              >
                <option selected hidden value={data.category.id}>
                  {data.category.name}
                </option>
                {categoriesList.map(
                  (item) =>
                    item.parent.length > 0 && (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    )
                )}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputSubCategory">زیر شاخه</label>
              <select
                name="subcategory"
                id="exampleInputSubCategory"
                className="form-control form-control-lg"
                onChange={(e) => subCategoryHandler(e)}
              >
                <option selected hidden value={data.subCategory.id}>
                  {data.subCategory.name}
                </option>
                {data.category.id
                  ? data.category &&
                    categoriesList
                      .find((item) => item.id == data.category.id)
                      .parent.map((data) => (
                        <option key={data.id} value={data.id}>
                          {data.name}
                        </option>
                      ))
                  : data.category &&
                    categoriesList
                      .find((item) => item.id == data.category)
                      .parent.map((data) => (
                        <option key={data.id} value={data.id}>
                          {data.name}
                        </option>
                      ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputquantity">تعداد</label>
              <input
                name="quantity"
                type="text"
                className="form-control form-control-lg"
                id="exampleInputquantity"
                placeholder="تعداد "
                value={data.quantity}
                onChange={setDataValue}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputBuyPrice">قیمت خرید</label>
              <input
                name="buyPrice"
                type="text"
                className="form-control form-control-lg"
                id="exampleInputBuyPrice"
                placeholder="قیمت خرید"
                value={data.price}
                onChange={setDataValue}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputSellPrice">قیمت فروش</label>
              <input
                name="sellPrice"
                type="text"
                className="form-control form-control-lg"
                id="exampleInputSellPrice"
                placeholder="قیمت فروش"
                value={data.buyPrice}
                onChange={setDataValue}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputCreator">تولید کننده</label>
              <input
                name="creator"
                type="text"
                className="form-control form-control-lg"
                id="exampleInputCreator"
                placeholder="تولید کننده"
                value={data.creator}
                onChange={setDataValue}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPdffile">آپلود فایل </label>
              <input
                name="pdffile"
                type="file"
                className="form-control form-control-lg"
                id="exampleInputPdffile"
                placeholder="اپلود فایل "
                onChange={setDataValue}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputvideo">آپلود ویدیو </label>
              <input
                name="video"
                type="file"
                className="form-control form-control-lg"
                id="exampleInputPvideo"
                placeholder="اپلود ویدیو "
                onChange={fileuploadHandler}
              />
              {data.video ? <label
                id="videoBtn"
                onClick={clickHandler}
                style={{ marginTop: "15px", cursor: "pointer" }}
                className="badge badge-danger"
              >
                حذف ویدیو
              </label> : null}
            </div>
            <div className="form-group">
              <label htmlFor="exampleTextarea">توضیحات</label>
              <textarea
                name="description"
                className="form-control form-control-lg"
                id="exampleTextarea"
                rows="10"
                value={data.description}
                onChange={setDataValue}
              ></textarea>
            </div>
            <div className="form-check form-check-flat">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="is_hide"
                  checked={data.is_hide}
                  value={data.is_hide}
                  onChange={checkboxHandler}
                />{" "}
                محصول مخفی <i className="input-helper"></i>
              </label>
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
              {data.secoundImg ? (
                <div className={styles.secoundImg}>
                  <img src={data.secoundImg} alt="Thumb" />
                  <button id="secoundImgBtn" onClick={clickHandler}>
                    حدف عکس
                  </button>
                </div>
              ) : (
                <div className={styles.imgBox}>
                  <input
                    style={{ display: "none" }}
                    name="secoundImg"
                    onChange={fileuploadHandler}
                    type="file"
                    ref={secoundFileUpload}
                  />
                  <section
                    onClick={() => secoundHandleUpload()}
                    className={styles.divImg}
                  >
                    <p>کلیک برای آپلود عکس</p>
                  </section>
                </div>
              )}
              {data.thirdImg ? (
                <div className={styles.thirdImg}>
                  <img src={data.thirdImg} alt="Thumb" />
                  <button id="thirdImgBtn" onClick={clickHandler}>
                    حدف عکس
                  </button>
                </div>
              ) : (
                <div className={styles.imgBox}>
                  <input
                    style={{ display: "none" }}
                    name="thirdImg"
                    onChange={fileuploadHandler}
                    type="file"
                    ref={thridFileUpload}
                  />
                  <section
                    onClick={() => thirdHandleUpload()}
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

export default EditProducts;
