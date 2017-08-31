<template>
    <div class="schedule-infomation">
        <Row>
            <Col span="8">
            <strong>Timezone:</strong></Col>
            <Col span="16">
            {{data.Timezone}}</Col>
        </Row>
        <Row>
            <Col span="8">
            <strong>Calendar feeds:</strong></Col>
            <Col span="16">
            {{data.Calendarfeeds}}</Col>
        </Row>
        <Row>
            <Col span="8">
            <strong>On-call now:</strong></Col>
            <Col span="16">
            {{data.OnCallNow}}</Col>
        </Row>
        <Row>
            <Col span="8">
            <strong>Your next on-call:</strong></Col>
            <Col span="16">
            {{data.YourNextOnCall}}</Col>
        </Row>
        <Row>
            <Col span="8">
            <strong>Teams using this schedule:</strong></Col>
            <Col span="16">
            {{data.TeamsUsingThisSchedule}}
            </Col>
        </Row>
        <Row>
            <Col span="8">
            <strong>Escalation policies using this schedule:</strong></Col>
            <Col span="16">
            {{data.EscalationPoliciesUsingThisSchedule}}</Col>
        </Row>
        <Alert type="warning">This on-call schedule is not in use. assign it to an escalation policy</Alert>
    </div>
</template>
<script>
    import {DynamicForm, DynamicQueryForm} from '../../../common';
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../../../libs';

    export default{
        name: 'ScheduleInfomation',
        components: {DynamicForm, DynamicQueryForm},
        computed: {
            //...VueUtil(this).select(['ScheduleInfomation']).state(),
        },
        props: [
            'data'
        ],

        data(){
            return {};
        },
        mounted(){
        },
        watch: {},
        methods: {
            //...VueUtil(this).select(['ScheduleInfomation']).actions(),
        }
    }
</script>