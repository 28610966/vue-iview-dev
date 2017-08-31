<template>
    <div class="schedules-edit">
        <Row>
            <Col span="19">
            <!--<Row>-->
                <!--<Col span="12">-->
                <!--<div class="form">-->
                    <!--<Form>-->
                        <!--<Form-item label="" :prop="schedule.name">-->
                            <!--<Input placeholder="New Schedule..." icon="edit"></Input>-->
                        <!--</Form-item>-->
                        <!--<Form-item label="" :prop="schedule.team">-->
                            <!--<Select>-->
                                <!--<Option :value="team.id" v-for="team in Teams.list.data">{{team.name}}</Option>-->
                            <!--</Select>-->
                        <!--</Form-item>-->
                        <!--<Form-item label="description" :prop="schedule.description">-->
                            <!--<Input type="textarea"></Input>-->
                        <!--</Form-item>-->
                        <!--<Form-item label="Time zone" :prop="schedule.description">-->
                            <!--<Select></Select>-->
                        <!--</Form-item>-->
                    <!--</Form>-->
                <!--</div>-->
                <!--</Col>-->
            <!--</Row>-->
            <div class="layers">
                <Row>
                    <Col span="24" v-for="layer in layers">
                    <Card>
                        <p slot="title" style="position: relative;">
                            {{layer.name}}

                            <span @click="removeLayer(layer)">
                            <Icon type="close" class="close"></Icon>
                            </span>
                        </p>
                        <div class="body" style="min-height: 200px">
                            <Row style="height: 100%">
                                <Col span="8">
                                <p><span style="color: red">Step1</span>: Add users</p>
                                <div class="select-users">
                                    <div class="user" v-for="user in layer.selectUsers">
                                        {{user.name}}
                                        <span @click="removeSelectUser(layer, user)">
                                        <Icon class="close" type="close"></Icon>
                                    </span>
                                    </div>
                                </div>
                                <Select :ref="layer.name+'_select'" @on-change="selectUser(layer)">
                                    <Option v-for="user in Users.list.data" :value="user.id">{{user.name}}</Option>
                                </Select>

                                </Col>
                                <Col span="8">
                                <p><span style="color: red">Step 2</span>: Set up an on-call rotation</p>
                                <div class="step2">
                                    <Row>
                                        <Col span="10">
                                        Rotation type</Col>
                                        <Col span="14">
                                            <Select :ref="`${layer.name}_rotationType`">
                                                <Option value="daily">daily</Option>
                                                <Option value="weekly">weekly</Option>
                                                <Option value="custem">custem...</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row v-if="layer.rotationType === 'custom'">
                                        <Col span="10">Shift length</Col>
                                        <Col span="14">
                                        <Row>
                                            <Col span="12">
                                                <Input></Input>
                                            </Col>
                                            <Col span="12">
                                                <Select>
                                                    <Option value="hours">hours</Option>
                                                    <Option value="days">days</Option>
                                                    <Option value="weeks">weeks</Option>
                                                </Select>
                                            </Col>
                                        </Row>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="10">
                                        Handoff time</Col>
                                        <Col span="14">
                                        <Row>
                                            <Col span="14">
                                            <Select>
                                                <Option value="Sun">Sun</Option>
                                                <Option value="Mon">Mon</Option>
                                                <Option value="Tue">Tue</Option>
                                                <Option value="Web">Web</Option>
                                                <Option value="Thu">Thu</Option>
                                                <Option value="Fri">Fri</Option>
                                                <Option value="Sat">Sat</Option>
                                            </Select>
                                            </Col>
                                            <Col span="8" offset="2">
                                            <TimePicker type="time" format="HH:mm"></TimePicker>
                                            </Col>
                                        </Row>

                                        </Col>
                                    </Row>
                                </div>

                                </Col>
                                <Col span="8">
                                <p><span style="color: red">Step 3 </span>: Changes should take effect at</p>
                                <Row>
                                    <Col span="24">
                                    <DatePicker></DatePicker>
                                    <TimePicker format="HH:mm" type="time"></TimePicker>
                                    </Col>
                                </Row>
                                </Col>
                            </Row>
                        </div>
                    </Card>

                    </Col>
                    <Col span="24">
                    <p>
                        <Button type="primary" icon="plus" @click="addLayer">Add Another Layer</Button>
                    </p>
                    </Col>
                </Row>
            </div>
            </Col>
            <Col span="5">
                <Row class="right-area">
                    <Col span="24">
                        <Button type="success" icon="ios-checkmark">Save Changes</Button>
                    </Col>
                    <Col span="24">
                        <Button icon="trash-a">Discard all Changes</Button>
                    </Col>
                    <Col span="24">
                        <Button icon="calendar">Schedule an Override</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <Card>
                        <p slot="title">
                            Escalation Policies
                        </p>
                    </Card>
                    </Col>
                </Row>

                <Row>
                    <Col span="24">
                    <Card class="users">
                        <p slot="title">
                            Users
                        </p>
                        <div class="content">
                            <div v-for="user in Users.list.data">
                                <!--<Link :to="`/users/${user.id}`">{{user.name}}</div>-->
                            </div>
                        </div>
                    </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
</template>

<script>
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '@util';

    export default{
        name: 'SchedulesEdit',
        components: {},
        computed: {
            ...VueUtil(this).select(['Users','Teams']).state(),
        },
        props: {},

        data(){
            let schedule = {
                name: "",
                description: "",
                team: [],
            };
            let layers = [];
            return {
                schedule,
                layers,
            }
        },
        mounted(){
            VueUtil(this).select("Users").list();
            VueUtil(this).select("Teams").list();
        },
        watch: {},
        methods: {
            ...VueUtil(this).select(['Users','Teams']).actions(),
            selectUser(layer){
                let select = this.$refs[layer.name + "_select"][0];
                let id = select.model;

                layer.selectUsers.push({
                    ..._.find(this.Users.list.data, {id: id}),
                    sort: layer.selectUsers.length + 1,
                });
                this.layers = _.map(this.layers, l => {
                    if(l.name === layer.name){
                        return layer;
                    }else
                        return l;
                })
                select.model = null;
            },
            removeSelectUser(layer, {id, sort}){
                layer.selectUsers = _.remove(layer.selectUsers, (u) => {
                    let f = u.id === id && u.sort === sort;
                    return !f;
                });
                this.layers = _.map(this.layers, l => {
                    if(l.name === layer.name){
                        return layer;
                    }else
                        return l;
                })

            },
            addLayer(){
                this.layers.push({
                    name: `layer${this.layers.length + 1}`,
                    selectUsers: [],
                })
            },
            removeLayer({name}){
                this.layers = _.remove(this.layers , l => l.name !== name)
            }
        }
    }
</script>