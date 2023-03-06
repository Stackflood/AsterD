const api = 'https://api.themoviedb.org/3';

// set it up in .env file.
const key = '024d69b581633d457ac58359146c43f6';

const defaultContent = {
  api_key: key,
  language: 'en-US',
};

function queryString(obj) {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join('&');
}

export default {
  async request(url, content = {}) {
    try {
      const obj = {...defaultContent, ...content};
      const response = await fetch(`${api}/${url}?${queryString(obj)}`);
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  },
};
