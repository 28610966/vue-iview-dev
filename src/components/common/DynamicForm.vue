<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="labelWidth || 80">
        <Row>
            <i-col v-for="field in fields"
                   :style="{display:field.type === 'hidden'?'none':'block'}" class
                   :key="field.id"
                   :span="field.span || 12">
                <div v-if="field.primaryTitle" style="margin-bottom: 10px;">
                    <h2 >{{field.primaryTitle}}</h2>
                    <p v-if="field.secondaryTitle">{{field.secondaryTitle}}</p>
                </div>

                <Form-item :label="field.label" :prop="field.id">
                    <input type="hidden" v-if="field.type === 'hidden'" v-model="formValidate[field.id]"/>
                    <Input v-if="field.type === 'input'"
                           v-model="formValidate[field.id]"
                           :style="field.style"
                           :placeholder="field.placeholder || `please input ${field.label}`"></Input>
                    <Select v-else-if="field.type ==='select'"
                            v-model="formValidate[field.id]"
                            :style="field.style"
                            :ref="'select_'+field.id"
                            :initialValue="field.initialValue || (field.multiple?[]:null)"
                            :placeholder="field.placeholder || `please input ${field.label}`"
                            :clearable="field.clearable || true"
                            :filterable="field.filterable || false"
                            :multiple="field.multiple || false"
                            :remote="field.remote || false"
                            :remote-method="field.remoteMethod || null"
                        >
                        <Option v-if="dicts && dicts[field.options]"
                                v-for="option in dicts[field.options]"
                                :key="option.id"
                                :value="option.value">{{option.label}}</Option>
                    </Select>
                    <Radio-group v-else-if="field.type ==='radio'"
                                 v-model="formValidate[field.id]"
                                 :style="field.style" >
                        <div v-if="dicts && dicts[field.options]"
                             v-for="option in dicts[field.options]"
                             :key="option.value">
                            <Radio :label="option.value" >{{option.label}}</Radio>
                            <p style="margin-left: 20px;" v-if="option.description">{{option.description}}</p>
                        </div>
                    </Radio-group>
                    <Checkbox-group v-else-if="field.type ==='checkbox'"
                                    v-model="formValidate[field.id]"
                                    :style="field.style">
                        <div v-if="dicts && dicts[field.options]"
                             v-for="option in dicts[field.options]"
                             :key="option.value"
                        >
                        <Checkbox :label="option.value">{{option.label}}</Checkbox>
                            <p style="margin-left: 20px;" v-if="option.description">{{option.description}}</p>
                        </div>
                    </Checkbox-group>
                    <Date-picker v-else-if="field.type ==='date'" type="date" :placeholder="field.placeholder || `please select ${field.label}`"
                                 v-model="formValidate[field.id]"></Date-picker>
                    <Time-picker v-else-if="field.type ==='time'" type="time" :placeholder="field.placeholder || `please select ${field.label}`"
                                 v-model="formValidate[field.id]"></Time-picker>
                    <Input :style="field.style"  v-else-if="field.type ==='textarea'" v-model="formValidate[field.id]" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"
                           :placeholder="field.placeholder || `please input ${field.label}`"></Input>
                </Form-item>
            </i-col>
        </Row>
        <Form-item v-if="button.enable">
            <Button :loading="loading" type="primary" @click="button.submit">Submit</Button>
            <Button :disabled="loading" type="error" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            <Button :disabled="loading" type="ghost" @click="button.cancel" style="margin-left: 8px">Cancel</Button>
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
            'loading',
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