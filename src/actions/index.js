//Do not modify this file, it will be auto generated
import vuexDecorator from '../libs/vuexDecorator';
import  Breadcrumb from './breadcrumb/Breadcrumb';
import  Services from './configuration/Services';
import  Incidents from './incidents/Incidents';
import  Dict from './system/Dict';
import  ExternalPage from './system/ExternalPage';
import  User from './user/User';

export default {
    Breadcrumb: vuexDecorator('Breadcrumb',Breadcrumb),
    Services: vuexDecorator('Services',Services),
    Incidents: vuexDecorator('Incidents',Incidents),
    Dict: vuexDecorator('Dict',Dict),
    ExternalPage: vuexDecorator('ExternalPage',ExternalPage),
    User: vuexDecorator('User',User),
}