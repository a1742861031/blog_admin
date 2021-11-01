import request from '@/utils/request'
//添加博客
export function addBlog(blogInfo) {
  return request({
    url: `/blog`,
    method: 'post',
    data: blogInfo
  })
}
//获取博客列表
export function getBlogList(query) {
  return request({
    url: `/blog/list`,
    method: 'get',
    params: query
  })
}
export function deleteBlog(blogId) {
  return request({
    url: `/blog/${blogId}`,
    method: 'delete',
  })
}
//根据id获取博客信息
export function getBlogInfo(blogId) {
  return request({
    url: `/blog/${blogId}`,
    method: 'get',
  })
}
//修改博客信息
export function editBlogInfo(blogInfo) {
  return request({
    url: `/blog`,
    method: 'put',
    data: blogInfo
  })
}
//根据id获取博客信息
export function getBlogName(blogId) {
  return request({
    url: `/blog/name/${blogId}`,
    method: 'get',
  })
}
