import React, { Component } from 'react';
import {isEqual} from 'lodash';
import { withRouter } from 'react-router-dom';

class _CustomLinks extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        // prevent rerender component with same data
        return !isEqual(nextProps.history, this.props.history) || !isEqual(nextProps.disabled, this.props.disabled);
    }

    onClick(event: any, to: any) {
        event.preventDefault();
        if (this.props.disabled) return;
        window.scrollTo(0, 0);
        this.props.history.push(to);
    }

    render() {
        let currentLang = this.props.history.location.pathname.split('/')[1];
        let lang = 'idn';
        if (['idn', 'en'].indexOf(currentLang) > -1) {
            lang = currentLang;
        }

        let { text, to, className, style } = this.props;
        let _url = `/${lang}/${to}`;
        return <a
            ref={node => {
                if (node) {
                    if (this.props.disabled) {
                        node.style.setProperty('cursor', 'default', 'important');
                        node.style.setProperty('opacity', '.5', 'important');
                    } else {
                        node.style.setProperty('cursor', 'pointer', 'important');
                        node.style.setProperty('opacity', '1', 'important');
                    }
                }
            }}
            href={_url}
            onClick={e => { this.onClick(e, _url) }}
            style={style}
            className={className}
        >
            {this.props.children}
        </a>
    }
}

export const CustomLinks = withRouter(_CustomLinks);
