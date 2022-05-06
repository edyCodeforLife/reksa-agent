import React  from 'react';
import { css } from 'aphrodite';
import { isEqual, pick } from 'lodash';
import { IInputStates } from '../../../interfaces/form';
import { styles } from '../style';
import { Common } from './common';

export class Text extends Common {
    element: any = null;
    instance: any = this;
    touched: boolean = false;

    constructor(props: any) {
        super(props);

        this.state = {
            data: props.data,
            appLanguage: props.appLanguage,
        }
    }

    componentDidMount() {
        this.state.data.element = this.element;
    }

    // programmaticallyUpdateView(parameters: { data: any }) {
    //     let data = parameters.data;
    //     if (this.element) this.element.value = data.value;
    //     this._onChange(data, data.value, false);
    //     if (data.element) {
    //         data.element.className
    //             .replace(new RegExp('(?:^|\\s)'+ 'is-empty' + '(?:\\s|$)'), ' ');
    //     }
    // }

    switchMultiline(data: IInputStates) {
        let isEmptyClass = (!data.value || data.value === '')?'is-empty':'';
        if (data.multiline) {
            return (
                <textarea
                    id={data.fieldId}
                    ref={el => { this.element = el; }}
                    onKeyDown={e => { this._onChange(data, (e.target as any).value)}}
                    onChange={e => { this._onChange(data, (e.target as any).value)}}
                    className={css(styles.default, data.error && styles.errorBar) + ' ' +isEmptyClass}
                    required={data.required} disabled={data.disabled||data.forceDisabled} defaultValue={data.value}/>
            )
        } else {
            return (
                <input
                    autoComplete={'new'}
                    id={data.fieldId}
                    ref={el => { this.element = el; }}
                    onKeyDown={e => { this._onChange(data, (e.target as any).value)}}
                    onChange={e => { this._onChange(data, (e.target as any).value)}}
                    className={css(styles.default, data.error && styles.errorBar) + ' ' +isEmptyClass}
                    type={data.type} required={data.required} disabled={data.disabled||data.forceDisabled} defaultValue={data.value} />
            )
        }
    }

    renderLabel(data: IInputStates) {
        return (
            <label
                style={{ transition: '300ms ease all' }}
                className={css(styles.defaultLabel)}
                dangerouslySetInnerHTML={{ __html: data.label + (data.required?' *':'') }}
            />
        )
    }

    renderError(data: IInputStates) {
        if (data.error) return (
            <small
                className={css(styles.errorLabel)}
                dangerouslySetInnerHTML={{ __html: data.error }} />
        );
    }

    renderInfo(data: IInputStates) {
        if (data.info) {
            if (React.isValidElement(data.info))
                return data.info;
            return (
                <small
                    className={css(styles.infoLabel)}
                    dangerouslySetInnerHTML={{ __html: data.info }} />
            );
        }
    }

    render () {

        // console.log('rerender');
        let { data } = this.state;
        // if (data.disabled) console.log(data);
        return (
            <div className={css(styles.group)} >
                { this.switchMultiline(data) }
                <span className="highlight" />
                <span className={css(styles.bar) + ' ' + 'bar'} />
                { this.renderLabel(data) }

                { this.renderError(data) }
                { this.renderInfo(data) }
            </div>
        )
    }
}
