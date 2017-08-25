<template>

    <Submenu v-if="menu.children" v-bind:title="menu.title" v-bind:name="menu.id">
        <template slot="title">
            <Icon v-bind:type="menu.icon"></Icon>
            {{menu.title}}
        </template>
        <Menu-item v-bind:name="m.path" v-for="m in menu.children">
            {{m.title}}
        </Menu-item>
    </Submenu>
    <Menu-item v-else v-bind:name="menu.path">
        {{menu.title}}
    </Menu-item>
</template>
<script>
    export default{
        name: " MenuDecorator",
        props: {
            menu:{}
        }
    };
</script>