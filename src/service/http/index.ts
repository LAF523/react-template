import service from './axios.ts';
import { getQueryString, cleanRes } from './httpTools.ts';

// 封装get,post,put等方法
export const get = (url: string, query: object | undefined, other = {}) => {
  return cleanRes(
    service({
      url: url + getQueryString(query),
      method: 'get',
      ...other
    })
  );
};

export const post = (url: string, data: object, other = {}) => {
  return cleanRes(
    service({
      url: url,
      method: 'post',
      data,
      ...other
    })
  );
};

// TODO: 其他方法同post
