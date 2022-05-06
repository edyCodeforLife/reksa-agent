import * as React from 'react';
import { ScreenComponent } from './screen';

export class Homepage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render () {
        return (
            <ScreenComponent {...this.props} />
        );
    }
}
