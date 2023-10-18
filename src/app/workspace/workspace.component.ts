import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ButtonPageAction, PageAction, WorkspaceService } from './workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.less'],
})
export class WorkspaceComponent implements OnDestroy {
  private mediaSubscription: Subscription;
  smallDevice = false;
  showAsideMessages = false;
  menuPanel = {
    expanded: true,
    theme: 'dark',
  };
  constructor(breakpointObserver: BreakpointObserver, workspaceService: WorkspaceService) {
    this.mediaSubscription = breakpointObserver.observe('(max-width: 720px)').subscribe(x => this.smallDevice = x.matches);
  }

  _onHumburgerClick(): void {
    // this.asideMenu.mode = this.asideMenu.mode === 'hidden' ? 'expanded' : 'hidden';
  }

  _onExpanderClick(): void {
    this.menuPanel.expanded = !this.menuPanel.expanded;
  }

  onPageActionClick() {
  }

  // onSidebarMouseEnter(): void {
  //   if (!this.sidebar.pinned && !this.sidebar.expanded) {
  //     this.sidebar.expanded = true;
  //   }
  // }

  // onSidebarMouseLeave(): void {
  //   if (!this.sidebar.pinned && this.sidebar.expanded) {
  //     this.sidebar.expanded = false;
  //   }
  // }

  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
  }

  // onCloseClick(): void {
  //   this.store.dispatch(Actions.showSideBar({ show: false }));
  // }

  // onVisibleChange(value): void {
  //   this.store.dispatch(Actions.showSideBar({ show: false }));
  // }
}
