import axios from 'axios';

const baseURL = 'https://www.googleapis.com/youtube/v3';
const googleApiKey = process.env.VUE_APP_GOOGLE_API_KEY;

export const configs = {
  googleApiKey: googleApiKey || '',
};

export default axios.create({
  baseURL,
});