<template>

    <Row type="flex">
        <Col span="24">
        <Row type="flex" style="width: 100%;border-bottom: 1px solid #e9eaec">
            <Col span="16">
            <h1>{{title}}</h1>
            </Col>
            <Col span="8">
            <div style="text-align: right"><Input icon="search" placeholder="Search..."
                                                  style="width: 200px"></Input>
            </div>
            </Col>
        </Row>
        <Row>
                <Col span="24">
                <div style="float: right;">
                    <Page :page-size="query.pageSize" :total="Alerts.list.data.total" :current="Alerts.list.data.current" size="small"
                          @on-change="changePage" @on-page-size-change="changePageSizer" show-total
                          show-sizer></Page>
                </div>
                </Col>
                <Col span="24">
                <Table :no-filtered-data-text="noDataText" :no-data-text="noDataText" @on-sort-change="sortChange" size="small" :columns="columns" :data="Alerts.list.data.list"></Table>

                </Col>
                <Col span="24">
                <div style="float: right;">
                    <Page :page-size="query.pageSize" :total="Alerts.list.data.total" :current="Alerts.list.data.current" size="small"
                          @on-change="changePage" @on-page-size-change="changePageSizer" show-total
                          show-sizer></Page>
                </div>
                </Col>
        </Row>
        </Col>

        <Modal width="600px" v-model="modal" :title="modalTitle"
               :loading="loading"
               @on-ok="saveAlerts">
            <DynamicForm :dicts="dicts" :button="{enabled:false}"  ref="form" :fields="fields" :ruleValidate="ruleValidate"
                         :formValidate="formValidate"></DynamicForm>
            <div slot="footer">
                <Button size="large" @click="resetForm">reset</Button>
                <Button type="primary" size="large" :loading="loading" @click="saveAlerts">Submit</Button>
            </div>
        </Modal>
        </Col>
    </Row>
</template>
<script>
    import {VueUtil, FormUtil} from '../../../libs';
    import {DropMenuDecorator,DynamicForm} from '../../common';
    import _ from 'lodash';

    export default {
        components: {
            DropMenuDecorator,DynamicForm
        },
        computed: {
            ...VueUtil(this).select(['Alerts']).state(),
        },
        methods: {
            ...VueUtil(this).select(['Alerts']).actions(),
            openModal(){
                this.modalTitle = "Add Alerts";
                this.modal = true;
                this.loading = false;
            },
            saveAlerts(){
                this.loading = true;
                this.$refs['form'].validate({
                    ok: (data) => {
                        if(!!data.id)
                            VueUtil(this).select('Alerts').update(data);
                        else
                            VueUtil(this).select('Alerts').save(data);
                    }, err: () => {
                        this.loading = false;
                    }
                });
            },
            resetForm(){
                this.$refs['form'].handleReset('formValidate');
            },
            btnClick(){
                this.$router.push(this.addBtn.path);
            },

            deleteAlerts(id){
                this.$Modal.confirm({
                    title: 'Confirem',
                    content: '<p>Are you sure?</p>',
                    onOk: () => {
                        VueUtil(this).select('Alerts').delete(id);
                    }
                });
            },
            updateAlerts(user){
                VueUtil(this).select('Alerts').update(user);
            },
            sortChange({key,order}){
                this.query = {...this.query, sortField:key, sortOrder:order};
                this.changePage();
            },
            changePage(page){
                page ? this.query.current = page : null;
                VueUtil(this).select('Alerts').list(this.query);
            },
            changePageSizer(pageSize){
                this.query.pageSize = pageSize;
                VueUtil(this).select('Alerts').list(this.query);
            },
            listenAlerts(data){
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
                                this.$refs['form'].handleReset('formValidate').resetFields();
                            }, 600);
                        }
                    }
                }
            },
            operate(id){
                var $id = id.split("/");
                switch ($id[0]){
                    case 'view':
                        this.$router.push(`/Alerts/${$id[1]}`);
                        break;
                    case 'edit':
                        VueUtil(this).select('Alerts').get(_.parseInt($id[1]));
                        break;
                    case 'delete':
                        this.deleteAlerts(_.parseInt($id[1]));
                        break;
                }
            }
        },
        watch: {
            'Alerts.get': 'listenAlerts',
            'Alerts.delete': 'listenAlerts',
            'Alerts.save': 'listenAlerts',
            'Alerts.update': 'listenAlerts',
        },
        // 挂载完毕请求数据
        mounted(){
            this.changePage(1);
        },
        data(){
            const fields = [
                {
                    label: 'Status',
                    id: 'status',
                    type:'input',
                    sortable:'custom',
                    rules:[{required:true}],
                    span:22,
                }, {
                    label: 'Severity',
                    id: 'severity',
                    type:'input',
                    sortable:'custom',
                    span:22,
                }, {
                    label: 'Summary',
                    id: 'summary',
                    type:'input',
                    sortable:'custom',
                    span:22,
                }, {
                    label: 'Created',
                    id: 'created',
                    type:'select',
                    options:'roles',
                    sortable:'custom',
                    span:22,
                    filterRemote:(value, row)=>{
                        console.log(value,row )
                    },
                    filters: [
                        {
                            label: '大于4000',
                            value: 1
                        },
                        {
                            label: '小于4000',
                            value: 2
                        }
                    ],
                    filterMultiple: false,
                }, {
                    label: 'Related Incident',
                    id: 'relatedIncident',
                    type:'input',
                    sortable:'custom',
                    span:22,
                }, , {
                    label: 'Service',
                    id: 'service',
                    type:'input',
                    sortable:'custom',
                    span:22,
                }, , {
                    label: 'Integration',
                    id: 'integration',
                    type:'input',
                    sortable:'custom',
                    span:22,
                }, , {
                    label: 'Source',
                    id: 'source',
                    type:'input',
                    sortable:'custom',
                    span:22,
                }
            ];
            const formUtil = FormUtil(this);
            formUtil.fields(fields);
            const query = formUtil.defaultQuery();
            const rowMenuList = [
                {title:"view",icon:"search",type:'view'},
                {title:"edit",icon:"edit",type:'edit'},
                {title:"delete",icon:"trash-a",type:'delete'},
            ]
            const dicts ={
                Roles:[],
                Teams:[],
            }
            return {
                query,
                dicts,
                noDataText:'No alerts found with current filters.',
                modal:false,
                loading: false,
                modalTitle:'',
                title: 'Alerts',
                addBtn: {title: "Add New Alerts", path: '/service_add',},
                fields: formUtil.fields(),
                queryFields: formUtil.queryFields(),
                formValidate: formUtil.forms(),
                ruleValidate: formUtil.rules(),
                columns: [
                    ...formUtil.columns(),
                ],

            }
        }
    }
</script>