import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-access-layout-1',
  templateUrl: './access-layout-1.component.html',
  styleUrls: ['./access-layout-1.component.less']
})
export class AccessLayout1Component {
  @Input() presentation: any;

  constructor() { }
}
