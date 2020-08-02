import { SEARCH } from '@/consts';

export const configs = {
  // googleApiKey: 'AIzaSyAt58MIWXJynJ37tYizKQ-nPmZCWmskErE',
  googleApiKey: 'AIzaSyA2L7u0EQ1_GGCXyTjmXdbc2W4Ya4v_lnc',
}

export default {
  [SEARCH]: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=:title:&type=:type:&pageToken=:pageToken:&key=:googleApiKey:',
};