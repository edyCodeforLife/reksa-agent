import React, { Component } from 'react';
import { debounce, isEqual, pick, cloneDeep } from 'lodash';

export class Common extends Component<any, any> {
    element: any = null;
    constructor(props: any) {
        super(props);

        this.state = {
            data: cloneDeep(props.data)
        }

        this._onChange = debounce(this._onChange, 100);
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        // prevent rerender component with same data
        let _props = pick(nextProps.data, 'md', 'value', 'hide', 'disabled', 'error', 'label', 'info', 'forceDisabled', 'required', 'type', 'options');
        let _data = pick(this.state.data, 'md', 'value', 'hide', 'disabled', 'error', 'label', 'info', 'forceDisabled', 'required', 'type', 'options');
        return !isEqual(_data, _props);
    }

    componentWillReceiveProps(nextProps: any) {
        let _props = pick(nextProps.data, 'md', 'value', 'hide', 'disabled', 'error', 'label', 'options');
        let _data = pick(this.state.data, 'md', 'value', 'hide', 'disabled', 'error', 'label', 'options');
        if (!isEqual(_data, _props)) {
            let { data, appLanguage } = nextProps;
            this.setState({data, appLanguage});
            if (this.element && data.value) this.element.value = data.value;
        }
    }

    _onChange(data: any, value: any,) {
        data.onChange(data.fieldId, {target: { value }});
    }

    render () {
        return null;
    }
}
