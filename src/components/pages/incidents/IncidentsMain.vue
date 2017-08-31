<template>
    <Row>
        <Modal width="600px" v-model="modal" :title="modalTitle"
               :loading="loading"
               @on-ok="saveIncidents"
        >
            <DynamicForm :dicts="dicts" :button="{enabled:false}" ref="form" :fields="fields"
                         :ruleValidate="ruleValidate"
                         :formValidate="formValidate"></DynamicForm>
            <div slot="footer">
                <Button size="large" @click="resetForm">Reset</Button>
                <Button type="primary" size="large" :loading="loading" @click="saveIncidents">Submit</Button>
            </div>
        </Modal>
        <Col>
        <Alert>
            <Row>
                <Col span="12">
                <div style="height: 100;text-align: center; border-right:1px solid #e9eaec;">
                    <p>Your open incidents</p>
                    <p>
                    <h2> 1 triggered    0 acknowledged</h2></p>
                </div>
                </Col>
                <Col span="12">
                <div style="height: 100;text-align: center;">
                    <p>All open incidents</p>
                    <p>
                    <h2>1 triggered    0 acknowledged</h2></p>
                </div>
                </Col>
            </Row>
        </Alert>
        </Col>
        <Col span="24">
        <Card style="width: 100%">
            <Row type="flex">
                <Col span="18">
                <ButtonGroup>
                    <Button @click="status = 1" :type="status ===1 ?'primary':''">Open</Button>
                    <Button @click="status = 2" :type="status ===2 ?'info':''">Triggered</Button>
                    <Button @click="status = 3" :type="status ===3 ?'warning':''">Acknowledged</Button>
                    <Button @click="status = 4" :type="status ===4 ?'error':''">Resolved</Button>
                    <Button @click="status = 5" :type="status ===5 ?'success':''">Any Status</Button>
                </ButtonGroup>
                </Col>
                <Col span="6" style="text-align:right;">
                <ButtonGroup>
                    <Button @click="assigendToMe = true" :type="assigendToMe ?'success':''">Assigend to me</Button>
                    <Button @click="assigendToMe = false" :type="!assigendToMe ?'success':''">All</Button>
                </ButtonGroup>
                </Col>
                <Col span="24">
                <IncidentsTools :changePageSizer="changePageSizer" :changePage="changePage" :selectRow="selectRow"
                                :total="Incidents.list.data.total" :current="Incidents.list.data.current"
                                :pageSize="query.pageSize"></IncidentsTools>
                </Col>
                <Col span="24">
                <Table @on-sort-change="sortChange" @on-selection-change="selectionChange" size="small"
                       :columns="columns" :data="Incidents.list.data.list"></Table>
                </Col>
                <Col span="24">
                <IncidentsTools :changePageSizer="changePageSizer" :changePage="changePage" :selectRow="selectRow"
                                :total="Incidents.list.data.total" :current="Incidents.list.data.current"
                                :pageSize="query.pageSize"></IncidentsTools>
                </Col>
            </Row>
        </Card>
        </Col>
    </Row>
</template>

<script>
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../../libs';
    import IncidentsTools from './IncidentsTools.vue'

    export default{
        components: {IncidentsTools},
        computed: {
            ...VueUtil(this).select(['Incidents', 'Services']).state(),
        },
        methods: {
            ...VueUtil(this).select(['Incidents', 'Services']).actions(),
            newService(){
                this.$router.push("/service_add");
            },
            selectionChange(rows){
                this.selectRow = rows.length === 0
            },
            openModal(){
                this.modalTitle = "Create New Incident";
                this.modal = true;
                this.loading = false;
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
            resetForm(){
                this.$refs['form'].handleReset('formValidate');
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
                this.changePage();
            },
            sortChange({key, order}){
                this.query = {...this.query, sortField: key, sortOrder: order};
                this.changePage();
            },
            listenIncidents(data){
                if (data.type === 'get') {
                    this.formValidate = data.data;
                    this.openModal();
                } else {
                    if (!data.loading) {
                        if (!!data.error) {
                            this.$Message.error(`${data.type} fail!`);
                            this.loading = data.loading;
                        } else {
                            this.$Message.success(`${data.type} success!`);
                            setTimeout(() => {
                                this.modal = false;
                                this.changePage();
                                this.$refs['form'].handleReset('formValidate');
                            }, 600);
                        }
                    }
                }
            },
            listenServices(data){
                if (!data.loading) {
                    if (!data.error) {
                        this.dicts = {
                            Services: _.map(data.data, d => {
                                return {value: d.id, label: d.name}
                            })
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
            'Incidents.get': 'listenIncidents',
            'Incidents.save': 'listenIncidents',
            'Incidents.update': 'listenIncidents',
            'Incidents.delete': 'listenIncidents',
            'Services.list': 'listenServices',
        },
        props: {},
        data(){
            const fields = [
                {type: 'selection', width: 60, align: 'center', scope: ['column']},
                {id: "Status", label: "Status", type: "input", sortable: "custom", span: 22, formIndex: 5},
                {id: "Urgency", label: "Urgency", type: "input", sortable: "custom", span: 22, scope: ['column']},
                {
                    id: "Title",
                    label: "Title",
                    type: "input",
                    sortable: "custom",
                    span: 22,
                    formIndex: 3,
                    rules: [{required: true}]
                },
                {id: "Created", label: "Created", type: "input", sortable: "custom", span: 22,},
                {
                    id: "Service",
                    label: "Service",
                    type: "select",
                    sortable: "custom",
                    span: 22,
                    formIndex: 1,
                    options: "Services"
                },
                {id: "Assigned", label: "AssignedTo", type: "input", sortable: "custom", span: 22, formIndex: 4},
                {
                    id: "Description",
                    label: "Description",
                    type: "textarea",
                    sortable: "custom",
                    span: 22,
                    formIndex: 6,
                    scope: ['form']
                },
            ]
            const formUtil = FormUtil(this);
            formUtil.fields(fields);
            const query = formUtil.defaultQuery();
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