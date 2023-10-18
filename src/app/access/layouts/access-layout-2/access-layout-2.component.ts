import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-access-layout-2',
  templateUrl: './access-layout-2.component.html',
  styleUrls: ['./access-layout-2.component.less']
})
export class AccessLayout2Component {
  @Input() presentation: any;

  constructor() { }
}
