import {Component, forwardRef, Input, EventEmitter, Output, OnInit, AfterViewInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from "@angular/forms";
import {DataService} from "../../../common/data.service";
import {PagingRequest} from "../../../common/pagination";
import {UserIdentityStore} from "@rbcorp/ui-infra";
import {AppUserIdentity} from "../../../common/security";

@Component({
  selector: 'rbc-subsystem',
  templateUrl: './subsystem.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SubsystemComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => SubsystemComponent),
    multi: true
  }]
})
export class SubsystemComponent implements ControlValueAccessor, Validator {

  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  activeSubsystemId: any = 0;
  @Output() change = new EventEmitter<any>();
  value: any = null;
  subsystem: any = null;
  subsystems: any[]  = [];

  constructor(private service: DataService, private store: UserIdentityStore<AppUserIdentity>) {
    // @ts-ignore
    this.subsystems =  this.store.get()?.subsystems ? this.store.get().subsystems : [];
    this.service.paginate('subsystem', new PagingRequest(0, 30, [], null)).subscribe(res => {
      if (this.store.get()?.vip) {
        this.subsystems = res.data;
      } else if (this.store.get()?.activeSubsystemId) {
        // @ts-ignore
        this.subsystems = this.store.get()?.subsystems.filter(item => item?.id === this.store.get()?.activeSubsystemId);
        const res = this.subsystems.find(dataItem => dataItem?.id === this.store.get()?.activeSubsystemId);
        this.onChange(res);
        this.writeValue(res);
        this.readonly = true;
      }
    })
  }

  onChange = ($event: any): void => {}
  onTouched = ($event: any): void => {}
  onValidatorChange = ($event: any): void => {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.subsystem = obj?.id ? obj : null;
    this.value = this.subsystem?.id ? this.subsystem?.id : null;
    if (!obj) {
      this.readonly = false;
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  subsystemChange(id: any) {
    const res = this.subsystems.find(dataItem => dataItem?.id === id);
    this.onChange(res);
    this.change.emit(res);
    this.writeValue(res);
  }

}
