import { ApplicationRef, ViewContainerRef, ComponentRef, Injector } from '@angular/core';
import { DialogRef } from '../models/dialog-ref';
import { OverlayRenderer } from '../models/tokens';
import { ModalOverlay } from '../overlay/index';
import * as i0 from "@angular/core";
export declare class DOMOverlayRenderer implements OverlayRenderer {
    private appRef;
    private injector;
    private isDoc;
    constructor(appRef: ApplicationRef, injector: Injector);
    render(dialog: DialogRef<any>, vcRef: ViewContainerRef, injector?: Injector): ComponentRef<ModalOverlay>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DOMOverlayRenderer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DOMOverlayRenderer>;
}
