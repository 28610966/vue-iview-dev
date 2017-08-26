<template>
    <div>
        <Row>
            <Col span="19">
                <Row>
                    <Col>
                        <Alert>
                            <Row>
                                <Col span="12">
                                <div style="height: 100;text-align: center; border-right:1px solid #e9eaec;">
                                    <p>Your open incidents</p>
                                    <p><h2> 1 triggered    0 acknowledged</h2></p>
                                </div>
                                </Col>
                                <Col span="12">
                                <div style="height: 100;text-align: center;">
                                    <p>All open incidents</p>
                                    <p><h2>1 triggered    0 acknowledged</h2></p>
                                </div>
                                </Col>
                            </Row>
                        </Alert>
                    </Col>
                    <Col span="24">
                        <Card style="width: 100%">
                            <Row type="flex">
                                <Col span="12">
                                <ButtonGroup>
                                    <Button @click="status = 1" :type="status ===1 ?'primary':''">Open</Button>
                                    <Button @click="status = 2" :type="status ===2 ?'info':''">Triggered</Button>
                                    <Button @click="status = 3" :type="status ===3 ?'warning':''">Acknowledged</Button>
                                    <Button @click="status = 4" :type="status ===4 ?'error':''">Resolved</Button>
                                    <Button @click="status = 5" :type="status ===5 ?'success':''">Any Status</Button>
                                </ButtonGroup>
                                </Col>
                                <Col span="12" style="text-align:right;">
                                <ButtonGroup>
                                    <Button @click="assigendToMe = true" :type="assigendToMe ?'success':''">Assigend to me</Button>
                                    <Button @click="assigendToMe = false" :type="!assigendToMe ?'success':''">All</Button>
                                </ButtonGroup>
                                </Col>
                                <Col span="24">
                                    <IncidentsTools :changePageSizer="changePageSizer" :changePage="changePage" :selectRow="selectRow" :total="Incidents.list.data.total" :current="Incidents.list.data.current"></IncidentsTools>
                                </Col>
                                <Col span="24">
                                        <Table @on-selection-change="selectionChange" size="small" :columns="columns" :data="Incidents.list.data.list"></Table>
                                </Col>
                                <Col span="24">
                                    <IncidentsTools :changePageSizer="changePageSizer" :changePage="changePage" :selectRow="selectRow" :total="Incidents.list.data.total" :current="Incidents.list.data.current"></IncidentsTools>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span="24">
                    <h1>Activity for the Past 7 Days</h1>
                    <Alert>No recent activity</Alert>
                    </Col>
                </Row>
            </Col>
            <Col span="5">
                <Row>
                    <Col span="24">
                        <Button type="success" icon="plus" style="width:100%;text-align: left;"  @click="openModal">New Incident</Button>
                    </Col>
                    <Col span="24">
                        <Card style="margin: 5px 0px;">
                            <p slot="title">
                                Resources
                            </p>
                            <div>
                                <p>You are all alone being on-call all the time.</p>
                                <p>Get some backup, invite your team:</p>
                                <Button style="width:100%" type="success" icon="group">Add your colleagues</Button>
                                <p>Then share on-call responsibilities:</p>
                                <Button style="width:100%">Create an on-call schedule</Button>
                            </div>
                        </Card>
                        <Card style="margin: 10px 0px;">
                            <p slot="title">
                                Next Steps: Your Tools
                            </p>
                            <div>
                                <p>Add all your tools to begin monitoring your systems today:</p>
                                <Button icon="plus" @click="newService">Add new services</Button>

                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Modal width="600px" v-model="modal" :title="modalTitle"
               :loading="loading"
               @on-ok="saveIncidents"
        >
            <DynamicForm :dicts="dicts" :button="{enabled:false}" ref="form" :fields="fields" :ruleValidate="ruleValidate"
                         :formValidate="formValidate"></DynamicForm>
            <div slot="footer">
                <Button type="primary" size="large" :loading="loading" @click="saveIncidents">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {DynamicForm, DynamicQueryForm, DropMenuDecorator} from '../../common';
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../../libs';
    import IncidentsTools from './IncidentsTools.vue'

    export default{
        components: {DynamicForm, DynamicQueryForm, DropMenuDecorator, IncidentsTools},
        computed: {
            ...VueUtil(this).select(['Incidents','Services']).state(),
        },
        methods: {
            ...VueUtil(this).select(['Incidents','Services']).actions(),
            newService(){
                this.$router.push("/service_add");
            },
            selectionChange(rows){
                this.selectRow = rows.length === 0
            },
            openModal(){
                this.modalTitle = "Create New Incident";
                this.modal = true;
            },
            saveIncidents(){
                this.loading = true;
                this.$refs['form'].validate({
                    ok: (data) => {
                        VueUtil(this).select('Incidents').save(data);
                    }, err: () => {
                        this.loading = false;
                    }
                });
            },
            deleteIncidents(id){
                VueUtil(this).select('Incidents').delete(id);
            },
            updateIncidents(user){
                VueUtil(this).select('Incidents').update(user);
            },
            changePage(page){
                page ? this.query.current = page : null;
                this.selectRow = true;
                VueUtil(this).select('Incidents').list(this.query);
            },
            changePageSizer(pageSize){
                this.query.pageSize = pageSize;
                VueUtil(this).select('Incidents').list(this.query);
            },
            listenIncidents(data){
                if (!data.loading) {
                    if (!!data.error) {
                        this.$Message.error(`${data.type} fail!`);
                        this.loading = data.loading;
                    } else {
                        this.$Message.success(`${data.type} success!`);
                        setTimeout(() => {
                            this.loading = data.loading;
                            this.modal = false;
                            this.changePage();
                            this.$refs['form'].handleReset('formValidate');
                        }, 600);
                    }
                }
            },
            listenServices(data){
                if (!data.loading) {
                    if (!data.error) {
                       this.dicts = {
                           Services: _.map(data.data ,d => { return {value:d.id, label:d.name} })
                       }
                    }
                }
            }
        },

        mounted(){
            this.changePage(1);
            VueUtil(this).select("Services").list();
        },
        watch: {
            'Services.list': 'listenServices',
            'Incidents.save': 'listenIncidents',
            'Incidents.update': 'listenIncidents',
            'Incidents.delete': 'listenIncidents',
        },
        props: {},
        data(){

            let fields = [
                {type: 'selection',width: 60,align: 'center',scope:['column']},
                {id:"Status",label:"Status", type:"input", sortable:true, span:24, formIndex:5},
                {id:"Urgency",label:"Urgency", type:"input", sortable:true, span:24, scope:['column']},
                {id:"Title",label:"Title", type:"input", sortable:true, span:24, formIndex:3,rules:[{required:true}]},
                {id:"Created",label:"Created", type:"hidden", sortable:true, span:24,},
                {id:"Service",label:"Service", type:"select", sortable:true, span:24, formIndex:1, options:"Services"},
                {id:"Assigned",label:"Assigned To", type:"input", sortable:true, span:24, formIndex: 4},
                {id:"Description",label:"Description", type:"textarea", sortable:true, span:24, formIndex:6 ,scope:['form']},
            ]
            let formUtil = FormUtil(this);
            formUtil.fields(fields);
            let query = formUtil.defaultQuery();
            return {
                selectRow: true,
                assigendToMe: false,
                status: 1,
                modalTitle: "",
                query,
                loading: false,
                modal: false,
                fields: formUtil.fields(),
                dicts: {},
                queryFields: formUtil.queryFields(),
                formValidate: formUtil.forms(),
                ruleValidate: formUtil.rules(),
                columns: [
                    ...formUtil.columns(),
                ]
            }
        }
    }
</script>