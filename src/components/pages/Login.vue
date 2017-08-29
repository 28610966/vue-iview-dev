/**
*
 * creeate by binwang on 17/8/28
 *
 */


<template>
    <div class="login">
        <Card>
            <p class="header">Hedwig Login</p>
            <div class="body">
                <Form
                        ref="loginForm"
                        :model="loginModel"
                        :rules="ruleValidate"
                        label-position="left" :label-width="80">
                    <Form-Item label="Username" prop="username">
                        <Input v-model="loginModel.username" placeholder="please input your username">></Input>
                    </Form-Item>
                    <Form-Item label="password" prop="password">
                        <Input v-model="loginModel.password" type="password"
                               placeholder="please input your password"></Input>
                    </Form-Item>
                </Form>
            </div>
            <div class="footer">
                <Button :loading="Users.login.loading" class="btn-login" type="primary" @click="validate('loginForm')">Login</Button>
                <a class="forget">forget password</a>
            </div>
        </Card>
    </div>
</template>

<script>
    import _ from 'lodash';
    import store from 'store';
    import {VueUtil, FormUtil} from '../../libs';

    export default{
        components: {},
        computed: {
            ...VueUtil(this).select(['Users']).state(),
        },
        props: {},
        data(){
            return {
                loginModel: {
                    username: '',
                    password: ''
                },
                ruleValidate: {
                    username: [
                        {
                            required: true, message: "username is not null", trigger: 'blur'
                        }
                    ], password: [
                        {
                            required: true, message: "password is not null", trigger: 'blur',
                        }
                    ],
                }
            }
        },
        mounted(){
        },
        watch: {
            'Users.login': 'login'
        },
        methods: {
            ...VueUtil(this).select(['Users']).actions(),
            login(data){
              if(!data.loading){
                  debugger
                  const token  = _.get(data,'data.token',null);
                  if(token){
                      store.set('token',token);
                      this.$router.push("/incidents");
                  }else{
                      this.$Message.error('username or password is wrong!');
                  }
              }
            },
            validate(){
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        VueUtil(this).select('Users').action('login', this.loginModel);
                    } else {
                        this.$Message.error('error!');
                    }
                })
            }
        }
    }
</script>