import { SEARCH, RECOMENDATIONS } from '@/consts';

export const configs = {
  googleApiKey: 'AIzaSyA2L7u0EQ1_GGCXyTjmXdbc2W4Ya4v_lnc',
}

export default {
  [SEARCH]: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=:title:&type=video&pageToken=:pageToken:&key=:googleApiKey:',
  [RECOMENDATIONS]: 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=:id:&key=:googleApiKey:',
};