import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDynamicComponent } from '../../components/base-dynamic-component';
import * as i0 from "@angular/core";
import * as i1 from "../../models/dialog-ref";
import * as i2 from "@angular/common";
import * as i3 from "../../overlay/overlay.directives";
// tslint:disable-next-line:component-class-suffix
export class BSModalContainer extends BaseDynamicComponent {
    constructor(dialog, el, renderer) {
        super(el, renderer);
        this.dialog = dialog;
        this.activateAnimationListener();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSModalContainer, deps: [{ token: i1.DialogRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: BSModalContainer, selector: "bs-modal-container", host: { attributes: { "tabindex": "-1", "role": "dialog" }, styleAttribute: "position: absolute; display: block", classAttribute: "modal fade" }, usesInheritance: true, ngImport: i0, template: `
    <div [ngClass]="dialog.context.dialogClass"
         [class.modal-lg]="dialog.context.size == \'lg\'"
         [class.modal-sm]="dialog.context.size == \'sm\'">
      <div class="modal-content" style="display:block" role="document" overlayDialogBoundary>
        <ng-content></ng-content>
      </div>
    </div>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.OverlayDialogBoundary, selector: "[overlayDialogBoundary]" }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSModalContainer, decorators: [{
            type: Component,
            args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'bs-modal-container',
                    host: {
                        'tabindex': '-1',
                        'role': 'dialog',
                        'class': 'modal fade',
                        'style': 'position: absolute; display: block'
                    },
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <div [ngClass]="dialog.context.dialogClass"
         [class.modal-lg]="dialog.context.size == \'lg\'"
         [class.modal-sm]="dialog.context.size == \'sm\'">
      <div class="modal-content" style="display:block" role="document" overlayDialogBoundary>
        <ng-content></ng-content>
      </div>
    </div>`
                }]
        }], ctorParameters: () => [{ type: i1.DialogRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1tb2RpYWxvZy9zcmMvbGliL3BsdWdpbnMvYm9vdHN0cmFwL21vZGFsLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxpQkFBaUIsRUFFbEIsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUNBQXlDLENBQUM7Ozs7O0FBc0IvRSxrREFBa0Q7QUFDbEQsTUFBTSxPQUFPLGdCQUFpQixTQUFRLG9CQUFvQjtJQUN4RCxZQUFtQixNQUFxQyxFQUM1QyxFQUFjLEVBQUUsUUFBbUI7UUFDN0MsS0FBSyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUZILFdBQU0sR0FBTixNQUFNLENBQStCO1FBR3RELElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7OEdBTFUsZ0JBQWdCO2tHQUFoQixnQkFBZ0IsbU9BVnZCOzs7Ozs7O1dBT0s7OzJGQUdFLGdCQUFnQjtrQkFyQjVCLFNBQVM7bUJBQUM7b0JBQ1QsOENBQThDO29CQUM5QyxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixJQUFJLEVBQUU7d0JBQ0osVUFBVSxFQUFFLElBQUk7d0JBQ2hCLE1BQU0sRUFBRSxRQUFRO3dCQUNoQixPQUFPLEVBQUUsWUFBWTt3QkFDckIsT0FBTyxFQUFFLG9DQUFvQztxQkFDOUM7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFDSjs7Ozs7OztXQU9LO2lCQUNWIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEaWFsb2dSZWYgfSBmcm9tICcuLi8uLi9tb2RlbHMvZGlhbG9nLXJlZic7XG5pbXBvcnQgeyBNZXNzYWdlTW9kYWxQcmVzZXQgfSBmcm9tICcuL3ByZXNldHMvbWVzc2FnZS1tb2RhbC1wcmVzZXQnO1xuaW1wb3J0IHsgQmFzZUR5bmFtaWNDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Jhc2UtZHluYW1pYy1jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2JzLW1vZGFsLWNvbnRhaW5lcicsXG4gIGhvc3Q6IHtcbiAgICAndGFiaW5kZXgnOiAnLTEnLFxuICAgICdyb2xlJzogJ2RpYWxvZycsXG4gICAgJ2NsYXNzJzogJ21vZGFsIGZhZGUnLFxuICAgICdzdHlsZSc6ICdwb3NpdGlvbjogYWJzb2x1dGU7IGRpc3BsYXk6IGJsb2NrJ1xuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTpcbiAgICAgIGBcbiAgICA8ZGl2IFtuZ0NsYXNzXT1cImRpYWxvZy5jb250ZXh0LmRpYWxvZ0NsYXNzXCJcbiAgICAgICAgIFtjbGFzcy5tb2RhbC1sZ109XCJkaWFsb2cuY29udGV4dC5zaXplID09IFxcJ2xnXFwnXCJcbiAgICAgICAgIFtjbGFzcy5tb2RhbC1zbV09XCJkaWFsb2cuY29udGV4dC5zaXplID09IFxcJ3NtXFwnXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiIHN0eWxlPVwiZGlzcGxheTpibG9ja1wiIHJvbGU9XCJkb2N1bWVudFwiIG92ZXJsYXlEaWFsb2dCb3VuZGFyeT5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YFxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgQlNNb2RhbENvbnRhaW5lciBleHRlbmRzIEJhc2VEeW5hbWljQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZzogRGlhbG9nUmVmPE1lc3NhZ2VNb2RhbFByZXNldD4sXG4gICAgICAgICAgICAgIGVsOiBFbGVtZW50UmVmLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgc3VwZXIoZWwsIHJlbmRlcmVyKTtcbiAgICB0aGlzLmFjdGl2YXRlQW5pbWF0aW9uTGlzdGVuZXIoKTtcbiAgfVxufVxuIl19