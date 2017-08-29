/**
 * Created by binwang on 17/8/26.
 */

export default {
    actions: {
        get: {
            method: 'get',
            url: (payload) => `/api/teams/${payload.id}`
        },
        list: {
            method: 'get',
            url: (payload) => `/api/teams`
        },
        save: {
            method: 'post',
            url: (payload) => `/api/teams`
        },
        update: {
            method: 'put',
            url: (payload) => `/api/teams`,
        },
        delete: {
            method: 'delete',
            url: (payload) => `/api/teams`,
        },
    },
    state: {

    },
    // mutations: {},
    // getters: {}
}