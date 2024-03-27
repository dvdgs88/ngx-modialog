import { ElementRef } from '@angular/core';
import { CSSDialogContainer, ModalOverlay } from '../../../public_api';
import * as i0 from "@angular/core";
/**
 * A component that acts as a top level container for an open modal window.
 */
export declare class VexCSSDialogContainer extends CSSDialogContainer {
    /**
     * The div that wraps the content of the modal, by default use the class `vex-content`
     */
    vexContentContainer: ElementRef;
    apply(overlay: ModalOverlay): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<VexCSSDialogContainer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VexCSSDialogContainer, "css-dialog-container", never, {}, {}, never, ["*"], false, never>;
}
