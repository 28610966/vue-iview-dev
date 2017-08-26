<template>
    <Form ref="formSearch" :model="formSearch" :label-width="80">
        <Row>
            <i-col :style="{display:field.type === 'hidden'?'none':'block'}" class v-for="field in fields"
                   :span="6">
                <Form-item :label="field.label" :prop="field.id">
                    <Input type="hidden" v-if="field.type === 'hidden'" v-model="formSearch[field.id]"></Input>
                    <Input v-if="field.type === 'input'" v-model="formSearch[field.id]"
                           :placeholder="`请输入${field.label}`"></Input>
                    <Select :multiple='field.multiple'
                            :clearable="field.clearable || false"
                            :filterable="field.filterable || false"
                            v-else-if="field.type ==='select' || field.type ==='radio' || field.type ==='checkbox'" v-model="formSearch[field.id]"
                            :placeholder="`请输入${field.label}`">
                        <Option v-for="option in field.options" :value="option.value">{{option.label}}</Option>
                    </Select>
                    <Date-picker v-else-if="field.type ==='date'" type="date" :placeholder="`请选择${field.label}`"
                                 v-model="formSearch[field.id]"></Date-picker>
                    <Time-picker v-else-if="field.type ==='time'" type="time" :placeholder="`请选择${field.label}`"
                                 v-model="formSearch[field.id]"></Time-picker>
                    <Checkbox-group v-else-if="field.type ==='checkbox'" v-model="formSearch[field.id]">
                        <Checkbox :label="option.value" v-for="option in field.options">{{option.label}}</Checkbox>
                    </Checkbox-group>
                    <Input v-else-if="field.type ==='textarea'" v-model="formSearch[field.id]" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入..."></Input>
                </Form-item>
            </i-col>
            <i-col class
                   :span="6">
                <Form-item>
                    <Button type="primary" icon="search">查询</Button>
                    <Button type="" @click="handleReset('formSearch')">重置</Button>
                </Form-item>
            </i-col>
        </Row>
    </Form>
</template>
<script>
    import ICol from "../../../node_modules/iview/src/components/grid/col";
    export default {
        components: {ICol}, name: 'DynamicQueryForm',
        props: [
            'formSearch',
            'fields',
        ],
        data () {
            return {}
        },
        mounted(){
          this.handleReset('formSearch')
        },
        methods: {
            validate(cb){
                this.$refs['formSearch'].validate((valid) => {
                    if (valid) {
                        !!cb.ok && cb.ok.call(this, this.formSearch);
                    } else {
                        this.$Message.error('表单验证失败!');
                        !!cb.err && cb.err.call();
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>