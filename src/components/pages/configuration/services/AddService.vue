<template>
    <Row type="flex" style="width: 100%;border-bottom: 1px solid #e9eaec">
        <Col span="20">
        <h1 style="width: 100%;border-bottom: 1px solid #e9eaec">Add a Service</h1>
        <p style="padding:5px 0px;">
            A service may represent an application, component or team you wish to open incidents against.</p>
        <p>
        <div>
            <DynamicForm :loading="loading" :dicts="dicts" ref="form" :fields="fields" :ruleValidate="ruleValidate"
                         :formValidate="formValidate" :labelWidth="150" :button="button"></DynamicForm>
        </div>
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
        components: {},
        computed: {
            ...VueUtil(this).select(['Services']).state(),
        },
        methods: {
            ...VueUtil(this).select(['Services']).actions(),
            saveServices(){
                this.loading = true;
                this.$refs['form'].validate({
                    ok: (data) => {
                        if(!data.id){
                            VueUtil(this).select('Services').save(data);
                        }else{
                            VueUtil(this).select('Services').update(data);
                        }
                    }, err: () => {
                        this.loading = false;
                    }
                });
            },
            listenServices(data){
                if (!data.loading) {
                    if(data.type === 'get'){
                        this.formValidate = data.data;
                    }else {
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
                }
            },
        },
        mounted(){
            if(this.$route.params.id)
                VueUtil(this).select('Services').get(this.$route.params.id);
        },
        watch: {
            'Services.get': 'listenServices',
            'Services.update': 'listenServices',
            'Services.delete': 'listenServices',
            'Services.save': 'listenServices',
        },
        data(){
            let fields = [
                {
                    id: 'id',
                    type:'hidden',
                },
                {
                    span: 18,
                    label: 'Name',
                    primaryTitle:'General Settings',
                    type: 'input',
                    style: {width: '400px'},
                    id: 'name',
                    rules:[
                        {required: true, message: 'name is required', trigger: 'blur'},
                    ]
                }, {
                    span: 18,
                    label: 'Description',
                    style: {width: '400px'},
                    type: 'textarea',
                    id: 'description',
                    rules:[
                        {required: true, message: 'name is description', trigger: 'blur'},
                    ]
                }, {
                    span: 18,
                    primaryTitle:'Integration Settings',
                    label: 'Integration Type',
                    type: 'radio',
                    style: {display: 'flex', flexDirection: 'column'},
                    options: "IntegrationType",
                    id: 'integrationType',
                    rules:[
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
                    primaryTitle:'Incident Settings',
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
                    options: "IncidentTimeouts",
                    id: 'incidentTimeouts',
                },{
                    primaryTitle:'Incident Behavior',
                    secondaryTitle:'PagerDuty receives events from your monitoring systems and can then create incidents in different ways.',
                    type: "radio",
                    id: 'incidentBehavior',
                    style: {display: 'flex', flexDirection: 'column'},
                    options:"IncidentBehavior"
                }
            ]
            const formUtil = FormUtil(this).initFields(fields);
            const dicts = {
                IntegrationType:[
                    {value: '1', label: 'Select Tools'},
                    {value: '2', label: 'Integrate via email'},
                    {value: '3', label: 'Use our API directly'},
                    {value: '4', label: 'Don\'t use an integration'},
                ],
                IncidentTimeouts:[
                    {value: 'Acknowledgement timeout', label: 'Acknowledgement timeout'},
                    {value: 'Auto-resolution', label: 'Auto-resolution'},
                ],
                IncidentBehavior:[
                    {label:'Create alerts and incidents', value:'1', description:'An event will create an alert and then add it to a new incident. These incidents can be merged.'},
                    {label:'Create incidents', value:'2' ,description:'An event will create an incident that cannot be merged.'},
                ]
            }
            return {
                dicts,
                loading:false,
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