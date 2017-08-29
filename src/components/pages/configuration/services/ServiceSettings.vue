<template>
    <div class="service-settings">

        <h2>General Settings</h2>
        <Row>
            <Col span="3" style="text-align: right">Team</Col>
            <Col span="21">team1</Col>
        </Row>
        <h2>Conference Bridge Settings</h2>
        <Row>
            <Col span="3" style="text-align: right">Dial-in Number</Col>
            <Col span="21">none</Col>
        </Row>
        <Row>
            <Col span="3" style="text-align: right">Meeting URL </Col>
            <Col span="21">none </Col>
        </Row>


<!--Incident Settings-->
<!--Escalation Policy-->
<!--Default-->
<!--Responder Notifications-->
<!--Notify responders until someone responds, escalate as needed (use high-urgency notification rules)-->
<!--Incident Ack Timeout-->
<!--Enabled: Acknowledged incidents time out after 30 minutes.-->
<!--Incident Auto-Resolution-->
<!--Enabled: Open incidents will auto-resolve in 4 hours.-->
<!--Incident Behavior-->
<!--Create incidents: Will create incidents that cannot be merged.-->

    </div>
</template>

<script>
    import {DynamicForm, DynamicQueryForm} from '../../../common';
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../../../libs';

    export default{
        name:'ServiceSettings',
        components: {DynamicForm, DynamicQueryForm},
        computed: {
            //...VueUtil(this).select(['ServiceSettings']).state(),
        },
        props: {},

        data(){
            return {}
        },
        mounted(){
        },
        watch: {},
        methods: {
            //...VueUtil(this).select(['ServiceSettings']).actions(),
        }
    }
</script>