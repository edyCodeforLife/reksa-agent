import * as React from 'react';
import { css } from 'aphrodite';
import { isEqual, pick } from 'lodash';
import { Text } from './text';
import { styles } from '../style';
import { IInputStates } from '../../../interfaces/form';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheckSquare from '@fortawesome/fontawesome-free-regular/faCheckSquare';
import faSquare from '@fortawesome/fontawesome-free-regular/faSquare';

export class Checkbox extends Text {
    icon: any = null;
    marker: any = null;
    instance: any = this;

    constructor(props) {
        super(props);
    }

    changeValue(data: IInputStates) {
        if (!data.disabled) {
            let value = !data.value;
            data.onChange(data.fieldId, {target: { value }});
            this.forceUpdate();
        }
    }

    switchMultiline(data: IInputStates) {
        this.icon = (!data.value) ? faSquare : faCheckSquare;
        return (
            <div disabled={data.disabled||data.forceDisabled}
                 className={css(styles.checkOrRadioContainer, data.disabled && styles.disabledField)}
                 onClick={() => {this.changeValue(data)}}
            >
                <FontAwesomeIcon icon={this.icon} className={css(styles.checkOrRadioIcon)} />
            </div>
        )
    }

    renderLabel(data: IInputStates) {
        return (
            <span
                onClick={() => { this.changeValue(data) }}
                className={css(styles.inlineLabel, data.disabled && styles.disabledField)}
                dangerouslySetInnerHTML={{ __html: data.label + (data.required ? ' *' : '') }}
            />
        )
    }

    render() {
        let { data } = this.state;
        return (
            <div className={css(styles.group)} >
                {this.switchMultiline(data)}
                {this.renderLabel(data)}
                <div style={{marginLeft: 32}}>
                    {this.renderError(data)}
                </div>
            </div>
        )
    }
}
