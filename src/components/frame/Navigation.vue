<template>
    <Menu :mode="mode" :theme="theme1" width="auto" @on-select="goTo">
        <MenuDecorator :menu="m1" v-for="m1 in menus"></MenuDecorator>
    </Menu>
</template>
<script>
    import menus from '../../menus';
    import {MenuDecorator} from '../common';
    export default {
        name: 'Navigation',
        components: {MenuDecorator},
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