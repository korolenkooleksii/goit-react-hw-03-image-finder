import axios from 'axios';

const KEY = '33551348-9d68666fc5ce894df97e3b30d';
const ENDPOINT = 'https://pixabay.com/api/';

const fetchImages = async (val, page) => {
  const URL = `${ENDPOINT}?key=${KEY}`;
  const options = {
    params: {
      q: val,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    },
  };
  const response = await axios.get(URL, options);

  return response.data.hits;
};

export default fetchImages;

