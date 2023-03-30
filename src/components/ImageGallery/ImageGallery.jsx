import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import fetchImages from 'components/Api/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';

class ImageGallery extends Component {
  state = {
    currentArray: [],
    page: 1,
    error: null,
    isLoading: false,
    disabled: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.images !== prevProps.images) {
      this.setState({ currentArray: [], page: 1 });
    }

    if (
      prevState.page !== this.state.page ||
      this.props.images !== prevProps.images
    ) {
      try {
        this.setState({ isLoading: true });

        const imagesArrey = await fetchImages(
          this.props.images,
          this.state.page
        );

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
        console.log(error);
      }
    }
  }

  updatePage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { currentArray } = this.state;
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
            />
          ))}
        </Gallery>
        {this.state.isLoading && <Loader />}
        {this.state.disabled && <Button nextPage={this.updatePage} />}
      </>
    );
  }
}

export default ImageGallery;
