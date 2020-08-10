import axios from 'axios';

const baseURL = 'https://www.googleapis.com/youtube/v3';
export const configs = {
  googleApiKey: 'AIzaSyA2L7u0EQ1_GGCXyTjmXdbc2W4Ya4v_lnc',
}

export default axios.create({
  baseURL,
});