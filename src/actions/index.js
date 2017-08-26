//Do not modify this file, it will be auto generated
import vuexDecorator from '../libs/vuexDecorator';
import  Breadcrumb from './breadcrumb/Breadcrumb';
import  Services from './configuration/Services';
import  Teams from './configuration/Teams';
import  Users from './configuration/Users';
import  Incidents from './incidents/Incidents';
import  Dict from './system/Dict';
import  ExternalPage from './system/ExternalPage';

export default {
    Breadcrumb: vuexDecorator('Breadcrumb',Breadcrumb),
    Services: vuexDecorator('Services',Services),
    Teams: vuexDecorator('Teams',Teams),
    Users: vuexDecorator('Users',Users),
    Incidents: vuexDecorator('Incidents',Incidents),
    Dict: vuexDecorator('Dict',Dict),
    ExternalPage: vuexDecorator('ExternalPage',ExternalPage),
}