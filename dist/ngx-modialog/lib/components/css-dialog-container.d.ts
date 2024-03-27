import { ElementRef, Renderer2 } from '@angular/core';
import { BaseDynamicComponent } from './base-dynamic-component';
import { DialogRef } from '../models/dialog-ref';
import * as i0 from "@angular/core";
/**
 * A component that acts as a top level container for an open modal window.
 */
export declare class CSSDialogContainer extends BaseDynamicComponent {
    dialog: DialogRef<any>;
    constructor(dialog: DialogRef<any>, el: ElementRef, renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<CSSDialogContainer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CSSDialogContainer, "css-dialog-container", never, {}, {}, never, ["*"], false, never>;
}
