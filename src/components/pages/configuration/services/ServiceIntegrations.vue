<template>
    <div class="service-integrations"></div>
</template>

<script>
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../../../libs';

    export default{
        name:'ServiceIntegrations',
        components: {},
        computed: {
            //...VueUtil(this).select(['ServiceIntegrations']).state(),
        },
        props: {},

        data(){
            return {}
        },
        mounted(){
        },
        watch: {},
        methods: {
            //...VueUtil(this).select(['ServiceIntegrations']).actions(),
        }
    }
</script>