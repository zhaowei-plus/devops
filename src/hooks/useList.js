import { useState } from 'react'
import request from '@/request'

/**
 * useList hook，用于Table列表数据搜索
 *
 * @param {string} url 请求地址
 * @param {object} initialParams 初始化参数，初始化时需要有搜索参数，并且在后续搜索中可以被修改的参数
 * @param {object} staticParams 静态参数，每次搜索都固定不变的参数
 * @param {boolean} initialLoading 默认初始化就开启loading
 * */
export default (
  url,
  initialParams = {},
  staticParams = {},
  initialLoading = true
) => {
  const [params, setParams] = useState({
    ...initialParams,
    ...staticParams,
  })
  const [loading, setLoading] = useState(initialLoading)
  const [dataSource, setDataSource] = useState([])

  // 分页器配置
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
    showQuickJumper: true,
    showSizeChanger: true, // 显示页面条数
    showTotal: total => `共${total}条`,
  })

  /**
   * 查询列表信息：
   *  1 刷新时，分页器不变，搜索参数不变
   *  2 查询时，分页器清零，搜索参数改变
   * */
  const onRefresh = (newPagination = pagination, newParams = params) => {
    const { current, pageSize } = newPagination
    setLoading(true)

    // 自定义请求方式与返回内容
    return request
      .get(url, {
        pageIndex: current,
        currentPage: current,
        page: current,
        pageSize,
        pageCount: pageSize,
        ...newParams,
        ...staticParams,
      })
      .then(res => {
        const { data = {} } = res
        const dataSource = data.rows || data.list
        const total = data.totalCount || data.count || data.total
        setDataSource(dataSource)
        setPagination({
          ...newPagination,
          total,
          current,
          showTotal: total => `共${total}条`
        })
        setParams({
          ...newParams,
          ...staticParams,
        })
        return {
          dataSource,
          total
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  /**
   * 参数查询列表信息
   * */
  const onSearch = (params = {}) => {
    return onRefresh({ ...pagination, current: 1 }, params)
  }

  /**
   * 分页查询列表信息
   * */
  const onChange = pagination => {
    return onRefresh(pagination)
  }

  return {
    params,
    onSearch,
    onRefresh,
    loading,

    table: {
      rowKey: 'id',
      pagination,
      dataSource,
      onChange,
    }
  }
}
