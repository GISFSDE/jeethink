import request from '@/utils/request'

// 查询项目管理列表
export function listXm(query) {
  return request({
    url: '/hbzy/xm/list',
    method: 'get',
    params: query
  })
}

// 查询项目管理详细
export function getXm(id) {
  return request({
    url: '/hbzy/xm/' + id,
    method: 'get'
  })
}

// 新增项目管理
export function addXm(data) {
  return request({
    url: '/hbzy/xm',
    method: 'post',
    data: data
  })
}

// 修改项目管理
export function updateXm(data) {
  return request({
    url: '/hbzy/xm',
    method: 'put',
    data: data
  })
}

// 删除项目管理
export function delXm(id) {
  return request({
    url: '/hbzy/xm/' + id,
    method: 'delete'
  })
}

// 导出项目管理
export function exportXm(query) {
  return request({
    url: '/hbzy/xm/export',
    method: 'get',
    params: query
  })
}

//导入项目基本信息
export function importTemplate() {
  return request({
    url: '/hbzy/xm/importTemplate',
    method: 'get'
  })
}
