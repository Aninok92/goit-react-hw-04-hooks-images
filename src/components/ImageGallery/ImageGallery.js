import React, { useState, useEffect } from "react";

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

export default function ImageGallery({ query, onSelectImage }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [_, setError] = useState(null);

  useEffect(() => {
    onChangeQuery();
  }, [query]);

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus(Status.PENDING);

    fetchApi
      .fetchImage(query, page)
      .then((images) => {
        setImages((prevImages) => [...prevImages, ...images]);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      })
      .finally(() => {
        if (page > 1) {
          scroll();
        }
      });
  }, [page, query]);

  const onChangeQuery = () => {
    setPage(1);
    setImages([]);
    setError(null);
  };

  const updatePage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  if (status === Status.IDLE) {
    return <> </>;
  }
  if (status === Status.PENDING) {
    return <LoaderContainer />;
  }
  if (status === Status.RESOLVED) {
    return (
      <>
        <ul className={s.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              onSelect={() => onSelectImage(largeImageURL)}
            />
          ))}
        </ul>
        {images.length !== 0 && <Button onClick={updatePage} />}
      </>
    );
  }
  if (status === Status.REJECTED) {
    return toast.error("no images for your search");
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
