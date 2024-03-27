import { ElementRef, Renderer2 } from '@angular/core';
import { DialogRef } from '../../models/dialog-ref';
import { MessageModalPreset } from './presets/message-modal-preset';
import { BaseDynamicComponent } from '../../components/base-dynamic-component';
import * as i0 from "@angular/core";
export declare class BSModalContainer extends BaseDynamicComponent {
    dialog: DialogRef<MessageModalPreset>;
    constructor(dialog: DialogRef<MessageModalPreset>, el: ElementRef, renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<BSModalContainer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BSModalContainer, "bs-modal-container", never, {}, {}, never, ["*"], false, never>;
}
