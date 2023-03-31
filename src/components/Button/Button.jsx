import { LoadMore } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ nextPage }) => {
  return <LoadMore type="burron" onClick={nextPage}>Load more</LoadMore>;
};

Button.propTypes = {
  nextPage: PropTypes.func,
};

export default Button;