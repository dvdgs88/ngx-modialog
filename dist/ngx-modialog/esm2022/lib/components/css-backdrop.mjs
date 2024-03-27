import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDynamicComponent } from './base-dynamic-component';
import * as i0 from "@angular/core";
/**
 * Represents the modal backdrop shaped by CSS.
 */
// tslint:disable-next-line:component-class-suffix
export class CSSBackdrop extends BaseDynamicComponent {
    constructor(el, renderer) {
        super(el, renderer);
        this.activateAnimationListener();
        const style = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        };
        Object.keys(style).forEach(k => this.setStyle(k, style[k]));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: CSSBackdrop, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: CSSBackdrop, selector: "css-backdrop", host: { properties: { "attr.class": "cssClass", "attr.style": "styleStr" } }, usesInheritance: true, ngImport: i0, template: ``, isInline: true, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: CSSBackdrop, decorators: [{
            type: Component,
            args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'css-backdrop',
                    host: {
                        '[attr.class]': 'cssClass',
                        '[attr.style]': 'styleStr'
                    },
                    encapsulation: ViewEncapsulation.None,
                    template: ``
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLWJhY2tkcm9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LW1vZGlhbG9nL3NyYy9saWIvY29tcG9uZW50cy9jc3MtYmFja2Ryb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxpQkFBaUIsRUFFbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBRWhFOztHQUVHO0FBV0gsa0RBQWtEO0FBQ2xELE1BQU0sT0FBTyxXQUFZLFNBQVEsb0JBQW9CO0lBSW5ELFlBQVksRUFBYyxFQUFFLFFBQW1CO1FBQzdDLEtBQUssQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFFakMsTUFBTSxLQUFLLEdBQUc7WUFDWixRQUFRLEVBQUUsVUFBVTtZQUNwQixHQUFHLEVBQUUsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDO1lBQ1AsS0FBSyxFQUFFLE1BQU07WUFDYixNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQzs4R0FoQlUsV0FBVztrR0FBWCxXQUFXLHlKQUhaLEVBQUU7OzJGQUdELFdBQVc7a0JBWHZCLFNBQVM7bUJBQUM7b0JBQ1QsOENBQThDO29CQUM5QyxRQUFRLEVBQUUsY0FBYztvQkFDeEIsSUFBSSxFQUFFO3dCQUNKLGNBQWMsRUFBRSxVQUFVO3dCQUMxQixjQUFjLEVBQUUsVUFBVTtxQkFDM0I7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxFQUFFO2lCQUNiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBCYXNlRHluYW1pY0NvbXBvbmVudCB9IGZyb20gJy4vYmFzZS1keW5hbWljLWNvbXBvbmVudCc7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgbW9kYWwgYmFja2Ryb3Agc2hhcGVkIGJ5IENTUy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdjc3MtYmFja2Ryb3AnLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLmNsYXNzXSc6ICdjc3NDbGFzcycsXG4gICAgJ1thdHRyLnN0eWxlXSc6ICdzdHlsZVN0cidcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBgXG59KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBDU1NCYWNrZHJvcCBleHRlbmRzIEJhc2VEeW5hbWljQ29tcG9uZW50IHtcbiAgcHVibGljIGNzc0NsYXNzOiBzdHJpbmc7XG4gIHB1YmxpYyBzdHlsZVN0cjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgc3VwZXIoZWwsIHJlbmRlcmVyKTtcbiAgICB0aGlzLmFjdGl2YXRlQW5pbWF0aW9uTGlzdGVuZXIoKTtcblxuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnXG4gICAgfTtcbiAgICBPYmplY3Qua2V5cyhzdHlsZSkuZm9yRWFjaChrID0+IHRoaXMuc2V0U3R5bGUoaywgc3R5bGVba10pKTtcbiAgfVxufVxuIl19