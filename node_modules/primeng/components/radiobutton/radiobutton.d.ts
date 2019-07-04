import { ElementRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const RADIO_VALUE_ACCESSOR: any;
export declare class RadioButton implements ControlValueAccessor {
    private cd;
    value: any;
    name: string;
    disabled: boolean;
    label: string;
    tabindex: number;
    inputId: string;
    style: any;
    styleClass: string;
    labelStyleClass: string;
    onClick: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    inputViewChild: ElementRef;
    onModelChange: Function;
    onModelTouched: Function;
    checked: boolean;
    focused: boolean;
    constructor(cd: ChangeDetectorRef);
    handleClick(event: any, radioButton: any, focus: any): void;
    select(event: any): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onInputFocus(event: any): void;
    onInputBlur(event: any): void;
    onChange(event: any): void;
}
export declare class RadioButtonModule {
}
