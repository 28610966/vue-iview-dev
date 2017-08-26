<template>

    <Row type="flex">
        <Col span="20">
        <Row type="flex" style="width: 100%;border-bottom: 1px solid #e9eaec">
            <Col span="16">
            <h1>{{title}}</h1>
            </Col>
            <Col span="8">
            <div style="text-align: right"><Input v-model="value4" icon="search" placeholder="Search..."
                                                  style="width: 200px"></Input>
            </div>
            </Col>
        </Row>
        <Row>
                <Col span="24">
                <div style="float: right;">
                    <Page :total="Teams.list.data.total" :current="Teams.list.data.current" size="small"
                          @on-change="changePage" @on-page-size-change="changePageSizer" show-total
                          show-sizer></Page>
                </div>
                </Col>
                <Col span="24">
                <Table size="small" :columns="columns" :data="Teams.list.data.list"></Table>

                </Col>
                <Col span="24">
                <div style="float: right;">
                    <Page :total="Teams.list.data.total" :current="Teams.list.data.current" size="small"
                          @on-change="chagePage" @on-page-size-change="changePageSizer" show-total
                          show-sizer></Page>
                </div>
                </Col>
        </Row>
        </Col>
        <Col span="4">
        <Card>
            <p slot="title">
                Invite your team
            </p>
            <Button  @click="openModal" style="width:100%; text-align: left" icon="plus" type="success">Add Teams</Button>
        </Card>
        <Modal width="600px" v-model="modal" :title="modalTitle"
               :loading="loading"
               @on-ok="saveTeams">
            <DynamicForm labelWidth="100px" :button="{enabled:false}"  ref="form" :fields="fields" :ruleValidate="ruleValidate"
                         :formValidate="formValidate"></DynamicForm>
            <div slot="footer">
                <Button type="primary" size="large" :loading="loading" @click="saveTeams">提交</Button>
            </div>
        </Modal>
        </Col>
    </Row>
</template>
<script>
    import {VueUtil, FormUtil} from '../../../../libs';
    import {DropMenuDecorator,DynamicForm} from '../../../common';
    import iView from 'iview';

    export default {
        components: {
            DropMenuDecorator,DynamicForm
        },
        computed: {
            ...VueUtil(this).select(['Teams']).state(),
        },
        methods: {
            ...VueUtil(this).select(['Teams']).actions(),
            openModal(){
                this.modalTitle = "Add Teams";
                this.modal = true;
            },
            saveTeams(){
                this.loading = true;
                this.$refs['form'].validate({
                    ok: (data) => {
                        VueUtil(this).select('Teams').save(data);
                    }, err: () => {
                        this.loading = false;
                    }
                });
            },
            btnClick(){
                this.$router.push(this.addBtn.path);
            },

            deleteTeams(id){
                VueUtil(this).select('Teams').delete(id);
            },
            updateTeams(user){
                VueUtil(this).select('Teams').update(user);
            },
            changePage(page){
                page ? this.query.current = page : null;
                VueUtil(this).select('Teams').list(this.query);
            },
            changePageSizer(pageSize){
                VueUtil(this).select('Teams').list({
                    pageSize: pageSize || 10,
                    current: _.get(this.query, "current", 1)
                });
            },
            listenTeams(data){
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
                            this.$refs['form'].handleReset('formValidate').resetFields();
                        }, 600);
                    }
                }
            },
            operate(id){
                var $id = id.split("/");
                switch ($id[0]){
                    case 'view':
//                        this.$router.push(`/services/${$id[1]}`);
                        break;
                    case 'edit':
//                        this.$router.push(`/service_edit/${$id[1]}`);
                        break;
                    case 'delete':
                        this.deleteTeams(_.parseInt($id[1]));
                        break;
                }
            }
        },
        watch: {
            'Teams.delete': 'listenTeams',
            'Teams.save': 'listenTeams',
            'Teams.update': 'listenTeams',
        },
        // 挂载完毕请求数据
        mounted(){
            this.changePage(1);
        },
        data(){
            let fields = [
                {
                    label: 'Name',
                    id: 'name',
                    type:'input',
                    sortable:true,
                    rules:[{required:true}],
                    span:24,
                }, {
                    label: 'Escalation Policies',
                    id: 'escalationPolicies',
                    type:'select',
                    options:'escalationPolicies',
                    sortable:true,
                    span:24,
                },
            ];
            const formUtil = FormUtil(this);
            formUtil.fields(fields);
            let query = formUtil.defaultQuery();
            const rowMenuList = [
                {title:"view",icon:"search",type:'view'},
                {title:"edit",icon:"edit",type:'edit'},
                {title:"delete",icon:"trash-a",type:'delete'},
            ]
            return {
                query,
                modal:false,
                loading: false,
                title: 'Teams',
                addBtn: {title: "Add New Teams", path: '/service_add',},
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
                ],

            }
        }
    }
</script>