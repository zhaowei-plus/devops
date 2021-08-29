import axios from 'axios'
import { message } from 'antd'

axios.interceptors.request.use(config => {
  return config
})

axios.interceptors.response.use(response => {
  const { data, config = {} } = response
  const { notify = true } = config
  if (data.success === true || data.code === 200) {
    return data
  }
  // 报错
  if ((data?.msg || data?.message || data?.errorMsg) && notify) {
    message.error(data?.msg || data?.message || data?.errorMsg)
  }
  // 无权限
  if ([100, 403, 602].includes(data.code)) {
    message.warn('无权限')
    location.hash = '/login'
    return Promise.reject()
  }
  return Promise.reject()
})

export default {
  get(url, param, extra = {}) {
    return axios.get(url, { params: param, ...extra })
  },
  post(url, param, extra = {}) {
    return axios.post(url, param, extra)
  }
}

