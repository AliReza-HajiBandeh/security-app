import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Dto, Schema} from "../../../common/types";
import {DataService} from "../../../common/data.service";
import {Schematics} from "../../../common/schematics";
import {TranslationService} from "../../../common/translation.service";
import {UserIdentityStore} from "@rbcorp/ui-infra";
import {AppUserIdentity} from "../../../common/security";

@Component({
  selector: 'rbc-mng',
  templateUrl: './mng.component.html',
  styleUrls: ['./mng.component.less']
})
export class MngComponent {
  params: { name: Dto.user, schema: Schema.mng, options?: any} = { name: Dto.user, schema: Schema.mng};
  model: any = null;

  constructor(private route: ActivatedRoute, private service: DataService, private router: Router, private locale: TranslationService, private store: UserIdentityStore<AppUserIdentity>) {
    this.route.params.subscribe(params => {
      if (!Object.values(Dto).includes(params?.type)
        || !this.store.get()?.claims.includes(`${params?.type}_search`)
      ) {
        this.router.navigateByUrl('/workspace').then(r => {});
        sessionStorage.clear();
      }
      const name = params?.type as Dto;
      const model = Schematics?.[name].construct(this.model);
      if (name === Dto.user) {
        model.real = model.enabled = 0;
        Schematics.user.conf.real.value = Schematics.user.conf.enabled.value = 0;
      }

      const cache = sessionStorage.getItem('cache');
      if (cache && JSON.parse(cache)?.name === name) {
        this.model = {model: JSON.parse(cache)?.state};
      } else {
        this.model = {model};
      }

      this.params = {name: params?.type, schema: Schema.mng, options: this.model.model};

      if (this.route.routeConfig?.data) {
        this.route.routeConfig.data.title = `${this.locale.translate(this.params?.schema)} ${this.locale.translate(`${this.params?.name}s`)}`;
      }
    });
  }

  search(model: any) {
    this.model = {model: model};
  }

  confChange() {
    this.params = {name: this.params.name, schema: this.params.schema};
  }
}
