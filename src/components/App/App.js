import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Container from "../Container/Container";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery.js";
import Modal from "../Modal/Modal";

function App() {
  const [query, setQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const handleFormSubmit = (value) => {
    setQuery(value);
  };

  const handleSelectImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => setSelectedImage("");

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery query={query} onSelectImage={handleSelectImage} />
      {selectedImage && (
        <Modal selectImage={selectedImage} onClose={handleCloseModal} />
      )}
      <Toaster position="top-right" />
    </Container>
  );
}

export default App;
