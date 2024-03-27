import { ElementRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { DialogRef } from '../models/dialog-ref';
import * as i0 from "@angular/core";
/**
 * A directive use to signal the overlay that the host of this directive
 * is a dialog boundary, i.e: over click outside of the element should close the modal
 * (if non blocking)
 */
export declare class OverlayDialogBoundary {
    constructor(el: ElementRef, dialogRef: DialogRef<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<OverlayDialogBoundary, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<OverlayDialogBoundary, "[overlayDialogBoundary]", never, {}, {}, never, never, false, never>;
}
export declare class OverlayTarget implements OnDestroy {
    private vcRef;
    set targetKey(value: string);
    private _targetKey;
    constructor(vcRef: ViewContainerRef);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OverlayTarget, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<OverlayTarget, "[overlayTarget]", never, { "targetKey": { "alias": "overlayTarget"; "required": false; }; }, {}, never, never, false, never>;
}
