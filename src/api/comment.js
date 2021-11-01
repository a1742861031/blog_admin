import request from '@/utils/request'
//获取评论列表
export function getCommentList(current, limit) {
  return request({
    url: `comment/query/${current}/${limit}`,
    method: 'get'
  })
}
export function queryComment(current, limit, blogId) {
  return request({
    url: `comment/query/${current}/${limit}/${blogId}`,
    method: 'get'
  })
}
export function verifyComment(id) {
  return request({
    url: `comment/verify/${id}`,
    method: 'get'
  })
}
export function deleteComment(id) {
  return request({
    url: `comment/${id}`,
    method: 'delete'
  })
} //修改评论信息
export function editComment(comment) {
  return request({
    url: `comment`,
    method: 'put',
    data: comment
  })
}