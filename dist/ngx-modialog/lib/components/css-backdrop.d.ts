import { ElementRef, Renderer2 } from '@angular/core';
import { BaseDynamicComponent } from './base-dynamic-component';
import * as i0 from "@angular/core";
/**
 * Represents the modal backdrop shaped by CSS.
 */
export declare class CSSBackdrop extends BaseDynamicComponent {
    cssClass: string;
    styleStr: string;
    constructor(el: ElementRef, renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<CSSBackdrop, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CSSBackdrop, "css-backdrop", never, {}, {}, never, never, false, never>;
}
