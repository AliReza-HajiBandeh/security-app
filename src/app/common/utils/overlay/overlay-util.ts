import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';

const CSS = `.cdk-overlay-container,.cdk-global-overlay-wrapper{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}@media screen and (-ms-high-contrast: active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.6}}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.32)}.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box{position:absolute;z-index:1000;display:flex;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}`;

@Injectable({
    providedIn: 'root'
})
export class OverlayUtil {
    private static cssInjected = false;

    constructor(@Optional() @Inject(DOCUMENT) private doc: any) {
    }

    injectCss(): void {
        const d = this.doc;
        if (d?.head && !OverlayUtil.cssInjected) {
            const head = d.getElementsByTagName('head')[0];
            const style = d.createElement('style');
            style.appendChild(d.createTextNode(CSS));
            head.appendChild(style);
        }
    }
}
