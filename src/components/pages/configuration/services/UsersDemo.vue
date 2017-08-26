<style>

</style>
<template>
    <div>
        <Card style="width: 100%;margin-bottom: 8px;">
            <div class="colour_bar"><div class="colour_bar_left">高级搜索</div></div>

        <DynamicQueryForm ref="qform" :fields="queryFields"
                     :formSearch="formValidate"></DynamicQueryForm>

        </Card>
        <div class="grid-top-tools">
            <Button type="primary" @click="openModal">新建数据</Button>
        </div>
        <Table size="small" :columns="columns" :data="Users.list.data.list"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="Users.list.data.total" :current="Users.list.data.current"
                      @on-change="changePage" @on-page-size-change="changePageSizer" show-total show-sizer></Page>
            </div>
        </div>
        <Modal width="800px" v-model="modal" :title="modalTitle"
               :loading="loading"
               @on-ok="saveUsers"
        >
            <DynamicForm :dicts="dicts" ref="form" :fields="fields" :ruleValidate="ruleValidate"
                         :formValidate="formValidate"></DynamicForm>
            <div slot="footer">
                <Button type="primary" size="large" :loading="loading" @click="saveUsers">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {DynamicForm, DynamicQueryForm} from '../../../common'
    import {VueUtil, FormUtil} from '../../../../libs'
    import _ from 'lodash';
    export default {
        components: {DynamicForm, DynamicQueryForm},
        computed: {
            ...VueUtil(this).select(['Users', 'Dict']).state(),
        },
        methods: {
            ...VueUtil(this).select(['Users', 'Dict']).actions(),
            openModal(){
                this.modalTitle = "新增用户";
                this.modal = true;
            },
            show(id){
                VueUtil(this).select('Users').get(id);
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
                        }, 600);
                    }
                }
            },

        },
        // 挂载完毕请求数据
        mounted(){
            this.changePage(1);
        },

        watch: {
            'Users.update': 'listenUsers',
            'Users.delete': 'listenUsers',
            'Users.save': 'listenUsers',
        },
        data(){

            const fields = [
                {
                    id: 'id',
                    label: '',
                    type: 'hidden',

                }, {
                    id: 'name',
                    label: '姓名',
                    type: 'input',
                    rules: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
                    sortable: 'custom'
                },
                {
                    id: 'mail',
                    label: '邮箱',
                    type: 'input',
                    rules: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    sortable: 'custom'
                },
                {
                    id: 'city',
                    label: '出生地',
                    type: 'select',
                    span: 24,
                    scope:['search','form','list'],
                    options: [
                        {
                            value: 'shagnhai', label: "上海",
                        }, {
                            value: 'shenzhen', label: "深圳",
                        }, {
                            value: 'beijing', label: "北京",
                        },
                    ],
                    rules: [
                        {required: true, message: '请选择城市', trigger: 'change'}
                    ]
                },
                {
                    id: 'date',
                    label: '日期',
                    type: 'date',
                    sortable: 'custom',
                },
                {
                    id: 'time',
                    label: '时间',
                    type: 'time',
                    sortable: 'custom',
                    scope:['form'],
                },
                {
                    id: 'gender',
                    label: '性别',
                    type: 'checkbox',
                    sortable: 'custom',
                    multiple: true,
                    filterable:true,
                    options: [
                        {
                            value: 'male', label: "男",
                        }, {
                            value: 'female', label: "女",
                        },
                    ],
                    render: (h, params) => {
                        return h('div', {}, params.row.gender === 'male' ? '男' : '女')
                    }
                },
                {
                    id: 'interest',
                    label: '爱好',
                    type: 'checkbox',
                    options: [
                        {
                            value: '1', label: "跑步",
                        }, {
                            value: '2', label: "骑车",
                        },
                    ],
                    rules: [
                        {required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change'},
                        {type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change'}
                    ]
                },
                {
                    id: 'desc',
                    label: '介绍',
                    type: 'textarea',
                    span: 24,
                    scope:['form'],
                    rules: [
                        {required: true, message: '请输入个人介绍', trigger: 'blur'},
                        {type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur'}
                    ]
                },
            ];
            let formUtil = FormUtil(this);
            formUtil.fields(fields);
            let query = formUtil.defaultQuery();
            const dicts = {

            }
            return {
                modalTitle: "",
                dicts,
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
                        title: '操作',
                        key: 'id',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.id)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.id)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteUsers(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
            }
        }
    }
</script>