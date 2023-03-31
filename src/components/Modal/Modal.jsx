import { Component } from 'react';
import { createPortal } from 'react-dom';
import { BackDrop, Content } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClicl = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <BackDrop onClick={this.handleBackDropClicl}>
        <Content>{this.props.children}</Content>
      </BackDrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element,
};

export default Modal;
