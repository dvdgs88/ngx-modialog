import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Modal as VexModal } from './plugins/vex/modal';
import { ModalModule } from './ngx-modialog.module';
import { Modal } from './providers/index';
import { DialogFormModal, FormDropIn, VEXDialogButtons } from './plugins/vex/dialog-form-modal';
import { VexCSSDialogContainer } from './plugins/vex/vex-css-dialog-container';

export const providers: any[] = [
  { provide: Modal, useClass: VexModal },
  { provide: VexModal, useClass: VexModal }
];

@NgModule({
    imports: [ModalModule, CommonModule],
    declarations: [
        VexCSSDialogContainer,
        VEXDialogButtons,
        FormDropIn,
        DialogFormModal
    ],
    exports: [
      VEXDialogButtons,
      FormDropIn,
      DialogFormModal
    ],
    providers
})
export class VexModalModule {

  static getProviders(): any[] {
    return providers;
  }

}