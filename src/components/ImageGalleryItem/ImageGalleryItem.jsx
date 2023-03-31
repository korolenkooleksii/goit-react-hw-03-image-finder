import { Component } from 'react';
import { ItemImage, ImageWeb, ImageLarge } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
class ImageGalleryItem extends Component {
  state = {
    isShowModal: false,
  };

  toggleModal = () => {
    this.setState(({ isShowModal }) => ({
      isShowModal: !isShowModal,
    }));
  };

  render() {
    const { webURL, largeURL, tags } = this.props;
    return (
      <ItemImage>
        <ImageWeb src={webURL} alt={tags} onClick={this.toggleModal} />
        {this.state.isShowModal && (
          <Modal onClose={this.toggleModal}>
            <ImageLarge src={largeURL} alt={tags} />
          </Modal>
        )}
      </ItemImage>
    );
  }
}

ImageGalleryItem.propTypes = {
  webURL: PropTypes.string,
  largeURL: PropTypes.string,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
