import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule, Modal as BaseModal } from 'ngx-modialog-7';

import { Modal } from './modal';
import { DialogFormModal, FormDropIn, VEXDialogButtons } from './dialog-form-modal';
import { VexCSSDialogContainer } from './vex-css-dialog-container';

export const providers: any[] = [
  { provide: BaseModal, useClass: Modal },
  { provide: Modal, useClass: Modal }
];

@NgModule({
    imports: [ModalModule, CommonModule],
    declarations: [
        VexCSSDialogContainer,
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
