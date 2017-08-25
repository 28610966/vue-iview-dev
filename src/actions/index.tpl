//Do not modify this file, it will be auto generated
import vuexDecorator from '../libs/vuexDecorator';
{{#list}}
import  {{this.name}} from '{{this.fullName}}';
{{/list}}

export default {
{{#list}}
    {{this.name}}: vuexDecorator('{{this.name}}',{{this.name}}),
{{/list}}
}