import * as React from 'react';
import { css } from 'aphrodite';
import { globalColorDefault } from '../../data/global/variables';

export class Spinner extends React.PureComponent<any, any> {
    render() {
        return (
            <div className="spinner">
                <div className="bounce1" style={{background: globalColorDefault}}></div>
                <div className="bounce2" style={{background: globalColorDefault}}></div>
                <div className="bounce3" style={{background: globalColorDefault}}></div>
            </div>
        )
    }
}