/**
 * “智能巡检：任务管理”相关接口
 */
import axios from 'axios'
export default {
    // 查询任务列表
    getTest() {
        return axios({
            url: '/api/test',
            method: 'post',
        })
    },
}