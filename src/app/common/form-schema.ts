import {Dto, FormConfig, FormElement, Schema} from "./types";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Schematics} from "./schematics";
import {EmailValidatorFn, PhoneValidatorFn} from "@rbcorp/ui-infra";
import {
  EntityEnglishCharsValidator, NationalCodeValidatorFn,
  NationalIdValidatorFn,
  PersianCharsValidator,
  UserNameValidator
} from "./custom-validators";

export class FormSchema {
  form: FormGroup;
  schema: Schema;
  schematics: FormConfig
  elements = [] as FormElement[];
  controls = {} as { [key: string]: FormControl };
  name: Dto;

  constructor(private fb: FormBuilder, name: Dto, schema: Schema, options?: any) {
    this.form = this.fb.group({});
    this.schema = schema
    this.name = name;
    this.schematics = Schematics[name];
  }

  get dto(): any {
    return this.schematics.construct(this.form.value) || this.form.value || null;
  }

  set dto(value: any) {
    if (value && value?.id) {
      const keys = Object.keys(value);
      for (let i = 0; i < Object.keys(value)?.length; ++i) {
        this.assignByElementName(keys[i], value[keys[i]]);
      }
    }
  }

  buildForm(params: { name: Dto, schema: Schema, options?: any }) {
    this.elements = [];
    const controlsConfig = {} as any;
    this.schematics = Schematics[params?.name];
    const options = params?.options;
    if (this.schematics?.init) {
      this.schematics?.init(this.form, this.schematics.conf, this.schema, options);
    }
    const elements = Object.values(this.schematics.conf).filter((element: FormElement, index: number) => element.schema.includes(params?.schema));
    for (let i = 0; i < elements?.length; ++i) {
      const validators = [] as any;
      if (elements[i]?.minlength) {
        validators.push(Validators.minLength(Number(elements[i]?.minlength)))
      }
      if (elements[i]?.maxlength) {
        validators.push(Validators.maxLength(Number(elements[i]?.maxlength)))
      }
      if (elements[i]?.validators && elements[i].validators?.length) {
        if (elements[i].validators?.includes('mobile')) {
          validators.push(PhoneValidatorFn())
        }
        if (elements[i].validators?.includes('english')) {
          validators.push(EntityEnglishCharsValidator())
        }
        if (elements[i].validators?.includes('persian')) {
          validators.push(PersianCharsValidator())
        }
        if (elements[i].validators?.includes('userName')) {
          validators.push(UserNameValidator())
        }
        if (elements[i].validators?.includes('nationalCode')) {
          validators.push(NationalCodeValidatorFn())
        }
        if (elements[i].validators?.includes('nationalId')) {
          validators.push(NationalIdValidatorFn())
        }
        if (elements[i].validators?.includes('email')) {
          validators.push(EmailValidatorFn())
        }
      }
      if (params?.schema === Schema.crud && elements[i]?.required !== false) {
        validators.push(Validators.required)
      }
      controlsConfig[elements[i].name] = new FormControl(options?.[elements[i].name] !== undefined ? options?.[elements[i].name] : elements[i]?.value, validators);
      this.elements.push(elements[i])
    }
    this.controls = controlsConfig;
    this.form = this.fb.group(this.controls);
    if (this.schematics?.doCheck) {
      this.schematics?.doCheck(this.form, this.schematics.conf, this.schema);
    }
  }

  assignByElementName(elementName: string, value: any) {
    this.form.get(elementName)?.patchValue(value);
  }

  renderEvent($event: any, eventFunction: any) {
    eventFunction(this.form, this.schematics.conf);
    this.buildForm({name: this.schematics.name, schema: this.schema, options: this.form.value});
  }

  inputEvent($event: any, eventFunction: any) {
    eventFunction($event, this.form);
  }
}
