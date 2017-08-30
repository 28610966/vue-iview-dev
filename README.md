# vue-iview-dev
基于webpack-vue-iview 企业级开发框架


安装最新版本 node npm
```
git clone https://github.com/28610966/vue-iview-dev.git front
cd front
npm install
npm run start  //启动前端
npm run server  //启动服务端
```

## 开发规范
### 文件结构
```
入口文件: /src/main.js
路由文件: /src/router.js
菜单文件: /src/menus.js
通用组件位置 : /src/components/common //通用组件为全局组件,无需引用和注册可直接调用
页面框架组件位置 : /src/components/frame
业务组件位置 : /src/components/pages
请求及服务位置 : /src/actions
样式文件: /src/themes
国际化资源文件位置: /src/locales

```
### 编码规范
#### .vue 文件
```
<template>
    <div class='module_class'>//建议每个组件最外层包一个div.class, 用于分离样式
      //your component code;
    </div>  
</template>
<script>
import ...;
export default{
    name: 'component.name', //组件名
    components:{ ...}, //注册要用的组件
    computed(){
          ...VueUtil(this).select([Entity.name, ...]).state(), //引入 vuex state
    },
    methods: { // 定义页面中使用的Action
          ...VueUtil(this).select([Entity.name, ...]).actions(), //引入 vuex action
    },
    watch:{
       //定义监听 vuex state 变化时调用的方法
    },
    mounted(){
       //挂载完毕后
    },
    props:{
        //定义接受外部的属性
    },
    data(){  
        return {
            //定义页面内部使用的数据
        };
    }
}
</script>
```
#### action 文件
```
export default {
    actions: {
        get: {
            method: 'get',
            url: (payload) => `/api/users/${payload.id}`,
            //如要重新封装返回数据 请自行实现 format 方法, 否则统一封装为 {data,loading,error}
            //format: (responseData){
            //  return ...;
            //}
        },
        list: {
            method: 'get',
            url: (payload) => `/api/users`
        },
        save: {
            method: 'post',
            url: (payload) => `/api/users`
        },
        update: {
            method: 'put',
            url: (payload) => `/api/users`,
        },
        delete: {
            method: 'delete',
            url: (payload) => `/api/users`,
        },
        ...自定义action
    },
    // state: {}, // 和 actions 一一 对应, 一般无需重写
    // mutations: {},// 无需重写
    // getters: {} // 复用业务逻辑可以写在这里, 
}
```
### 如何调用Action方法?
五个默认方法可以直接调用
```
VueUtil(this).select('User').get(id);
VueUtil(this).select('User').save(user);
VueUtil(this).select('User').update(user);
VueUtil(this).select('User').delete(id);
VueUtil(this).select('User').list(query);
```
自定义的方法调用 action
```
VueUtil(this).select('User').action('custome',params);
```
### 如何处理Action返回值?
1. 定义 watched, 指定要监控的变量
```
watched:{
    'User.get': 'listenUser',
    'User.save': 'listenUser',
    'User.update': 'listenUser',
    'User.delete': 'listenUser',
}
```
2. 定义 method 处理返回值
```
methods:{
    listenUser:(data) =>{
        switch(data.type){
            case 'get':
            //handle get
            break;
            case 'save':
            //handle save
            break;
            case 'update':
            //handle update
            break;
            case 'delete':
            //handle delete
            break;
        }
    }
}
```
### 如何绑定数据到 template
1. 输出数据 "{{ }}"
```
<div>{{ title }}</div> 
//title 可以是 data() 或者 props 里定义的变量
```
2. 绑定属性 ":"
```
<Button :label="label"></Button>
//label 可以是 data() 或者 props 里定义的变量(也可以是方法)
```
3. 绑定事件 "@"
```
<Button @click="method"></Button>
//method 可以是methods 里定义的方法 或者 props, data() 里定义的方法
```


### 如何控制页面元素权限
用 \<Key id='功能号'>\</Key> 将元素包裹, 例如
```
<Key id='User.add'>
    <Button >Add Users</Button>
</Key>
```
### 国际化
template中调用 
```
<div>{{ $t('key') }}</div> //单值
<div>{{ $t('key',{msg:$t('key1')}) }}</div> //组合值
```
js中调用
```
this.$t('key'); //单值
this.$t('key',{msg:this.$t('key1')}); //组合值
```
后端可在请求headers的Lang属性里获取当前语言 'zh_CN','en_US'
