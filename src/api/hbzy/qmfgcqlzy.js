import request from '@/utils/request'

// 查询千亩方万亩方工程潜力资源列表
export function listQmfgcqlzy(query) {
  return request({
    url: '/hbzy/qmfgcqlzy/list',
    method: 'get',
    params: query
  })
}

// 查询千亩方万亩方工程潜力资源详细
export function getQmfgcqlzy(bsm) {
  return request({
    url: '/hbzy/qmfgcqlzy/' + bsm,
    method: 'get'
  })
}

// 新增千亩方万亩方工程潜力资源
export function addQmfgcqlzy(data) {
  return request({
    url: '/hbzy/qmfgcqlzy',
    method: 'post',
    data: data
  })
}

// 修改千亩方万亩方工程潜力资源
export function updateQmfgcqlzy(data) {
  return request({
    url: '/hbzy/qmfgcqlzy',
    method: 'put',
    data: data
  })
}

// 删除千亩方万亩方工程潜力资源
export function delQmfgcqlzy(bsm) {
  return request({
    url: '/hbzy/qmfgcqlzy/' + bsm,
    method: 'delete'
  })
}

// 导出千亩方万亩方工程潜力资源
export function exportQmfgcqlzy(query) {
  return request({
    url: '/hbzy/qmfgcqlzy/export',
    method: 'get',
    params: query
  })
}