<template>
    <div class="user-information">
       <Row>
           <Col span="14" offset="1">
           <DynamicForm :dicts="dicts" :button="{enabled:false}"  ref="form" :fields="fields" :ruleValidate="ruleValidate"
                        :formValidate="formValidate">
           </DynamicForm>
            </Col>
       </Row>
        <Row>
            <Col span="14">
            <h1>Activity for the past 14 days</h1>
            </Col>
        </Row>
     </div>
</template>
<script>
    import {DynamicForm, DynamicQueryForm} from '../../../common';
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../../../libs';

    export default{
        name: 'ContactInformation',
        components: {DynamicForm, DynamicQueryForm},
        computed: {
            ...VueUtil(this).select(['Users','Services']).state(),
        },
        props: ['usermodel'],
        data(){
            const inputWidthStyle={}
            const fields = [
                {
                    label: 'Name',
                    id: 'name',
                    style:inputWidthStyle,
                    type:'input',
                    rules:[{required:true}],
                    span:22,
                }, {
                    label: 'Title',
                    id: 'Title',
                    style:inputWidthStyle,
                    type:'input',
                    span:22,
                }, {
                    label: 'Bio',
                    id: 'Bio',
                    style:inputWidthStyle,
                    type:'textarea',
                    span:22,
                }, {
                    label: 'Time Zone',
                    id: 'timeZone',
                    style:inputWidthStyle,
                    type:'input',
                    span:22,
                }, {
                    label: 'Phone',
                    id: 'Phone',
                    style:inputWidthStyle,
                    type:'input',
                    span:22,
                }, {
                    label: 'SMS',
                    id: 'sms',
                    style:inputWidthStyle,
                    type:'input',
                    span:22,
                }, {
                    label: 'Email',
                    id: 'email',
                    style:inputWidthStyle,
                    type:'input',
                    span:22,
                }
            ];
            const dicts ={
                Roles:[],
                Teams:[],
            }
            const formUtil = FormUtil(this);
            formUtil.fields(fields);
            const query = formUtil.defaultQuery();
            return {
                query,
                dicts,
                fields: formUtil.fields(),
                queryFields: formUtil.queryFields(),
                formValidate: formUtil.forms(),
                ruleValidate: formUtil.rules(),
            }
        },
        mounted(){
            VueUtil(this).select('Services').list(this.query);
        },
        watch: {},
        methods: {
            ...VueUtil(this).select(['Users','Services']).actions(),
        }
    }
</script>