import {Dto, Operation, Schema} from "../../../common/types";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../../common/data.service";
import {Component} from "@angular/core";
import {TranslationService} from "../../../common/translation.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Schematics} from "../../../common/schematics";
import {UserIdentityStore} from "@rbcorp/ui-infra";
import {AppUserIdentity} from "../../../common/security";


@Component({
  selector: 'rbc-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.less']
})
export class CRUDComponent {
  params: {name: Dto, schema: Schema, options?: any} = {name: Dto.user, schema: Schema.crud};
  operation = Operation.C;
  dto: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private service: DataService, private locale: TranslationService,
              private notification: NzNotificationService, private store: UserIdentityStore<AppUserIdentity>) {
    this.route.params.subscribe(params => {
      if (!Object.values(Dto).includes(params?.type) || (params?.id !== 'create' && isNaN(Number(params?.id)))
        || (!this.store.get()?.claims.includes(`${params?.type}_update`) && !this.store.get()?.claims.includes(`${params?.type}_create`))
      ) {
        this.router.navigateByUrl('/workspace').then(r => {})
      }
      if (params?.type === Dto.user) {
        Schematics.user.conf.real.value = Schematics.user.conf.enabled.value = true;
      }
      this.operation = params?.id > 0 ? Operation.U : Operation.C;
      this.params = {name: params?.type, schema: Schema.crud};
      if (params?.id > 0) {
        this.find(params?.id);
      }
      if (this.route.routeConfig?.data) {
        this.route.routeConfig.data.title = `${this.locale.translate(this.operation)} ${this.locale.translate(`${this.params?.name}`)}`;
      }
    });
  }

  find(id: number): void {
    this.service.find(this.params.name, id).subscribe(res => {
      if (this.params?.name === Dto.user) {
        Schematics.user.conf.real.value = res.real;
        Schematics.user.conf.enabled.value = res.enabled;
      }
      this.params = {name: this.params?.name, schema: Schema.crud, options: res};
      // this.dto = res;
    });
  }

  submit($event: any): void {
    if ($event) {
      // @ts-ignore
      this.service[this.operation](this.params.name, $event).subscribe(res => {
        this.notification.success(`${this.locale.translate(this.operation)} ${this.locale.translate(this.params.name)}`, `${this.locale.translate(this.operation)} ${this.locale.translate(this.params.name)} موفق بود`);
        this.router.navigate(['../..'], {relativeTo: this.route}).then()
      });
    }
  }

}
