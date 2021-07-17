import { Component } from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import LoaderContainer from "../Loader/Loader";
import Button from "../Button/Button";
import s from "./ImageGallery.module.scss";
import fetchApi from "../../services/pixabay-api.js";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;
    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });
      fetchApi
        .fetchImage(nextName, this.state.page)
        .then((hits) =>
          this.setState((prevState) => ({
            images: hits,
            status: Status.RESOLVED,
            page: prevState.page + 1,
          }))
        )
        .catch((error) => this.setState({ error, status: Status.REJECTED }));
    }
    if (prevState.images !== this.state.images) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  onLoadMore = () => {
    const { page } = this.state;
    const { imageName } = this.props;
    this.setState({ status: Status.PENDING });
    fetchApi
      .fetchImage(imageName, page)
      .then((hits) =>
        this.setState((prevState) => ({
          images: [...prevState.images, ...hits],
          status: Status.RESOLVED,
          page: prevState.page + 1,
        }))
      )
      .catch((error) => this.setState({ error, status: Status.REJECTED }));
  };

  render() {
    const { images, status } = this.state;
    console.log(images);
    if (status === "idle") {
      return <> </>;
    }
    if (status === "pending") {
      return <LoaderContainer />;
    }
    if (status === "resolved") {
      return (
        <>
          <ul className={s.ImageGallery}>
            {images.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                onSelect={() => this.props.onSelectImage(largeImageURL)}
              />
            ))}
          </ul>
          {images.length !== 0 && <Button onClick={this.onLoadMore} />}
        </>
      );
    }
    if (status === "rejected") {
      return toast.error("no images for your search");
    }
  }
}

ImageGallery.defaultProps = {
  imageName: null,
  onSelectImage: () => null,
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  imageName: PropTypes.string,
  onSelectImage: PropTypes.func,
};
