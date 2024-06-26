import { ComponentRef, ElementRef, EmbeddedViewRef, ViewContainerRef, Renderer2, TemplateRef } from '@angular/core';
import { DialogRef } from '../models/dialog-ref';
import { ContainerContent } from '../models/tokens';
import { BaseDynamicComponent } from '../components/index';
import * as i0 from "@angular/core";
export interface EmbedComponentConfig {
    component: any;
    projectableNodes?: any[][];
}
/**
 * Represents the modal overlay.
 */
export declare class ModalOverlay extends BaseDynamicComponent {
    private dialogRef;
    private vcr;
    private beforeDestroyHandlers;
    container: ElementRef;
    innerVcr: ViewContainerRef;
    template: TemplateRef<any>;
    constructor(dialogRef: DialogRef<any>, vcr: ViewContainerRef, el: ElementRef, renderer: Renderer2);
    /**
     * @internal
     */
    getProjectables<T>(content: ContainerContent): any[][];
    embedComponent(config: EmbedComponentConfig): EmbeddedViewRef<EmbedComponentConfig>;
    addComponent<T>(type: any, projectableNodes?: any[][]): ComponentRef<T>;
    fullscreen(): void;
    insideElement(): void;
    /**
     * Set a specific inline style for the container of the whole dialog component
     * The dialog component root element is the host of this component, it contains only 1 direct
     * child which is the container.
     *
     * Structure:
     *
     * ```html
     * <modal-overlay>
     *   <div>
     *     <!-- BACKDROP ELEMENT -->
     *     <!-- DIALOG CONTAINER ELEMENT -->
     *   </div>
     * </modal-overlay>
     * ```
     *
     * @param prop The style key
     * @param value The value, undefined to remove
     */
    setContainerStyle(prop: string, value: string): this;
    /**
     * Define an element that click inside it will not trigger modal close.
     * Since events bubble, clicking on a dialog will bubble up to the overlay, a plugin
     * must define an element that represent the dialog, the overlay will make sure no to close when
     * it was clicked.
     * @param element
     */
    setClickBoundary(element: Element): void;
    /**
     * Temp workaround for animation where destruction of the top level component does not
     * trigger child animations. Solution should be found either in animation module or in design
     * of the modal component tree.
     */
    canDestroy(): Promise<void>;
    /**
     * A handler running before destruction of the overlay
     * use to delay destruction due to animation.
     * This is part of the workaround for animation, see canDestroy.
     *
     * NOTE: There is no guarantee that the listeners will fire, use dialog.onDestory for that.
     * @param fn
     */
    beforeDestroy(fn: () => Promise<void>): void;
    documentKeypress(event: KeyboardEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalOverlay, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalOverlay, "modal-overlay", never, {}, {}, never, never, false, never>;
}
