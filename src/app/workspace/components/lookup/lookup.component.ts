import {Component, Input, EventEmitter, Output, forwardRef} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from "@angular/forms";

@Component({
  selector: 'rbc-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.less'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LookupComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => LookupComponent),
    multi: true
  }]
})
export class LookupComponent implements ControlValueAccessor, Validator {
  model: any = null;
  value: any = null;
  @Input() multiple = true;
  @Input() title: any = '';
  @Input() subsystem: any = null;
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;
  modal = false;

  constructor() {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    this.modalChange(false);
    this.value = [];
    if (Array.isArray(value) && this.multiple && value?.length) {
      this.model = value;
      value.forEach((item: any) => {this.value.push(item?.id)})
    } else if (value?.id && !this.multiple) {
      this.model = value;
      this.value = [value];
    } else {
      this.model = null;
    }

    this.onChange(this.model);
  }

  // methods
  onChange = ($event: any): void => {}

  onTouched = ($event: any): void => {}

  validate(control: AbstractControl): {required: true} | null {
    // if (this.multiple) {
    //   return Array.isArray(this.model) && this.model?.length ? null : {required: true}
    // } else {
    //   return this.model?.id ? null : {required: true}
    // }
    return null;
  }

  modalChange(view: boolean) {
    this.modal = view
  }
}
