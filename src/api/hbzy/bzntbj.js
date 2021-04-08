import request from '@/utils/request'

// 查询标准农田补建后备资源列表
export function listBzntbj(query) {
  return request({
    url: '/hbzy/bzntbj/list',
    method: 'get',
    params: query
  })
}

// 查询标准农田补建后备资源详细
export function getBzntbj(id) {
  return request({
    url: '/hbzy/bzntbj/' + id,
    method: 'get'
  })
}

// 新增标准农田补建后备资源
export function addBzntbj(data) {
  return request({
    url: '/hbzy/bzntbj',
    method: 'post',
    data: data
  })
}

// 修改标准农田补建后备资源
export function updateBzntbj(data) {
  return request({
    url: '/hbzy/bzntbj',
    method: 'put',
    data: data
  })
}

// 删除标准农田补建后备资源
export function delBzntbj(id) {
  return request({
    url: '/hbzy/bzntbj/' + id,
    method: 'delete'
  })
}

// 导出标准农田补建后备资源
export function exportBzntbj(query) {
  return request({
    url: '/hbzy/bzntbj/export',
    method: 'get',
    params: query
  })
}

//导入标准农田补建后备资源
export function importTemplate() {
  return request({
    url: '/hbzy/bzntbj/importTemplate',
    method: 'get'
  })
}
