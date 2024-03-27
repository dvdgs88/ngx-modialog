import { EventEmitter } from '@angular/core';
import { DialogRef, ModalComponent } from '../../../public_api';
import { DialogPreset } from './presets/dialog-preset';
import { DropInPreset } from './presets/dropin-preset';
import * as i0 from "@angular/core";
export interface VEXButtonHandler {
    (cmp: ModalComponent<DialogPreset>, $event: MouseEvent): void;
}
/**
 * Interface for button definition
 */
export interface VEXButtonConfig {
    cssClass: string;
    caption: string;
    onClick: VEXButtonHandler;
}
export interface VEXButtonClickEvent {
    btn: VEXButtonConfig;
    $event: MouseEvent;
}
/**
 * A Dialog is a
 */
export declare class VEXDialogButtons {
    /**
     * A collection of button configurations, each configuration is a button to display.
     */
    buttons: VEXButtonConfig[];
    /**
     * Emitted when a button was clicked
     */
    onButtonClick: EventEmitter<VEXButtonClickEvent>;
    onClick(btn: any, $event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<VEXDialogButtons, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VEXDialogButtons, "vex-dialog-buttons", never, { "buttons": { "alias": "buttons"; "required": false; }; }, { "onButtonClick": "onButtonClick"; }, never, never, false, never>;
}
/**
 * A Dialog with customized buttons wrapped in a form.
 *
 */
export declare class DialogFormModal implements ModalComponent<DialogPreset> {
    dialog: DialogRef<DialogPreset>;
    context: DialogPreset;
    constructor(dialog: DialogRef<DialogPreset>);
    onButtonClick($event: VEXButtonClickEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DialogFormModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DialogFormModal, "modal-dialog", never, {}, {}, never, never, false, never>;
}
export declare class FormDropIn implements ModalComponent<DropInPreset> {
    dialog: DialogRef<DropInPreset>;
    context: DropInPreset;
    constructor(dialog: DialogRef<DropInPreset>);
    static ɵfac: i0.ɵɵFactoryDeclaration<FormDropIn, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormDropIn, "drop-in-dialog", never, {}, {}, never, never, false, never>;
}
