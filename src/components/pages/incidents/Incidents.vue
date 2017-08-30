<template>
    <div>
        <Row>
            <Col span="19">
                <IncidentsMain ref="incidentsMain"></IncidentsMain>
            </Col>
            <Col span="5">
                <Row>
                    <!--<Key id="admin">-->
                        <Col span="24">
                                <Button type="success" icon="plus" style="width:100%;text-align: left;"  @click="openModal">{{$t('button.new',{msg:$t('h.Incidents')})}}</Button>
                        </Col>
                    <!--</Key>-->
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
    </div>
</template>

<script>
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../../libs';
    import IncidentsTools from './IncidentsTools.vue'
    import IncidentsMain from './IncidentsMain.vue'

    export default{
        components: { IncidentsTools ,IncidentsMain},
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