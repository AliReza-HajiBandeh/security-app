import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ButtonPageAction, PageAction, PageActions, WorkspaceService } from '../../workspace.service';
import { RouterService } from '@js-sugar/angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-workspace-page-bar',
  templateUrl: './page-bar.component.html',
  styleUrls: ['./page-bar.component.less'],
})
export class PageBarComponent {
  @Input() compactView = false;
  pageActions$: Observable<PageActions | undefined>;
  page$: Observable<{ title: string | undefined; breadcrumbItems: string[] | undefined }>;

  constructor(routerService: RouterService, workspaceService: WorkspaceService) {
    this.pageActions$ = workspaceService.pageActionsChange.pipe(tap(r => {}));
    this.page$ = routerService.navigation.pipe(
      map(event => ({
        title: event.pathFromRoot[event.pathFromRoot.length - 1].data.resolvedTitle,
        breadcrumbItems: event.pathFromRoot.filter(x => x.data.resolvedTitle).map(x => x.data.resolvedTitle as string)
      }))
    );
  }

  getPageActionType(pa: PageAction): string {
    if (pa instanceof ButtonPageAction) {
      return 'button';
    } else {
      return 'unknown';
    }
  }

  isDisabledAction(pageAction : any){
    return typeof(pageAction.props?.disabled) === 'function' ? pageAction.props?.disabled() : pageAction.props?.disabled;
  }

  onToggleSideBar(): void {
  }
}
