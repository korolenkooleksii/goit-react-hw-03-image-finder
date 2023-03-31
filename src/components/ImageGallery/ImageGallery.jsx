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

  componentDidUpdate(prevProps, prevState) {
    const value = this.props.images;

    if (value !== prevProps.images) {
      this.setState({ currentArray: [], page: 1 });

      // console.log(this.state.page);
      // console.log(this.props.images);
      // console.log(this.state.currentArray);

      this.fetchImagesWithQuery();
    }
  }

  fetchImagesWithQuery = async () => {
    try {
      this.setState({ isLoading: true });

      // console.log('1', this.state.page);
      // console.log(this.props.images);
      // console.log(this.state.currentArray);

      const imagesArrey = await fetchImages(this.state.page, this.props.images);

      // console.log('2', this.state.page);
      // console.log(this.props.images);
      // console.log(this.state.currentArray);

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

      this.setState(({ currentArray, page }) => ({
        currentArray: [...currentArray, ...imagesArrey],
        isLoading: false,
        page: page + 1,
      }));
    } catch (error) {
      this.setState({ error: true, isLoading: false });
    }
  };

  nextPage = () => this.fetchImagesWithQuery();

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
        {disabled && <Button nextPage={this.nextPage} />}
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
