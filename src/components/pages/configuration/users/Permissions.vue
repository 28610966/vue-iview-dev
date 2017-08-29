/**
*
 * creeate by binwang on 17/8/28
 *
 */

<template>
<div>dfsafds</div>
</template>

<script>
    import {DynamicForm, DynamicQueryForm} from '../../../common';
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../../../libs';

    export default{
        components: {DynamicForm, DynamicQueryForm},
        computed: {
            //...VueUtil(this).select(['Permissions']).state(),
        },
        props: {},

        data(){
            return {}
        },
        mounted(){
        },
        watch: {},
        methods: {
            //...VueUtil(this).select(['Permissions']).actions(),
        }
    }
</script>