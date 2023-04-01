import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import fetchImages from 'Api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
import PropTypes from 'prop-types';
class ImageGallery extends Component {
  state = {
    currentArray: [],
    page: 1,
    error: null,
    isLoading: false,
    disabled: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const value = this.props.image;

    if (
      value === prevProps.image &&
      prevState.page !== this.state.page &&
      this.state.page === 1
    ) {
      this.fetchImagesWithQuery(1, value); // выполняется после сброса с новым value
    }

    if (value !== prevProps.image && this.state.page !== 1) {
      this.setState({ currentArray: [], page: 1 }); // сброс параметров
    }

    if (value !== prevProps.image && this.state.page === 1) {
      this.fetchImagesWithQuery(1, value); // выполняется при первом запросе
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.fetchImagesWithQuery(); // выполняется при смене page
    }
  }

  fetchImagesWithQuery = async () => {
    // const { page, image } = this.state;
    try {
      this.setState({ isLoading: true });

      const imagesArrey = await fetchImages(this.state.page, this.props.image);

      if (imagesArrey.length === 0) {
        toast.info('There are no images for your request.');
        this.setState({
          currentArray: [],
          page: 1,
          isLoading: false,
          disabled: false,
        });
        return;
      }

      if (imagesArrey.length === 12) {
        this.setState({ disabled: true });
      } else {
        this.setState({ disabled: false });
      }

      this.setState(({ currentArray }) => ({
        currentArray: [...currentArray, ...imagesArrey],
        isLoading: false,
      }));
    } catch (error) {
      this.setState({
        currentArray: [],
        page: 1,
        error: true,
        isLoading: false,
        disabled: false,
      });
    }
  };

  updatePage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { currentArray, isLoading, disabled, error } = this.state;
    return (
      <>
        <Gallery>
          {currentArray.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              webURL={webformatURL}
              largeURL={largeImageURL}
              tags={tags}
              toggleModal={this.toggleModal}
            />
          ))}
        </Gallery>
        {isLoading && <Loader />}
        {disabled && <Button nextPage={this.updatePage} />}
        {error && toast.error('Image loading error. Restart the application.')}
      </>
    );
  }
}

ImageGallery.propTypes = {
  state: PropTypes.exact({
    currentArray: PropTypes.array,
  }),
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  id: PropTypes.string,
};

export default ImageGallery;
