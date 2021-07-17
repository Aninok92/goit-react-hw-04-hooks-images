import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.scss";

const ImageGalleryItem = ({ webformatURL, onSelect }) => {
  return (
    <li className={s.ImageGalleryItem} onClick={onSelect}>
      <img src={webformatURL} alt="" className={s.ImageGalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.defaultProps = {
  onSelect: () => null,
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};

export default ImageGalleryItem;
