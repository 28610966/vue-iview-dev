<style>
    .layout-content .ivu-col {
        padding: 5px 5px;
    }
</style>
<template>
    <Row type="flex" style="width: 100%;border-bottom: 1px solid #e9eaec">
        <Col span="20">
        <Tabs :animated="false">
            <Tab-pane :label="$t('h.incidents')">
                <ServiceIncidents></ServiceIncidents>
            </Tab-pane>
            <Tab-pane :label="$t('h.integrations')">
                <ServiceIntegrations></ServiceIntegrations>

            </Tab-pane>
            <Tab-pane :label="$t('h.settings')">
                <ServiceSettings></ServiceSettings>
            </Tab-pane>
        </Tabs>
        </Col>
        <Col span="4">
        <div class="service-buttons">
            <Button icon="edit">{{$t('button.edit',{msg:$t('h.service')})}}</Button>
            <Button icon="pause">{{$t('button.disabled',{msg:$t('h.service')})}}</Button>
            <Button icon="clock">Schedule Maintenance</Button>
            <Button icon="plus">{{$t('button.new',{msg:$t('h.incidents')})}}</Button>
            <Button icon="close">{{$t('button.delete',{msg:$t('h.service')})}}</Button>
        </div>
        <Card>
            <p slot="title">
                Service Maintenance
            </p>
            <div class="service-maintenace-body">
                <h4> In Progress</h4>
                <p>None</p>
                <div class="divider"></div>
                <h4>Upcoming</h4>
                <p>None</p>
                <div class="divider"></div>
                <h4>Immediate Maintenance</h4>
                <Button size="small"> 5 min</Button>
                <Button size="small"> 15 min </Button>
                <Button size="small">30 min</Button>
                <Button size="small">60 min</Button>
            </div>
        </Card>
        </Col>
    </Row>
</template>
<script>
    import {VueUtil, FormUtil} from '../../../../libs';
    import {DynamicForm} from '../../../common';
    import ServiceIncidents from './ServiceIncidents.vue'
    import ServiceIntegrations from './ServiceIntegrations.vue'
    import ServiceSettings from './ServiceSettings.vue'
    export default {
        components: {DynamicForm, ServiceIncidents, ServiceIntegrations, ServiceSettings},
        computed: {
            ...VueUtil(this).select(['Services']).state(),
        },
        methods: {
            ...VueUtil(this).select(['Services']).actions(),
            saveServices(){
                this.loading = true;
                this.$refs['form'].validate({
                    ok: (data) => {
                        VueUtil(this).select('Services').save(data);
                    }, err: () => {
                        this.loading = false;
                    }
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
                            this.loading = data.loading;
                            this.$router.push('/services');
                        }, 2000);
                    }
                }
            },
        },
        watch: {
            'Services.update': 'listenServices',
            'Services.delete': 'listenServices',
            'Services.save': 'listenServices',
        },
        data(){
            let fields = [
                {
                    id: 'id',
                    type: 'hidden',
                },
                {
                    span: 18,
                    label: 'Name',
                    type: 'input',
                    style: {width: '400px'},
                    id: 'name',
                    rules: [
                        {required: true, message: 'name is required', trigger: 'blur'},
                    ]
                }, {
                    span: 18,
                    label: 'Description',
                    style: {width: '400px'},
                    type: 'textarea',
                    id: 'description',
                    rules: [
                        {required: true, message: 'name is description', trigger: 'blur'},
                    ]
                }, {
                    span: 18,
                    label: 'Integration Type',
                    type: 'radio',
                    style: {display: 'flex', flexDirection: 'column'},
                    options: [
                        {value: '1', label: 'Select Tools'},
                        {value: '2', label: 'Integrate via email'},
                        {value: '3', label: 'Use our API directly'},
                        {value: '4', label: 'Don\'t use an integration'},
                    ],
                    id: 'integrationType',
                    rules: [
                        {required: true, message: 'integrationType is description', trigger: 'blur'},
                    ]
                }, {
                    span: 18,
                    label: 'Integration Name',
                    style: {width: '400px'},
                    type: 'input',
                    id: 'integrationName',
                }, {
                    span: 18,
                    label: 'Integration Email',
                    style: {width: '400px'},
                    type: 'input',
                    id: 'integrationEmail',
                }, {
                    span: 18,
                    label: 'Escalation Policy',
                    style: {width: '400px'},
                    type: 'input',
                    id: 'escalationPolicy',
                }, {
                    label: 'How should responders be notified?',
                    id: 'Teams',
                    style: {width: '400px'},
                    span: 18,
                    type: 'select',
                }, {
                    label: 'Incident Timeouts',
                    span: 18,
                    style: {display: 'flex', flexDirection: 'column'},
                    type: 'checkbox',
                    options: [
                        {value: 'Acknowledgement timeout', label: 'Acknowledgement timeout'},
                        {value: 'Auto-resolution', label: 'Auto-resolution'},
                    ],
                    id: 'incidentTimeouts',
                },
            ]
            const formUtil = FormUtil(this);
            formUtil.fields(fields);
            return {
                fields: formUtil.fields(),
                formValidate: formUtil.forms(),
                ruleValidate: formUtil.rules(),
                button: {
                    enable: true,
                    submit: this.saveServices,
                    cancel: () => {
                        this.$router.push("/services")
                    }
                }

            }
        }
    }
</script>