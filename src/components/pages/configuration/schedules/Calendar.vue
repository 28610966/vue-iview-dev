<template>
    <div class="calendar">
        <div :style="`width:${blockStyle.width}`" class="block" v-for="t in tblocks">
            <div class="title">
                <div class="firstday" v-if="t.day === '1'">{{t.month}}</div>
                {{t.title}}
            </div>
            <div v-if="t.columns" class="title-secondary" v-for="tt in t.columns"></div>
        </div>

            <div class="events" v-for="event in _events"  :style="`width:${event.width};left:${event.left};background:${event.color};top:${event.top};z-index:${event.zIndex}`">
                <Poptip class="event-poptip" :transfer="true" trigger="click" :title="event.title">
                    <div class="poptip-body">{{event.title}}</div>
                    <div class="api" slot="content">
                        <Row type="flex">
                            <Col span="12">From: </Col>
                            <Col span="12">{{event.begin}}</Col>
                            <Col span="12">To: </Col>
                            <Col span="12">{{event.end}}</Col>
                        </Row>
                        <div class="divider"></div>
                        <Row type="flex">
                            <Col span="24">
                                <Button @click="click1(event.id)" style="width:100%;margin-top:5px;text-align: left;" icon="calendar" size="small">Schedule On Override</Button>
                            </Col>
                            <Col span="24">
                                <Button @click="click2(event.id)" style="width:100%;margin-top:5px;text-align: left;" icon="person" size="small">View profile</Button>
                            </Col>
                        </Row>
                    </div>
                </Poptip>
            </div>
        </Poptip>
    </div>
</template>

<script>
    import _ from 'lodash';
    import moment from 'moment';
    import {VueUtil, FormUtil} from '../../../../libs';

    export default{
        name: 'Calendar',
        components: {},
        computed: {
            //...VueUtil(this).select(['Calendar']).state(),

        },
        props: [
            'scope',
            'startTime',
            'cb',
            'events',
            'click1',
            'click2',
        ],

        data(){
            return {
                tblocks: [],
                blockStyle: {},
                _events:[]
            }
        },
        mounted(){
            this.changeScope(this.scope);
            this.changeEvents();
        },
        watch: {
            scope: 'changeScope',
            startTime: 'changeScope',
            events: 'changeEvents'
        },
        methods: {
            changeEvents(){
            },
            changeRange(){

                let range = {
                    beginTime: this.tblocks[0].time,
                    endTime: this.tblocks[this.tblocks.length - 1].time,
                };
                if(this.events){
                    let ruler = range.endTime.diff(range.beginTime, 'd', true) + 1;
                    let width ;
                    let left;
                    this._events = _.map(this.events, event => {
                        let b = moment(event.begin);
                        let e = moment(event.end);
                        if(b.diff(range.beginTime,'d',true) < 0){
                            b= range.beginTime;
                        }
                        if(e.diff(range.endTime,'d',true) > -1){
                            e= range.endTime.add(1,'day');
                        }

                        if(e.diff(range.beginTime,'d',true) < 0 || b.diff(range.endTime,'d',true) > 0){
                            width = 0;
                            left = 0;
                        }else{
                             width = (e.diff(b, 'd', true) / ruler * 100) + '%';
                             left = (b.diff(range.beginTime, 'd', true) / ruler * 100) + '%'
                        }
                        return {...event, width, left}
                    })
                }
                console.log(this._events)
                if (this.cb) {
                    this.cb(range);
                }
            },
            changeScope(){
                switch (this.scope) {
                    case '1d':
                        this.renderDay();
                        break;
                    case '4d':
                        this.render4Day();
                        break;
                    case '1w':
                        this.render1W();
                        break;
                    case '2w':
                        this.render2W();
                        break;
                    case '1m':
                        this.render1M();
                        break;
                }
            },
            cap(dm, time){
                let title = time.format(dm);
                let month = time.format('M月');
                let day = time.format('D');
                return {time, title, month, day};
            },
            renderDayAddSomeDays(begin, addDays){
                if (!_.isNumber(addDays) || addDays < 0)
                    throw new Error('error params [addDays]!');
                const dm = addDays > 14 ? 'D' : 'D/M';
                var times = [];
                for (let i = 0; i < addDays; i++) {
                    let time = moment(begin || new Date()).add(i, 'days');
                    times.push(this.cap(dm, time));
                }
                var blockStyle = {
                    width: (100.0 / times.length) + '%'
                }
                this.blockStyle = blockStyle;
                this.tblocks = times;
                this.changeRange();
            },
            render2W(){
                const w = moment(this.startTime || new Date()).day();
                const dm = 'D/M';
                var times = [];
                for (let i = 1; i <= 14; i++) {
                    let date = moment(this.startTime || new Date()).add(w - 7 + i, 'days');
                    times.push(this.cap(dm, date));
                }


                var blockStyle = {
                    width: (100.0 / times.length) + '%'
                }
                this.blockStyle = blockStyle;
                this.tblocks = times;
                this.changeRange();
            },
            render1M(){
                this.renderDayAddSomeDays(this.startTime, 31);
            },
            render1W(){
                const w = moment(this.startTime || new Date()).day();
                const dm = 'D/M';
                var times = [];
                for (let i = 1; i <= 7; i++) {
                    let date = moment(this.startTime || new Date()).add(w - 7 + i, 'days');
                    times.push(this.cap(dm, date));
                }

                var blockStyle = {
                    width: (100.0 / times.length) + '%'
                }
                this.blockStyle = blockStyle;
                this.tblocks = times;
                this.changeRange();
            },
            render4Day(){
                this.renderDayAddSomeDays(this.startTime, 4);
            },
            renderDay(){
                var times = [{
                    title: '00:00',
                    columns: ['01:00', '02:00', '03:00', '04:00']
                }, {
                    title: '04:00',
                    columns: ['05:00', '06:00', '07:00', '08:00']
                }, {
                    title: '08:00',
                    columns: ['09:00', '10:00', '11:00', '12:00']
                }, {
                    title: '12:00',
                    columns: ['13:00', '14:00', '15:00', '16:00']
                }, {
                    title: '16:00',
                    columns: ['17:00', '18:00', '19:00', '20:00']
                }, {
                    title: '20:00',
                    columns: ['21:00', '22:00', '23:00', '24:00']
                },];
                var blockStyle = {
                    width: (100.0 / times.length) + '%'
                }
                this.blockStyle = blockStyle;
                this.tblocks = times;
                this.changeRange();
            }
            //...VueUtil(this).select(['Calendar']).actions(),
        }
    }
</script>