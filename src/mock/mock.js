import Mock from 'mockjs' // 引入mockjs

import tableData from './data/tableData'
import collegeData from './data/collegeData'

Mock.mock('/data/tableData', 'get', tableData) // tableData

Mock.mock('/school/college', 'get', collegeData)