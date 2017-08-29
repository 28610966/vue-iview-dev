<template>
    <div class="user-detail">
        <div class="title">
            <div class="portrait"></div>
            <div class="name"><h1>{{Users.get.data.name}}</h1></div>
        </div>
        <div class="body">
            <Tabs value="ContactInformation" :animated="false">
                <Tab-pane name="ContactInformation" label="Contact Information">
                    <ContactInformation :usermodel="Users.get.data"></ContactInformation>
                </Tab-pane>
                <Tab-pane label="Notification Rules">
                    <NotificationRules></NotificationRules>
                </Tab-pane>
                <Tab-pane label="User Settings">
                    <UserSettings></UserSettings>
                </Tab-pane>
                <Tab-pane label="Permissions">
                    <Permissions></Permissions>
                </Tab-pane>
                <Tab-pane label="On-Call Timeline"></Tab-pane>
            </Tabs>
        </div>
    </div>
</template>

<script>
    import {DynamicForm, DynamicQueryForm} from '../../../common';
    import NotificationRules from './NotificationRules.vue';
    import ContactInformation from './ContactInformation.vue';
    import UserSettings from './UserSettings.vue';
    import Permissions from './Permissions.vue';
    import _ from 'lodash';
    import {VueUtil, FormUtil} from '../../../../libs';

    export default{
        components: {
            DynamicForm,
            DynamicQueryForm,
            NotificationRules,
            ContactInformation,
            UserSettings,
            Permissions,
        },
        computed: {
            ...VueUtil(this).select(['Users']).state(),
        },
        props: {},

        data(){
            return {}
        },
        mounted(){
            VueUtil(this).select('Users').get(this.$route.params.id);
        },
        watch: {},
        methods: {
            ...VueUtil(this).select(['Users']).actions(),
        }
    }
</script>