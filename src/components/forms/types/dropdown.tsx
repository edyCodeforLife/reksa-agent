import * as React from 'react';
import { css } from 'aphrodite';
import { isEqual, find, pick } from 'lodash';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown';
import faCaretUp from '@fortawesome/fontawesome-free-solid/faCaretUp';
import Mousetrap from 'mousetrap';
import 'mousetrap-global-bind';

import { IInputStates } from '../../../interfaces/form';
import { globalColorDefault } from '../../../data/global/variables';
import { styles } from '../style';
import { Text } from './text';

export class Dropdown extends Text {
    element: any = null;
    labelInstance: any = null;
    currentSelected: any = null;
    query: any = null;
    instance: any = this;
    listEl: any = null;
    hightlightIdx: number = -1;

    constructor(props: any) {
        super(props);

        this.state = {
            data: props.data,
            appLanguage: props.appLanguage,
            showing: false,
            value: null
        };

        this.toggleShowing = this.toggleShowing.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.__onChange = this.__onChange.bind(this);

        this.setDefaultSelected = this.setDefaultSelected.bind(this);
        this.keyboardNavigation = this.keyboardNavigation.bind(this);
    }

    componentWillReceiveProps(nextProps: any) {
        let _props = pick(nextProps.data, 'md', 'value', 'hide', 'disabled', 'error', 'label', 'info', 'forceDisabled', 'options', 'required', 'type');
        let _data = pick(this.state.data, 'md', 'value', 'hide', 'disabled', 'error', 'label', 'info', 'forceDisabled', 'options', 'required', 'type');

        if (!isEqual(_data, _props)) {
            let { data, appLanguage } = nextProps;
            this.setState({data, appLanguage});

            let _option = find(data.options, { code: data.value });
            if (_option) {
                if (data.element)
                    data.element.value = _option.value;
                this.currentSelected = _option.value;
                if (this.element) {
                    this.element.className
                        .replace(new RegExp('(?:^|\\s)'+ 'is-empty' + '(?:\\s|$)'), ' ');
                }
            }
        }
    }

    setDefaultSelected(value: any) {
        this.currentSelected = value;
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        // prevent rerender component with same data
        return !isEqual(nextProps.data, this.state.data) || this.state.showing !== nextState.showing;
    }

