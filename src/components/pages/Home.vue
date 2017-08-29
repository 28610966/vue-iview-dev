<style scoped>
    .layout {
        height: 100%;
        background: #f5f7f9;
        background: #1c2438;
        position: relative;
        box-flex: 1;
        /*overflow: hidden;*/
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
    }

    .layout-right {
        box-sizing: content-box;
        height: 300px;
        flex: 1;
    }

    .router-link-active {
        color: #ffffff;
    }

    .layout-collapsing-leftmenu {
        float: left;
    }

    .layout-breadcrumb {
        height: 100%;
        line-height: 50px;
        width: 800px;
        float: left;
    }

    .layout-content {
        height: calc('100% - 100px');
        overflow: auto;
        /*margin: 15px;*/
        background: #fff;
    }

    .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }

    .layout-content-main {
        padding: 10px;
        min-height: 400px;
    }

    .layout-header {
        height: 50px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
        margin-bottom: 1px;
    }

    .logo {
        font-size: 32px;
        font-weight: 700;
        color: #19be6b;
        padding: 0px 10px;
    }

    .layout-ceiling-main a {
        color: #9ba7b5;
    }

    .layout-hide-text .layout-text {
        display: none;
    }

    .layout-right-top-tools {
        height: 100%;
        line-height: 50px;
    }

    .layout-right-top-tools .ivu-dropdown {
        height: 100%;
        line-height: 50px;
        float: right;
        margin-right: 10px;
    }

    .ivu-col {
        transition: width .2s ease-in-out;
    }
</style>
<template>
    <div class="layout">
        <!--<Affix>-->
        <div class="layout-menu-left">
            <Row type="flex">
                <Col span="3">
                <div class="logo">Hedwig</div>
                </Col>
                <Col span="17">
                <Navigation></Navigation>
                </Col>
                <Col span="4" class="right">
                <Dropdown placement="bottom-end"  @on-click="rightMenuClick">
                    <a href="javascript:void(0)">
                        {{Users.loginUser.data.firstname}}
                    </a>
                    <Dropdown-menu slot="list">
                        <Dropdown-item name="myProfile">My profile</Dropdown-item>
                        <Dropdown-item name="logout">Log out</Dropdown-item>
                    </Dropdown-menu>
                </Dropdown>
                </Col>
            </Row>
        </div>
        <!--</Affix>-->
        <div class="layout-right">
            <!--<div class="layout-header">-->
            <!--<div class="layout-header">-->
            <!--<i-button class="layout-collapsing-leftmenu" type="text" @click="toggleClick">-->
            <!--<Icon type="navicon" size="32"></Icon>-->
            <!--</i-button>-->
            <!--<div class="layout-breadcrumb">-->
            <!--<Breadcrumb></Breadcrumb>-->
            <!--</div>-->
            <!--&lt;!&ndash;<div class="layout-right-top-tools">&ndash;&gt;-->
            <!--&lt;!&ndash;<RightTopTools></RightTopTools>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->
            <!--</div>-->

            <div class="layout-content">
                <div class="layout-content-main">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../libs';
    import Navigation from '../frame/Navigation.vue'
    import Breadcrumb from '../frame/Breadcrumb.vue'
    import RightTopTools from '../frame/RightTopTools.vue'
    import store from 'store'

    export default {
        name: "Home",
        components: {Navigation, Breadcrumb, RightTopTools},

        data () {
            return {
                spanLeft: 5,
                spanRight: 19
            }
        },
        computed: {
            ...VueUtil(this).select(['Users']).state(),
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        mounted(){
            VueUtil(this).select('Users').action('loginUser');
            if (!store.get('token'))
                this.$router.push('login');
        },
        methods: {
            ...VueUtil(this).select(['Users']).actions(),
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            },
            rightMenuClick(name){
                if (name === 'logout') {
                    store.set('login', null);
                    this.$router.push('/login');
                }else if(name ==='myProfile'){
                    this.$router.push(`/users/${this.Users.loginUser.data.username}`)
                }
            }
        }

    };
</script>