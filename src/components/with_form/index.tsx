import * as React from 'react';
import { findIndex, cloneDeep, chain, filter, find, assign} from 'lodash';
import dom from 'dom';
import * as Languages from '../../data/languages';
import { ValidateField, scrollTo, getOffset, isMobile } from '../../data/global/functions';
import * as Dropdowns from '../../data/dropdown-list';
import { object } from 'dot-object';
import update from 'immutability-helper';

export class WithForm extends React.Component<any, any> {
    state: any = {
        formDefinition: {}
    };

    duration: any = isMobile() ? 100 : 300;

    screenHeight: any = screen.height;

    flatten: any = null;

    constructor(props: any) {
        super(props);

        this.onFieldChangeValue = this.onFieldChangeValue.bind(this);
        this.labelAssignment = this.labelAssignment.bind(this);
        this.fieldValueChanged = this.fieldValueChanged.bind(this);

        this.getFieldValueMapped = this.getFieldValueMapped.bind(this);

        this.touchForm = this.touchForm.bind(this);
        this.checkFieldsValidity = this.checkFieldsValidity.bind(this);
    }

    componentWillMount() {
        let lang = this.props.appState.appLanguage;
        this.labelAssignment(lang);
    }

    getDottedQueryObject(data: any, params: object = {}, parent?: any) {
        if (!data) return {};
        if (!data.path) return {};
        let query = `${parent}.fields`;
        if (parent === undefined) query = 'fields';
        for (let x = 0; x < data.path.length; x++) {
            if (x === data.path.length - 1) query += `.${data.path[x]}`;
            else query += `.${data.path[x]}.fields`;
        }

        let obj = {};
        obj[query] = {};

        if (params['label'] !== undefined) obj[query].label = {$set: params['label']};
        if (params['md'] !== undefined) obj[query].md = {$set: params['md']};
        if (params['value'] !== undefined) obj[query].value = {$set: params['value']};
        if (params['disabled'] !== undefined) obj[query].disabled = {$set: params['disabled']};
        if (params['hide'] !== undefined) obj[query].hide = {$set: params['hide']};
        if (params['error'] !== undefined) obj[query].error = {$set: params['error']};
        if (params['groupLabel'] !== undefined) obj[query].groupLabel = {$set: params['groupLabel']};
        if (params['info'] !== undefined) obj[query].info = {$set: params['info']};
        if (params['forceDisabled'] !== undefined) obj[query].forceDisabled = {$set: params['forceDisabled']};
        if (params['options'] !== undefined) obj[query].options = {$set: params['options']};
        if (params['required'] !== undefined) obj[query].required = {$set: params['required']};
        if (params['type'] !== undefined) obj[query].type = {$set: params['type']};

        return obj;
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.appState.appLanguage !== this.props.appState.appLanguage) {
            let lang = nextProps.appState.appLanguage;
            this.labelAssignment(lang);
        }
    }

    touchForm(event?: any) {
        let flatten = this.transFormFlatten( this.state.formCollections[this.state.activeTab] );
        if (flatten) {
            let blankFields = find(flatten, (o) => { return !o.disabled && !o.hide && o.required && (!o.value || o.value==='');});
            if (blankFields) {
                let function_ = this.onFieldChangeValue;
                setTimeout(() => {
                    let documentHeight = document.body.clientHeight || window.innerHeight || document.documentElement.clientHeight;
                    function_(blankFields.fieldId, { target: { value: blankFields.value } });
                    let setFocus = () => {
                        if (blankFields.type !== 'file' && !blankFields.disabled) blankFields.element.focus();
                    };

                    if (documentHeight > this.screenHeight) {
                        scrollTo(document.scrollingElement || document.documentElement,
                            getOffset(blankFields.element).top - 80,
                            this.duration
                        );

                        setTimeout(() =>{
                            setFocus();
                        }, this.duration + 10);
                    } else {
                        setFocus();
                    }
                });
            }

            return blankFields == null;
        }
    }

    getFieldValueMapped() {
        let flatten = this.transFormFlatten( this.state.formCollections[this.state.activeTab] );

        return chain(flatten)
            .keyBy('fieldId')
            .mapValues('value')
            .value();
    }

    checkFieldsValidity() {
        let isRequiredFieldsValid = this.touchForm(event);
        if (isRequiredFieldsValid) {
            let flatten = this.transFormFlatten( this.state.formCollections[this.state.activeTab] );
            let fieldWithError = find(flatten, (o) => { return o.error && o.error !== '' && !o.hide; });

            if (!fieldWithError) return true;
        }
        return false;
    }

    assignPath(collections: any, lang: any) {
        const _length = collections.length;
        let innerFunc: (data: any, rootIndex: number, parent?: any) => void;
        innerFunc = (data: any, rootIndex: number, parent?: any) => {
            for (let j = 0; j < data.fields.length; j++) {
                let item = data.fields[j];

                if (item.fields) {
                    item.path = [];
                    if (parent !== undefined && parent.path) item.path = item.path.concat(parent.path);
                    item.path.push(j);
                    innerFunc(item, rootIndex, cloneDeep(item));
                } else {
                    if (!item.path) {
                        item.path = [];
                        item.label = '';
                        if (parent !== undefined && parent.path) item.path = item.path.concat(parent.path);
                        item.path.push(j);

                        item.onChange = this.onFieldChangeValue;
                        if (item.onChangeFunction && this[item.onChangeFunction])
                            item.onChangeCallback = this[item.onChangeFunction];

                        if ((item.type === 'dropdown' || item.type === 'radio') && item.optionsTag) {
                            item.options = Dropdowns[item.optionsTag][lang];
                        }
                    }
                }
            }
        };

        for(let i = 0; i < _length; i++) {
            innerFunc(collections[i], i);
        }
    }

    transFormFlatten(data: any) {
        let placeholder = [];
        if (!data) return placeholder;
        for(let i = 0; i < data.fields.length; i++) {
            let item = data.fields[i];
            if (item.fields) {
                placeholder = placeholder.concat(this.transFormFlatten(item));
            } else {
                placeholder.push(item);
            }
        }
        return placeholder;
    }

    transFormFlattenGrouped(data: any) {
        let placeholder = [];
        if (!data) return placeholder;
        for(let i = 0; i < data.fields.length; i++) {
            let item = data.fields[i];
            if (item.groupLabel) {
                placeholder.push(item);
            }
        }
        return placeholder;
    }

    labelAssignment(lang: any, forceFlattenUpdate?: boolean, callback?: any) {
        if (this.state.formCollections) {
            this.assignPath(this.state.formCollections, lang);
            let query = {};
            for (let c = 0; c < this.state.formCollections.length; c++) {
                let forms = this.state.formCollections[c];
                let flattenForm = this.transFormFlatten(forms);

                let groupedFields = this.transFormFlattenGrouped(forms);
                for( let d = 0; d < groupedFields.length; d++) {
                    let x = null;
                    if (groupedFields[d].groupLabel) {
                        x = this.getDottedQueryObject(
                            groupedFields[d],
                            {
                                groupLabel: Languages[lang][groupedFields[d].groupLabel]
                            },
                            c
                        );
                    }
                    query = assign(query, x);
                }

                for( let d = 0; d < flattenForm.length; d++) {
                    let obj: any = {label: Languages[lang][flattenForm[d].labelKey]};
                    if (flattenForm[d].infoLabel) {
                        obj.info = Languages[lang][flattenForm[d].infoLabel]
                    }
                    let x = this.getDottedQueryObject(
                        flattenForm[d],
                        obj,
                        c
                    );
                    query = assign(query, x);
                }
            }

            let newFormCollections = update(this.state.formCollections, object(query));
            this.setState({formCollections: newFormCollections});
            return;
        }
    }

    fieldValueChanged(fieldId: any, event: any, callback?: any) {
        let flattenForm = this.transFormFlatten(this.state.formCollections[this.state.activeTab]);
        let field = find(flattenForm, { fieldId: fieldId });
        if (field) {
            if (field.path) {
                let errorLabel = ValidateField(field, event.target.value, this.props.appState.appLanguage);

                if (errorLabel !== field.error) {
                    let q = this.getDottedQueryObject(field, {error: errorLabel, value: event.target.value}, this.state.activeTab);
                    let newCollection = update(this.state.formCollections, object(q));
                    this.setState({formCollections: newCollection}, () => {
                        let flattenForm = this.transFormFlatten(this.state.formCollections[this.state.activeTab]);
                        let field = find(flattenForm, { fieldId: fieldId });
                        if (callback) callback(field, event.target.value);
                    });
                } else {
                    let q = this.getDottedQueryObject(field, {value: event.target.value}, this.state.activeTab);
                    let newCollection = update(this.state.formCollections, object(q));
                    this.setState({formCollections: newCollection}, () => {
                        let flattenForm = this.transFormFlatten(this.state.formCollections[this.state.activeTab]);
                        let field = find(flattenForm, { fieldId: fieldId });
                        if (callback) callback(field, event.target.value);
                    });
                }

                if (field.element) {
                    if (!event.target.value || event.target.value == '')
                        dom(field.element).addClass('is-empty');
                    else  dom(field.element).removeClass('is-empty');
                }
            }
        }
    }


    onFieldChangeValue(fieldId: any, event: any) {
        this.fieldValueChanged(fieldId, event, (field, value) => {
            try {
                if (field.onChangeCallback)
                    field.onChangeCallback(field, value);
            } catch (e) {}
        });
    }

    render () {
        return null;
    }
}
