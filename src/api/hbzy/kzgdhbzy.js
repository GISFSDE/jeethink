import request from '@/utils/request'

// 查询垦造耕地后备资源列表
export function listKzgdhbzy(query) {
  return request({
    url: '/hbzy/kzgdhbzy/list',
    method: 'get',
    params: query
  })
}

// 查询垦造耕地后备资源详细
export function getKzgdhbzy(bsm) {
  return request({
    url: '/hbzy/kzgdhbzy/' + bsm,
    method: 'get'
  })
}

// 新增垦造耕地后备资源
export function addKzgdhbzy(data) {
  return request({
    url: '/hbzy/kzgdhbzy',
    method: 'post',
    data: data
  })
}

// 修改垦造耕地后备资源
export function updateKzgdhbzy(data) {
  return request({
    url: '/hbzy/kzgdhbzy',
    method: 'put',
    data: data
  })
}

// 删除垦造耕地后备资源
export function delKzgdhbzy(bsm) {
  return request({
    url: '/hbzy/kzgdhbzy/' + bsm,
    method: 'delete'
  })
}

// 导出垦造耕地后备资源
export function exportKzgdhbzy(query) {
  return request({
    url: '/hbzy/kzgdhbzy/export',
    method: 'get',
    params: query
  })
}