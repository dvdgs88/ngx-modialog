import { Injector } from '@angular/core';
import { OverlayRenderer, OverlayConfig } from '../models/tokens';
import { DialogRef } from '../models/dialog-ref';
import { OverlayContext } from '../models/overlay-context';
import * as i0 from "@angular/core";
export declare class Overlay {
    private _modalRenderer;
    protected injector: Injector;
    get stackLength(): number;
    constructor(_modalRenderer: OverlayRenderer, injector: Injector);
    /**
     * Check if a given DialogRef is the top most ref in the stack.
     * TODO: distinguish between body modal vs in element modal.
     * @param dialogRef
     */
    isTopMost(dialogRef: DialogRef<any>): boolean;
    stackPosition(dialogRef: DialogRef<any>): number;
    groupStackLength(dialogRef: DialogRef<any>): number;
    closeAll(result?: any): void;
    /**
     * Creates an overlay and returns a dialog ref.
     * @param config instructions how to create the overlay
     * @param group A token to associate the new overlay with, used for reference (stacks usually)
     */
    open<T extends OverlayContext>(config: OverlayConfig, group?: any): DialogRef<T>[];
    private createOverlay;
    static ɵfac: i0.ɵɵFactoryDeclaration<Overlay, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Overlay>;
}
