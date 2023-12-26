import { message } from 'antd';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { netWorkErrMap, authErrMap } from './config.ts';

// 添加token
export const handleRequestHeader = (config: InternalAxiosRequestConfig<any>, otherConfig: object) => {
  return { ...config, ...otherConfig };
};
// 添加限权
export const handleAuth = (config: InternalAxiosRequestConfig<any>) => {
  config.headers['Authorization'] = localStorage.getItem('token') || '';
  return config;
};

// 匹配网络错误
export const handleNetErr = (error: { response: { status: string } }) => {
  const { status } = error.response;
  const errMsg = netWorkErrMap[status] || '未知错误';
  //显示错误
  message.error({ content: errMsg, duration: 2 });
};
// 匹配授权错误
export const handleAuthError = (res: AxiosResponse<any>) => {
  const { code } = res.data;
  const errMsg = authErrMap[code] || '未知错误';
  message.error({ content: errMsg, duration: 2 });

  // 登出
};

/**
 * @message: await错误处理
 * @param {Promise} promise
 * @return {Array} [值,错误]
 * @since: 2023-07-09 16:41:23
 */
export function cleanRes(promise: Promise<any>) {
  return promise.then(
    data => [data, null],
    err => [null, err]
  );
}
/**
 * @message: obj转querystring ?a=1&b=2
 * @param {object} obj
 * @return {string}
 * @since: 2023-12-16 17:04:45
 */
export const getQueryString = (obj: object | undefined) => {
  if (obj && isJsonObj(obj)) {
    return (
      '?' +
      Object.entries(obj)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    );
  }
  return '';
};

/**
 * @message: 判断谁否是可转换为json的对象
 */
function isJsonObj(obj: object) {
  try {
    JSON.stringify(obj);
    return true;
  } catch {
    return false;
  }
}
