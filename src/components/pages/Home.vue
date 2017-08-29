<style scoped>

</style>
<template>
    <div class="home">
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
                <div class="switch-lang" @click="switchLang">{{lang}}</div>
                <Dropdown placement="bottom-end" @on-click="rightMenuClick">
                    <a href="javascript:void(0)">
                        {{Users.loginUser.data.firstname}}
                    </a>
                    <Dropdown-menu slot="list">
                        <Dropdown-item name="myProfile">My profile</Dropdown-item>
                        <Dropdown placement="left-start" @on-click="choseLang">
                            <div>I18n</div>
                            <DropdownMenu slot="list">
                                <DropdownItem name="zh-CN">chinese</DropdownItem>
                                <DropdownItem name="en-US">english</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown-item name="logout">Logout</Dropdown-item>
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
    import Vue from 'vue';
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
                lang: '',
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
            this.switchLang();
            VueUtil(this).select('Users').action('loginUser');
            if (!store.get('token'))
                this.$router.push('login');
        },
        methods: {
            ...VueUtil(this).select(['Users']).actions(),
            switchLang(){
                if(this.lang === 'Chinese'){
                    Vue.config.lang = 'en-US';
                    this.lang = 'English';
                }else{
                    Vue.config.lang = 'zh-CN';
                    this.lang = 'Chinese';
                }
            },
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
                } else if (name === 'myProfile') {
                    this.$router.push(`/users/${this.Users.loginUser.data.username}`)
                }
            }
        }

    };
</script>