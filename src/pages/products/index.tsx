import * as React from 'react';
import {Screen} from './screen';

export class Products extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Screen
                {...this.props}
            />
        );
    }
}
