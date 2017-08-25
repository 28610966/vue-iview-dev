import * as Pages from './components/pages';

const routers = [{
    mode: 'history',
    path: '/',
    name: 'Home',
    component: Pages.Home,
    children: [
        {
            name: 'Incidents',
            path: '/incidents',
            component: Pages.Nothing,
        }, {
            name: 'Alerts',
            path: '/alerts',
            component: Pages.Nothing,
        }, {
            name: 'Configuration',
            path: '/',
            component: Pages.Nothing,
            children: [
                {
                    name: 'Schedules',
                    path: '/schedules',
                    component: Pages.Schedules
                }, {
                    name: 'Services',
                    path: '/services',
                    component: Pages.Services,
                    children: [

                    ]
                }, {
                    name: 'Service Detail',
                    path: '/services/:id',
                    component: Pages.ServiceDetail,
                },{
                    name: 'Add Service',
                    path: '/service_add',
                    component: Pages.AddService
                },
            ]
        },
        {
            name: '门户',
            path: '/fuck',
            component: Pages.Fuck
        }, {
            path: '*', component: Pages.NoMatchPage
        }
    ]
},
];
export default routers;