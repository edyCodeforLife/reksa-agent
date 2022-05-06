import * as React from 'react';
import { css } from 'aphrodite';
import { pick, isEqual } from 'lodash';
import { Text } from './text';
import Pikaday from 'pikaday';
import { styles } from '../style';
import { IInputStates } from '../../../interfaces/form';
import { formattedDate } from '../../../data/global/functions';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCalendarAlt from '@fortawesome/fontawesome-free-regular/faCalendarAlt';
import {internationalizeDate} from '../../../data/global/variables';

export class DatePicker extends Text {
    picker: any = null;

    componentWillReceiveProps(nextProps: any) {
        let _props = pick(nextProps.data, 'md', 'value', 'hide', 'disabled', 'error', 'label', 'info', 'forceDisabled', 'options', 'required', 'type');
        let _data = pick(this.state.data, 'md', 'value', 'hide', 'disabled', 'error', 'label', 'info', 'forceDisabled', 'options', 'required', 'type');
        if (!isEqual(_data, _props)) {
            let { data, appLanguage } = nextProps;
            this.setState({data, appLanguage});
            this.element.value = formattedDate(data.value);

            // set selected date if data is available
            if (data.value && data.value !== '') {
                if (this.picker && this.isDate(data.value)) {
                    this.picker.setDate(new Date(data.value));
                }
            }
        }
    }

    isDate(date) {
        return ((new Date(date) as any) !== "Invalid Date") && !isNaN((new Date(date) as any));
    }

    componentDidMount() {
        super.componentDidMount();

        if (this.element) {
            let internationalize = internationalizeDate;

            this.element.value = formattedDate(this.state.data.value);
            let maxDate = new Date();
            let maxYear = (new Date().getFullYear() + 20);
            let defaultDate = new Date();
            if (this.state.data.dateType && this.state.data.dateType === 'birthday') {
                maxDate.setFullYear((maxDate.getFullYear() - 17));
                maxYear = maxDate.getFullYear();
                defaultDate = maxDate;
            }

            this.picker = new Pikaday({
                field: this.element,
                maxDate,
                defaultDate,
                yearRange: [1900, maxYear],
                onSelect: date => {
                    let _formatedDate = formattedDate(date);
                    this.element.value = _formatedDate;

                    this.state.data.onChange(this.state.data.fieldId, { target: { value: date }});
                },
                theme: 'triangle-theme',
                i18n: internationalize[this.props.appLanguage]
            });
        }
    }

    switchMultiline(data: IInputStates) {
        let isEmptyClass = (!data.value || data.value === '') ? 'is-empty' : '';
        return (
            <React.Fragment>
                <input
                    readOnly={true}
                    id={data.fieldId}
                    ref={el => { this.element = el; }}
                    onChange={e => { this._onChange(data, e.target.value) }}
                    className={css(styles.default, data.error && styles.errorBar) + ' ' + isEmptyClass}
                    type={'text'} required={data.required} disabled={data.disabled||data.forceDisabled} defaultValue={data.value} />

                <FontAwesomeIcon icon={faCalendarAlt} className={css(styles.caretDown, data.disabled && styles.disabledField)} />
            </React.Fragment>
        )
    }
}
