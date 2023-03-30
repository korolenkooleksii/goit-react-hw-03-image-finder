import {LoadMore} from './Button.styled';

const Button = ({ nextPage }) => {
  return <LoadMore type="burron" onClick={nextPage}>Load more</LoadMore>;
};

export default Button;