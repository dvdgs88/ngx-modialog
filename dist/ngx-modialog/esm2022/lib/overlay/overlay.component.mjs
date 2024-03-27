import { Component, ElementRef, ViewChild, ViewContainerRef, ViewEncapsulation, TemplateRef, HostListener } from '@angular/core';
import { PromiseCompleter, supportsKey } from '../framework/utils';
import { BaseDynamicComponent } from '../components/index';
import * as i0 from "@angular/core";
import * as i1 from "../models/dialog-ref";
import * as i2 from "@angular/common";
// TODO: use DI factory for this.
// TODO: consolidate dup code
const isDoc = !(typeof document === 'undefined' || !document);
/**
 * Represents the modal overlay.
 */
// tslint:disable-next-line:component-class-suffix
export class ModalOverlay extends BaseDynamicComponent {
    constructor(dialogRef, vcr, el, renderer) {
        super(el, renderer);
        this.dialogRef = dialogRef;
        this.vcr = vcr;
        this.activateAnimationListener();
    }
    /**
     * @internal
     */
    getProjectables(content) {
        let nodes;
        if (typeof content === 'string') {
            nodes = [[this.renderer.createText(`${content}`)]];
        }
        else if (content instanceof TemplateRef) {
            nodes = [this.vcr.createEmbeddedView(content, { $implicit: this.dialogRef.context, dialogRef: this.dialogRef }).rootNodes];
        }
        else {
            nodes = [this.embedComponent({ component: content }).rootNodes];
        }
        return nodes;
    }
    embedComponent(config) {
        const ctx = config;
        return this.vcr.createEmbeddedView(this.template, {
            $implicit: ctx
        });
    }
    addComponent(type, projectableNodes = []) {
        return super._addComponent({
            component: type,
            vcRef: this.innerVcr,
            projectableNodes
        });
    }
    fullscreen() {
        const style = {
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            'z-index': 1500
        };
        Object.keys(style).forEach(k => this.setStyle(k, style[k]));
    }
    insideElement() {
        const style = {
            position: 'absolute',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        };
        Object.keys(style).forEach(k => this.setStyle(k, style[k]));
    }
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
    setContainerStyle(prop, value) {
        this.renderer.setStyle(this.container.nativeElement, prop, value);
        return this;
    }
    /**
     * Define an element that click inside it will not trigger modal close.
     * Since events bubble, clicking on a dialog will bubble up to the overlay, a plugin
     * must define an element that represent the dialog, the overlay will make sure no to close when
     * it was clicked.
     * @param element
     */
    setClickBoundary(element) {
        let target;
        const elListener = event => target = event.target;
        const docListener = event => {
            if (this.dialogRef.context.isBlocking || !this.dialogRef.overlay.isTopMost(this.dialogRef)) {
                return;
            }
            let current = event.target;
            // on click, this will hit.
            if (current === target) {
                return;
            }
            // on mouse down -> drag -> release the current might not be 'target', it might be
            // a sibling or a child (i.e: not part of the tree-up direction). It might also be a release
            // outside the dialog... so we compare to the boundary element
            do {
                if (current === element) {
                    return;
                }
            } while (current.parentNode && (current = current.parentNode));
            this.dialogRef.dismiss();
        };
        if (isDoc) {
            this.dialogRef.onDestroy.subscribe(() => {
                element.removeEventListener('click', elListener, false);
                element.removeEventListener('touchstart', elListener, false);
                document.removeEventListener('click', docListener, false);
                document.removeEventListener('touchend', docListener, false);
            });
            setTimeout(() => {
                element.addEventListener('mousedown', elListener, false);
                element.addEventListener('touchstart', docListener, false);
                document.addEventListener('click', docListener, false);
                document.addEventListener('touchend', docListener, false);
            });
        }
    }
    /**
     * Temp workaround for animation where destruction of the top level component does not
     * trigger child animations. Solution should be found either in animation module or in design
     * of the modal component tree.
     */
    canDestroy() {
        const completer = new PromiseCompleter();
        if (!Array.isArray(this.beforeDestroyHandlers)) {
            completer.resolve();
        }
        else {
            // run destroy notification but protect against halt.
            let id = setTimeout(() => {
                id = null;
                completer.reject();
            }, 1000);
            const resolve = () => {
                if (id === null) {
                    return;
                }
                clearTimeout(id);
                completer.resolve();
            };
            Promise.all(this.beforeDestroyHandlers.map(fn => fn()))
                .then(resolve)
                .catch(resolve);
        }
        return completer.promise;
    }
    /**
     * A handler running before destruction of the overlay
     * use to delay destruction due to animation.
     * This is part of the workaround for animation, see canDestroy.
     *
     * NOTE: There is no guarantee that the listeners will fire, use dialog.onDestory for that.
     * @param fn
     */
    beforeDestroy(fn) {
        if (!this.beforeDestroyHandlers) {
            this.beforeDestroyHandlers = [];
        }
        this.beforeDestroyHandlers.push(fn);
    }
    documentKeypress(event) {
        // check that this modal is the last in the stack.
        if (!this.dialogRef.overlay.isTopMost(this.dialogRef)) {
            return;
        }
        if (supportsKey(event.keyCode, this.dialogRef.context.keyboard)) {
            this.dialogRef.dismiss();
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.dialogRef.destroyed !== true) {
            // if we're here the overlay is destroyed by an external event that is not user invoked.
            // i.e: The user did no call dismiss or close and dialogRef.destroy() did not invoke.
            // this will happen when routing or killing an element containing a blocked overlay (ngIf)
            // we bail out, i.e gracefully shutting down.
            this.dialogRef.bailOut();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: ModalOverlay, deps: [{ token: i1.DialogRef }, { token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: ModalOverlay, selector: "modal-overlay", host: { listeners: { "body:keydown": "documentKeypress($event)" } }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ElementRef, static: true }, { propertyName: "innerVcr", first: true, predicate: ["innerView"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "template", first: true, predicate: ["template"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div #container>\n  <ng-template #innerView></ng-template>\n</div>\n<ng-template #template let-ctx>\n  <ng-container *ngComponentOutlet=\"ctx.component; injector: ctx.injector; content: ctx.projectableNodes\"></ng-container>\n</ng-template>", dependencies: [{ kind: "directive", type: i2.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: ModalOverlay, decorators: [{
            type: Component,
            args: [{ selector: 'modal-overlay', encapsulation: ViewEncapsulation.None, template: "<div #container>\n  <ng-template #innerView></ng-template>\n</div>\n<ng-template #template let-ctx>\n  <ng-container *ngComponentOutlet=\"ctx.component; injector: ctx.injector; content: ctx.projectableNodes\"></ng-container>\n</ng-template>" }]
        }], ctorParameters: () => [{ type: i1.DialogRef }, { type: i0.ViewContainerRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { container: [{
                type: ViewChild,
                args: ['container', { read: ElementRef, static: true }]
            }], innerVcr: [{
                type: ViewChild,
                args: ['innerView', { read: ViewContainerRef, static: true }]
            }], template: [{
                type: ViewChild,
                args: ['template', { static: true }]
            }], documentKeypress: [{
                type: HostListener,
                args: ['body:keydown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtbW9kaWFsb2cvc3JjL2xpYi9vdmVybGF5L292ZXJsYXkuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LW1vZGlhbG9nL3NyYy9saWIvb3ZlcmxheS9vdmVybGF5LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFDTCxTQUFTLEVBRVQsVUFBVSxFQUdWLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBRWpCLFdBQVcsRUFBRSxZQUFZLEVBQzFCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUduRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQUUzRCxpQ0FBaUM7QUFDakMsNkJBQTZCO0FBQzdCLE1BQU0sS0FBSyxHQUFZLENBQUMsQ0FBQyxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQU92RTs7R0FFRztBQU9ILGtEQUFrRDtBQUNsRCxNQUFNLE9BQU8sWUFBYSxTQUFRLG9CQUFvQjtJQU9wRCxZQUFvQixTQUF5QixFQUN6QixHQUFxQixFQUM3QixFQUFjLEVBQ2QsUUFBbUI7UUFDN0IsS0FBSyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUpGLGNBQVMsR0FBVCxTQUFTLENBQWdCO1FBQ3pCLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBSXZDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWUsQ0FBSSxPQUF5QjtRQUUxQyxJQUFJLEtBQVksQ0FBQztRQUNqQixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUMv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Z0JBQ2YsUUFBUTtzQkFBdkQsU0FBUzt1QkFBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQW9NdkMsZ0JBQWdCO3NCQURmLFlBQVk7dUJBQUMsY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZGVjbGFyZSBjb25zdCBjbGVhclRpbWVvdXQ6IGFueTtcblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSW5qZWN0b3IsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsIEhvc3RMaXN0ZW5lclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUHJvbWlzZUNvbXBsZXRlciwgc3VwcG9ydHNLZXkgfSBmcm9tICcuLi9mcmFtZXdvcmsvdXRpbHMnO1xuaW1wb3J0IHsgRGlhbG9nUmVmIH0gZnJvbSAnLi4vbW9kZWxzL2RpYWxvZy1yZWYnO1xuaW1wb3J0IHsgQ29udGFpbmVyQ29udGVudCB9IGZyb20gJy4uL21vZGVscy90b2tlbnMnO1xuaW1wb3J0IHsgQmFzZUR5bmFtaWNDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL2luZGV4JztcblxuLy8gVE9ETzogdXNlIERJIGZhY3RvcnkgZm9yIHRoaXMuXG4vLyBUT0RPOiBjb25zb2xpZGF0ZSBkdXAgY29kZVxuY29uc3QgaXNEb2M6IGJvb2xlYW4gPSAhKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWRvY3VtZW50KTtcblxuZXhwb3J0IGludGVyZmFjZSBFbWJlZENvbXBvbmVudENvbmZpZyB7XG4gIGNvbXBvbmVudDogYW55O1xuICBwcm9qZWN0YWJsZU5vZGVzPzogYW55W11bXTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBtb2RhbCBvdmVybGF5LlxuICovXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ21vZGFsLW92ZXJsYXknLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZVVybDogJy4vb3ZlcmxheS5jb21wb25lbnQuaHRtbCdcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE1vZGFsT3ZlcmxheSBleHRlbmRzIEJhc2VEeW5hbWljQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSBiZWZvcmVEZXN0cm95SGFuZGxlcnM6IEFycmF5PCgpID0+IFByb21pc2U8dm9pZD4+O1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHtyZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWV9KSBwdWJsaWMgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdpbm5lclZpZXcnLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIHB1YmxpYyBpbm5lclZjcjogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgndGVtcGxhdGUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWFsb2dSZWY6IERpYWxvZ1JlZjxhbnk+LFxuICAgICAgICAgICAgICBwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihlbCwgcmVuZGVyZXIpO1xuICAgIHRoaXMuYWN0aXZhdGVBbmltYXRpb25MaXN0ZW5lcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZ2V0UHJvamVjdGFibGVzPFQ+KGNvbnRlbnQ6IENvbnRhaW5lckNvbnRlbnQpOiBhbnlbXVtdIHtcblxuICAgIGxldCBub2RlczogYW55W107XG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgbm9kZXMgPSBbW3RoaXMucmVuZGVyZXIuY3JlYXRlVGV4dChgJHtjb250ZW50fWApXV07XG4gICAgfSBlbHNlIGlmIChjb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIG5vZGVzID0gW3RoaXMudmNyLmNyZWF0ZUVtYmVkZGVkVmlldyhjb250ZW50LCB7JGltcGxpY2l0OiB0aGlzLmRpYWxvZ1JlZi5jb250ZXh0LCBkaWFsb2dSZWY6IHRoaXMuZGlhbG9nUmVmfSkucm9vdE5vZGVzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZXMgPSBbdGhpcy5lbWJlZENvbXBvbmVudCh7Y29tcG9uZW50OiBjb250ZW50fSkucm9vdE5vZGVzXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZXM7XG4gIH1cblxuICBlbWJlZENvbXBvbmVudChjb25maWc6IEVtYmVkQ29tcG9uZW50Q29uZmlnKTogRW1iZWRkZWRWaWV3UmVmPEVtYmVkQ29tcG9uZW50Q29uZmlnPiB7XG4gICAgY29uc3QgY3R4OiBFbWJlZENvbXBvbmVudENvbmZpZyAmIHsgaW5qZWN0b3I6IEluamVjdG9yIH0gPSA8YW55PmNvbmZpZztcblxuICAgIHJldHVybiB0aGlzLnZjci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZSwgPGFueT57XG4gICAgICAkaW1wbGljaXQ6IGN0eFxuICAgIH0pO1xuICB9XG5cbiAgYWRkQ29tcG9uZW50PFQ+KHR5cGU6IGFueSwgcHJvamVjdGFibGVOb2RlczogYW55W11bXSA9IFtdKTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICByZXR1cm4gc3VwZXIuX2FkZENvbXBvbmVudDxUPih7XG4gICAgICBjb21wb25lbnQ6IHR5cGUsXG4gICAgICB2Y1JlZjogdGhpcy5pbm5lclZjcixcbiAgICAgIHByb2plY3RhYmxlTm9kZXNcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bGxzY3JlZW4oKTogdm9pZCB7XG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICBib3R0b206IDAsXG4gICAgICByaWdodDogMCxcbiAgICAgICd6LWluZGV4JzogMTUwMFxuICAgIH07XG4gICAgT2JqZWN0LmtleXMoc3R5bGUpLmZvckVhY2goayA9PiB0aGlzLnNldFN0eWxlKGssIHN0eWxlW2tdKSk7XG4gIH1cblxuICBpbnNpZGVFbGVtZW50KCk6IHZvaWQge1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgYm90dG9tOiAwLFxuICAgICAgcmlnaHQ6IDBcbiAgICB9O1xuICAgIE9iamVjdC5rZXlzKHN0eWxlKS5mb3JFYWNoKGsgPT4gdGhpcy5zZXRTdHlsZShrLCBzdHlsZVtrXSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIHNwZWNpZmljIGlubGluZSBzdHlsZSBmb3IgdGhlIGNvbnRhaW5lciBvZiB0aGUgd2hvbGUgZGlhbG9nIGNvbXBvbmVudFxuICAgKiBUaGUgZGlhbG9nIGNvbXBvbmVudCByb290IGVsZW1lbnQgaXMgdGhlIGhvc3Qgb2YgdGhpcyBjb21wb25lbnQsIGl0IGNvbnRhaW5zIG9ubHkgMSBkaXJlY3RcbiAgICogY2hpbGQgd2hpY2ggaXMgdGhlIGNvbnRhaW5lci5cbiAgICpcbiAgICogU3RydWN0dXJlOlxuICAgKlxuICAgKiBgYGBodG1sXG4gICAqIDxtb2RhbC1vdmVybGF5PlxuICAgKiAgIDxkaXY+XG4gICAqICAgICA8IS0tIEJBQ0tEUk9QIEVMRU1FTlQgLS0+XG4gICAqICAgICA8IS0tIERJQUxPRyBDT05UQUlORVIgRUxFTUVOVCAtLT5cbiAgICogICA8L2Rpdj5cbiAgICogPC9tb2RhbC1vdmVybGF5PlxuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHByb3AgVGhlIHN0eWxlIGtleVxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlLCB1bmRlZmluZWQgdG8gcmVtb3ZlXG4gICAqL1xuICBzZXRDb250YWluZXJTdHlsZShwcm9wOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsIHByb3AsIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmUgYW4gZWxlbWVudCB0aGF0IGNsaWNrIGluc2lkZSBpdCB3aWxsIG5vdCB0cmlnZ2VyIG1vZGFsIGNsb3NlLlxuICAgKiBTaW5jZSBldmVudHMgYnViYmxlLCBjbGlja2luZyBvbiBhIGRpYWxvZyB3aWxsIGJ1YmJsZSB1cCB0byB0aGUgb3ZlcmxheSwgYSBwbHVnaW5cbiAgICogbXVzdCBkZWZpbmUgYW4gZWxlbWVudCB0aGF0IHJlcHJlc2VudCB0aGUgZGlhbG9nLCB0aGUgb3ZlcmxheSB3aWxsIG1ha2Ugc3VyZSBubyB0byBjbG9zZSB3aGVuXG4gICAqIGl0IHdhcyBjbGlja2VkLlxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKi9cbiAgc2V0Q2xpY2tCb3VuZGFyeShlbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG4gICAgbGV0IHRhcmdldDogRWxlbWVudDtcbiAgICBjb25zdCBlbExpc3RlbmVyID0gZXZlbnQgPT4gdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIGFueTtcbiAgICBjb25zdCBkb2NMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmRpYWxvZ1JlZi5jb250ZXh0LmlzQmxvY2tpbmcgfHwgIXRoaXMuZGlhbG9nUmVmLm92ZXJsYXkuaXNUb3BNb3N0KHRoaXMuZGlhbG9nUmVmKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBjdXJyZW50OiBhbnkgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgIC8vIG9uIGNsaWNrLCB0aGlzIHdpbGwgaGl0LlxuICAgICAgaWYgKGN1cnJlbnQgPT09IHRhcmdldCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIG9uIG1vdXNlIGRvd24gLT4gZHJhZyAtPiByZWxlYXNlIHRoZSBjdXJyZW50IG1pZ2h0IG5vdCBiZSAndGFyZ2V0JywgaXQgbWlnaHQgYmVcbiAgICAgIC8vIGEgc2libGluZyBvciBhIGNoaWxkIChpLmU6IG5vdCBwYXJ0IG9mIHRoZSB0cmVlLXVwIGRpcmVjdGlvbikuIEl0IG1pZ2h0IGFsc28gYmUgYSByZWxlYXNlXG4gICAgICAvLyBvdXRzaWRlIHRoZSBkaWFsb2cuLi4gc28gd2UgY29tcGFyZSB0byB0aGUgYm91bmRhcnkgZWxlbWVudFxuICAgICAgZG8ge1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gZWxlbWVudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSB3aGlsZSAoY3VycmVudC5wYXJlbnROb2RlICYmIChjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlKSk7XG4gICAgICB0aGlzLmRpYWxvZ1JlZi5kaXNtaXNzKCk7XG4gICAgfTtcblxuICAgIGlmIChpc0RvYykge1xuICAgICAgdGhpcy5kaWFsb2dSZWYub25EZXN0cm95LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlbExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGVsTGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkb2NMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGRvY0xpc3RlbmVyLCBmYWxzZSk7XG4gICAgICB9KTtcblxuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlbExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGRvY0xpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZG9jTGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBkb2NMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRlbXAgd29ya2Fyb3VuZCBmb3IgYW5pbWF0aW9uIHdoZXJlIGRlc3RydWN0aW9uIG9mIHRoZSB0b3AgbGV2ZWwgY29tcG9uZW50IGRvZXMgbm90XG4gICAqIHRyaWdnZXIgY2hpbGQgYW5pbWF0aW9ucy4gU29sdXRpb24gc2hvdWxkIGJlIGZvdW5kIGVpdGhlciBpbiBhbmltYXRpb24gbW9kdWxlIG9yIGluIGRlc2lnblxuICAgKiBvZiB0aGUgbW9kYWwgY29tcG9uZW50IHRyZWUuXG4gICAqL1xuICBjYW5EZXN0cm95KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGNvbXBsZXRlciA9IG5ldyBQcm9taXNlQ29tcGxldGVyPHZvaWQ+KCk7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5iZWZvcmVEZXN0cm95SGFuZGxlcnMpKSB7XG4gICAgICBjb21wbGV0ZXIucmVzb2x2ZSgpO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIHJ1biBkZXN0cm95IG5vdGlmaWNhdGlvbiBidXQgcHJvdGVjdCBhZ2FpbnN0IGhhbHQuXG4gICAgICBsZXQgaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWQgPSBudWxsO1xuICAgICAgICBjb21wbGV0ZXIucmVqZWN0KCk7XG4gICAgICB9LCAxMDAwKTtcblxuICAgICAgY29uc3QgcmVzb2x2ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGlkID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgICAgY29tcGxldGVyLnJlc29sdmUoKTtcbiAgICAgIH07XG5cbiAgICAgIFByb21pc2UuYWxsKHRoaXMuYmVmb3JlRGVzdHJveUhhbmRsZXJzLm1hcChmbiA9PiBmbigpKSlcbiAgICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgICAgLmNhdGNoKHJlc29sdmUpO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBsZXRlci5wcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgaGFuZGxlciBydW5uaW5nIGJlZm9yZSBkZXN0cnVjdGlvbiBvZiB0aGUgb3ZlcmxheVxuICAgKiB1c2UgdG8gZGVsYXkgZGVzdHJ1Y3Rpb24gZHVlIHRvIGFuaW1hdGlvbi5cbiAgICogVGhpcyBpcyBwYXJ0IG9mIHRoZSB3b3JrYXJvdW5kIGZvciBhbmltYXRpb24sIHNlZSBjYW5EZXN0cm95LlxuICAgKlxuICAgKiBOT1RFOiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCB0aGUgbGlzdGVuZXJzIHdpbGwgZmlyZSwgdXNlIGRpYWxvZy5vbkRlc3RvcnkgZm9yIHRoYXQuXG4gICAqIEBwYXJhbSBmblxuICAgKi9cbiAgYmVmb3JlRGVzdHJveShmbjogKCkgPT4gUHJvbWlzZTx2b2lkPikge1xuICAgIGlmICghdGhpcy5iZWZvcmVEZXN0cm95SGFuZGxlcnMpIHtcbiAgICAgIHRoaXMuYmVmb3JlRGVzdHJveUhhbmRsZXJzID0gW107XG4gICAgfVxuICAgIHRoaXMuYmVmb3JlRGVzdHJveUhhbmRsZXJzLnB1c2goZm4pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYm9keTprZXlkb3duJywgWyckZXZlbnQnXSlcbiAgZG9jdW1lbnRLZXlwcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIGNoZWNrIHRoYXQgdGhpcyBtb2RhbCBpcyB0aGUgbGFzdCBpbiB0aGUgc3RhY2suXG4gICAgaWYgKCF0aGlzLmRpYWxvZ1JlZi5vdmVybGF5LmlzVG9wTW9zdCh0aGlzLmRpYWxvZ1JlZikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIGlmIChzdXBwb3J0c0tleShldmVudC5rZXlDb2RlLCA8YW55PnRoaXMuZGlhbG9nUmVmLmNvbnRleHQua2V5Ym9hcmQpKSB7XG4gICAgICB0aGlzLmRpYWxvZ1JlZi5kaXNtaXNzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICBpZiAodGhpcy5kaWFsb2dSZWYuZGVzdHJveWVkICE9PSB0cnVlKSB7XG4gICAgICAvLyBpZiB3ZSdyZSBoZXJlIHRoZSBvdmVybGF5IGlzIGRlc3Ryb3llZCBieSBhbiBleHRlcm5hbCBldmVudCB0aGF0IGlzIG5vdCB1c2VyIGludm9rZWQuXG4gICAgICAvLyBpLmU6IFRoZSB1c2VyIGRpZCBubyBjYWxsIGRpc21pc3Mgb3IgY2xvc2UgYW5kIGRpYWxvZ1JlZi5kZXN0cm95KCkgZGlkIG5vdCBpbnZva2UuXG4gICAgICAvLyB0aGlzIHdpbGwgaGFwcGVuIHdoZW4gcm91dGluZyBvciBraWxsaW5nIGFuIGVsZW1lbnQgY29udGFpbmluZyBhIGJsb2NrZWQgb3ZlcmxheSAobmdJZilcbiAgICAgIC8vIHdlIGJhaWwgb3V0LCBpLmUgZ3JhY2VmdWxseSBzaHV0dGluZyBkb3duLlxuICAgICAgdGhpcy5kaWFsb2dSZWYuYmFpbE91dCgpO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiAjY29udGFpbmVyPlxuICA8bmctdGVtcGxhdGUgI2lubmVyVmlldz48L25nLXRlbXBsYXRlPlxuPC9kaXY+XG48bmctdGVtcGxhdGUgI3RlbXBsYXRlIGxldC1jdHg+XG4gIDxuZy1jb250YWluZXIgKm5nQ29tcG9uZW50T3V0bGV0PVwiY3R4LmNvbXBvbmVudDsgaW5qZWN0b3I6IGN0eC5pbmplY3RvcjsgY29udGVudDogY3R4LnByb2plY3RhYmxlTm9kZXNcIj48L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+Il19