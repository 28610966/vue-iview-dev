/**
*
 * creeate by {USER} on {DATE}
 *
 */

<template>

</template>

<script>
    import {DynamicForm, DynamicQueryForm} from '../../common';
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../../libs';

    export default{
        components: {DynamicForm, DynamicQueryForm},
        computed: {
            //...VueUtil(this).select(['Reports']).state(),
        },
        methods: {
            //...VueUtil(this).select(['Reports']).actions(),
        },

        mounted(){
        },
        watch: {},
        props: {},
        data(){
            return {}
        }
    }
</script>