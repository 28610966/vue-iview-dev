<template>
    <div>
        <Row>
            <Col span="19">
                <Row>
                    <Col>
                        <Alert style="height:80px"> haha</Alert>
                    </Col>
                    <Col span="24">
                        <Card style="width: 100%">
                            <Row type="flex">
                                <Col span="12">
                                <ButtonGroup>
                                    <Button type="success">Open</Button>
                                    <Button>Triggered</Button>
                                    <Button>Acknowledged</Button>
                                    <Button>Resolved</Button>
                                    <Button>Any Status</Button>
                                </ButtonGroup>
                                </Col>
                                <Col span="12" style="text-align:right;">
                                <ButtonGroup>
                                    <Button>Assigend to me</Button>
                                    <Button type="success">All</Button>
                                </ButtonGroup>
                                </Col>
                                <Col span="24">
                                    <Row>
                                        <Col span="12" style="padding: 0px;">
                                        <ButtonGroup>
                                            <Button>Acknowledge</Button>
                                            <Button>Reassign</Button>
                                            <Button icon="ok">Resolve</Button>
                                            <Button icon="clock">Snooze</Button>
                                        </ButtonGroup>
                                        </Col>
                                        <Col span="12" style="text-align: right;padding: 0px;">
                                        <Page :total="Incidents.list.data.total" :current="Incidents.list.data.current" size="small"
                                              @on-change="changePage" @on-page-size-change="changePageSizer" show-total
                                              show-sizer></Page>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span="24">
                                        <Table size="small" :columns="columns" :data="Incidents.list.data.list"></Table>
                                </Col>
                                <Col span="24">

                                    <Row>
                                        <Col span="12" style="padding: 0px;">
                                            <ButtonGroup>
                                                <Button>Acknowledge</Button>
                                                <Button>Reassign</Button>
                                                <Button icon="ok">Resolve</Button>
                                                <Button icon="clock">Snooze</Button>
                                            </ButtonGroup>
                                        </Col>
                                        <Col span="12" style="text-align: right;padding: 0px;">
                                        <Page :total="Incidents.list.data.total" :current="Incidents.list.data.current" size="small"
                                              @on-change="changePage" @on-page-size-change="changePageSizer" show-total
                                              show-sizer></Page>
                                        </Col>
                                    </Row>
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
                        <Button type="success" icon="plus" style="width:100%"  @click="openModal">New Incident</Button>
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
                        <Card style="margin: 5px 0px;">
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
        <Modal width="800px" v-model="modal" :title="modalTitle"
               :loading="loading"
               @on-ok="saveIncidents"
        >
            <DynamicForm :button="{enabled:false}" ref="form" :fields="fields" :ruleValidate="ruleValidate"
                         :formValidate="formValidate"></DynamicForm>
            <div slot="footer">
                <Button type="primary" size="large" :loading="loading" @click="saveIncidents">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {DynamicForm, DynamicQueryForm} from '../../common';
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../../libs';

    export default{
        components: {DynamicForm, DynamicQueryForm},
        computed: {
            ...VueUtil(this).select(['Incidents','Services']).state(),
        },
        methods: {
            ...VueUtil(this).select(['Incidents','Services']).actions(),
            newService(){
                this.$router.push("/services");
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
                VueUtil(this).select('Incidents').list(this.query);
            },
            changePageSizer(pageSize){
                VueUtil(this).select('Incidents').list({pageSize: pageSize || 10, current: _.get(this.query, "current", 1)});
            },
            getServices(){
                debugger
                let services = _.get(this,'Services.list.data',[]);
                return services;
            },
            listenIncidents(data){
                if (!data.loading) {
                    if (!!data.error) {
                        this.$Message.error(`${data.type} fail!`);
                        this.loading = data.loading;
                    } else {
                        this.$Message.success(`${data.type} success!`);
                        setTimeout(() => {
                            this.modal = false;
                            this.changePage();
                            this.loading = data.loading;
                        }, 600);
                    }
                }
            },
            listenServices(data){

            }
        },

        mounted(){
            this.changePage(1);
            VueUtil(this).select("Services").list();
        },
        watch: {
            'Service.list': 'listenServices'
        },
        props: {},
        data(){

            let fields = [
                {id:"Status",label:"Status", type:"input", sortable:true, span:24, formIndex:5},
                {id:"Urgency",label:"Urgency", type:"input", sortable:true, span:24, scope:['column']},
                {id:"Title",label:"Title", type:"input", sortable:true, span:24, formIndex:3},
                {id:"Created",label:"Created", type:"hidden", sortable:true, span:24,},
                {id:"Service",label:"Service", type:"select", sortable:true, span:24, formIndex:1, options:this.getServices()},
                {id:"Assigned",label:"Assigned To", type:"input", sortable:true, span:24, formIndex: 4},
                {id:"Description",label:"Description", type:"textarea", sortable:true, span:24, formIndex:6},
            ]
            let formUtil = FormUtil(this);
            formUtil.fields(fields);
            let query = formUtil.defaultQuery();
            return {
                modalTitle: "",
                query,
                loading: false,
                modal: false,
                fields: formUtil.fields(),
                queryFields: formUtil.queryFields(),
                formValidate: formUtil.forms(),
                ruleValidate: formUtil.rules(),
                columns: [
                    ...formUtil.columns(),
                    {
                        key: 'id',
                        render: (h, params) => {
                            return ( <DropMenuDecorator id={params.row.id} select={this.operate} title='Operate' list={rowMenuList}></DropMenuDecorator>);
                        }
                    }
                ]
            }
        }
    }
</script>