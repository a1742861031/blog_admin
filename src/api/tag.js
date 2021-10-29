import request from '@/utils/request'

//获取标签列表
export function getTagList() {
  return request({
    url: `tag/list/`,
    method: 'get'
  })
}
//通过关键词查找
export function queryTag(name) {
  return request({
    url: `tag/list/${name}`,
    method: 'get'
  })
}
//删除标签
export function deleteTag(id) {
  return request({
    url: `/tag/${id}`,
    method: 'delete'
  })
}
//添加标签
export function addTag(tag) {
  return request({
    url: `/tag`,
    method: 'post',
    data: tag
  })
}
//修改标签
export function editTag(tag) {
  return request({
    url: `/tag`,
    method: 'put',
    data: tag
  })
}
//通过id获取标签
export function getTagById(id) {
  return request({
    url: `tag/${id}`,
    method: 'get',
  })
}