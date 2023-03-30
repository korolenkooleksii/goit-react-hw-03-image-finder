import { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import ImageGallery from 'components/ImageGallery/ImageGallery';
// import Button from 'components/Button/Button';
import { ToastContainer } from 'react-toastify';
// import fetchImages from 'components/Api/Api';
// import { RotatingLines } from 'react-loader-spinner';

class App extends Component {
  state = {
    searchValue: '',
    // currentArray: [],
    // page: 1,
    // error: null,
    // isLoading: false,
    // disabled: false,
  };

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {}

  handleSerchSumbit = val => {
    this.setState({ searchValue: val });
  };

  render() {
    return (
      <Container>
        <Searchbar handleSerch={this.handleSerchSumbit} />
        <ImageGallery images={this.state.searchValue} />
        <ToastContainer theme="colored" />
      </Container>
    );
  }
}

export default App;
