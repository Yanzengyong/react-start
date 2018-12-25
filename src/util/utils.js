export const random = (from, to) => {
  if(!to)
  {
    to = from;
    from = 0;
  }
  return parseInt(Math.random() * (to - from) + from);
};

export const mergyApi = (api = {}, ...prefix) => {
  for(let key in api)
  {
    if(typeof api[key] === 'object')
    {
      mergyApi(api[key], ...prefix);
    }else{
      prefix.forEach((item) => api[key] = `${item}${api[key]}`);
    }
  }

  return api;
}

export const convertQueryString = (params) => {
    if(!params)
    {
      return '';
    }
    var query = '';
    for(let key in params)
    {
        if(params[key] || params[key] === 0)
        {
            if(query.indexOf('?') === -1)
            {
                query = query + `?${key}=${params[key]}`;
            }else{
                query = query + `&${key}=${params[key]}`;
            }
        }
    }
    return query;
}

export const deepCopy = (obj) => {
  if(typeof obj !== 'object' || obj === null)
  {
    return obj;
  }
  let result = obj instanceof Array ? [] : {};
  for (let key in obj) {
    result[key] = deepCopy(obj[key]);
  }

  return result;
}

export const formatOracleDate = (date) => {
  return date;
}
