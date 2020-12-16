function selectWidgetModify(that, index, list) {
    let data = null;
    if (index === undefined && list === undefined) {
        data = this.$store.state.selectWidget
    } else if (index !== null && list !== null && index !== undefined && list !== undefined) {
        data = list[index]
    } else if (index === null && list === null) {
        data = {}
    }
    that.$store.commit({
        type: "updateSelectWidget",
        selectWidget: data,
    });
    return that.$store.state.selectWidget;
}

function currentContainer(that, container) {
    let containerCopy = JSON.parse(JSON.stringify(container));
    that.$store.commit({
        type: "updateCurrentContainer",
        currentContainer: containerCopy,
    });
}

function updateWidgetJson(that, list) {
    that.$store.commit({
        type: "updateWidgetJsonList",
        widgetForm: {
            list: list,
            config: that.$store.state.formConfig
        }
    })
}

function updateModels(that, data) {
    that.$store.commit({
        type: "updateModels",
        models: data
    })
}

function widgetListItemDelete(that, index) {
    let deleteData = that.data.span !== undefined || that.data.list !== undefined ? that.data.list : that.data;

    if (deleteData.length - 1 === index) {
        if (index === 0) {
            that.selectWidget = that.commonApi.selectWidgetModify(
                that,
                null,
                null
            );
        } else {
            that.selectWidget = that.commonApi.selectWidgetModify(
                that,
                index - 1,
                deleteData
            );
        }
    } else {
        that.selectWidget = that.commonApi.selectWidgetModify(
            that,
            index + 1,
            deleteData
        );
    }

    that.$nextTick(() => {
        deleteData.splice(index, 1);
    });
}

function getEntityList(that) {
    let responseData = that.$store.state.responseData,
        path = "",
        entityList = [];
    responseData.map(el => {
        path = el.entityInfo.name;
        if (el.refEntityId !== null) path = entityPath(el, responseData, path);
        entityList.push({ label: el.entityDescription, value: path });
    });
    return entityList;
}

function entityPath(el, responseData, path) {
    responseData.map(item => { if (el.refEntityId === item.entityId) { path = item.entityInfo.name + "." + path; if (item.refEntityId !== null) { entityPath(item, responseData, path); } } });
    return path;
}

function getPropertyList(that, selectEntity, widgetList) {
    let responseData = that.$store.state.responseData,
        entityValue = selectEntity.value !== undefined ? selectEntity.value : "",
        point = entityValue.lastIndexOf("."),
        str = point !== -1 ? entityValue.substring(point + 1, entityValue.length) : entityValue,
        fields = [];

    that.property =
        that.selectWidget.options.property !== "" ? {
            label: that.selectWidget.options.propertyDescription,
            value: that.selectWidget.options.property
        } : {};
    that.propertyList = [];
    responseData.map(el => {
        if (el.entityInfo.name === str) {
            el.entityInfo.fields.map(item => {
                fields.push({ id: el.fieldId, item: JSON.parse(JSON.stringify(item)), allProperty: el.entityInfo.name + "." + item.name });
            });
        }
    });
    if (that.selectWidget.options.property !== "") {
        that.propertyList.push({
            label: that.selectWidget.options.propertyDescription,
            value: that.selectWidget.options.property
        });
    }
    propertyListFild(fields, widgetList, that);
}

function propertyListFild(fields, widgetList, that) {
    let notExistFlat = true;
    for (var i = 0; i < fields.length; i++) {
        if (!fields[i].item.isPk && fields[i].id !== fields[i].item.id) {
            for (var j = 0; j < widgetList.length; j++) {
                notExistFlat = true;
                if (widgetList[j].options.entity + "." + widgetList[j].options.property === fields[i].allProperty) {
                    notExistFlat = false;
                    break;
                }
            }
            if (notExistFlat) {
                that.propertyList.push({ label: fields[i].item.description, value: fields[i].item.name });
            }
        }
    }
}


export default {
    selectWidgetModify,
    currentContainer,
    updateWidgetJson,
    updateModels,
    widgetListItemDelete,
    getEntityList,
    getPropertyList,
}