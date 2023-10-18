import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { AsideMenuTheme } from '../../../workspace/workspace-layout';

@Component({
  selector: 'app-workspace-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.less']
})
export class AsideMenuComponent {
  @Input() expanded = true;
  @Input() theme: any;
  @Input() collapsedWidth = '';
  @Input() expandedWidth = '';
  @Output() expanderClick = new EventEmitter();

  constructor() {
  }

  // @HostBinding('style.width') get hostWidth(): string {
  //   return this.mode === 'expanded' ? this.expandedWidth : (this.mode === 'collapsed' ? this.collapsedWidth : '0');
  // }

  onTogglePinClick(): void {
  }

  // onCloseClick(): void {
  //   this.store.dispatch(Actions.openSideBar({ open: false }));
  // }

  onMaskClick(): void {
  }
}
