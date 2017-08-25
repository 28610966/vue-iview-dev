<style scoped>
    .ivu-row{
        height: 100%;
    }
</style>
<template>
    <Row>
        <i-col :span="2" style="border-right:1px solid darkgray;">
            <Menu mode="vertical" active-name="1">
                <Menu-item name="1">
                    Grafana
                </Menu-item>
            </Menu>
        </i-col>
        <i-col :span="22">
            <iframe src="http://www.baidu.com" style="width:100%;height: 800px;" width="100%" height="100%" frameborder="0"></iframe>
        </i-col>
    </Row>
</template>
<script>
    export default{
        name: "Fuck"
    }
</script>