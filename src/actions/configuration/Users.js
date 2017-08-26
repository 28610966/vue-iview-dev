/**
 * Created by binwang on 17/8/26.
 */

export default {
    actions: {
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