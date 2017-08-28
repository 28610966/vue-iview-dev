/**
 * Created by binwang on 17/8/27.
 */

export default {
    actions: {
        get: {
            method: 'get',
            url: (payload) => `/api/alerts/${payload.id}`
        },
        list: {
            method: 'get',
            url: (payload) => `/api/alerts`
        },
        save: {
            method: 'post',
            url: (payload) => `/api/alerts`
        },
        update: {
            method: 'put',
            url: (payload) => `/api/alerts`,
        },
        delete: {
            method: 'delete',
            url: (payload) => `/api/alerts`,
        },
    },
    // state: {},
    // mutations: {},
    // getters: {}
}