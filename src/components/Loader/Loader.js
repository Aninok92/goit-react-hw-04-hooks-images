import Loader from "react-loader-spinner";
import s from "./Loader.module.scss";

const LoaderContainer = () => {
  return (
    <div className={s.loaderContainer}>
      <Loader
        type="Oval"
        color="#3f51b5"
        height={50}
        width={70}
        timeout={3000}
      />
    </div>
  );
};

export default LoaderContainer;
