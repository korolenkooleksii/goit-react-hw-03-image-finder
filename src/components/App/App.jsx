import { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';


class App extends Component {
  state = {
    searchValue: '',
  };

  creatSerchText = value => {
    this.setState({ searchValue: value });
  };

  render() {
    return (
      <Container>
        <Searchbar handleSerch={this.creatSerchText} />
        <ImageGallery images={this.state.searchValue} />
        <ToastContainer theme="colored" />
      </Container>
    );
  }
}

export default App;
