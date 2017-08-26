/**
*
 * creeate by {USER} on {DATE}
 *
 */

<template>
    <Row>
        <Col span="14" style="padding: 0px;">
        <Button icon="alert" :disabled="selectRow">Acknowledge</Button>
        <Button :disabled="selectRow">Reassign</Button>
        <Button :disabled="selectRow" icon="checkmark">Resolve</Button>
        <Dropdown placement="bottom-end" >
            <Button :disabled="selectRow" icon="clock">Snooze <Icon type="arrow-down-b"></Icon></Button>

            <Dropdown-menu slot="list" v-if="!selectRow">
                <Dropdown-item>1 hours</Dropdown-item>
                <Dropdown-item>4 hours</Dropdown-item>
                <Dropdown-item>8 hours</Dropdown-item>
                <Dropdown-item>24 hours</Dropdown-item>
                <Dropdown-item>others</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
        <Button v-if="!selectRow" icon="ok">Merge Incidents</Button>
        </Col>
        <Col span="10" style="text-align: right;padding: 0px;">
        <Page :total="total" :current="current" size="small"  :page-size="pageSize"
              @on-change="changePage" @on-page-size-change="changePageSizer" show-total
              show-sizer></Page>
        </Col>
    </Row>
</template>

<script>
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../../libs';

    export default{
        computed: {
//            ...VueUtil(this).select(['']).state(),
        },
        methods: {
//            ...VueUtil(this).select(['']).actions(),
        },

        mounted(){
        },
        watch: {},
        props: [
            'selectRow',
            'total',
            'current',
            'changePage',
            'changePageSizer',
            'pageSize'
        ],
        data(){
            return {}
        }
    }
</script>