import {Dto, FormElement, FormSchematic, Operation, Schema} from "./types";
import {ActionDto, GroupDto, PermissionDto, RoleDto, SubsystemDto, UserDto} from "./main.dto";
import {FormGroup, Validators} from "@angular/forms";

export const Schematics: FormSchematic = {
  [Dto.role]: {
    construct: (options?: RoleDto) => new RoleDto(options),
    init: (form: FormGroup, conf: { [key in string]: FormElement }, schema: Schema) => {
      conf.subsystem.readonly = schema === Schema.lookup;
    },
    operations: [Operation.C, Operation.U, Operation.D],
    name: Dto.role,
    conf: {
      id: {name: 'id', type: 'hidden', required: false, schema: [Schema.crud]},
      version: {name: 'version', type: 'hidden', schema: [Schema.crud], value: 0},
      subsystem: {
        name: 'subsystem',
        type: 'subsystem',
        multiple: false,
        schema: [Schema.crud, Schema.table, Schema.mng, Schema.lookup],
      },
      name: {
        name: 'name',
        dir: 'ltr',
        type: 'text',
        validators: ['english'],
        minlength: 2,
        maxlength: 255,
        schema: [Schema.crud, Schema.mng, Schema.table, Schema.lookup]
      },
      title: {
        name: 'title',
        type: 'text',
        dir: 'rtl',
        minlength: 2,
        validators: ['persian'],
        maxlength: 255,
        schema: [Schema.mng, Schema.crud, Schema.table, Schema.lookup]
      },
      description: {
        name: 'description',
        type: 'text',
        required: false,
        minlength: 2,
        dir: 'rtl',
        maxlength: 255,
        schema: [Schema.crud, Schema.table]
      },

      permissions: {
        name: 'permissions',
        multiple: true, required: false,
        type: 'lookup',
        schema: [Schema.crud, Schema.table],
        // input: ($event: any, form: FormGroup) => {
        //   if (Array.isArray($event) && $event?.length) {
        //     const res = $event[0].subsystem;
        //     form.get('subsystem')?.patchValue(res);
        //   }
        // }
      },
      enabled: {
        name: 'enabled',
        type: 'select',
        schema: [Schema.crud, Schema.table, Schema.lookup, Schema.mng],
        value: true,
        label: 'وضعیت',
        options: [
          {label: 'فعال', value: true},
          {label: 'غیرفعال', value: false},
        ]
      },
    }
  },
  [Dto.subsystem]: {
    construct: (options?: SubsystemDto) => new SubsystemDto(options),
    name: Dto.subsystem,
    operations: [Operation.U],
    conf: {
      id: {name: 'id', type: 'hidden', required: false, schema: [Schema.crud]},
      version: {name: 'version', type: 'hidden', schema: [Schema.crud], value: 0},
      name: {
        name: 'name',
        type: 'text',
        dir: 'ltr',
        validators: ['english'],
        readonly: true,
        minlength: 2,
        maxlength: 255,
        schema: [Schema.crud, Schema.mng, Schema.table, Schema.lookup]
      },
      title: {
        name: 'title',
        type: 'text',
        dir: 'rtl',
        validators: ['persian'],
        minlength: 2,
        maxlength: 255,
        schema: [Schema.mng, Schema.crud, Schema.table, Schema.lookup]
      },
    }
  },
  [Dto.permission]: {
    construct: (options?: PermissionDto) => new PermissionDto(options),
    operations: [Operation.U, Operation.C, Operation.D],
    init: (form: FormGroup, conf: { [key in string]: FormElement }, schema: Schema) => {
      conf.subsystem.readonly = schema === Schema.lookup;
    },
    name: Dto.permission,
    conf: {
      id: {name: 'id', type: 'hidden', required: false, schema: [Schema.crud]},
      version: {name: 'version', type: 'hidden', schema: [Schema.crud], value: 0},
      subsystem: {
        name: 'subsystem',
        type: 'subsystem',
        multiple: false,
        schema: [Schema.crud, Schema.table, Schema.mng, Schema.lookup],
      },
      name: {
        name: 'name',
        type: 'text',
        dir: 'ltr',
        validators: ['english'],
        minlength: 2,
        maxlength: 255,
        schema: [Schema.crud, Schema.mng, Schema.table, Schema.lookup]
      },
      title: {
        name: 'title',
        type: 'text',
        dir: 'rtl',
        minlength: 2,
        validators: ['persian'],
        maxlength: 255,
        schema: [Schema.mng, Schema.crud, Schema.table, Schema.lookup]
      },
      description: {
        name: 'description',
        type: 'text',
        required: false,
        dir: 'rtl',
        minlength: 2,
        maxlength: 255,
        schema: [Schema.crud, Schema.table]
      },

      actions: {
        name: 'actions',
        required: false,
        multiple: true,
        type: 'lookup',
        schema: [Schema.crud, Schema.table],
        // input: ($event: any, form: FormGroup) => {
        //   if (Array.isArray($event) && $event?.length) {
        //     const res = $event[0].subsystem;
        //     form.get('subsystem')?.patchValue(res);
        //   }
        // }
      },
      enabled: {
        name: 'enabled',
        type: 'select',
        schema: [Schema.crud, Schema.table, Schema.lookup, Schema.mng],
        value: true,
        label: 'وضعیت',
        options: [
          {label: 'فعال', value: true},
          {label: 'غیرفعال', value: false},
        ]
      },
    }
  },
  [Dto.action]: {
    construct: (options?: ActionDto) => new ActionDto(options),
    init: (form: FormGroup, conf: { [key in string]: FormElement }, schema: Schema, options?: any) => {
      conf.subsystem.readonly = !!options?.id || schema === Schema.lookup;
    },
    // doCheck: (form: FormGroup, conf: { [key in string]: FormElement }, schema: Schema) => {
    //   conf.subsystem.readonly = schema === Schema.crud;
    // },
    operations: [Operation.U, Operation.C, Operation.D],
    name: Dto.action,
    conf: {
      id: {name: 'id', type: 'hidden', required: false, schema: [Schema.crud]},
      version: {name: 'version', type: 'hidden', schema: [Schema.crud], value: 0},
      subsystem: {
        name: 'subsystem',
        multiple: false,
        type: 'subsystem',
        schema: [Schema.crud, Schema.table, Schema.mng, Schema.lookup],
        readonly: false,
      },
      name: {
        name: 'name',
        type: 'text',
        dir: 'ltr',
        readonly: true,
        validators: ['english'],
        minlength: 2,
        maxlength: 255,
        schema: [Schema.crud, Schema.mng, Schema.table, Schema.lookup]
      },
      title: {
        name: 'title',
        type: 'text',
        minlength: 2,
        dir: 'rtl',
        maxlength: 255,
        validators: ['persian'],
        schema: [Schema.mng, Schema.crud, Schema.table, Schema.lookup]
      },
      url: {
        name: 'url',
        type: 'text',
        minlength: 2,
        maxlength: 255,
        schema: [Schema.mng, Schema.crud, Schema.table, Schema.lookup],
        dir: 'ltr',
        readonly: true,
      },

      enabled: {
        name: 'enabled',
        type: 'select',
        schema: [Schema.crud, Schema.table, Schema.lookup, Schema.mng],
        value: true,
        label: 'وضعیت',
        options: [
          {label: 'فعال', value: true},
          {label: 'غیرفعال', value: false},
        ]
      },
    }
  },
  [Dto.user]: {
    construct: (options?: UserDto) => new UserDto(options),
    name: Dto.user,
    operations: [Operation.C, Operation.U],
    init: (form: FormGroup, conf: { [key in string]: FormElement }, schema: Schema, options?: any) => {
      conf.subsystems.type = 'hidden';
      conf.userName.readonly = !!options?.id;
      conf.real.readonly = !!options?.id;
      if (schema === Schema.mng) {
        conf.real.options = [
          {label: 'همه کاربران', value: 0},
          {label: 'حقیقی', value: true},
          {label: 'حقوقی', value: false},
        ];
        conf.enabled.options = [
          {label: 'همه وضعیت ها', value: 0},
          {label: 'فعال', value: true},
          {label: 'غیرفعال', value: false},
        ]
      } else {
        conf.real.options = [
          {label: 'حقیقی', value: true},
          {label: 'حقوقی', value: false},
        ];
        conf.enabled.options = [
          {label: 'فعال', value: true},
          {label: 'غیرفعال', value: false},
        ]
      }
      if (conf.real?.value || conf.real?.value === 0) {
        conf.nationalId.type = 'hidden';
        conf.title.type = 'hidden';
        conf.nationalId.required = false;
        conf.title.required = false;
        conf.nationalCode.label = 'کد ملی';
        conf.firstName.label = 'نام';
        conf.lastName.label = 'نام خانوادگی';
        conf.mobileNumber.label = 'شماره موبایل';
        conf.email.label = 'ایمیل';
      } else {
        conf.title.type = 'text';
        conf.nationalId.type = 'text';
        conf.title.required = true;
        conf.nationalId.required = true;
        conf.nationalCode.label = 'کد ملی نماینده شخص حقوقی';
        conf.firstName.label = 'نام نماینده شخص حقوقی';
        conf.lastName.label = 'نام خانوادگی نماینده شخص حقوقی';
        conf.mobileNumber.label = 'شماره موبایل نماینده شخص حقوقی';
        conf.email.label = 'ایمیل نماینده شخص حقوقی';
      }
    },
    conf: {
      id: {name: 'id', type: 'hidden', required: false, schema: [Schema.crud]},
      version: {name: 'version', type: 'hidden', schema: [Schema.crud], value: 0},
      real: {
        name: 'real', value: true,
        label: 'نوع کاربر',
        options: [
          {label: 'حقیقی', value: true},
          {label: 'حقوقی', value: false},
        ],
        type: 'select',
        schema: [Schema.crud, Schema.mng, Schema.table, Schema.lookup],
        change: (form: FormGroup, conf: { [key in string]: FormElement }) => {
          if (form.get('real')?.value || form.get('real')?.value === 0) {
            form.get('title')?.patchValue(null);
            form.get('nationalId')?.removeValidators(Validators.required);
            conf.nationalId.type = 'hidden';
            conf.title.type = 'hidden';
            conf.nationalId.required = false;
            conf.title.required = false;
            conf.nationalCode.label = 'کد ملی';
            conf.firstName.label = 'نام';
            conf.lastName.label = 'نام خانوادگی';
            conf.mobileNumber.label = 'شماره موبایل';
            conf.email.label = 'ایمیل';
          } else {
            form.get('title')?.addValidators(Validators.required);
            form.get('nationalId')?.addValidators(Validators.required);
            conf.title.type = 'text';
            conf.nationalId.type = 'text';
            conf.title.required = true;
            conf.nationalId.required = true;
            conf.nationalCode.label = 'کد ملی نماینده شخص حقوقی';
            conf.firstName.label = 'نام نماینده شخص حقوقی';
            conf.lastName.label = 'نام خانوادگی نماینده شخص حقوقی';
            conf.mobileNumber.label = 'شماره موبایل نماینده شخص حقوقی';
            conf.email.label = 'ایمیل نماینده شخص حقوقی';
          }
          conf.real.value = form.get('real')?.value;
        }
      },
      userName: {
        name: 'userName',
        type: 'text',
        validators: ['userName'],
        label: 'نام کاربری',
        minlength: 2,
        dir: 'ltr',
        maxlength: 50,
        schema: [Schema.mng, Schema.crud, Schema.table]
      },
      firstName: {
        name: 'firstName',
        type: 'text',
        label: 'نام',
        dir: 'rtl',
        validators: ['persian'],
        minlength: 2,
        maxlength: 255,
        schema: [Schema.mng, Schema.crud, Schema.table, Schema.lookup]
      },
      lastName: {
        name: 'lastName',
        type: 'text',
        label: 'نام خانوادگی',
        dir: 'rtl',
        validators: ['persian'],
        minlength: 2,
        maxlength: 255,
        schema: [Schema.mng, Schema.crud, Schema.table, Schema.lookup]
      },
      mobileNumber: {
        name: 'mobileNumber',
        type: 'text',
        label: 'شماره موبایل',
        validators: ['mobile'],
        dir: 'ltr',
        minlength: 11,
        maxlength: 11,
        schema: [Schema.crud]
      },
      title: {
        name: 'title',
        type: 'hidden',
        label: 'نام شخص حقوقی',
        dir: 'rtl',
        required: false,
        validators: ['persian'],
        minlength: 2,
        maxlength: 255,
        schema: [Schema.mng, Schema.crud, Schema.lookup, Schema.table]
      },
      nationalId: {
        name: 'nationalId',
        type: 'hidden',
        label: 'شناسه ملی شخص حقوقی',
        dir: 'ltr',
        required: false,
        validators: ['nationalId'],
        minlength: 11,
        maxlength: 11,
        schema: [Schema.crud]
      },
      nationalCode: {
        name: 'nationalCode',
        type: 'text',
        label: 'کد ملی',
        dir: 'ltr',
        required: true,
        validators: ['nationalCode'],
        minlength: 10,
        maxlength: 10,
        schema: [Schema.crud, Schema.mng, Schema.table]
      },
      email: {
        name: 'email',
        type: 'text',
        label: 'ایمیل',
        dir: 'ltr',
        validators: ['email'],
        minlength: 2,
        maxlength: 255,
        schema: [Schema.crud]
      },
      subsystems: {
        name: 'subsystems',
        type: 'hidden', required: false,
        multiple: true,
        schema: [Schema.crud, Schema.table],
      },
      groups: {
        name: 'groups',
        type: 'lookup', required: false,
        multiple: true,
        schema: [Schema.crud, Schema.table],
        input: ($event: any, form: FormGroup) => {
          const res: any[] = [];
          if (Array.isArray($event) && $event?.length) {
            $event.forEach(item => {
              if (!res.find(obj => obj?.id === item.subsystem?.id)) {
                res.push({
                  id: item.subsystem?.id,
                  version: item.subsystem?.version,
                  name: item.subsystem?.name
                } as SubsystemDto)
              }
            })
          }
          form.get('subsystems')?.patchValue(res?.length ? res : null);
        }
      },
      enabled: {
        name: 'enabled',
        type: 'select',
        schema: [Schema.crud, Schema.table, Schema.lookup, Schema.mng],
        value: true,
        label: 'وضعیت کاربر',
        options: [
          {label: 'فعال', value: true},
          {label: 'غیرفعال', value: false},
        ]
      }
    }
  },
  [Dto.group]: {
    construct: (options?: GroupDto) => new GroupDto(options),

    name: Dto.group,
    operations: [Operation.C, Operation.U, Operation.D],
    conf: {
      id: {name: 'id', type: 'hidden', required: false, schema: [Schema.crud]},
      version: {name: 'version', type: 'hidden', schema: [Schema.crud], value: 0},
      subsystem: {
        name: 'subsystem',
        type: 'subsystem',
        multiple: false, readonly: false,
        schema: [Schema.crud, Schema.table, Schema.mng, Schema.lookup],
      },
      name: {
        name: 'name',
        dir: 'ltr',
        type: 'text',
        validators: ['english'],
        minlength: 2,
        maxlength: 255,
        schema: [Schema.crud, Schema.mng, Schema.table, Schema.lookup]
      },
      title: {
        name: 'title',
        type: 'text',
        dir: 'rtl',
        minlength: 2,
        validators: ['persian'],
        maxlength: 255,
        schema: [Schema.mng, Schema.crud, Schema.table, Schema.lookup]
      },
      description: {
        name: 'description',
        dir: 'rtl',
        type: 'text',
        required: false,
        minlength: 2,
        maxlength: 255,
        schema: [Schema.crud, Schema.table]
      },

      roles: {
        name: 'roles',
        type: 'lookup',
        multiple: true,
        schema: [Schema.crud, Schema.table],
      //   input: ($event: any, form: FormGroup) => {
      //   if (Array.isArray($event) && $event?.length) {
      //     const res = $event[0].subsystem;
      //     form.get('subsystem')?.patchValue(res);
      //   }
      // },
        required: false,
      },
      enabled: {
        name: 'enabled',
        type: 'select',
        schema: [Schema.crud, Schema.table, Schema.lookup, Schema.mng],
        value: true,
        label: 'وضعیت',
        options: [
          {label: 'فعال', value: true},
          {label: 'غیرفعال', value: false},
        ]
      },
    }
  }
}
