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
                    <Page :total="Users.list.data.total" :current="Users.list.data.current" size="small"
                          @on-change="changePage" @on-page-size-change="changePageSizer" show-total
                          show-sizer></Page>
                </div>
                </Col>
                <Col span="24">
                <Table size="small" :columns="columns" :data="Users.list.data.list"></Table>

                </Col>
                <Col span="24">
                <div style="float: right;">
                    <Page :total="Users.list.data.total" :current="Users.list.data.current" size="small"
                          @on-change="changePage" @on-page-size-change="changePageSizer" show-total
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
            <Button  @click="openModal" style="width:100%; text-align: left" icon="plus" type="success">Add Users</Button>
        </Card>
        <Modal width="600px" v-model="modal" :title="modalTitle"
               :loading="loading"
               @on-ok="saveUsers">
            <DynamicForm :dicts="dicts" :button="{enabled:false}"  ref="form" :fields="fields" :ruleValidate="ruleValidate"
                         :formValidate="formValidate"></DynamicForm>
            <div slot="footer">
                <Button type="primary" size="large" :loading="loading" @click="saveUsers">Submit</Button>
                <Button size="large" @click="resetForm">reset</Button>
            </div>
        </Modal>
        </Col>
    </Row>
</template>
<script>
    import {VueUtil, FormUtil} from '../../../../libs';
    import {DropMenuDecorator,DynamicForm} from '../../../common';
    import _ from 'lodash';

    export default {
        components: {
            DropMenuDecorator,DynamicForm
        },
        computed: {
            ...VueUtil(this).select(['Users','Teams']).state(),
        },
        methods: {
            ...VueUtil(this).select(['Users','Teams']).actions(),
            openModal(){
                this.modalTitle = "Add Users";
                this.modal = true;
                VueUtil(this).select('Teams').list();
            },
            saveUsers(){
                this.loading = true;
                this.$refs['form'].validate({
                    ok: (data) => {
                        VueUtil(this).select('Users').save(data);
                    }, err: () => {
                        this.loading = false;
                    }
                });
            },
            btnClick(){
                this.$router.push(this.addBtn.path);
            },

            deleteUsers(id){
                VueUtil(this).select('Users').delete(id);
            },
            updateUsers(user){
                VueUtil(this).select('Users').update(user);
            },
            changePage(page){
                page ? this.query.current = page : null;
                VueUtil(this).select('Users').list(this.query);
            },
            changePageSizer(pageSize){
                this.query.pageSize = pageSize;
                VueUtil(this).select('Users').list(this.query);
            },
            listenUsers(data){
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
            listenTeams(data){
                if (!data.loading) {
                    if (!data.error) {
                        this.dicts.Teams = _.map(data.data, t => {
                            return {value: t.id, label: t.name}
                        });
                    }
                }
            },
            operate(id){
                var $id = id.split("/");
                switch ($id[0]){
                    case 'view':
                        this.$router.push(`/services/${$id[1]}`);
                        break;
                    case 'edit':
                        this.$router.push(`/service_edit/${$id[1]}`);
                        break;
                    case 'delete':
                        this.deleteUsers(_.parseInt($id[1]));
                        break;
                }
            }
        },
        watch: {
            'Users.delete': 'listenUsers',
            'Users.save': 'listenUsers',
            'Users.update': 'listenUsers',
            'Teams.list': 'listenTeams',
        },
        // 挂载完毕请求数据
        mounted(){
            this.changePage(1);
        },
        data(){
            const fields = [
                {
                    label: 'User',
                    id: 'name',
                    type:'input',
                    sortable:true,
                    rules:[{required:true}],
                    span:22,
                }, {
                    label: 'Email',
                    id: 'Email',
                    type:'input',
                    sortable:true,
                    span:22,
                }, {
                    label: 'Job Title',
                    id: 'jobTitle',
                    type:'input',
                    sortable:true,
                    span:22,
                }, {
                    label: 'Base Role',
                    id: 'baseRole',
                    type:'select',
                    options:'roles',
                    sortable:true,
                    span:22,
                }, {
                    label: 'Teams',
                    id: 'teams',
                    type:'select',
                    options:'Teams',
                    filterable: true,
                    sortable:true,
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
                modal:false,
                loading: false,
                title: 'Users on My Teams',
                tab: 'Users',
                addBtn: {title: "Add New Users", path: '/service_add',},
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