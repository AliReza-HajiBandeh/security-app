import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-workspace-aside-messages',
  templateUrl: './aside-messages.component.html',
  styleUrls: ['./aside-messages.component.scss']
})
export class AsideMeessagesComponent {
  @Input() show: any;
  @Output() showChange = new EventEmitter<boolean>();

  constructor() {
  }
}
