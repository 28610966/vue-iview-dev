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
                        <Dropdown-item name="logout">Logout</Dropdown-item>
                    </Dropdown-menu>
                </Dropdown>
                </Col>
            </Row>
        </div>
        <div class="layout-right">
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