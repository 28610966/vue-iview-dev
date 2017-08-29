import axios from 'axios';
import env from '../config/env';
import _ from 'lodash';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'Hedwig';
    window.document.title = title;
};
//
// const ajaxUrl = env === 'development' ?
//     '/' :
//     env === 'production' ?
//     'https://www.url.com' :
//     'https://debug.url.com';
const ajaxUrl = '/';

util.config = {
    baseURL: ajaxUrl,
    timeout: 30000,
    responseType: 'json',
}

util.creqte = axios.create;
util.headers = (headers) =>{
    return {
        ajax: axios.create({
            ...util.config,
            headers: headers,
        })
    };
};
util.ajax = axios.create(util.config);

util.stitchingParams = (url,payload) => {
    let params = _.keys(payload).map(k => {
        if (_.isNull(payload[k]) || _.isUndefined(payload[k]) || _.isEqual(payload[k], '')) {
            return null;
        } else {
            return k + "=" + payload[k]
        }
    }).filter(m => m !== null).join("&");
    let s = url + ((params === "") ? "" : ("?" + params));
    if (process.env.NODE_ENV === `development`)
        console.log(s);
    return s;
};

export default util;