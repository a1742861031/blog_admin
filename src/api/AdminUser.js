import request from '@/utils/request'
//首页信息展示
export function getIndexPageData() {
  return request({
    url: `index/index`,
    method: 'get',
  })
}
export function getIndexBlog(limit) {
  return request({
    url: `index/index/blog/${limit}`,
    method: 'get',
  })
}
export function editUserInfo(userInfo) {
  return request({
    url: `index/editUserInfo`,
    method: 'get',
    params: userInfo
  })
}
export function getUserInfo(token) {
  return request({
    url: 'http://localhost:8000/user/getUerInfo',
    method: 'get',
    params: {
      token
    }
  })
}