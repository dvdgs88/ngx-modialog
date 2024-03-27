import { ContainerContent, Overlay, DialogRef, Modal as Modal_ } from '../../../public_api';
import { DropInPresetBuilder } from './presets/dropin-preset';
import * as i0 from "@angular/core";
/**
 * Execute this method to flag that you are working with VEX version 3.
 */
export declare function vexV3Mode(): void;
export declare class Modal extends Modal_ {
    constructor(overlay: Overlay);
    alert(): DropInPresetBuilder;
    prompt(): DropInPresetBuilder;
    confirm(): DropInPresetBuilder;
    protected create(dialogRef: DialogRef<any>, content: ContainerContent): DialogRef<any>;
    private createV3;
    static ɵfac: i0.ɵɵFactoryDeclaration<Modal, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Modal>;
}
