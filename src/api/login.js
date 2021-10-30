import request from '@/utils/request'

export function loginByUsername(username, password) {
    const data = {
        username,
        password
    }
    return request({
        url: 'http://localhost:8000/user/login',
        method: 'post',
        data:data
    })
}

export function logout() {
    return request({
        url: '/login/logout',
        method: 'post'
    })
}

export function getUserInfo(token) {
    return request({
        url: 'http://localhost:8000/user/getUerInfo',
        method: 'get',
        params: { token }
    })
}

