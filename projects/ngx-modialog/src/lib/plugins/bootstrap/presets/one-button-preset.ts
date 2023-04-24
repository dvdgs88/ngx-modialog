import { BSMessageModal } from '../message-modal.component';
import { MessageModalPresetBuilder, MessageModalPreset } from './message-modal-preset';
import { FluentAssignMethod } from '../../../framework/fluent-assign';
import { extend } from '../../../framework/utils';
import { Modal } from '../../../providers';

export interface OneButtonPreset extends MessageModalPreset {
  /**
   * Caption for the OK button.
   * Default: OK
   */
  okBtn: string;

  /**
   * A Class for the OK button.
   * Default: btn btn-primary
   */
  okBtnClass: string;
}

/**
 * A Preset for a classic 1 button modal window.
 */
export class OneButtonPresetBuilder extends MessageModalPresetBuilder<OneButtonPreset> {
  okBtn: FluentAssignMethod<string, this>;
  okBtnClass: FluentAssignMethod<string, this>;

  constructor(modal: Modal, defaultValues?: OneButtonPreset) {
    super(extend<any>({
      modal: modal,
      okBtn: 'OK',
      okBtnClass: 'btn btn-primary'
    }, defaultValues || {}), [
      'okBtn',
      'okBtnClass'
    ]);
  }

  $$beforeOpen(config: OneButtonPreset): void {
    super.$$beforeOpen(config);

    this.addButton(
      config.okBtnClass,
      config.okBtn,
      (cmp: BSMessageModal, $event: MouseEvent) => cmp.dialog.close(true)
    );
  }
}

