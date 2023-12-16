interface ErrMap {
  [key: string]: string;
}

// 请求配置
export const serviceConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  useTokenAuthorization: false, //开启token验证
  timeout: 10000,
  withCredentials: false
};

// 网络错误配置
export const netWorkErrMap: ErrMap = {
  '302': '接口重定向了',
  '400': '参数不正确!',
  '401': '您未登录，或者登录已经超时，请先登录！',
  '403': '您没有权限操作!',
  '404': `请求地址出错!`,
  '405': '请求方法不被允许!',
  '408': '请求超时！',
  '409': '系统已存在相同数据！',
  '500': '服务器内部错误！',
  '501': '服务未实现！',
  '502': '网关错误！',
  '503': '服务不可用！',
  '504': '服务暂时无法访问，请稍后再试！',
  '505': 'HTTP 版本不受支持！'
};

export const authErrMap: ErrMap = {
  '10031': '登录失效，需要重新登录', // token 失效
  '10032': '您太久没登录，请重新登录~', // token 过期
  '10033': '账户未绑定角色，请联系管理员绑定角色',
  '10034': '该用户未注册，请联系管理员注册用户',
  '10035': 'code 无法获取对应第三方平台用户',
  '10036': '该账户未关联员工，请联系管理员做关联',
  '10037': '账号已无效',
  '10038': '账号未找到'
};
