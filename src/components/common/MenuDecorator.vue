<template>
    <Submenu v-if="menu.children" :name="menu.id">
        <template slot="title">
            <Icon :type="menu.icon"></Icon>
            {{$t('h.'+menu.title)}}
        </template>
        <Menu-item :name="m.path" v-for="m in menu.children" :key="m.title">
            {{$t('h.'+m.title)}}
        </Menu-item>
    </Submenu>
    <Menu-item v-else :name="menu.path">
        {{$t('h.'+menu.title)}}
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