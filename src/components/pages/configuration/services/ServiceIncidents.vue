<template>
    <div class="service-incidents">
        <IncidentsMain ref="incidentsMain"></IncidentsMain>
    </div>
</template>

<script>
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../../../libs';
    import IncidentsMain from '../../incidents/IncidentsMain.vue'

    export default{
        name:'ServiceIncidents',
        components: {IncidentsMain},
        computed: {
            //...VueUtil(this).select(['ServiceIncidents']).state(),
        },
        props: {},

        data(){
            return {}
        },
        mounted(){
        },
        watch: {},
        methods: {
            //...VueUtil(this).select(['ServiceIncidents']).actions(),
        }
    }
</script>