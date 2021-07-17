import { Component } from "react";
import { Toaster } from "react-hot-toast";
import Container from "../Container/Container";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery.js";
import Modal from "../Modal/Modal";

class App extends Component {
  state = {
    imageName: null,
    selectedImage: null,
  };

  handleFormSubmit = (value) => {
    this.setState({ imageName: value });
  };

  handleSelectImage = (imageUrl) => this.setState({ selectedImage: imageUrl });

  handleCloseModal = () => this.setState({ selectedImage: null });

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          imageName={this.state.imageName}
          onSelectImage={this.handleSelectImage}
        />
        {this.state.selectedImage && (
          <Modal
            selectImage={this.state.selectedImage}
            onClose={this.handleCloseModal}
          />
        )}
        <Toaster position="top-right" />
      </Container>
    );
  }
}

export default App;
