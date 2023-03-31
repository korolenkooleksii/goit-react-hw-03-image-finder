import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import fetchImages from 'components/Api/Api';
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

  initialParam = () => {
    this.setState({ currentArray: [], page: 1 });
    console.log('Сбросили параметры');
  };

  async componentDidUpdate(prevProps, prevState) {
    const value = this.props.images;
    
      if (value !== prevProps.images) {
        if (value) this.initialParam();
        this.fetchImagesWithQuery();
        console.log('1 IF this.state.page  - ', this.state.page);
        console.log('1 value - ', value);
      }

    if (
      prevState.page !== this.state.page &&
      value === prevProps.images
    ) {
      console.log('2 IF this.state.page', this.state.page);
      console.log('2 value - ', value);

      this.fetchImagesWithQuery();
    }
  }

  fetchImagesWithQuery = async (
    page = this.state.page,
    val = this.props.images
  ) => {
    try {
      this.setState({ isLoading: true });

      const imagesArrey = await fetchImages(page, val);

      if (imagesArrey.length === 0) {
        toast.info('There are no images for your request.');
        this.setState({ isLoading: false });
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
      this.setState({ error: true, isLoading: false });
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
