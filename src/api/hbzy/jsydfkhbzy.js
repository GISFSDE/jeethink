import request from '@/utils/request'

// 查询建设用地复垦列表
export function listJsydfkhbzy(query) {
  return request({
    url: '/hbzy/jsydfkhbzy/list',
    method: 'get',
    params: query
  })
}

// 查询建设用地复垦详细
export function getJsydfkhbzy(bsm) {
  return request({
    url: '/hbzy/jsydfkhbzy/' + bsm,
    method: 'get'
  })
}

// 新增建设用地复垦
export function addJsydfkhbzy(data) {
  return request({
    url: '/hbzy/jsydfkhbzy',
    method: 'post',
    data: data
  })
}

// 修改建设用地复垦
export function updateJsydfkhbzy(data) {
  return request({
    url: '/hbzy/jsydfkhbzy',
    method: 'put',
    data: data
  })
}

// 删除建设用地复垦
export function delJsydfkhbzy(bsm) {
  return request({
    url: '/hbzy/jsydfkhbzy/' + bsm,
    method: 'delete'
  })
}

// 导出建设用地复垦
export function exportJsydfkhbzy(query) {
  return request({
    url: '/hbzy/jsydfkhbzy/export',
    method: 'get',
    params: query
  })
}