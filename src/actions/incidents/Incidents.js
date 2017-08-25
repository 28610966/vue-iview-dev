/**
 * Created by binwang on 17/8/25.
 */

export default {
    actions: {
        get: {
            method: 'get',
            url: (payload) => `/api/incidents/${payload.id}`
        },
        list: {
            method: 'get',
            url: (payload) => `/api/incidents`
        },
        save: {
            method: 'post',
            url: (payload) => `/api/incidents`
        },
        update: {
            method: 'put',
            url: (payload) => `/api/incidents`,
        },
        delete: {
            method: 'delete',
            url: (payload) => `/api/incidents`,
        },
    },
    // state: {},
    // mutations: {},
    // getters: {}
}