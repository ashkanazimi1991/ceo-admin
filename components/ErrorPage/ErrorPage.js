import errorStyle from "./ErrorPage.module.css";
import Link from 'next/link'
function ErrorPage() {
  return (
    <div className={errorStyle["main"]}>
      <div className={errorStyle["container-center-horizontal"]}>
        <div className={errorStyle["errorpage screen"]}>
          <div className={errorStyle["overlap-group"]}>
            <img
              className={`${errorStyle["laptop"]} ${errorStyle["smart-layers-pointers"]}`}
              src="assets/images/ErrorPage/laptop.svg"
            />
            <img
              className={`${errorStyle["x404-error"]} ${errorStyle["smart-layers-pointers"]}`}
              src="assets/images/ErrorPage/404Error.svg"
            />
            <img
              className={`${errorStyle["emoji"]} ${errorStyle["smart-layers-pointers"]}`}
              src="assets/images/ErrorPage/emoji.svg"
            />
            <img
              className={`${errorStyle["error-logo"]} ${errorStyle["smart-layers-pointers"]}`}
              src="assets/images/ErrorPage/errorLogo.svg"
            />
            <img
              className={`${errorStyle["under-construction"]} ${errorStyle["smart-layers-pointers"]}`}
              src="assets/images/ErrorPage/underConstruction.svg"
            />
            <img
              className={`${errorStyle["setting"]} ${errorStyle["smart-layers-pointers"]}`}
              src="assets/images/ErrorPage/setting.svg"
            />
            <img
              className={`${errorStyle["search"]} ${errorStyle["smart-layers-pointers"]}`}
              src="assets/images/ErrorPage/search.svg"
            />
          </div>
        </div>
      </div>
      <Link href='/'><button>Go To Home</button></Link>
    </div>
  );
}

export default ErrorPage;
