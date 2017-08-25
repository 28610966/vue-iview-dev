<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="labelWidth || 80">
        <Row>
            <i-col v-bind:style="{display:field.type === 'hidden'?'none':'block'}" class v-for="field in fields"
                   :span="field.span || 12">
                <Form-item :label="field.label" :prop="field.id">
                    <Input type="hidden" v-if="field.type === 'hidden'" v-model="formValidate[field.id]"></Input>
                    <Input :style="field.style"  v-if="field.type === 'input'" v-model="formValidate[field.id]"
                           :placeholder="`please input${field.label}`"></Input>
                    <Select :style="field.style"  v-else-if="field.type ==='select'" v-model="formValidate[field.id]"
                            :placeholder="`please input${field.label}`">
                        <Option v-for="option in field.options" :value="option.value">{{option.label}}</Option>
                    </Select>
                    <Date-picker v-else-if="field.type ==='date'" type="date" :placeholder="`please select${field.label}`"
                                 v-model="formValidate[field.id]"></Date-picker>
                    <Time-picker v-else-if="field.type ==='time'" type="time" :placeholder="`please select${field.label}`"
                                 v-model="formValidate[field.id]"></Time-picker>
                    <Radio-group :style="field.style" v-else-if="field.type ==='radio'" v-model="formValidate[field.id]">
                        <Radio :label="option.value" v-for="option in field.options">{{option.label}}</Radio>
                    </Radio-group>
                    <Checkbox-group :style="field.style"  v-else-if="field.type ==='checkbox'" v-model="formValidate[field.id]">
                        <Checkbox :label="option.value" v-for="option in field.options">{{option.label}}</Checkbox>
                    </Checkbox-group>
                    <Input :style="field.style"  v-else-if="field.type ==='textarea'" v-model="formValidate[field.id]" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="please input..."></Input>
                </Form-item>
            </i-col>
        </Row>
        <Form-item v-if="button.enable">
            <Button type="primary" @click="button.submit">Submit</Button>
            <Button type="danger" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            <Button type="ghost" @click="button.cancel" style="margin-left: 8px">Cancel</Button>
        </Form-item>
    </Form>
</template>
<script>
    import ICol from "../../../node_modules/iview/src/components/grid/col";
    export default {
        components: {ICol}, name: 'DynamicForm',
        props: [
            'ruleValidate',
            'formValidate',
            'fields',
            'labelWidth',
            'button',
        ],
        data () {
            return {}
        },
        methods: {
            validate(cb){
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        !!cb.ok && cb.ok.call(this, this.formValidate);
                    } else {
                        this.$Message.error('error!');
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