<template>
    <div class="schedules">
        <Row>
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
                            {{beginTime}} <span v-if="endTime"> ~ {{endTime}}</span>
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
                    <div class="layers" :style="`height:${layers.length * 40 }px`">
                        <h3>Configuration layers</h3>
                        <div class="body">
                            <div class="title" :style="`position: relative;`">
                                <div v-for="event in events">
                                    <div :style="`position:absolute;top:${event.top}px;right:10px;z-index:${event.zIndex}`">
                                        {{event.layers}}
                                    </div>
                                </div>
                            </div>
                            <div class='content'>
                                <Calendar :layers="layers" :click1="scheduleOverride" :click2="viewProfile"
                                          :events="events"
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
        name: 'SchedulesTimeline',
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
                TeamsUsingThisSchedule: "Teams using this schedule",
                EscalationPoliciesUsingThisSchedule: "Escalation policies using this schedule:",
            };

            let events = [
                {
                    layers: 'layer1',
                    begin: '2017-8-30 13:30:00',
                    end: '2017-8-30 16:30:00',
                    sort: 1,
                    title: 'wangbin',
                    repeat: 'day',
                    id: 1,
                },
                {
                    layers: 'layer1',
                    begin: '2017-9-3 17:30:00',
                    end: '2017-9-20 16:30:00',
                    sort: 1,
                    title: 'admin',
                    id: 2,
                },
                {
                    layers: 'layer2',
                    begin: '2017-9-15 17:30:00',
                    end: '2017-9-18 16:30:00',
                    sort: 2,
                    title: 'guwei',
                    id: 3,
                },
                {
                    layers: 'layer2',
                    begin: '2017-9-17 17:30:00',
                    end: '2017-9-28 16:30:00',
                    sort: 2,
                    title: 'xiatw',
                    id: 4,
                },
                {
                    layers: 'layer3',
                    begin: '2017-9-3 17:30:00',
                    end: '2017-9-20 16:30:00',
                    sort: 3,
                    title: 'aaa',
                    id: 4,
                },
                {
                    layers: 'layer4',
                    begin: '2017-9-8 17:30:00',
                    end: '2017-9-9 16:30:00',
                    sort: 4,
                    title: '333',
                    id: 4,
                },
                {
                    layers: 'layer5',
                    begin: '2017-9-12 17:30:00',
                    end: '2017-9-19 16:30:00',
                    sort: 5,
                    title: '111',
                    id: 4,
                },
                {
                    layers: 'layer6',
                    begin: '2017-9-12 17:30:00',
                    end: '2017-9-22 16:30:00',
                    sort: 6,
                    title: '5455',
                    id: 4,
                },
                {
                    layers: 'layer7',
                    begin: '2017-9-7 17:30:00',
                    end: '2017-9-10 16:30:00',
                    sort: 7,
                    title: '3455',
                    id: 4,
                }
            ]
            const colors = ['#2d8cf0', '#19be6b', '#ff9900', '#ed3f14', '#939123', '#e5a8d5', '#000000', '#5123d3'];
            events = _.map(events, e => {
                return {...e, top: e.sort * 30, color: colors[e.sort], zIndex: e.sort + 100}
            })

            const layers = _.keys(_.groupBy(events, (e) => e.layers));
            let finalEvents = _.map(events, e => {
                return {...e, top: 50};
            })
            return {
                scheduleInformationData,
                layers,
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
                if (this.scope === '1d') {
                    this.endTime = null;
                }
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