import { SEARCH, RECOMENDATIONS } from '@/consts';

export default {
  [SEARCH]: 'search?part=snippet&q=:title:&type=video&pageToken=:pageToken:&key=:googleApiKey:',
  [RECOMENDATIONS]: 'videos?part=snippet&id=:id:&key=:googleApiKey:',
};