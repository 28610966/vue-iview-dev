<style>
    .layout-content .ivu-col {
        padding: 5px 5px;
    }
</style>
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
                <Button @click="btnClick" icon="plus" type="success">{{addBtn.title}}</Button>
            </div>
            </Col>
        </Row>
        <Row>
            <Col span="24">
            <Tabs value="Services" :animated="false" @on-click="changeTabs">
                <Tab-pane label="Services" name="Services">
                    <Row>
                        <Col span="24">
                        <div style="float: right;">
                            <Page :total="Services.list.data.total" :current="Services.list.data.current" size="small"
                                  @on-change="changePage" @on-page-size-change="changePageSizer" show-total
                                  show-sizer></Page>
                        </div>
                        </Col>
                        <Col span="24">
                        <Table size="small" :columns="columns" :data="Services.list.data.list"></Table>

                        </Col>
                        <Col span="24">
                        <div style="float: right;">
                            <Page :total="Services.list.data.total" :current="Services.list.data.current" size="small"
                                  @on-change="changePage" @on-page-size-change="changePageSizer" show-total
                                  show-sizer></Page>
                        </div>
                        </Col>
                    </Row>
                </Tab-pane>
                <Tab-pane label="Maintenance Windows" name="Maintenance Windows">
                    <Alert>
                        消息提示文案


                        <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template>
                    </Alert>
                </Tab-pane>
            </Tabs>
            </Col>
        </Row>
        </Col>
        <Col span="4">
        <Card>
            <p slot="title">
                Resources
            </p>
            <ul>
                <li>Adding Services</li>
                <li>Best Practices for Services</li>
                <li>Creating Maintenance Windows</li>
                <li>How to Trigger an Incident</li>
                <li>Get More Help</li>
                <li>Find more answers in our Knowledge Base</li>
                <li>Chat with Support</li>
            </ul>
        </Card>
        </Col>
    </Row>
</template>
<script>
    import {VueUtil, FormUtil} from '../../../../libs';

    export default {
        computed: {
            ...VueUtil(this).select(['Services']).state(),
        },
        methods: {
            ...VueUtil(this).select(['Services']).actions(),
            changeTabs(name){
                if (name === 'Services') {
                    this.title = 'Services on All Teams';
                    this.addBtn = {
                        title: 'Add New Services',
                        path: '/service_add',
                    }
                } else {
                    this.title = 'Maintenance Windows on All Teams';
                    this.addBtn = {
                        title: 'Schedule Maintenance',
                        path: '/',
                    }
                }
            },
            btnClick(){
                this.$router.push(this.addBtn.path);
            },

            deleteServices(id){
                VueUtil(this).select('Services').delete(id);
            },
            updateServices(user){
                VueUtil(this).select('Services').update(user);
            },
            changePage(page){
                page ? this.query.current = page : null;
                VueUtil(this).select('Services').list(this.query);
            },
            changePageSizer(pageSize){
                VueUtil(this).select('Services').list({
                    pageSize: pageSize || 10,
                    current: _.get(this.query, "current", 1)
                });
            },
            listenServices(data){
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
        data(){
            let fields = [
                {
                    label: 'Service',
                    id: 'name',
                    render: (h, params) => {
                        return h('div',[
                            h('a',{
                                on:{
                                    click: ()=>{
                                        this.$router.push(`/services/${params.row.id}`)
                                    }
                                }
                            },params.row.name),
                            h('p',{},params.row.description),
                        ])
                    }
                }, {
                    label: 'Incidents',
                    id: 'integrationType',
                }, {
                    label: 'Last Incident',
                    id: 'Last Incident',
                }, {
                    label: 'Integrations',
                    id: 'Integrations',
                }, {
                    label: 'Notification',
                    id: 'Notification',
                }, {
                    label: 'Urgency',
                    id: 'Urgency',
                }, {
                    label: 'Teams',
                    id: 'Teams',
                }, {
                    label: 'Escalation Policy',
                    id: 'escalationPolicy',
                },
            ];
            const formUtil = FormUtil(this);
            formUtil.fields(fields);
            let query = formUtil.defaultQuery();
            return {
                query,
                loading: false,
                title: 'Services on All Teams',
                tab: 'Services',
                addBtn: {title: "Add New Services", path: '/service_add',},
                columns: [
                    ...formUtil.columns(),
                    {
                        key: 'id',
                        render: (h, params) => {

                        }
                    }
                ]

            }
        }
    }
</script>