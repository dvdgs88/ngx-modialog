import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDynamicComponent } from './base-dynamic-component';
import * as i0 from "@angular/core";
import * as i1 from "../models/dialog-ref";
/**
 * A component that acts as a top level container for an open modal window.
 */
// tslint:disable-next-line:component-class-suffix
export class CSSDialogContainer extends BaseDynamicComponent {
    constructor(dialog, el, renderer) {
        super(el, renderer);
        this.dialog = dialog;
        this.activateAnimationListener();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: CSSDialogContainer, deps: [{ token: i1.DialogRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: CSSDialogContainer, selector: "css-dialog-container", host: { attributes: { "tabindex": "-1", "role": "dialog" } }, usesInheritance: true, ngImport: i0, template: `
    <ng-content></ng-content>`, isInline: true, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: CSSDialogContainer, decorators: [{
            type: Component,
            args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'css-dialog-container',
                    host: {
                        'tabindex': '-1',
                        'role': 'dialog'
                    },
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-content></ng-content>`
                }]
        }], ctorParameters: () => [{ type: i1.DialogRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLWRpYWxvZy1jb250YWluZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtbW9kaWFsb2cvc3JjL2xpYi9jb21wb25lbnRzL2Nzcy1kaWFsb2ctY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsaUJBQWlCLEVBR2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7QUFHaEU7O0dBRUc7QUFZSCxrREFBa0Q7QUFDbEQsTUFBTSxPQUFPLGtCQUFtQixTQUFRLG9CQUFvQjtJQUUxRCxZQUFtQixNQUFzQixFQUFFLEVBQWMsRUFBRSxRQUFtQjtRQUM1RSxLQUFLLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBREgsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFFdkMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7SUFDbkMsQ0FBQzs4R0FMVSxrQkFBa0I7a0dBQWxCLGtCQUFrQixpSkFKbkI7OEJBQ2tCOzsyRkFHakIsa0JBQWtCO2tCQVo5QixTQUFTO21CQUFDO29CQUNULDhDQUE4QztvQkFDOUMsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsSUFBSSxFQUFFO3dCQUNKLFVBQVUsRUFBRSxJQUFJO3dCQUNoQixNQUFNLEVBQUUsUUFBUTtxQkFDakI7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRTs4QkFDa0I7aUJBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgRWxlbWVudFJlZixcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBCYXNlRHluYW1pY0NvbXBvbmVudCB9IGZyb20gJy4vYmFzZS1keW5hbWljLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBEaWFsb2dSZWYgfSBmcm9tICcuLi9tb2RlbHMvZGlhbG9nLXJlZic7XG5cbi8qKlxuICogQSBjb21wb25lbnQgdGhhdCBhY3RzIGFzIGEgdG9wIGxldmVsIGNvbnRhaW5lciBmb3IgYW4gb3BlbiBtb2RhbCB3aW5kb3cuXG4gKi9cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnY3NzLWRpYWxvZy1jb250YWluZXInLFxuICBob3N0OiB7XG4gICAgJ3RhYmluZGV4JzogJy0xJyxcbiAgICAncm9sZSc6ICdkaWFsb2cnXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmBcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIENTU0RpYWxvZ0NvbnRhaW5lciBleHRlbmRzIEJhc2VEeW5hbWljQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nOiBEaWFsb2dSZWY8YW55PiwgZWw6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihlbCwgcmVuZGVyZXIpO1xuICAgIHRoaXMuYWN0aXZhdGVBbmltYXRpb25MaXN0ZW5lcigpO1xuICB9XG5cbn1cbiJdfQ==