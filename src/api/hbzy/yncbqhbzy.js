import request from '@/utils/request'

// 查询永农储备区后备资源列表
export function listYncbqhbzy(query) {
  return request({
    url: '/hbzy/yncbqhbzy/list',
    method: 'get',
    params: query
  })
}

// 查询永农储备区后备资源详细
export function getYncbqhbzy(bsm) {
  return request({
    url: '/hbzy/yncbqhbzy/' + bsm,
    method: 'get'
  })
}

// 新增永农储备区后备资源
export function addYncbqhbzy(data) {
  return request({
    url: '/hbzy/yncbqhbzy',
    method: 'post',
    data: data
  })
}

// 修改永农储备区后备资源
export function updateYncbqhbzy(data) {
  return request({
    url: '/hbzy/yncbqhbzy',
    method: 'put',
    data: data
  })
}

// 删除永农储备区后备资源
export function delYncbqhbzy(bsm) {
  return request({
    url: '/hbzy/yncbqhbzy/' + bsm,
    method: 'delete'
  })
}

// 导出永农储备区后备资源
export function exportYncbqhbzy(query) {
  return request({
    url: '/hbzy/yncbqhbzy/export',
    method: 'get',
    params: query
  })
}