/**
 * Created by binwang on 17/8/23.
 * 用于将 简化版 vuex 转换成 标准 vuex
 */
import _ from 'lodash';
import util from '../libs/util';

export default (scope, vuex) => {
    "use strict";

    let state = {...vuex.state};
    let actions = {};
    let mutations = {};
    _.forEach(_.keys(vuex.actions), key => {
        state[key] = {
            type: key,
            loading: false,
            error: null,
            data: {},
        };
        mutations[`set_${scope}_${key}`] = (state, data) => {
            if (!state[key])
                state[key] = data;
            else
                state[key] = {...state[key], ...data};
        };
        const action = vuex.actions[key];
        actions[`${scope}_${key}`] = ({commit, state}, payload) => {
            commit(`set_${scope}_${key}`, {loading: true});
            let url = action.url(payload) || '/';
            if (action.method === 'get')
                url = util.stitchingParams(url, payload);

            util.ajax({
                url: url,
                method: action.method || 'get',
                data: payload,
            }).then(function (res) {
                commit(`set_${scope}_${key}`, {
                    loading: false,
                    error: res.errorMsg,
                    data: res.data.content || 'data format error!'
                });
            }).catch(function (err) {
                console.log(err);
                commit(`set_${scope}_${key}`, {
                    loading: false,
                    err: err,
                    data: null
                });
            })
        }
    });
    return {
        state,
        actions,
        getter: vuex.getter || {},
        mutations: {...mutations, ...vuex.mutations},
    }
}