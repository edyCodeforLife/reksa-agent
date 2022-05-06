import * as React from 'react';
import { css } from 'aphrodite';
import {isEqual} from 'lodash';

import { styles } from './styles';
import {myStyles} from '../authentication/header/styles';

export class PopupDropDown extends React.Component<any, any> {
    parentEl: any = null;

    constructor(props: any) {
        super(props);

        this.state = {
            openModal: false,
            options: props.options
        };

        this.displayMenu = this.displayMenu.bind(this);
        this.eventClickListener = this.eventClickListener.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    displayMenu() {
        this.setState({menuOpened: !this.state.menuOpened});
    }

    componentWillReceiveProps(nextProps: any) {
        if (!isEqual(this.state.options, nextProps.options)) {
            this.setState({options: nextProps.options});
        }
    }

    componentDidMount() {
        window.addEventListener('click', this.eventClickListener, false);
    }

    eventClickListener(evt: any) {
        if (this.state.menuOpened) {
            if (evt.target === this.parentEl) {
                this.setState({menuOpened: false});
            }
        }
    }

    onChange(value: any) {
        this.props.onChange(value);
    }

    render() {
        let state = this.props.appState;
        return (
            <React.Fragment>
                <div
                    onClick={this.displayMenu}
                    className={css(myStyles.menuItem, styles.parent)}
                >
                    { this.props.children }
                    <span
                        className={css(myStyles.caretDown,
                            this.state.menuOpened && myStyles.caretUp, styles.caret)} />
                </div>
                {this.state.menuOpened?<div ref={el => {this.parentEl = el; }} className={css(myStyles.dropdown, styles.dropdown)}>
                    <div
                        className={css(myStyles.innerDropdown, styles.innerDropdown)}
                    >
                        {this.state.options.map(data => (
                            <div
                                key={data.label}
                                onClick={() => { this.setState({menuOpened: false, openModal: true}, () =>{
                                    this.onChange(data);
                                }); }}
                                className={css(myStyles.menuItemDropdown, styles.dropdownItem)}
                            >
                                {data.label}
                            </div>
                        ))}
                    </div>
                </div>:null}
            </React.Fragment>
        );
    }
}
