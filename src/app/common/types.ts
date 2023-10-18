import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {FormGroup} from "@angular/forms";
import {NzSelectOptionInterface} from "ng-zorro-antd/select/select.types";
export type CanActivateResult = boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>;
export enum Dto {
  role = 'role',
  subsystem = 'subsystem',
  group = 'group',
  permission = 'permission',
  user = 'user',
  action = 'action'
}

export enum Schema {
  crud = 'crud',
  mng = 'mng',
  lookup = 'lookup',
  table = 'table',
}

export enum Operation {
  C = 'create',
  R = 'read',
  U = 'update',
  D = 'delete',
  A = 'assign'
}

export type FormElementType = 'text' | 'password' | 'checkbox' | 'textarea' | 'lookup' | null | 'hidden' | 'select' | 'mobile' | 'subsystem'

export type FormElement = {
  type: FormElementType,
  name: string,
  label?: string,
  schema: Schema[],
  options?: NzSelectOptionInterface[]
  minlength?: number,
  maxlength?: number,
  readonly?: boolean,
  required?: boolean,
  dir?: 'rtl' | 'ltr',
  disabled?: boolean,
  validators?: string[],
  value?: any;
  change?: (form: FormGroup, conf: {[key in string]: FormElement}) => void
  input?: any
  multiple?: boolean,
}

export type FormConfig = {
  construct: (value: any) => any;
  operations: Operation[];
  init?: (form: FormGroup, conf: { [key in string]: FormElement }, schema: Schema, options?: any) => void;
  doCheck?: (form: FormGroup, conf: { [key in string]: FormElement }, schema: Schema) => void;
  name: Dto;
  conf: {
    [key in string]: FormElement;
  };
};

export type FormSchematic = {
  [key in Dto]: FormConfig
}

