import * as React from 'react';
import { css } from 'aphrodite';
import { Text } from './text';
import { styles } from '../style';
import { IInputStates } from '../../../interfaces/form';
import { Container, Row, Col } from 'react-grid-system';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheckSquare from '@fortawesome/fontawesome-free-regular/faCheckSquare';
import faSquare from '@fortawesome/fontawesome-free-regular/faSquare';

export class Radio extends Text {
    icon: any = null;
    marker: any = null;

    changeValue(data: IInputStates, option: any) {
        if (data.disabled) return;
        let value = option.code;
        data.onChange(data.fieldId, { target: { value } });
        this.forceUpdate();
    }

    _switchMultiline(data: IInputStates, option: any) {
        this.icon = (data.value !== option.code) ? faSquare : faCheckSquare;
        return (
            <div className={css(styles.checkOrRadioContainer)} onClick={() => { this.changeValue(data, option) }}>
                <FontAwesomeIcon icon={this.icon} className={css(styles.checkOrRadioIcon, data.disabled && styles.disabledField)} />
            </div>
        )
    }

    renderLabel(data: IInputStates) {
        return (
            <span
                className={css(styles.inlineLabel, data.disabled && styles.disabledField)}
                dangerouslySetInnerHTML={{ __html: data.label + (data.required ? ' *' : '') }}
            />
        )
    }

    renderOptionLabel(data: IInputStates, option: any) {
        return (
            <span
                onClick={() => { this.changeValue(data, option) }}
                className={css(styles.inlineLabel, data.disabled && styles.disabledField)}
                dangerouslySetInnerHTML={{ __html: option.value }}
            />
        )
    }

    render() {
        let { data } = this.state;
        return (
            <Row>
                <Col md={12}>
                    {this.renderLabel(data)}
                </Col>
                {data.options.map((option, index) => {
                    return (
                        <Col md={4} key={index+option.code}>
                            <div className={css(styles.group, styles.checboxGroup)} >
                                {this._switchMultiline(data, option)}
                                {this.renderOptionLabel(data, option)}

                            </div>
                        </Col>
                    )
                })}
                <Col md={12}>{this.renderError(data)}</Col>
            </Row>
        )
    }
}
