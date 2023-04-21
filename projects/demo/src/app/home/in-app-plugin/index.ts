import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Modal as Modal_ } from 'ngx-modialog-7';
import { Modal as InAppModal } from './modal';
import { InAppModalBackdrop } from './modal-backdrop';

export { Modal } from './modal';
export { InAppModalContext, InAppModalContextBuilder } from './modal-context';


export function getProviders(): any[] {
  return [
    { provide: Modal_, useClass: InAppModal },
    InAppModal
  ];
}

@NgModule({
    imports: [CommonModule],
    declarations: [
        InAppModalBackdrop
    ],
    providers: getProviders()
})
export class InAppModalModule {

  static getProviders(): any[] {
    return getProviders();
  }
}
