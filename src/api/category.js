import request from '@/utils/request'
//获取分类列表
export function getCategoryList() {
  return request({
    url: `category/list`,
    method: 'get'
  })
}

export function getCategoryById(id) {
  return request({
    url: `category/${id}`,
    method: 'get'
  })
}

export function queryCategoryList(name) {
  return request({
    url: `category/list/${name}`,
    method: 'get'
  })
}
export function editCategory(category) {
  return request({
    url: `category/`,
    method: 'put',
    data: category
  })
}
export function addCategory(category) {
  return request({
    url: `category/`,
    method: 'post',
    data: category
  })
}


export function deleteCategory(id) {
  return request({
    url: `category/${id}`,
    method: 'delete',
  })
}