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
                <Card>
                    <Row>
                        <Col span="8">
                        <ButtonGroup>
                            <Button @click="resetToday()">Today</Button>
                            <Button @click="addStartTime(-1)" icon="chevron-left"></Button>
                            <Button @click="addStartTime(1)" icon="chevron-right"></Button>
                        </ButtonGroup>
                        <span>
                            {{beginTime}} ~ {{endTime}}
                            </span>
                        </Col>
                        <Col span="16" style="text-align: right;">
                        <ButtonGroup>
                            <Button :type="scope === '1d' ? 'primary' : ''" @click="changeScope('1d')"> 1 Day </Button>
                            <Button :type="scope === '4d' ? 'primary' : ''" @click="changeScope('4d')"> 4 Days </Button>
                            <Button :type="scope === '1w' ? 'primary' : ''" @click="changeScope('1w')"> 1 Week </Button>
                            <Button :type="scope === '2w' ? 'primary' : ''" @click="changeScope('2w')"> 2 Weeks </Button>
                            <Button :type="scope === '1m' ? 'primary' : ''" @click="changeScope('1m')"> 1 Month </Button>
                        </ButtonGroup>
                        </Col>
                        <Col span="24">
                        <div class="layers">
                            <h3>Configuration layers</h3>
                            <div class="body">
                                <div class="title" style="position: relative;">
                                    <div v-for="event in events">
                                        <div :style="`position:absolute;top:${event.top}px;right:10px;z-index:${event.zIndex}`">{{event.layers}}</div>
                                    </div>
                                </div>
                                <div class='content'>
                                    <Calendar :click1="scheduleOverride" :click2="viewProfile" :events="events"
                                              :cb="setTimeRange" :startTime="startTime"
                                              :scope="scope"></Calendar>
                                </div>
                            </div>
                        </div>
                        </Col>
                        <Col span="24">
                        <div class='layers'>
                            <h3>Final layers</h3>
                            <div class="body">
                                <div class="title"></div>
                                <div class='content'>
                                    <Calendar :events="finalEvents" :startTime="startTime" :scope="scope"></Calendar>
                                </div>
                            </div>
                        </div>
                        </Col>

                    </Row>
                </Card>
                </Col>

            </Row>
            </Col>
            <Col span="4">
            <Row class="schedules-right">
                <Col>
                <Button @click="showScheduleInfomation" icon="information-circled">Schedule Info</Button>
                </Col>
                <Col>
                <Button icon="edit">Edit this Schedule</Button>
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
    import {VueUtil, FormUtil} from '@util';

    export default{
        name: 'Schedules',
        components: {Calendar, ScheduleInfomation},
        computed: {
            //...VueUtil(this).select(['Schedules']).state(),
        },
        props: {},


        data(){

            let scheduleInformationData = {
                Timezone: "Asia/Shanghai",
                Calendarfeeds: "WebCal feed  or iCalendar file ",
                OnCallNow: "Nobody is currently on-call in this schedule",
                YourNextOnCall: "Sep 7, 2017 at 00:00 to Sep 7, 2017 at 01:00",
                TeamsUsingThisSchedule:"Teams using this schedule",
                EscalationPoliciesUsingThisSchedule:"Escalation policies using this schedule:",
            };

            let events = [
                {
                    layers: 'layer1',
                    begin: '2017-8-30 13:30:00',
                    end: '2017-8-30 16:30:00',
                    color: 'green',
                    top: 30,
                    zIndex: 1,
                    title: 'wangbin',
                    id: 1,
                    layer: "layer1",
                },
                {
                    layers: 'layer1',
                    begin: '2017-9-3 17:30:00',
                    end: '2017-9-20 16:30:00',
                    color: 'black',
                    top: 30,
                    zIndex: 2,
                    title: 'admin',
                    id: 2,
                },
                {
                    layers: 'layer2',
                    begin: '2017-9-15 17:30:00',
                    end: '2017-9-18 16:30:00',
                    color: 'red',
                    top: 60,
                    zIndex: 3,
                    title: 'guwei',
                    id: 3,
                },
                {
                    layers: 'layer2',
                    begin: '2017-9-17 17:30:00',
                    end: '2017-9-28 16:30:00',
                    color: 'orange',
                    top: 60,
                    zIndex: 4,
                    title: 'xiatw',
                    id: 4,
                }
            ]

//            const layers = _.groupBy(events,(e)=>e.layer);
//            alert(JSON.stringify(layers))
            let finalEvents = _.map(events, e => {
                return {...e, top: 50};
            })
            return {
                scheduleInformationData,
//                layers,
                infomationModal: false,
                scope: null,
                startTime: this.getToday(),
                beginTime: null,
                endTime: null,
                events: events,
                finalEvents: finalEvents
            }
        },
        mounted(){
            this.scope = store.get('schedule_scope') || '1d';
        },
        watch: {},
        methods: {
            showScheduleInfomation(){
                this.infomationModal = !this.infomationModal;
            },
            scheduleOverride(data){
            },
            viewProfile(data){
                this.$router.push(`/users/${data}`)
            },
            setTimeRange({beginTime, endTime}){
                this.beginTime = beginTime.format(this.$t('date.MD'));
                this.endTime = endTime.format(this.$t('date.MD'));
            },
            //...VueUtil(this).select(['Schedules']).actions(),
            resetToday(){
                this.startTime = this.getToday();
            },
            getToday(){
                return moment().format(this.$t('date.date'));
            },
            changeScope(scope){
                this.scope = scope;
                store.set('schedule_scope', scope);
            },

            addStartTime(step){
                if (this.scope === '4d')
                    step *= 4;
                if (this.scope === '1w')
                    step *= 7;
                if (this.scope === '2w')
                    step *= 14;
                if (this.scope === '1m')
                    step *= 30;
                this.startTime = moment(this.startTime).add(step, 'days').format(this.$t('date.date'));
            }
        }
    }
</script>