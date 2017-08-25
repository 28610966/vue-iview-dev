/**
 * Created by binwang on 17/8/23.
 */

export default {
    actions: {
        get: {
            method: 'get',
            url: (payload) => `/api/user/${payload.id}`
        },
        list: {
            method: 'get',
            url: (payload) => `/api/user`
        },
        save: {
            method: 'post',
            url: (payload) => `/api/user`
        },
        update: {
            method: 'put',
            url: (payload) => `/api/user`,
        },
        delete: {
            method: 'delete',
            url: (payload) => `/api/user`,
        },
    },
    // state: {},
    // mutations: {},
    // getters: {}
}