<template>
    <div>
        <Row>
            <Col span="19">
                <IncidentsMain ref="incidentsMain"></IncidentsMain>
            </Col>
            <Col span="5">
                <Row>
                    <Col span="24">
                        <Button type="success" icon="plus" style="width:100%;text-align: left;"  @click="openModal">New Incident</Button>
                    </Col>
                    <Col span="24">
                        <Card style="margin: 5px 0px;">
                            <p slot="title">
                                Resources
                            </p>
                            <div>
                                <p>You are all alone being on-call all the time.</p>
                                <p>Get some backup, invite your team:</p>
                                <Button style="width:100%" type="success" icon="group">Add your colleagues</Button>
                                <p>Then share on-call responsibilities:</p>
                                <Button style="width:100%">Create an on-call schedule</Button>
                            </div>
                        </Card>
                        <Card style="margin: 10px 0px;">
                            <p slot="title">
                                Next Steps: Your Tools
                            </p>
                            <div>
                                <p>Add all your tools to begin monitoring your systems today:</p>
                                <Button icon="plus" @click="newService">Add new services</Button>

                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Modal width="600px" v-model="modal" :title="modalTitle"
               :loading="loading"
               @on-ok="saveIncidents"
        >
            <DynamicForm :dicts="dicts" :button="{enabled:false}" ref="form" :fields="fields" :ruleValidate="ruleValidate"
                         :formValidate="formValidate"></DynamicForm>
            <div slot="footer">
                <Button size="large" @click="resetForm">Reset</Button>
                <Button type="primary" size="large" :loading="loading" @click="saveIncidents">Submit</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {DynamicForm, DynamicQueryForm, DropMenuDecorator} from '../../common';
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../../libs';
    import IncidentsTools from './IncidentsTools.vue'
    import IncidentsMain from './IncidentsMain.vue'

    export default{
        components: {DynamicForm, DynamicQueryForm, DropMenuDecorator, IncidentsTools ,IncidentsMain},
        computed: {
            ...VueUtil(this).select(['Incidents','Services']).state(),
        },
        methods: {
            ...VueUtil(this).select(['Incidents','Services']).actions(),
            newService(){
                this.$router.push("/service_add");
            },
            openModal(){
                this.$refs['incidentsMain'].openModal();
            },
        },

        mounted(){
        },
        watch: {

        },
        props: {},
        data(){
            return {
                status: 1,
                loading: false,
                modal: false,
            }
        }
    }
</script>