import Pages from './components/pages';

const routers = [
    {
        path: '/',
        redirect: '/incidents'
    },
    {
        path: '/Login',
        name: 'name',
        component: Pages.Login,
    }, {
        path: '*', component: Pages.Home
    }, {
        path: '/home',
        name: 'Home',
        component: Pages.Home,
        children: [
            {
                name: 'Incidents',
                path: '/incidents',
                component: Pages.Incidents,
            }, {
                name: 'Alerts',
                path: '/alerts',
                component: Pages.Alerts,
            }, {
                name: 'Configuration',
                path: '/configuration',
                component: Pages.Nothing,
                children: [
                    {
                        name: 'Schedules',
                        path: '/schedules',
                        component: Pages.Schedules
                    }, {
                        name: 'Schedules',
                        path: '/schedules/:id/edit',
                        component: Pages.SchedulesEdit
                    }, {
                        name: 'Services',
                        path: '/services',
                        component: Pages.Services,
                        children: []
                    }, {
                        name: 'Service Detail',
                        path: '/services/:id',
                        component: Pages.ServiceDetail,
                    }, {
                        name: 'Add Service',
                        path: '/service_add',
                        component: Pages.AddService
                    }, {
                        name: 'Edit Service',
                        path: '/service_edit/:id',
                        component: Pages.AddService
                    }, {
                        name: 'Users',
                        path: '/users',
                        component: Pages.Users
                    }, {
                        name: 'Users',
                        path: '/users/:id',
                        component: Pages.UserDetail
                    }, {
                        name: 'Teams',
                        path: '/teams',
                        component: Pages.Teams
                    },
                ]
            }, {
                name: 'Analytics',
                path: '/analytics',
                component: Pages.Nothing,
                children: [
                    {
                        name: 'demo',
                        path: '/demo',
                        component: Pages.UsersDemo
                    }
                ]
            }
        ]
    },
];
export default routers;