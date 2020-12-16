import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        selectWidget: {},
        widgetForm: {},
        formConfig: {
            labelWidth: 100,
            labelPosition: "right",
            size: "small",

        },
        models: {},
        currentContainer: [],
        responseData: [{
                "objectId": "860ab03a2f4e429cbbded875f8e83118",
                "entityId": "89a5163bfb87499b91a3eef75f244ca7",
                "fieldId": "a2ad1a89fbfe4941a55bbde0954e4b1f",
                "refEntityId": null,
                "refFieldId": null,
                "isMainEntity": true,
                "remark": null,
                "entityDescription": "实体信息",
                "fieldDescription": "ID",
                "refEntityDescription": null,
                "refFieldDescription": null,
                "entityInfo": {
                    "id": "89a5163bfb87499b91a3eef75f244ca7",
                    "datasourceId": "bfa743c0e5744618a7341bf3d33e2af0",
                    "name": "entity",
                    "description": "实体信息",
                    "tableName": "wf_uc_entity_b",
                    "type": 0,
                    "isCreate": true,
                    "state": 1,
                    "remark": null,
                    "datasourceName": "本地数据源",
                    "fields": [{
                            "id": "a2ad1a89fbfe4941a55bbde0954e4b1f",
                            "entityId": "89a5163bfb87499b91a3eef75f244ca7",
                            "serialNumber": 1,
                            "name": "id",
                            "description": "ID",
                            "fieldName": "f_id",
                            "dataType": "varchar",
                            "dataLen": 32,
                            "dataDec": 0,
                            "isPk": true,
                            "isRequired": true,
                            "defaultValue": "",
                            "remark": null
                        },
                        {
                            "id": "2ced4865870440a597aff4ed9822a80b",
                            "entityId": "89a5163bfb87499b91a3eef75f244ca7",
                            "serialNumber": 2,
                            "name": "name",
                            "description": "名称",
                            "fieldName": "f_name",
                            "dataType": "varchar",
                            "dataLen": 50,
                            "dataDec": 0,
                            "isPk": false,
                            "isRequired": false,
                            "defaultValue": null,
                            "remark": null
                        },
                        {
                            "id": "2ced4865870440a597aff4ed9822a80b",
                            "entityId": "89a5163bfb87499b91a3eef75f244ca7",
                            "serialNumber": 3,
                            "name": "age",
                            "description": "年龄",
                            "fieldName": "f_age",
                            "dataType": "int",
                            "dataLen": 50,
                            "dataDec": 0,
                            "isPk": false,
                            "isRequired": false,
                            "defaultValue": null,
                            "remark": null
                        }
                    ]
                }
            },
            {
                "objectId": "860ab03a2f4e429cbbded875f8e83118",
                "entityId": "89a5163bfb87499b91a3eef75f244ca7",
                "fieldId": "a2ad1a89fbfe4941a55bbde0954e4b1f",
                "refEntityId": null,
                "refFieldId": null,
                "isMainEntity": true,
                "remark": null,
                "entityDescription": "学生信息",
                "fieldDescription": "ID",
                "refEntityDescription": null,
                "refFieldDescription": null,
                "entityInfo": {
                    "id": "89a5163bfb87499b91a3eef75f244ca7",
                    "datasourceId": "bfa743c0e5744618a7341bf3d33e2af0",
                    "name": "student",
                    "description": "学生信息",
                    "tableName": "wf_uc_entity_b",
                    "type": 0,
                    "isCreate": true,
                    "state": 1,
                    "remark": null,
                    "datasourceName": "本地数据源",
                    "fields": [{
                            "id": "a2ad1a89fbfe4941a55bbde0954e4b1f",
                            "entityId": "89a5163bfb87499b91a3eef75f244ca7",
                            "serialNumber": 1,
                            "name": "id",
                            "description": "ID",
                            "fieldName": "f_id",
                            "dataType": "varchar",
                            "dataLen": 32,
                            "dataDec": 0,
                            "isPk": true,
                            "isRequired": true,
                            "defaultValue": "",
                            "remark": null
                        },
                        {
                            "id": "2ced4865870440a597aff4ed9822a80b",
                            "entityId": "89a5163bfb87499b91a3eef75f244ca7",
                            "serialNumber": 2,
                            "name": "name",
                            "description": "学生姓名",
                            "fieldName": "f_name",
                            "dataType": "varchar",
                            "dataLen": 50,
                            "dataDec": 0,
                            "isPk": false,
                            "isRequired": false,
                            "defaultValue": null,
                            "remark": null
                        },
                        {
                            "id": "2ced4865870440a597aff4ed9822a80b",
                            "entityId": "89a5163bfb87499b91a3eef75f244ca7",
                            "serialNumber": 3,
                            "name": "age",
                            "description": "学生年龄",
                            "fieldName": "f_age",
                            "dataType": "int",
                            "dataLen": 50,
                            "dataDec": 0,
                            "isPk": false,
                            "isRequired": false,
                            "defaultValue": null,
                            "remark": null
                        }
                    ]
                }
            }
        ],
    },
    mutations: {
        updateSelectWidget(state, payload) {
            state.selectWidget = payload.selectWidget
        },
        updateWidgetJsonList(state, payload) {
            state.widgetForm = payload.widgetForm
        },
        updateModels(state, payload) {
            state.models = payload.models
        },
        updateCurrentContainer(state, payload) {
            state.currentContainer = payload.currentContainer
        }
    }
})

export default store;