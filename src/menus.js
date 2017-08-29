/**
 * Created by binwang on 17/8/16.
 */
const menus = [{
    "id": 1,
    "title": "Incidents",
    "icon": "desktop",
    "path": "/incidents",
    "role": "1",
}, {
    "id": 4,
    "title": "Alerts",
    "icon": "user",
    "path": "/alerts",
    "role": "2",
}, {
    "id": 8,
    "title": "Configuration",
    "icon": "setting",
    "group": "soft",
    "role": "3",
    "children": [

        {"id": 9, "title": "Schedules", "path": "/service_management"}, {
            "id": 10,
            "title": "Services",
            "path": "/services"
        }, {"id": 11, "title": "EscalationPolicies", "path": "/event_source_management"}, {
            "id": 12,
            "title": "Users",
            "path": "/users"
        }, {
            "id": 13, "title": "Teams", "path": "/teams"
        }, {
            "id": 14, "title": "APIAccess", "path": "/api_access"
        }, {
            "id": 15, "title": "Extensions", "path": "/extensions"
        }, {
            "id": 16, "title": "AccountSettings", "path": "/account_settings"
        }, {"id": 17, "title": "Analytics", "path": "/analytics"}
    ]
}, {


    "id": 18,
    "title": "Analytics",
    "group": "audit",
    "role": "4",
    "icon": "area-chart",
    "children": [{"id": 19, "title": "Reports", "path": "/demo"}, {
        "id": 20,
        "title": "Postmortems",
        "path": "/postmortems"
    }]
}, {
    "id": 21,
    "title": "CommandConsole",
    "group": "opt",
    "path":"/command_console",
    "role": "5",
    "icon": "setting",

}];

export default menus;