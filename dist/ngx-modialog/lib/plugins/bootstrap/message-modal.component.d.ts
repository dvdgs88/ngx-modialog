import { MessageModalPreset } from './presets/message-modal-preset';
import { ModalComponent } from '../../models/tokens';
import { DialogRef } from '../../models/dialog-ref';
import * as i0 from "@angular/core";
export interface BSMessageModalButtonHandler {
    (cmp: ModalComponent<MessageModalPreset>, $event: MouseEvent): void;
}
/**
 * Interface for button definition
 */
export interface BSMessageModalButtonConfig {
    cssClass: string;
    caption: string;
    onClick: BSMessageModalButtonHandler;
}
export declare class BSMessageModalTitle {
    dialog: DialogRef<MessageModalPreset>;
    context: MessageModalPreset;
    constructor(dialog: DialogRef<MessageModalPreset>);
    get titleHtml(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<BSMessageModalTitle, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BSMessageModalTitle, "modal-title", never, {}, {}, never, never, false, never>;
}
export declare class BSMessageModalBody {
    dialog: DialogRef<MessageModalPreset>;
    context: MessageModalPreset & {
        showInput: boolean;
        /** Default value shown in the prompt. */
        defaultValue: string;
        /** A placeholder for the input element. */
        placeholder: string;
    };
    constructor(dialog: DialogRef<MessageModalPreset>);
    static ɵfac: i0.ɵɵFactoryDeclaration<BSMessageModalBody, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BSMessageModalBody, "modal-body", never, {}, {}, never, never, false, never>;
}
/**
 * Represents the modal footer for storing buttons.
 */
export declare class BSModalFooter {
    dialog: DialogRef<MessageModalPreset>;
    constructor(dialog: DialogRef<MessageModalPreset>);
    onClick(btn: BSMessageModalButtonConfig, $event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BSModalFooter, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BSModalFooter, "modal-footer", never, {}, {}, never, never, false, never>;
}
/**
 * A Component representing a generic bootstrap modal content element.
 *
 * By configuring a MessageModalContext instance you can:
 *
 *  Header:
 *      - Set header container class (default: modal-header)
 *      - Set title text (enclosed in H3 element)
 *      - Set title html (overrides text)
 *
 *  Body:
 *      - Set body container class.  (default: modal-body)
 *      - Set body container HTML.
 *
 *  Footer:
 *      - Set footer class.  (default: modal-footer)
 *      - Set button configuration (from 0 to n)
 */
export declare class BSMessageModal implements ModalComponent<MessageModalPreset> {
    dialog: DialogRef<MessageModalPreset>;
    constructor(dialog: DialogRef<MessageModalPreset>);
    static ɵfac: i0.ɵɵFactoryDeclaration<BSMessageModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BSMessageModal, "modal-content", never, {}, {}, never, never, false, never>;
}
