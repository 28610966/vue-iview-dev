<template>
        <Breadcrumb>
            <Breadcrumb-item v-for="(item,index) in breadlist" :key="item.path">
                <router-link :to="item.path">{{item.name}}</router-link>
            </Breadcrumb-item>
        </Breadcrumb>
</template>
<script>
    export default{
        created() {
            this.getBreadcrumb(true);//刷新的参数为true
        },
        data() {
            return {
                breadlist: '' // 路由集合
            }
        },
        methods: {
            getBreadcrumb(isreload) {
                let matched = this.$route.matched;
                this.$store.commit('breadListStateSet',_.map(matched,m => { return {path:m.path,name:m.name}}));
                matched[0].path = "/";
                this.breadlist=matched;
//                sessionStorage.setItem('breadListStorage',JSON.stringify(this.breadlist))
            }
        },
        watch: {
            $route () {
                this.getBreadcrumb();
            }
        },
    }
</script>