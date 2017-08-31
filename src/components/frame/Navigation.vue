<template>
    <Menu style="z-index: 10000;" :mode="mode" :theme="theme1" width="auto" @on-select="goTo">
        <MenuDecorator :menu="m1" v-for="m1 in menus" :key="m1.id"></MenuDecorator>
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