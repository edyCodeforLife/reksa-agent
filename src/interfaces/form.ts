interface IValidation {
    email?: boolean,
    required?: boolean,
    numeric?: boolean,
    custom?: any,
    customAsync?: any
}

export interface IInputStates {
    fieldId: any,
    type: 'text' | 'email' | 'dropdown' | 'radio' | 'checkbox' | 'password' | 'file' | 'datePicker',
    value?: any,
    prefix?: any,
    keyboardType?: any,
    label?: any,
    required?: any,
    options?: any,
    optionsTag?: any,
    editable?: any,
    disabled?: any,
    multiline?: any,
    suffix?: any,
    characterRestriction?: any,
    error?: any,
    onChange?: any,
    hide?: any,
    labelKey?: any,
    onChangeFunction?: any,
    masking?: any,
    fileType?: any,
    forceDisabled?: any,
    info?: any,
    labelType?: any,
    dateType?: any
}

export interface IInputProps {
    data: object
}
