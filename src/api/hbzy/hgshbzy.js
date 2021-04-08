import request from '@/utils/request'

// 查询旱改水后备资源列表
export function listHgshbzy(query) {
  return request({
    url: '/hbzy/hgshbzy/list',
    method: 'get',
    params: query
  })
}

// 查询旱改水后备资源详细
export function getHgshbzy(bsm) {
  return request({
    url: '/hbzy/hgshbzy/' + bsm,
    method: 'get'
  })
}

// 新增旱改水后备资源
export function addHgshbzy(data) {
  return request({
    url: '/hbzy/hgshbzy',
    method: 'post',
    data: data
  })
}

// 修改旱改水后备资源
export function updateHgshbzy(data) {
  return request({
    url: '/hbzy/hgshbzy',
    method: 'put',
    data: data
  })
}

// 删除旱改水后备资源
export function delHgshbzy(bsm) {
  return request({
    url: '/hbzy/hgshbzy/' + bsm,
    method: 'delete'
  })
}

// 导出旱改水后备资源
export function exportHgshbzy(query) {
  return request({
    url: '/hbzy/hgshbzy/export',
    method: 'get',
    params: query
  })
}