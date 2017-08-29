<template>
    <div class="service-incidents">
        <IncidentsMain ref="incidentsMain"></IncidentsMain>
    </div>
</template>

<script>
    import {DynamicForm, DynamicQueryForm} from '../../../common';
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../../../libs';
    import IncidentsMain from '../../incidents/IncidentsMain.vue'

    export default{
        name:'ServiceIncidents',
        components: {DynamicForm, DynamicQueryForm, IncidentsMain},
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