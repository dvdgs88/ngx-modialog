import { ComponentRef } from '@angular/core';
import { Overlay } from '../overlay/index';
import { Class } from '../framework/utils';
import { OverlayConfig, ContainerContent } from '../models/tokens';
import { DialogRef } from '../models/dialog-ref';
import { OneButtonPresetBuilder } from '../plugins/bootstrap/presets/one-button-preset';
import { PromptPresetBuilder, TwoButtonPresetBuilder } from '../plugins/bootstrap/presets/two-button-preset';
import { DropInPresetBuilder } from '../../public_api';
import * as i0 from "@angular/core";
export declare class Modal {
    overlay: Overlay;
    constructor(overlay: Overlay);
    alert(): OneButtonPresetBuilder | DropInPresetBuilder;
    prompt(): PromptPresetBuilder | DropInPresetBuilder;
    confirm(): TwoButtonPresetBuilder | DropInPresetBuilder;
    /**
     * Opens a modal window inside an existing component.
     * @param content The content to display, either string, template ref or a component.
     * @param config Additional settings.
     */
    open(content: ContainerContent, config?: OverlayConfig): DialogRef<any>;
    protected create(dialogRef: DialogRef<any>, content: ContainerContent): DialogRef<any>;
    protected createBackdrop<T>(dialogRef: DialogRef<any>, BackdropComponent: Class<T>): ComponentRef<T>;
    protected createContainer<T>(dialogRef: DialogRef<any>, ContainerComponent: Class<T>, content: ContainerContent): ComponentRef<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<Modal, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Modal>;
}
