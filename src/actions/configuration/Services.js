/**
 * Created by binwang on 17/8/25.
 */

export default {
    actions: {
        get: {
            method: 'get',
            url: (payload) => `/api/services/${payload.id}`
        },
        list: {
            method: 'get',
            url: (payload) => `/api/services`
        },
        save: {
            method: 'post',
            url: (payload) => `/api/services`
        },
        update: {
            method: 'put',
            url: (payload) => `/api/services`,
        },
        delete: {
            method: 'delete',
            url: (payload) => `/api/services`,
        },
    },
    // state: {},
    // mutations: {},
    // getters: {}
}