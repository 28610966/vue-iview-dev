<template>
    <Submenu v-if="menu.children" :title="menu.title" :name="menu.id">
        <template slot="title">
            <Icon :type="menu.icon"></Icon>
            {{menu.title}}
        </template>
        <Menu-item :name="m.path" v-for="m in menu.children" :key="m.title">
            {{m.title}}
        </Menu-item>
    </Submenu>
    <Menu-item v-else :name="menu.path">
        {{menu.title}}
    </Menu-item>
</template>
<script>
    export default{
        name: "MenuDecorator",
        props: [
            'menu'
        ]
    };
</script>