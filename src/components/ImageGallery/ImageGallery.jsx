import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import fetchImages from 'components/Api/Api';
import { RotatingLines } from 'react-loader-spinner';

class ImageGallery extends Component {
  state = {
    currentArray: [],
    page: 1,
    error: null,
    isLoading: false,
    disabled: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({ currentArray: [], page: 1 });
    }

    if (prevState.page !== this.state.page || this.props !== prevProps) {
      try {
        this.setState({ isLoading: true });

        const imagesArrey = await fetchImages(
          this.props.images,
          this.state.page
        );

        console.log(imagesArrey.length);

        if (imagesArrey.length === 12) {
          this.setState({ disabled: true });
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
        {this.state.isLoading && (
          <RotatingLines
            strokeColor="#3f51b5"
            strokeWidth="5"
            animationDuration="0.85"
            width="96"
            visible={true}
          />
        )}
        {this.state.disabled && <Button nextPage={this.updatePage} />}
      </>
    );
  }
}

export default ImageGallery;
