<template>

    <Row type="flex">
        <Col span="20">
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
                    <Page :page-size="query.pageSize" :total="Teams.list.data.total" :current="Teams.list.data.current" size="small"
                          @on-change="changePage" @on-page-size-change="changePageSizer" show-total
                          show-sizer></Page>
                </div>
                </Col>
                <Col span="24">
                    <Table @on-sort-change="sortChange" size="small" :columns="columns" :data="Teams.list.data.list"></Table>
                </Col>
                <Col span="24">
                <div style="float: right;">
                    <Page :page-size="query.pageSize" :total="Teams.list.data.total" :current="Teams.list.data.current" size="small"
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
            <Button  @click="openModal" style="width:100%; text-align: left" icon="plus" type="success">Add Teams</Button>
        </Card>

        <Modal width="600px" v-model="modal" :title="modalTitle"
               :loading="loading"
               :mask-closable="false"
               @on-ok="saveTeams">
            <DynamicForm :dicts="dicts" :button="{enabled:false}" ref="form" :fields="fields" :ruleValidate="ruleValidate"
                         :formValidate="formValidate"></DynamicForm>
            <div slot="footer">
                <Button size="large" @click="resetForm">reset</Button>
                <Button type="primary" size="large" :loading="loading" @click="saveTeams">Submit</Button>
            </div>
        </Modal>
        </Col>
    </Row>
</template>
<script>
    import {VueUtil, FormUtil} from '../../../../libs';
    import {DropMenuDecorator,DynamicForm} from '../../../common';

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
                this.loading = false;
            },
            resetForm(){
                this.$refs['form'].handleReset('formValidate');
            },
            saveTeams(){
                this.loading = true;
                this.$refs['form'].validate({
                    ok: (data) => {
                        if(!!data.id)
                            VueUtil(this).select('Teams').update(data);
                        else
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
                this.$Modal.confirm({
                    title: 'Confirem',
                    content: '<p>Are you sure?</p>',
                    onOk: () => {
                        VueUtil(this).select('Teams').delete(id);
                    }
                });
            },
            sortChange({key,order}){
                this.query = {...this.query, sortField:key, sortOrder:order};
                this.changePage();
            },
            changePage(page){
                page ? this.query.current = page : null;
                VueUtil(this).select('Teams').list(this.query);
            },
            changePageSizer(pageSize){
                this.query.pageSize = pageSize;
                VueUtil(this).select('Teams').list(this.query);
            },
            listenTeams(data){
                if (!data.loading) {
                    if(data.type === 'get'){
                        this.formValidate = data.data;
                        this.openModal();
                    }else{
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
            operate(id){
                var $id = id.split("/");
                switch ($id[0]){
                    case 'view':
                        break;
                    case 'edit':
                        VueUtil(this).select('Teams').get(_.parseInt($id[1]));
                        break;
                    case 'delete':
                        this.deleteTeams(_.parseInt($id[1]));
                        break;
                }
            }
        },
        watch: {
            'Teams.get': 'listenTeams',
            'Teams.delete': 'listenTeams',
            'Teams.save': 'listenTeams',
            'Teams.update': 'listenTeams',
        },
        // 挂载完毕请求数据
        mounted(){
            if(this.changePage) this.changePage(1);
        },
        data(){
            let fields = [
                {
                    id:'id',
                    type:'hidden'
                },
                {
                    label: 'Name',
                    id: 'name',
                    type:'input',
                    sortable:'custom',
                    rules:[{required:true}],
                    span:24,
                    formIndex:1
                }, {
                    label: 'Escalation Policies',
                    id: 'escalationPolicies',
                    type:'select',
                    multiple:true,
                    filterable:true,
                    options:'escalationPolicies',
                    clearable:true,
                    sortable:'custom',
                    span:24,
                    formIndex:2
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
            const dicts = {
                escalationPolicies :[
                    {label:'a',value:'a'},
                    {label:'b',value:'b'},
                    {label:'c',value:'c'},
                    {label:'d',value:'d'},
                ]
            }

            return {
                query,
                dicts,
                modal:false,
                loading: false,
                modalTitle:"",
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
                            return ( <DropMenuDecorator
                            id={params.row.id}
                            select={this.operate}
                            title='Operate'
                            list={rowMenuList}></DropMenuDecorator>);
                        }
                    }
                ],

            }
        }
    }
</script>