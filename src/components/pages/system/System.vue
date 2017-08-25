<template>
    <DynamicForm :fields="fields" :ruleValidate="ruleValidate" :formValidate="formValidate"></DynamicForm>
</template>
<script>
    import DynamicForm from '../../common/DynamicForm.vue'

    export default{
        components: {DynamicForm},
        data(){
            return {
                fields: [
                    {
                        id:'name',
                        label:'姓名',
                        type:'input',
                    },
                    {
                        id:'mail',
                        label:'邮箱',
                        type:'input',
                    },
                    {
                        id:'city',
                        label:'出生地',
                        type:'select',

                        options:[
                            {
                                value:'shagnhai',label:"上海",
                            },{
                                value:'shenzhen',label:"深圳",
                            },{
                                value:'beijing',label:"北京",
                            },
                        ]
                    },
                    {
                        id:'date',
                        label:'日期',
                        type:'date',
                    },
                    {
                        id:'time',
                        label:'时间',
                        type:'time',
                    },
                    {
                        id:'gender',
                        label:'性别',
                        type:'radio',
                        options:[
                            {
                                value:'male',label:"男",
                            },{
                                value:'female',label:"女",
                            },
                        ]
                    },
                    {
                        id:'interest',
                        label:'爱好',
                        type:'checkbox',
                        options:[
                            {
                                value:'1',label:"跑步",
                            },{
                                value:'2',label:"骑车",
                            },
                        ]
                    },
                    {
                        id:'desc',
                        label:'介绍',
                        type:'textarea',
                        span: 24,
                    },
                ],
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                }
            }
        }
    }
</script>