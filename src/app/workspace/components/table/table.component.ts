import {AfterContentInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {Dto, FormConfig, FormElement, Operation, Schema} from "../../../common/types";
import {TranslationService} from "../../../common/translation.service";
import {DataService} from "../../../common/data.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Schematics} from "../../../common/schematics";
import {Filter, FilterOperation, PagingRequest} from "../../../common/pagination";
import {UserIdentityStore} from "@rbcorp/ui-infra";
import {AppUserIdentity} from "../../../common/security";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'rbc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements AfterContentInit {
  @Input() multiple = false;
  name: Dto = Dto.user;
  schema: Schema = Schema.mng;
  logic = Schema;
  map = new Array<{ name: string, label: string }>();
  model: any = null;
  operations = Operation;
  formElements = [] as FormElement[];
  filters: Filter[] | null = null;
  formConfig: FormConfig = Schematics[Dto.user];
  table = {
    total: 0,
    size: 10,
    page: 1,
    count: 0,
    data: [] as any[]
  }
  selectedItems = [] as any[];
  selectedId = null;
  allSelected = false;

  @Input('model') set paginate(options: { model: any, name?: string }) {
    if (options?.name) {
      if (options?.name === this.name) {
        this.model = options?.model;
        this.findPaging(0, this.table.size);
      }
    } else if ([this.logic.mng].includes(this.schema)) {
      this.model = options?.model;
      this.findPaging(0, this.table.size);
    }
  };

  @Input() set params(params: { name: any, schema: Schema }) {
    this.name = params?.name;
    this.schema = params?.schema;
    this.formConfig = Schematics[this.name];
    this.createTable();
  };

  @Input() set selection(value: any[]) {
    if (value) {
      const result = JSON.parse(JSON.stringify(value))
      this.selectedItems = this.multiple ? result : [result];
    } else {
      this.selectedItems = [];
    }

    if (this.schema === Schema.crud) {
      this.table.data = this.selectedItems;
      this.table.total = this.selectedItems?.length;
      this.table.count = this.selectedItems?.length;
      this.table.page = 1;
    }
  };

  @Input('subsystem') set paginateByFilters(filters: Filter[] | null) {
    if (filters && Array.isArray(filters) && filters?.length && this.name !== Dto.subsystem) {
      this.filters = filters;
    } else {
      this.filters = null;
    }
  };

  @Output() selectionChange = new EventEmitter<any>();

  constructor(private locale: TranslationService, private service: DataService, private notification: NzNotificationService, private store: UserIdentityStore<AppUserIdentity>,
              private router: Router, private route: ActivatedRoute) {
  }


  createTable(): void {
    this.map = new Array<{ name: string, label: string }>();
    this.resetTable();
    if (this.formConfig) {
      this.formElements = Object.values(this.formConfig.conf).filter(element => element.schema.includes(Schema.table));
      this.formElements.forEach((element) => {
        this.map.push({name: element?.name, label: element?.label ? element?.label : element?.name});
      })
    }
  }

  findPaging(start: number, size: number, pageIndex: number = 1): void {
    if (this.schema !== Schema.crud) {
      const req = new PagingRequest(start, size, this.filters?.length ? this.filters : [], null);
      if (this.model) {
        Object.keys(this.model).forEach(key => {
          if (key && this.model[key] !== undefined && this.model[key] !== 0 && this.model[key] !== null && this.model[key] !== '' && !req.filters.find(item => item.fieldName === key)) {
            if (((typeof this.model[key] === 'object') && this.model[key]?.id)) {
              // @ts-ignore
              if (this.store.get()?.activeSubsystemId > 0 && key === 'subsystem') {
                req.filters.push(new Filter(`${key}.id`, FilterOperation.EQUAL, this.store.get()?.activeSubsystemId))
              } else {
                req.filters.push(new Filter(`${key}.id`, FilterOperation.EQUAL, this.model[key]?.id))
              }
            } else {
              req.filters.push(new Filter(key, (typeof this.model[key] === 'string' ? FilterOperation.CONTAINS : FilterOperation.EQUAL), this.model[key]))
            }
          }
        })
      }
      this.service.paginate(this.name, req).subscribe(res => {
        this.selectedId = null;
        this.table.data = res?.data;
        this.table.total = res?.size;
        this.table.page = pageIndex;
        this.allSelected = false;
        if (this.schema === Schema.mng) {
          sessionStorage.setItem('cache', JSON.stringify({name: this.name, state: this.model}))
        }
      }, (error: any) => {
        sessionStorage.clear();
        this.resetTable();
      });
    }
  }

  resetTable(): void {
    this.selectedId = null;
    this.selectedItems = [];
    this.table.data = new Array<any>();
    this.table.total = 0;
    this.table.page = 1;
  }

  delete(id: any): void {
    if (id) {
      this.service.delete(this.name, id).subscribe(res => {
        this.notification.success(`${this.locale.translate(this.name === 'user' ? 'deActive' : 'delete')} ${this.locale.translate(this.name)}`, `${this.locale.translate(this.name === 'user' ? 'deActive' : 'delete')} ${this.locale.translate(this.name)} موفق بود`);
        this.findPaging(0, this.table.size);
      });
    }
  }

  assignSelection(): void {
    this.selectionChange.emit(this.selectedItems)
  }

  select(checked: boolean, dataItem: any) {
    if (checked) {
      if (!this.multiple) {
        this.selectedItems = [dataItem];
      } else {
        if (!this.checked(dataItem?.id)) {
          this.selectedItems?.push(dataItem);
        }
      }
    } else {
      if (this.multiple) {
        this.selectedItems?.find((item: any, index) => {
          if (item?.id === dataItem?.id) {
            this.selectedItems?.splice(index, 1);
          }
        })
      } else {
        this.selectedItems = [];
      }
    }
    this.selectedId = checked ? dataItem?.id : null;
  }

  checked = (id: number) => {
    if (this.selectedItems?.length) {
      return Boolean(this.selectedItems?.find(item => item?.id === id))
    } else {
      return false;
    }
  }

  getType = (item: any): string => {
    let type = '';
    if (typeof item === 'object') {
      if (Array.isArray(item)) {
        type = 'array'
      } else {
        type = 'object';
      }
    } else {
      type = typeof item;
    }
    return type;
  }

  get cantDelete() {
    if (this.selectedItems?.length) {
      const item = this.selectedItems.find(item => item?.id === this.selectedId);
      let condition = false;
      Object?.values(item).forEach((value: any) => {
        const type = this.getType(value);
        if (item?.enabled) {
          if (type === 'array' && value?.length) {
            condition = true;
          } else if (type === 'object' && value?.id) {
            condition = true;
          }
        } else {
          condition = true;
        }
      })
      return Boolean(this.selectedId && condition)
    } else {
      return true;
    }
  }

  selectAll($event: boolean) {
    this.selectedId = null;
    if ($event) {
      this.table.data.forEach(item => {
        if (!this.checked(item?.id)) {
          this.selectedItems.push(item);
        }
      })
    } else {
      this.table.data.forEach(item => {
        this.selectedItems.filter((selectedItem, index) => {
          if (selectedItem?.id === item?.id) {
            this.selectedItems.splice(index, 1)
          }
        })
      })
    }
  }

  unAssign(id: number) {
    const temp = this.selectedItems;
    temp.find((item: any, index: number) => {
      if (id === item?.id) {
        this.selectedItems.splice(index, 1);
      }
    });
    this.assignSelection();
  }

  link(name: Dto, id: number) {
    if (this.store.get()?.hasClaim(`${name}_update`)) {
      let url = '';
      if (this.schema === Schema.mng) {
        url = `../${name}/${Schema.crud}/${id}`
      } else {
        url = `../../../../${Schema.mng}/${name}/${Schema.crud}/${id}`;
      }
      this.router.navigate([url], {relativeTo: this.route}).then()
    }
  }

  paramName = (name: string): Dto => {
    return Object.values(Dto).find(value => name.indexOf(value) > -1) as Dto;
  }

  pageIndexChange($event: number) {
    const start = this.table.page > 1 ? (this.table.page - 1) * this.table.size : 0;
    this.findPaging(start, this.table.size, $event)
  }

  pageSizeChange($event: number) {
    this.findPaging(0, $event, 1)
  }

  ngAfterContentInit(): void {
    if (this.schema === Schema.lookup && this.name === Dto.group) {
      this.model = Schematics.group.construct(null);
      this.findPaging(0, this.table.size)
    }
  }
}
