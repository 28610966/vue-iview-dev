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
路由文件: /src/route.js
通用组件位置 : /src/components/common
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
    components:{ ...}, //用到的子组件
    computed(){
          ...VueUtil(this).select([Entity.name, ...]).state(), //引入 vuex 数据集
    },
    methods: { // 定义所有页面中使用的方法
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

### 国际化
```

用法:
template中调用 
  普通调用$t('key'), 格式化输出 $t('key',{msg:$t('key1')})
js中调用
   this.$t('key') ...
热切换只支持 template中的国际化, 尽量不要在 js 中调用 $t

```
 #### 后端请求
```
后台可在请求headers的Lang属性里获取当前语言
```