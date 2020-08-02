import axios from 'axios';
import urls, { configs } from './urls';

function wrapUrl(method, params) {
  let url = urls[method];
  params.googleApiKey = configs.googleApiKey;

  Object.keys(params).forEach(param => {
    url = url.replace(`:${param}:`, params[param])
  });

  return url;
}

const actions = {
  async HTTP_GET({ commit }, { method, params, mutation }) {
    try {
      const { data } = await axios.get(wrapUrl(method, params));

      mutation = mutation === false ? false : mutation ? mutation : method;
      mutation && commit(mutation, data);

      return data;
    } catch(error) {
      console.log(method, error);
      throw error;
    }
  },
};

export default actions;