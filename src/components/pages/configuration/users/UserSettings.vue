/**
*
 * creeate by binwang on 17/8/28
 *
 */

<template>

</template>

<script>
    import {DynamicForm, DynamicQueryForm} from '../../../common';
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../../../libs';

    export default{
        components: {DynamicForm, DynamicQueryForm},
        computed: {
            //...VueUtil(this).select(['UserSettings']).state(),
        },
        props: {},

        data(){
            return {}
        },
        mounted(){
        },
        watch: {},
        methods: {
            //...VueUtil(this).select(['UserSettings']).actions(),
        }
    }
</script>