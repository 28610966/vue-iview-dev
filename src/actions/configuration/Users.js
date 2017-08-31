/**
 * Created by binwang on 17/8/26.
 */

export default {
    actions: {
        login: {
            method: 'get',
            url: (payload) => `/api/auth`,
            // format: (res) => {
            //     return {data1: res.data, loading: false, type: 'login'}
            // }
        },
        loginUser: {
            method: 'get',
            url: (payload) => `/api/auth/user`,
            // format: (res) => {
            //     return {data: res.data, loading: false, type: 'loginUser'}
            // }
        },
        get: {
            method: 'get',
            url: (payload) => `/api/users/${payload.id}`
        },
        list: {
            method: 'get',
            url: (payload) => `/api/users`
        },
        save: {
            method: 'post',
            url: (payload) => `/api/users`
        },
        update: {
            method: 'put',
            url: (payload) => `/api/users`,
        },
        delete: {
            method: 'delete',
            url: (payload) => `/api/users`,
        },
    },
    // state: {},
    // mutations: {},
    // getters: {}
}