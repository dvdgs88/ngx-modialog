import { ModuleWithProviders } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./overlay/overlay.component";
import * as i2 from "./components/css-backdrop";
import * as i3 from "./components/css-dialog-container";
import * as i4 from "./overlay/overlay.directives";
import * as i5 from "./plugins/bootstrap/message-modal.component";
import * as i6 from "./plugins/bootstrap/modal-container.component";
import * as i7 from "@angular/common";
export declare class ModalModule {
    /**
     * Returns a ModalModule pre-loaded with a list of dynamically inserted components.
     * Since dynamic components are not analysed by the angular compiler they must register manually
     * using entryComponents, this is an easy way to do it.
     * @param entryComponents A list of dynamically inserted components (dialog's).
     */
    static withComponents(): ModuleWithProviders<ModalModule>;
    /**
     * Returns a NgModule for use in the root Module.
     * @param entryComponents A list of dynamically inserted components (dialog's).
     */
    static forRoot(): ModuleWithProviders<ModalModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ModalModule, [typeof i1.ModalOverlay, typeof i2.CSSBackdrop, typeof i3.CSSDialogContainer, typeof i4.OverlayDialogBoundary, typeof i4.OverlayTarget, typeof i5.BSModalFooter, typeof i5.BSMessageModalTitle, typeof i5.BSMessageModalBody, typeof i5.BSMessageModal, typeof i6.BSModalContainer], [typeof i7.CommonModule], [typeof i2.CSSBackdrop, typeof i3.CSSDialogContainer, typeof i4.OverlayDialogBoundary, typeof i4.OverlayTarget]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ModalModule>;
}
