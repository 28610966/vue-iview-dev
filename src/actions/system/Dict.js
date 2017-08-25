/**
 * Created by binwang on 17/8/24.
 */

export default {
    actions: {
        get: {
            method: 'get',
            url: (payload) => `/api/dict/${payload.id}`
        },
        list: {
            method: 'get',
            url: (payload) => `/api/dict`
        },
        save: {
            method: 'post',
            url: (payload) => `/api/dict`
        },
        update: {
            method: 'put',
            url: (payload) => `/api/dict`,
        },
        delete: {
            method: 'delete',
            url: (payload) => `/api/dict`,
        },
    },
    // state: {},
    // mutations: {},
    // getters: {}
}