import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CSSDialogContainer } from '../../../public_api';
import * as i0 from "@angular/core";
/**
 * A component that acts as a top level container for an open modal window.
 */
export class VexCSSDialogContainer extends CSSDialogContainer {
    apply(overlay) {
        overlay.setClickBoundary(this.vexContentContainer.nativeElement);
        if (this.dialog.inElement) {
            this.setStyle('padding', '20px 0 0 0');
            if (this.dialog.context.className === 'bottom-right-corner') {
                this.setStyle('overflow-y', 'hidden');
                this.renderer.setStyle(this.vexContentContainer.nativeElement, 'position', 'absolute');
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: VexCSSDialogContainer, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: VexCSSDialogContainer, selector: "css-dialog-container", host: { attributes: { "tabindex": "-1", "role": "dialog" } }, viewQueries: [{ propertyName: "vexContentContainer", first: true, predicate: ["clickBoundary"], descendants: true, read: ElementRef, static: true }], usesInheritance: true, ngImport: i0, template: `<div #clickBoundary class="{{dialog.context.contentClassName}}"><ng-content></ng-content></div>`, isInline: true, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: VexCSSDialogContainer, decorators: [{
            type: Component,
            args: [{
                    selector: 'css-dialog-container',
                    host: {
                        'tabindex': '-1',
                        'role': 'dialog'
                    },
                    encapsulation: ViewEncapsulation.None,
                    template: `<div #clickBoundary class="{{dialog.context.contentClassName}}"><ng-content></ng-content></div>`
                }]
        }], propDecorators: { vexContentContainer: [{
                type: ViewChild,
                args: ['clickBoundary', { read: ElementRef, static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmV4LWNzcy1kaWFsb2ctY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LW1vZGlhbG9nL3NyYy9saWIvcGx1Z2lucy92ZXgvdmV4LWNzcy1kaWFsb2ctY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUUsa0JBQWtCLEVBQWdCLE1BQU0scUJBQXFCLENBQUM7O0FBR3ZFOztHQUVHO0FBVUgsTUFBTSxPQUFPLHFCQUFzQixTQUFRLGtCQUFrQjtJQU8zRCxLQUFLLENBQUMsT0FBcUI7UUFDekIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVqRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBR3ZDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLHFCQUFxQixFQUFFO2dCQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDeEY7U0FDRjtJQUVILENBQUM7OEdBcEJVLHFCQUFxQjtrR0FBckIscUJBQXFCLDJOQUlHLFVBQVUsa0VBTm5DLGlHQUFpRzs7MkZBRWhHLHFCQUFxQjtrQkFUakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxJQUFJLEVBQUU7d0JBQ0osVUFBVSxFQUFFLElBQUk7d0JBQ2hCLE1BQU0sRUFBRSxRQUFRO3FCQUNqQjtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLGlHQUFpRztpQkFDNUc7OEJBS3NFLG1CQUFtQjtzQkFBdkYsU0FBUzt1QkFBQyxlQUFlLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENTU0RpYWxvZ0NvbnRhaW5lciwgTW9kYWxPdmVybGF5IH0gZnJvbSAnLi4vLi4vLi4vcHVibGljX2FwaSc7XG5cblxuLyoqXG4gKiBBIGNvbXBvbmVudCB0aGF0IGFjdHMgYXMgYSB0b3AgbGV2ZWwgY29udGFpbmVyIGZvciBhbiBvcGVuIG1vZGFsIHdpbmRvdy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3NzLWRpYWxvZy1jb250YWluZXInLFxuICBob3N0OiB7XG4gICAgJ3RhYmluZGV4JzogJy0xJyxcbiAgICAncm9sZSc6ICdkaWFsb2cnXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgPGRpdiAjY2xpY2tCb3VuZGFyeSBjbGFzcz1cInt7ZGlhbG9nLmNvbnRleHQuY29udGVudENsYXNzTmFtZX19XCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgVmV4Q1NTRGlhbG9nQ29udGFpbmVyIGV4dGVuZHMgQ1NTRGlhbG9nQ29udGFpbmVyIHtcbiAgLyoqXG4gICAqIFRoZSBkaXYgdGhhdCB3cmFwcyB0aGUgY29udGVudCBvZiB0aGUgbW9kYWwsIGJ5IGRlZmF1bHQgdXNlIHRoZSBjbGFzcyBgdmV4LWNvbnRlbnRgXG4gICAqL1xuICBAVmlld0NoaWxkKCdjbGlja0JvdW5kYXJ5Jywge3JlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZX0pIHB1YmxpYyB2ZXhDb250ZW50Q29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG5cbiAgYXBwbHkob3ZlcmxheTogTW9kYWxPdmVybGF5KTogdm9pZCB7XG4gICAgb3ZlcmxheS5zZXRDbGlja0JvdW5kYXJ5KHRoaXMudmV4Q29udGVudENvbnRhaW5lci5uYXRpdmVFbGVtZW50KTtcblxuICAgIGlmICh0aGlzLmRpYWxvZy5pbkVsZW1lbnQpIHtcbiAgICAgIHRoaXMuc2V0U3R5bGUoJ3BhZGRpbmcnLCAnMjBweCAwIDAgMCcpO1xuXG5cbiAgICAgIGlmICh0aGlzLmRpYWxvZy5jb250ZXh0LmNsYXNzTmFtZSA9PT0gJ2JvdHRvbS1yaWdodC1jb3JuZXInKSB7XG4gICAgICAgIHRoaXMuc2V0U3R5bGUoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy52ZXhDb250ZW50Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICAgICAgfVxuICAgIH1cblxuICB9XG59XG4iXX0=