<template>
    <div class="schedules">
        <Row>
            <Col span="20">
            <Row>
                <Col span="12">
                Time Zone: Asia/Shanghai
               </Col>
                <Col span="12" style="text-align: right">
                <ButtonGroup>
                    <Button icon="navicon">Timeline View</Button>
                    <Button icon="calendar">Calendar View</Button>
                </ButtonGroup>
                </Col>
                <Col span="24">
                <SchedulesTimeline></SchedulesTimeline>
                </Col>
            </Row>
            </Col>
            <Col span="4">
            <Row class="schedules-right">
                <Col>
                <Button @click="showScheduleInfomation" icon="information-circled">Schedule Info</Button>
                </Col>
                <Col>
                <Button icon="edit" @click="editSchedule">Edit this Schedule</Button>
                </Col>
                <Col>
                <Button icon="ios-copy-outline">Copy this Schedule</Button>
                </Col>
                <Col>
                <Button icon="reply">Revert this Schedule</Button>
                </Col>
                <Col>
                <Button icon="close">Delete this Schedule</Button>
                </Col>
                <Col>
                <Button icon="calendar">Schedule an Override</Button>
                </Col>
                <Col>
                <Card>
                    <p slot="title">
                        Escalation Policies
                    </p>
                </Card>
                </Col>
                <Col>
                <Card>
                    <p slot="title">
                        Users
                    </p>
                </Card>
                </Col>
                <Col>
                <Card>
                    <p slot="title">
                        Teams
                    </p>
                </Card>
                </Col>

            </Row>
            </Col>
        </Row>
        <Modal width="600px" v-model="infomationModal" title="Schedule Information">
            <ScheduleInfomation :data="scheduleInformationData"></ScheduleInfomation>
            <div slot="footer">
                <Button size="large" @click="infomationModal = false">Cancel</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import _ from 'lodash';
    import store from 'store';
    import moment from 'moment';
    import Calendar from './Calendar.vue';
    import ScheduleInfomation from './ScheduleInfomation.vue';
    import SchedulesTimeline from './SchedulesTimeline.vue';
    import {VueUtil, FormUtil} from '@util';

    export default{
        name: 'Schedules',
        components: {Calendar, ScheduleInfomation,SchedulesTimeline},
        computed: {
            //...VueUtil(this).select(['Schedules']).state(),
        },
        props: {},


        data(){


            return {
                scheduleInformationData,
                infomationModal: false,
            }
        },
        mounted(){
        },
        watch: {},
        methods: {
            editSchedule(){
                this.$router.push("/schedules/1/edit");
            },
            showScheduleInfomation(){
                this.infomationModal = !this.infomationModal;
            },
            scheduleOverride(data){
            },
        }
    }
</script>