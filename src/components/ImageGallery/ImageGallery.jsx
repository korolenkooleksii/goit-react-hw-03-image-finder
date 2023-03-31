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
    if (this.props.images !== prevProps.images) {
      this.initialParam();

      console.log(
        'Вошли в первый иф, Обновили массив',
        Date.now(),
        this.state.page
      );

      this.fetchImagesWithQuery();

    } else {
      this.fetchImagesWithQuery();
    }

    // if (
    //   prevState.page !== this.state.page
    //   // this.props.images === prevProps.images &&
    // ) {
    //   console.log(
    //     'Вошли во второй иф, т.к. изменился пейдж',
    //     Date.now(),
    //     this.state.page
    //   );

    //   this.fetchImagesWithQuery();
    // }
  }

  fetchImagesWithQuery = async () => {
    try {
      this.setState({ isLoading: true });

      const imagesArrey = await fetchImages(this.props.images, this.state.page);

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
