<template>
    <span v-if="show"><slot></slot></span>
</template>

<script>
    import _ from 'lodash';

    export default{
        name: 'Key',
        computed: {
            //...VueUtil(this).select(['Role']).state(),
        },
        props: [
            'id'
        ],

        data(){
            return {
                show: false
            }
        },
        mounted(){
            if (this.id === 'admin') {
                this.show = true;
            } else {
                this.show = false;
            }
        },
        methods: {
            //...VueUtil(this).select(['Role']).actions(),
        }
    }
</script>