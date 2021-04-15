import request from '@/utils/request'

// 查询部门列表
export function listDept(query) {
  return request({
    url: '/system/formtype/list',
    method: 'get',
    params: query
  })
}

