const ImageGalleryItem = ({ id, webURL, largeURL, tags }) => {

  return (
    <li>
      <img src={ webURL } alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;

/*
id - уникальный идентификатор
webformatURL - ссылка на маленькое изображение для списка карточек
largeImageURL - ссылка на большое изображение для модального окна
*/
