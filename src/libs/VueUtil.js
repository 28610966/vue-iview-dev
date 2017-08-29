/**
 * Created by binwang on 17/8/24.
 */
import _ from 'lodash';
import {mapActions, mapState} from 'vuex';
import * as Actions from '../actions';

function util(_context, defaultEntity) {
    "use strict";
    if (!arguments)
        throw new Error('缺少Vue上下文 this ');
    let context = _context;
    let entity = defaultEntity;



    this.select = (_entity) => {
        entity = _entity;
        return this;
    };
    // 操作 Action end
    this.action = (action,payload) =>{
        if (_.isFunction(context[`${entity}_${action}`]))
            context[`${entity}_${action}`].call(this, payload);
        else{
            console.log(`%c not find action ${entity}_${action}]! please verify action name!`, "color:red")
        }
        return this;
    }
    this.save = (payload) => {
        this.action('save',payload);
        return this;
    }
    this.update = (payload) => {
        this.action('update',payload);
        return this;
    };
    this.delete = (payload) => {
        this.action('delete',_.isObject() ? payload : {id: payload});
        return this;
    };
    this.list = (payload) => {
        this.action('list',payload);
        return this;
    };
    this.get = (payload) => {
        this.action('get',_.isObject() ? payload : {id: payload});
        return this;
    };

    // 操作 Action end

    // 引入 环境变量[Action State] start
    this.actions = () => {
        let actions = []
        const entitys = coverEntity(entity);
        entitys.map(e => {
            _.mapKeys(Actions.default[e].actions, (value, key) => {
                actions.push(key);
            });
        })
        return mapActions(actions);
    };

    this.state = () => {
        const entitys = coverEntity(entity);
        let state = {};
        _.forEach(entitys, key => {
            _.assign(state, {
                [key]: state => {
                    return _.get(state, key, null);
                }
            })
        })
        return mapState(state)
    }
    // 引入 环境变量[Action State] end

    function coverEntity(_entity){
        if (_.isString(entity)) {
            return [entity];
        } else if (_.isArray(entity)) {
            return entity;
        } else {
            throw new Error("select 传递了错误的参数 ,必须是 字符串或者字符串数组!")
        }
    }
}

export default (context,defaultEntity) => new util(context, defaultEntity);