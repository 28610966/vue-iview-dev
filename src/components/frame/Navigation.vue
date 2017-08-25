<template>
    <Menu :mode="mode" :theme="theme1" width="auto" v-on:on-select="goTo">
        <Submenu v-bind:title="m1.title" v-bind:name="m1.id" v-for="m1 in menus">
            <template slot="title">
                <Icon v-bind:type="m1.icon"></Icon>
                {{m1.title}}
            </template>
            <Menu-item v-bind:name="m2.path" v-for="m2 in m1.children">
                {{m2.title}}
            </Menu-item>
        </Submenu>
    </Menu>
</template>
<script>
    import menus from '../../menus';
    export default {
        name: 'Navigation',
        data () {
            return {
                theme1: 'dark',
                menus: menus,
                mode: 'horizontal'
            }
        },
        methods: {
            goTo(path){
                this.$router.push({path})
            }
        }
    };
</script>