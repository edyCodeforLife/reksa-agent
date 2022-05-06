import React, { Component } from 'react';
import { css } from 'aphrodite';
import { capitalize } from 'lodash';
import { Row, Col } from 'react-grid-system';
import { Text } from './types/text';
import { Dropdown } from './types/dropdown';
import { Radio } from './types/radio';
import { Password } from './types/password';
import { Email } from './types/email';
import { DatePicker } from './types/datepicker';
import { Checkbox } from './types/checkbox';
import { File } from './types/file';
import { Masked } from './types/masked';

const Components = {
    Text: Text, Dropdown: Dropdown, Radio: Radio, Password: Password, Email: Email,
    Datepicker: DatePicker, Checkbox: Checkbox, File: File, Masked: Masked
};

interface IFormsProps {
    formDefinition: any,
    appState?: any,
}

export class Form extends Component<IFormsProps, any> {
    renderItem(data: any) {
        let appLanguage = (this.props as any).appLanguage;
        let _elements = [];
        let item = data.fields;
        if (item) {
            if (data.groupLabel) _elements.push(
                <Col style={{overflow: 'inherit', display: data.hide?'none':'block'}} md={12} key={data.groupLabel}>
                    <h2 style={{fontSize: 22, fontWeight: 500}}>{data.groupLabel}</h2>
                </Col>
            );
            for(let i = 0; i < item.length; i++) {
                if (item[i].fields) {
                    _elements.push(this.renderItem(item[i]));
                } else {
                    let Component = (Components as any)[capitalize(item[i].type)];

                    _elements.push(
                        <Col style={{overflow: 'inherit', display: item[i].hide?'none':'block'}} md={item[i].md||12} offset={item[i].offset||{}} key={item[i].fieldId}>
                            <Component
                                appLanguage={appLanguage}
                                data={item[i]}
                                visibility={item[i].hide}
                            />
                        </Col>
                    );
                }
            }
        }

        return (
            <Col style={{overflow: 'inherit'}} md={data.md||12} key={data.fieldId}>
                <Row>
                    { _elements }
                </Row>
            </Col>
        )
    }

    render () {
        return (
            <form className="rdo-forms" noValidate={true} onSubmit={event => {event.preventDefault();}}>
                <Row>
                    { this.renderItem(this.props.formDefinition) }
                </Row>
            </form>
        )
    }
}
