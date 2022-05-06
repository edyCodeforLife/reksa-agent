import * as React from 'react';
import { Text } from './text';
import * as Inputmask from "inputmask/dist/inputmask/inputmask.numeric.extensions";

export class Masked extends Text {
    componentDidMount() {
        super.componentDidMount();
        let obj: any = {
            mask: this.state.data.masking,
            greedy: false,
            jitMasking: true
        };

        if (this.state.data.regex) obj.regex = this.state.data.regex;

        let im = new Inputmask(obj);
        im.mask(this.element);
    }

    _onChange(data: any, value: any) {
        try {
            value = this.element.inputmask.unmaskedvalue() || value;
        } catch (err) {
            console.log(err);
        }
        data.onChange(data.fieldId, { target: { value } });
    }
}
