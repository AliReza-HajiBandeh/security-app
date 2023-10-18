import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {FormSchema} from "../../../common/form-schema";
import {Dto, FormElement, Operation, Schema} from "../../../common/types";
import {FormBuilder} from "@angular/forms";
import {TranslationService} from "../../../common/translation.service";
import {getErrorText} from "../../../common/utils/error-text";
import {Filter, FilterOperation} from "../../../common/pagination";
import {DataService} from "../../../common/data.service";
import {AppUserIdentity} from "../../../common/security";
import {UserIdentityStore} from "@rbcorp/ui-infra";

@Component({
  selector: 'rbc-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements AfterViewInit, OnDestroy {
  formSchema: FormSchema;
  name: Dto = Dto.user;
  names = Dto;
  operation: Operation = Operation.C;
  schema: Schema = Schema.mng;
  valueChanges?: Subscription;
  logics = Schema;
  operations = Operation;
  searchModel: any = null;
  selectedSubsystem: any = null;
  @Output() action = new EventEmitter<any>();
  @Output() subsystemChange = new EventEmitter<any>();
  @Output() dtoChange = new EventEmitter<any>();
  @Output() confChange = new EventEmitter<any>();
  @Output() reset = new EventEmitter<any>();
  filters: Filter[] | null = null;

  @Input() set subsystem(value: any) {
    if (value) {
      this.formSchema.assignByElementName(Dto.subsystem, value);
      this.action.emit(this.formSchema.form.value);
    }
    this.selectedSubsystem = value ? value : null;
  }

  @Input() set dto(value: any) {
    if (this.formSchema !== null) {
      // this.formSchema.dto = value;
      this.selectSubsystem(value?.subsystem ? value?.subsystem : null);
    }
    this.operation = value?.id ? Operation.U : Operation.C;
  }

  @Input('params') set buildForm(params: { name: Dto, schema: Schema, options?: any }) {
    this.name = params?.name;
    this.schema = params?.schema;
    this.operation = params?.options && params.options?.id ? Operation.U : Operation.C;
    this.formSchema = new FormSchema(this.fb, this.name, this.schema, params?.options);
    this.formSchema.buildForm(params);
    this.selectedSubsystem = this.formSchema.form.value.subsystem?.id ? this.formSchema.form.value.subsystem : null;
  };


  constructor(private fb: FormBuilder, private label: TranslationService, private service: DataService, private store: UserIdentityStore<AppUserIdentity>) {
    this.formSchema = new FormSchema(this.fb, this.name, this.schema, this.dto);
  }

  ngAfterViewInit(): void {
    this.valueChanges = this.formSchema?.form.valueChanges.subscribe(value => {
      this.dtoChange.emit(value)
    })
  }

  ngOnDestroy(): void {
    this.valueChanges?.unsubscribe();
  }

  assign(elementName: string, value: any) {
    this.formSchema.assignByElementName(elementName, value);
    if (elementName === Dto.subsystem && value?.[0] && value?.[0].id) {
      this.selectedSubsystem = value;
    }
  }

  change($event: any, fn: any) {
    if (typeof fn === 'function') {
      this.formSchema?.renderEvent($event, fn);
      this.confChange.emit();
    }
  }

  input($event: any, fn: any) {
    if (typeof fn === 'function') {
      this.formSchema?.inputEvent($event, fn);
    }
  }

  submit() {
    if (this.formSchema.form.valid) {
      this.action.emit(this.formSchema.form.value);
    }
  }

  search(model: any, name: Dto) {
    this.searchModel = {model: model, name: this.paramName(name)};
  }

  error(error: any) {
    return getErrorText(error);
  }

  paramName = (name: string): Dto => {
    return Object.values(Dto).find(value => name.indexOf(value) > -1) as Dto;
  }

  clear() {
    this.reset.emit();
  }

  selectSubsystem(subsystem: any) {
    this.subsystemChange.emit(this.selectedSubsystem = subsystem);
    this.selectedSubsystem = subsystem
    if (this.name !== Dto.role) {
      this.subsystemChange.emit(this.selectedSubsystem);
    }
    this.filters = subsystem?.id ? [new Filter('subsystem.id', FilterOperation.EQUAL, subsystem?.id)] : null;
  }

  resetRelations() {
    const name = Object.values(this.formSchema.schematics.conf).find(element => element?.multiple)?.name;
    if (name) {
      this.assign(name, null);
    }
  }

  showElement = (element: FormElement): boolean => {
    let result = ![null, 'hidden'].includes(element?.type);
    if (this.operation === Operation.C && this.schema === Schema.crud && element?.name === 'enabled') {
      result = false;
    }
    if (this.schema === Schema.lookup && element?.name === 'subsystem') {
      if (this.name === Dto.group || this.name === Dto.role) {
        result = true;
      } else {
        result = false;
      }
    }
    return result;
  }
}
