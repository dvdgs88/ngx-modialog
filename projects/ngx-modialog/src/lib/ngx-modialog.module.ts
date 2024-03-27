import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { DOMOutsideEventPlugin, DOMOverlayRenderer, Modal } from './providers/index';
import { OverlayRenderer } from './models/tokens';
import { CSSBackdrop, CSSDialogContainer } from './components/index';
import {
  Overlay,
  ModalOverlay,
  OverlayDialogBoundary,
  OverlayTarget
} from './overlay/index';
import { BSModalContainer } from './plugins/bootstrap/modal-container.component';
import {
  BSMessageModal,
  BSMessageModalTitle,
  BSMessageModalBody,
  BSModalFooter
} from './plugins/bootstrap/message-modal.component';

@NgModule({
    declarations: [
        ModalOverlay,
        CSSBackdrop,
        CSSDialogContainer,
        OverlayDialogBoundary,
        OverlayTarget,
        BSModalFooter,
        BSMessageModalTitle,
        BSMessageModalBody,
        BSMessageModal,
        BSModalContainer
    ],
    imports: [CommonModule],
    exports: [
        CSSBackdrop,
        CSSDialogContainer,
        OverlayDialogBoundary,
        OverlayTarget
    ],
    providers: [
        Overlay,
        { provide: Modal, useClass: Modal }
    ]
})
export class ModalModule {

  /**
   * Returns a ModalModule pre-loaded with a list of dynamically inserted components.
   * Since dynamic components are not analysed by the angular compiler they must register manually
   * using entryComponents, this is an easy way to do it.
   * @param entryComponents A list of dynamically inserted components (dialog's).
   */
  static withComponents(): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [
        { provide: Modal, useClass: Modal }
      ]
    };
  }

  /**
   * Returns a NgModule for use in the root Module.
   * @param entryComponents A list of dynamically inserted components (dialog's).
   */
  static forRoot(): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [
        {provide: OverlayRenderer, useClass: DOMOverlayRenderer},
        {provide: EVENT_MANAGER_PLUGINS, useClass: DOMOutsideEventPlugin, multi: true},
        { provide: Modal, useClass: Modal }
      ]
    };
  }
}