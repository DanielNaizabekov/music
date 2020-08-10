import axios, { configs } from '@/api';
import urls from '@/api/urls';

function wrapUrl(method, params) {
  let url = urls[method];
  params.googleApiKey = configs.googleApiKey;

  Object.keys(params).forEach(param => {
    url = url.replace(`:${param}:`, Array.isArray(params[param]) ? params[param].join() : params[param] );
  });

  return url;
}

const actions = {
  async HTTP_GET({ commit }, { method, params, mutation, mutationData }) {
    try {
      const { data } = await axios.get(wrapUrl(method, params));

      mutation = mutation === false ? false : mutation ? mutation : method;
      mutation && commit(mutation, {data, manualData: mutationData});

      return data;
    } catch(error) {
      console.log(method, error);
      throw error;
    }
  },
};

export default actions;