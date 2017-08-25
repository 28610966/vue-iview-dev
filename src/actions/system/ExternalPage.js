/**
 * Created by binwang on 17/8/24.
 */

export default {
    actions: {
        get: {
            method: 'get',
            url: (payload) => `/api/externalpage/${payload.id}`
        },
        list: {
            method: 'get',
            url: (payload) => `/api/externalpage`
        },
        save: {
            method: 'post',
            url: (payload) => `/api/externalpage`
        },
        update: {
            method: 'put',
            url: (payload) => `/api/externalpage`,
        },
        delete: {
            method: 'delete',
            url: (payload) => `/api/externalpage`,
        },
    },
    // state: {},
    // mutations: {},
    // getters: {}
}