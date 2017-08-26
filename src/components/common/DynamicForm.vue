<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="labelWidth || 80">
        <Row>
            <i-col :style="{display:field.type === 'hidden'?'none':'block'}" class v-for="field in fields"
                   :span="field.span || 12">
                <Form-item :label="field.label" :prop="field.id">
                    <input type="hidden" v-if="field.type === 'hidden'" v-model="formValidate[field.id]"/>
                    <Input :style="field.style"  v-if="field.type === 'input'" v-model="formValidate[field.id]"
                           :placeholder="`please input ${field.label}`"></Input>
                    <Select :ref="'select_'+field.id" :style="field.style"  v-else-if="field.type ==='select'" v-model="formValidate[field.id]"
                            :initialValue="field.initialValue || (field.multiple?[]:null)"
                            :placeholder="`please input${field.label}`"
                            :clearable="field.clearable || true"
                            :filterable="field.filterable || false"
                            :multiple="field.multiple || false"
                            :remote="field.remote || false"
                            :remote-method="field.remoteMethod || null"
                        >
                        <Option v-if="dicts && dicts[field.options]"  v-for="option in dicts[field.options]" :value="option.value">{{option.label}}</Option>
                    </Select>
                    <Radio-group :style="field.style" v-else-if="field.type ==='radio'" v-model="formValidate[field.id]">
                        <Radio  v-if="dicts && dicts[field.options]" :label="option.value" v-for="option in dicts[field.options]">{{option.label}}</Radio>
                    </Radio-group>
                    <Checkbox-group :style="field.style"  v-else-if="field.type ==='checkbox'" v-model="formValidate[field.id]">
                        <Checkbox v-if="dicts && dicts[field.options]" :label="option.value" v-for="option in dicts[field.options]">{{option.label}}</Checkbox>
                    </Checkbox-group>
                    <Date-picker v-else-if="field.type ==='date'" type="date" :placeholder="`please select${field.label}`"
                                 v-model="formValidate[field.id]"></Date-picker>
                    <Time-picker v-else-if="field.type ==='time'" type="time" :placeholder="`please select${field.label}`"
                                 v-model="formValidate[field.id]"></Time-picker>
                    <Input :style="field.style"  v-else-if="field.type ==='textarea'" v-model="formValidate[field.id]" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="please input..."></Input>
                </Form-item>
            </i-col>
        </Row>
        <Form-item v-if="button.enable">
            <Button type="primary" @click="button.submit">Submit</Button>
            <Button type="error" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            <Button type="ghost" @click="button.cancel" style="margin-left: 8px">Cancel</Button>
        </Form-item>
    </Form>
</template>
<script>
    export default {
        name: 'DynamicForm',
        props: [
            'ruleValidate',
            'formValidate',
            'fields',
            'labelWidth',
            'button',
            'dicts',
        ],
        data () {
            return {}
        },
        mounted(){
            this.handleReset('formValidate')
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
//                this.$refs[name].resetFields();
//                this.fields.map(f =>{
//                    if(f.type ==='select'){
////                        this.$refs['select_'+f.id][0].model = null;
//                    }
//                })
            }
        }
    }
</script>