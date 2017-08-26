<template>
    <div>
        <Dropdown trigger="click" placement="bottom-end" :transfer="true" @on-click="select">
            <Button size="small" icon="gear-b" href="javascript:void(0)">
                {{title}}
                <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list" >
                <Dropdown-item :name="menu.type+'/'+id" v-for="menu in list" >
                        <Icon :type="menu.icon"></Icon>
                        {{menu.title}}
                </Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
    </div>
</template>
<script>
    export default {
        name: 'DropMenuDecorator',
        props:[
            "id",
            "title",
            "select",
            "list",
        ]
    }
</script>