    keyboardNavigation(e: any) {
        if (this.listEl) {
            if (document.activeElement === this.element) {
                if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                    if (this.listEl.children[this.hightlightIdx])
                        this.listEl.children[this.hightlightIdx].style.background = '#fff';
                }
                if (e.code === 'ArrowUp') {
                    if (this.hightlightIdx > 0) {
                        this.hightlightIdx -= 1;
                        this.listEl.scrollTop = this.listEl.children[this.hightlightIdx].offsetTop;
                        this.listEl.children[this.hightlightIdx].style.background = 'rgba(0,0,0,.03)';
                    }
                } else if (e.code === 'ArrowDown') {
                    if (this.hightlightIdx < this.listEl.children.length - 1) {
                        this.hightlightIdx += 1;
                        this.listEl.scrollTop = this.listEl.children[this.hightlightIdx].offsetTop;
                        this.listEl.children[this.hightlightIdx].style.background = 'rgba(0,0,0,.03)';
                    }
                } else {
                    this.listEl.children[this.hightlightIdx].click();
                }
            }
        } else {
            if (document.activeElement === this.element) {
                if (!this.state.showing && e.code === 'ArrowDown') {
                    this.hightlightIdx = -1;
                    this.toggleShowing(true);
                }
            }
        }
    }

    showOptions(data: IInputStates) {
        if (this.state.showing) {
            Mousetrap.bindGlobal(['up', 'down', 'enter'], e => {
                this.keyboardNavigation(e);
            });
            this.hightlightIdx = -1;
            return (
                <div
                    onMouseLeave={() => {
                        this.hightlightIdx = -1;
                    }}
                    className={css(styles.dropdownList)} ref={el => { this.listEl = el;}}>
                    {data.options.map((child, index) => {
                        if (child.hide) return null;
                        let regex = RegExp(this.query, "gi");
                        let _value = child.value.replace(regex, `<strong style="font-weight: 700; color: ${globalColorDefault}">$&</strong>`);
                        return (
                            <div
                                key={`dd-${child.code}-${child.value}`}
                                id={`dd-${index}`}
                                onClick={() => {
                                    this.selectItem(child);
                                }}
                                onMouseOver={() => {
                                    this.hightlightIdx = index;
                                    window.document
                                        .getElementById(`dd-${index}`)
                                        .style.background = 'rgba(0,0,0,.03)';
                                }}
                                onMouseLeave={() => {
                                    window.document
                                        .getElementById(`dd-${index}`)
                                        .style.background = '#fff';
                                }}
                                className={css(styles.dropdownItem)}
                                dangerouslySetInnerHTML={{ __html: _value }}
                            />
                        );
                    })}
                </div>
            );
        }
    }

    toggleShowing(showing: boolean, fromSelect?: any, callback?: any) {
        if (!showing && !fromSelect) {
            // on blur without selecting item;
            this.element.value = this.currentSelected;
            if (this.currentSelected && this.currentSelected !== '') {
                this.element.className = this.element
                    .className.replace(new RegExp('(?:^|\\s)' + 'is-empty' + '(?:\\s|$)'), ' ');
            }
        }
        if (showing && (!this.element.value || this.element.value == '')) {
            this.element.className = this.element
                .className.replace(new RegExp('(?:^|\\s)' + 'is-empty' + '(?:\\s|$)'), ' ');
        }
        if (!showing) {
            this.query = null;
            this.props.data.options.map(item => {
                item.hide = false;
            });
        }

        if (callback) callback();
        this.setState({showing} );
    }

    selectItem(item: any) {
        let { data } = this.state;

        this.element.value = item.value;
        this.currentSelected = item.value;

        // data.value = item.code;
        data.onChange(data.fieldId, {target: {value: item.code}});
        this.toggleShowing(false);
        // this.element.blur();
        this.hightlightIdx = -1;
    }

    __onChange(data, value) {
        data.options.map(item => {
            if (item.value.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                item.hide = false;
            } else item.hide = true;
        });
        this.query = value;

        this.forceUpdate();
    }

    onBlur(event: any) {
        event.persist();
        setTimeout(() => {
            if (event.target.value == '') {
                this.element.className += 'is-empty';
            }
            this.element.value = this.currentSelected;
            if (this.state.showing) this.toggleShowing(false);
        }, 200);
    }

    renderLabel(data: IInputStates) {
        return (
            <label
                style={{ transition: '300ms ease all' }}
                ref={(ref) => { this.labelInstance = ref; }}
                className={css(styles.defaultLabel) + ' ' + data.labelType}
                dangerouslySetInnerHTML={{ __html: data.label + (data.required?' *':'') }}
            />
        )
    }

    renderValue(data: IInputStates) {
        if (data.value && data.value !== '') {
            let _option = find(data.options, {code: data.value});
            if (_option) return _option.value;
        }
        return '';
    }

    switchMultiline(data: IInputStates) {
        let isEmptyClass = (!data.value || data.value === '')?'is-empty':'';
        let icon = this.state.showing?faCaretUp:faCaretDown;
        if (data.multiline) {
            return (
                <React.Fragment>
                    <textarea
                        ref={(ref) => { this.element = ref; }}
                        onFocus={e => {this.toggleShowing(true)} }
                        onBlur={  this.onBlur }
                        onChange={e => {
                            this.__onChange(data, e.target.value);
                        }}
                        className={css(styles.default, styles.dropdown, data.error && styles.errorBar) + ' ' +isEmptyClass}
                        required={data.required} disabled={data.disabled||data.forceDisabled} defaultValue={this.renderValue(data)}/>

                        <FontAwesomeIcon icon={icon} className={css(styles.caretDown, (data.forceDisabled||data.disabled) && styles.disabledField)}/>
                        { this.showOptions(data) }
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <input
                    ref={(ref) => { this.element = ref; }}
                    onFocus={e => {this.toggleShowing(true)} }
                    onBlur={  this.onBlur }
                    onChange={e => {
                        this.__onChange(data, e.target.value);
                    }}
                    className={css(styles.default, styles.dropdown, data.labelType && styles[data.labelType] ,data.error && styles.errorBar) + ' ' +isEmptyClass}
                    type={data.type} required={data.required} disabled={data.disabled||data.forceDisabled} defaultValue={this.renderValue(data)}/>

                <FontAwesomeIcon icon={icon} className={css(styles.caretDown,  data.labelType && styles.caretLarge, (data.forceDisabled||data.disabled) && styles.disabledField)}/>
                { this.showOptions(data) }
            </React.Fragment>
        )
    }
}
