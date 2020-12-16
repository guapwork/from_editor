export const basicComponents = [{
        type: 'input',
        icon: 'icon-jx-input',
        name: "单行文本",
        options: {
            width: '100%',
            defaultValue: '',
            required: false,
            dataType: 'string',
            pattern: '',
            placeholder: '',
            disabled: false,
            hideLabel: false,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    },
    {
        type: 'textarea',
        icon: 'icon-jx-textarea',
        name: "多行文本",
        options: {
            width: '100%',
            defaultValue: '',
            required: false,
            disabled: false,
            pattern: '',
            placeholder: '',
            hideLabel: false,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    },
    {
        type: 'number',
        icon: 'icon-jx-counter',
        name: "计数器",
        options: {
            width: '',
            required: false,
            defaultValue: 0,
            min: '',
            max: '',
            step: 1,
            disabled: false,
            controlsPosition: '',
            hideLabel: false,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    },
    {
        type: 'radio',
        icon: 'icon-jx-radioon',
        name: "单选框组",
        options: {
            inline: false,
            defaultValue: '',
            showLabel: false,
            options: [{
                    value: 'Option 1',
                    label: 'Option 1'
                },
                {
                    value: 'Option 2',
                    label: 'Option 2'
                },
                {
                    value: 'Option 3',
                    label: 'Option 3'
                }
            ],
            required: false,
            width: '',
            remote: false,
            remoteOptions: [],
            props: {
                value: 'value',
                label: 'label'
            },
            remoteFunc: '',
            disabled: false,
            hideLabel: false,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    },
    {
        type: 'checkbox',
        icon: 'icon-jx-check-box-outline',
        name: "多选框组",
        options: {
            inline: false,
            defaultValue: [],
            showLabel: false,
            options: [{
                    value: 'Option 1'
                },
                {
                    value: 'Option 2'
                },
                {
                    value: 'Option 3'
                }
            ],
            required: false,
            width: '',
            remote: false,
            remoteOptions: [],
            props: {
                value: 'value',
                label: 'label'
            },
            remoteFunc: '',
            disabled: false,
            hideLabel: false,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    },
    {
        type: 'time',
        icon: 'icon-jx-time',
        name: "时间选择器",
        options: {
            defaultValue: '',
            readonly: false,
            disabled: false,
            editable: true,
            clearable: true,
            placeholder: '',
            startPlaceholder: '',
            endPlaceholder: '',
            isRange: false,
            arrowControl: true,
            format: 'HH:mm:ss',
            required: false,
            width: '',
            hideLabel: false,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    },
    {
        type: 'date',
        icon: 'icon-jx-date',
        name: "日期选择器",
        options: {
            defaultValue: '',
            readonly: false,
            disabled: false,
            editable: true,
            clearable: true,
            placeholder: '',
            startPlaceholder: '',
            endPlaceholder: '',
            type: 'date',
            format: 'yyyy-MM-dd',
            timestamp: false,
            required: false,
            width: '',
            hideLabel: false,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
            options: [{
                value: '选项1',
                label: 'week'
            }, {
                value: '选项2',
                label: 'month'
            }, {
                value: '选项3',
                label: 'year'
            }, {
                value: '选项4',
                label: 'dates'
            }, {
                value: '选项5',
                label: 'date'
            }],
        },
        rules: []
    },
    {
        type: 'rate',
        icon: 'icon-jx-pingfen',
        name: "评分",
        options: {
            defaultValue: null,
            max: 5,
            disabled: false,
            allowHalf: false,
            required: false,
            hideLabel: false,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    },
    {
        type: 'color',
        icon: 'icon-jx-color',
        name: "颜色选择器",
        options: {
            defaultValue: '',
            disabled: false,
            showAlpha: false,
            required: false,
            hideLabel: false,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    },
    {
        type: 'select',
        icon: 'icon-jx-201',
        name: "下拉选择框",
        options: {
            defaultValue: '',
            multiple: false,
            disabled: false,
            clearable: false,
            placeholder: '',
            required: false,
            showLabel: false,
            width: '',
            options: [{
                    value: 'Option 1'
                },
                {
                    value: 'Option 2'
                }, {
                    value: 'Option 3'
                }
            ],
            remote: false,
            filterable: false,
            remoteOptions: [],
            props: {
                value: 'value',
                label: 'label'
            },
            remoteFunc: '',
            hideLabel: false,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    },
    {
        type: 'switch',
        icon: 'icon-jx-switch-5',
        name: "开关",
        options: {
            defaultValue: false,
            required: false,
            disabled: false,
            hideLabel: false,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    },
    {
        type: 'slider',
        icon: 'icon-jx-huakuai-',
        name: "滑块",
        options: {
            defaultValue: 0,
            disabled: false,
            required: false,
            min: 0,
            max: 100,
            step: 1,
            showInput: false,
            range: false,
            width: '',
            hideLabel: false,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    },
    {
        type: 'text',
        icon: 'icon-jx-wenzi',
        name: "文字",
        options: {
            defaultValue: 'This is a text',
            customClass: '',
            hideLabel: false,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    },
    {
        type: 'html',
        icon: 'icon-jx-HTML',
        name: "HTML",
        options: {
            defaultValue: '<b style=\"color: red;\">\n\tThis is a HTML5\n</b>',
            customClass: '',
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    }
]

export const advanceComponents = [{
        type: 'blank',
        icon: 'icon-jx-zidingyiyemian',
        name: "自定义区域",
        options: {
            defaultType: 'String',
            hideLabel: false,
            entity: "",
            entityDescription: "",
        },
        isContainer: true,
        list: [],
        rules: []
    },
    {
        type: 'file',
        icon: 'icon-jx-ziyuan',
        name: "文件",
        options: {
            action: 'https://jsonplaceholder.typicode.com/posts/',
            limit: 3,
            multiple: true,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    },
    {
        type: 'imgupload',
        icon: 'icon-jx-gongdanguanli-gongda',
        name: "图片",
        options: {
            dialogVisible: false,
            dialogImageUrl: '',
            defaultValue: [],
            size: {
                width: 100,
                height: 100,
            },
            width: '',
            tokenFunc: 'funcGetToken',
            token: '',
            domain: 'http://pfp81ptt6.bkt.clouddn.com/',
            disabled: false,
            length: 8,
            multiple: false,
            isQiniu: false,
            isDelete: false,
            min: 0,
            isEdit: false,
            action: 'https://jsonplaceholder.typicode.com/photos/',
            hideLabel: false,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    },
    {
        type: 'editor',
        icon: 'icon-jx-bianji',
        name: "编辑器",
        options: {
            defaultValue: '',
            width: '',
            hideLabel: false,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    },
    {
        type: 'cascader',
        icon: 'icon-jx-jilian',
        name: "级联选择器",
        options: {
            defaultValue: [],
            width: '',
            placeholder: '',
            disabled: false,
            clearable: false,
            remote: true,
            remoteOptions: [],
            props: {
                value: 'value',
                label: 'label',
                children: 'children'
            },
            remoteFunc: '',
            hideLabel: false,
            entity: "",
            entityDescription: "",
            property: "",
            propertyDescription: "",
        },
        rules: []
    },
    {
        type: 'sonForm',
        icon: 'icon-jx-sonForm',
        name: "子表单",
        options: {
            defaultValue: [],
            customClass: '',
            labelWidth: 100,
            isLabelWidth: false,
            hidden: false,
            dataBind: true,
            disabled: false,
            required: false,
            hideLabel: false,
            entity: "",
            entityDescription: "",
        },
        isContainer: true,
        tableColumns: [],
        model: "",
        rules: []
    }
]

export const layoutComponents = [{
    type: 'grid',
    icon: 'icon-jx-shangebuju',
    name: "栅格布局",
    isContainer: true,
    columns: [{
            span: 12,
            list: []
        },
        {
            span: 12,
            list: []
        }
    ],
    options: {
        gutter: 0,
        justify: 'start',
        align: 'top',
        hideLabel: false,
        entity: "",
        entityDescription: "",
    },
    rules: []
}, {
    type: 'form',
    icon: 'icon-jx-table1',
    name: "表格布局",
    isContainer: true,
    options: {
        borderWidth: 1,
        borderColor: "#999",
        iconShow: true,
        entity: "",
        entityDescription: "",
    },
    row: [{
        columns: [{
            type: "td",
            options: {
                active: 1,
                isRow: true,
                isCol: true,
                iconShow: false,
                col: 1,
                row: 1,
            },
            list: []
        }]
    }],
    rules: []
}, {
    type: 'tabs',
    icon: 'icon-jx-tabye',
    name: "标签页",
    isContainer: true,
    options: {
        activeName: '1',
        type: '',
        position: "top",
        entity: "",
        entityDescription: "",
    },
    data: [{
        label: '标签1',
        name: '1',
        list: []
    }],
    rules: []
}, {
    type: 'line',
    icon: 'icon-jx-fengexian',
    name: "分割线",
    options: {
        defaultValue: '分割线',
        justify: 'center',
    },
    rules: []
}]