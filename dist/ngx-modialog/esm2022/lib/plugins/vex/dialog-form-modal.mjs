import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../../public_api";
/**
 * A Dialog is a
 */
export class VEXDialogButtons {
    constructor() {
        /**
         * Emitted when a button was clicked
         */
        this.onButtonClick = new EventEmitter();
    }
    onClick(btn, $event) {
        $event.stopPropagation();
        this.onButtonClick.emit({ btn, $event });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: VEXDialogButtons, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: VEXDialogButtons, selector: "vex-dialog-buttons", inputs: { buttons: "buttons" }, outputs: { onButtonClick: "onButtonClick" }, ngImport: i0, template: `<div class="vex-dialog-buttons">
    <button type="button"
         *ngFor="let btn of buttons;"
         [class]="btn.cssClass"
         (click)="onClick(btn, $event)">{{btn.caption}}</button>
</div>`, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: VEXDialogButtons, decorators: [{
            type: Component,
            args: [{
                    selector: 'vex-dialog-buttons',
                    encapsulation: ViewEncapsulation.None,
                    template: `<div class="vex-dialog-buttons">
    <button type="button"
         *ngFor="let btn of buttons;"
         [class]="btn.cssClass"
         (click)="onClick(btn, $event)">{{btn.caption}}</button>
</div>`
                }]
        }], propDecorators: { buttons: [{
                type: Input
            }], onButtonClick: [{
                type: Output
            }] } });
/**
 * A Dialog with customized buttons wrapped in a form.
 *
 */
export class DialogFormModal {
    constructor(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
    }
    onButtonClick($event) {
        $event.btn.onClick(this, $event.$event);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: DialogFormModal, deps: [{ token: i2.DialogRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: DialogFormModal, selector: "modal-dialog", ngImport: i0, template: `<form class="vex-dialog-form">
    <ng-container *ngComponentOutlet="context.content"></ng-container>
    <vex-dialog-buttons [buttons]="context.buttons"
                        (onButtonClick)="onButtonClick($event)"></vex-dialog-buttons>
</form>`, isInline: true, dependencies: [{ kind: "directive", type: i1.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "component", type: VEXDialogButtons, selector: "vex-dialog-buttons", inputs: ["buttons"], outputs: ["onButtonClick"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: DialogFormModal, decorators: [{
            type: Component,
            args: [{
                    selector: 'modal-dialog',
                    encapsulation: ViewEncapsulation.None,
                    template: `<form class="vex-dialog-form">
    <ng-container *ngComponentOutlet="context.content"></ng-container>
    <vex-dialog-buttons [buttons]="context.buttons"
                        (onButtonClick)="onButtonClick($event)"></vex-dialog-buttons>
</form>`
                }]
        }], ctorParameters: () => [{ type: i2.DialogRef }] });
export class FormDropIn {
    constructor(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: FormDropIn, deps: [{ token: i2.DialogRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: FormDropIn, selector: "drop-in-dialog", ngImport: i0, template: `<div class="vex-dialog-message">{{context.message}}</div>
 <div *ngIf="context.showInput" class="vex-dialog-input">
   <input #input
          autofocus
          name="vex"
          type="text"
          class="vex-dialog-prompt-input"
           (change)="context.defaultResult = input.value"
          placeholder="{{context.placeholder}}">
 </div>
 <div *ngIf="context.showCloseButton"
      [class]="context.closeClassName"
      (click)="dialog.dismiss()"></div>`, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: FormDropIn, decorators: [{
            type: Component,
            args: [{
                    selector: 'drop-in-dialog',
                    encapsulation: ViewEncapsulation.None,
                    template: `<div class="vex-dialog-message">{{context.message}}</div>
 <div *ngIf="context.showInput" class="vex-dialog-input">
   <input #input
          autofocus
          name="vex"
          type="text"
          class="vex-dialog-prompt-input"
           (change)="context.defaultResult = input.value"
          placeholder="{{context.placeholder}}">
 </div>
 <div *ngIf="context.showCloseButton"
      [class]="context.closeClassName"
      (click)="dialog.dismiss()"></div>`
                }]
        }], ctorParameters: () => [{ type: i2.DialogRef }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWZvcm0tbW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtbW9kaWFsb2cvc3JjL2xpYi9wbHVnaW5zL3ZleC9kaWFsb2ctZm9ybS1tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGlCQUFpQixFQUNqQixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQzs7OztBQTRCdkI7O0dBRUc7QUFXSCxNQUFNLE9BQU8sZ0JBQWdCO0lBVjdCO1FBaUJFOztXQUVHO1FBQ2Msa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBdUIsQ0FBQztLQU0xRTtJQUpDLE9BQU8sQ0FBQyxHQUFRLEVBQUUsTUFBa0I7UUFDbEMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7SUFDekMsQ0FBQzs4R0FmVSxnQkFBZ0I7a0dBQWhCLGdCQUFnQix1SUFQakI7Ozs7O09BS0w7OzJGQUVNLGdCQUFnQjtrQkFWNUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFOzs7OztPQUtMO2lCQUNOOzhCQU1pQixPQUFPO3NCQUF0QixLQUFLO2dCQUtXLGFBQWE7c0JBQTdCLE1BQU07O0FBUVQ7OztHQUdHO0FBVUgsTUFBTSxPQUFPLGVBQWU7SUFHMUIsWUFBbUIsTUFBK0I7UUFBL0IsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxhQUFhLENBQUMsTUFBMkI7UUFDdkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQyxDQUFDOzhHQVRVLGVBQWU7a0dBQWYsZUFBZSxvREFOaEI7Ozs7UUFJSixvVUE3QkssZ0JBQWdCOzsyRkErQmhCLGVBQWU7a0JBVDNCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUU7Ozs7UUFJSjtpQkFDUDs7QUErQkQsTUFBTSxPQUFPLFVBQVU7SUFHckIsWUFBbUIsTUFBK0I7UUFBL0IsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2hDLENBQUM7OEdBTFUsVUFBVTtrR0FBVixVQUFVLHNEQWR2Qjs7Ozs7Ozs7Ozs7O3dDQVl3Qzs7MkZBRTNCLFVBQVU7a0JBbEJ0QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQ1Y7Ozs7Ozs7Ozs7Ozt3Q0FZd0M7aUJBQ3ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBEaWFsb2dSZWYsXG4gIE1vZGFsQ29tcG9uZW50XG59IGZyb20gJy4uLy4uLy4uL3B1YmxpY19hcGknO1xuXG5pbXBvcnQgeyBEaWFsb2dQcmVzZXQgfSBmcm9tICcuL3ByZXNldHMvZGlhbG9nLXByZXNldCc7XG5pbXBvcnQgeyBEcm9wSW5QcmVzZXQgfSBmcm9tICcuL3ByZXNldHMvZHJvcGluLXByZXNldCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVkVYQnV0dG9uSGFuZGxlciB7XG4gIChjbXA6IE1vZGFsQ29tcG9uZW50PERpYWxvZ1ByZXNldD4sICRldmVudDogTW91c2VFdmVudCk6IHZvaWQ7XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciBidXR0b24gZGVmaW5pdGlvblxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZFWEJ1dHRvbkNvbmZpZyB7XG4gIGNzc0NsYXNzOiBzdHJpbmc7XG4gIGNhcHRpb246IHN0cmluZztcbiAgb25DbGljazogVkVYQnV0dG9uSGFuZGxlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWRVhCdXR0b25DbGlja0V2ZW50IHtcbiAgYnRuOiBWRVhCdXR0b25Db25maWc7XG4gICRldmVudDogTW91c2VFdmVudDtcbn1cblxuLyoqXG4gKiBBIERpYWxvZyBpcyBhXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3ZleC1kaWFsb2ctYnV0dG9ucycsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInZleC1kaWFsb2ctYnV0dG9uc1wiPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAqbmdGb3I9XCJsZXQgYnRuIG9mIGJ1dHRvbnM7XCJcbiAgICAgICAgIFtjbGFzc109XCJidG4uY3NzQ2xhc3NcIlxuICAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2soYnRuLCAkZXZlbnQpXCI+e3tidG4uY2FwdGlvbn19PC9idXR0b24+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIFZFWERpYWxvZ0J1dHRvbnMge1xuXG4gIC8qKlxuICAgKiBBIGNvbGxlY3Rpb24gb2YgYnV0dG9uIGNvbmZpZ3VyYXRpb25zLCBlYWNoIGNvbmZpZ3VyYXRpb24gaXMgYSBidXR0b24gdG8gZGlzcGxheS5cbiAgICovXG4gIEBJbnB1dCgpIHB1YmxpYyBidXR0b25zOiBWRVhCdXR0b25Db25maWdbXTtcblxuICAvKipcbiAgICogRW1pdHRlZCB3aGVuIGEgYnV0dG9uIHdhcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KCkgcHVibGljIG9uQnV0dG9uQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPFZFWEJ1dHRvbkNsaWNrRXZlbnQ+KCk7XG5cbiAgb25DbGljayhidG46IGFueSwgJGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMub25CdXR0b25DbGljay5lbWl0KHtidG4sICRldmVudH0pO1xuICB9XG59XG5cbi8qKlxuICogQSBEaWFsb2cgd2l0aCBjdXN0b21pemVkIGJ1dHRvbnMgd3JhcHBlZCBpbiBhIGZvcm0uXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtb2RhbC1kaWFsb2cnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYDxmb3JtIGNsYXNzPVwidmV4LWRpYWxvZy1mb3JtXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdDb21wb25lbnRPdXRsZXQ9XCJjb250ZXh0LmNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8dmV4LWRpYWxvZy1idXR0b25zIFtidXR0b25zXT1cImNvbnRleHQuYnV0dG9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAob25CdXR0b25DbGljayk9XCJvbkJ1dHRvbkNsaWNrKCRldmVudClcIj48L3ZleC1kaWFsb2ctYnV0dG9ucz5cbjwvZm9ybT5gXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0Zvcm1Nb2RhbCBpbXBsZW1lbnRzIE1vZGFsQ29tcG9uZW50PERpYWxvZ1ByZXNldD4ge1xuICBwdWJsaWMgY29udGV4dDogRGlhbG9nUHJlc2V0O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2c6IERpYWxvZ1JlZjxEaWFsb2dQcmVzZXQ+KSB7XG4gICAgdGhpcy5jb250ZXh0ID0gZGlhbG9nLmNvbnRleHQ7XG4gIH1cblxuICBvbkJ1dHRvbkNsaWNrKCRldmVudDogVkVYQnV0dG9uQ2xpY2tFdmVudCkge1xuICAgICRldmVudC5idG4ub25DbGljayh0aGlzLCAkZXZlbnQuJGV2ZW50KTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkcm9wLWluLWRpYWxvZycsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOlxuYDxkaXYgY2xhc3M9XCJ2ZXgtZGlhbG9nLW1lc3NhZ2VcIj57e2NvbnRleHQubWVzc2FnZX19PC9kaXY+XG4gPGRpdiAqbmdJZj1cImNvbnRleHQuc2hvd0lucHV0XCIgY2xhc3M9XCJ2ZXgtZGlhbG9nLWlucHV0XCI+XG4gICA8aW5wdXQgI2lucHV0XG4gICAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgICAgbmFtZT1cInZleFwiXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGNsYXNzPVwidmV4LWRpYWxvZy1wcm9tcHQtaW5wdXRcIlxuICAgICAgICAgICAoY2hhbmdlKT1cImNvbnRleHQuZGVmYXVsdFJlc3VsdCA9IGlucHV0LnZhbHVlXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cInt7Y29udGV4dC5wbGFjZWhvbGRlcn19XCI+XG4gPC9kaXY+XG4gPGRpdiAqbmdJZj1cImNvbnRleHQuc2hvd0Nsb3NlQnV0dG9uXCJcbiAgICAgIFtjbGFzc109XCJjb250ZXh0LmNsb3NlQ2xhc3NOYW1lXCJcbiAgICAgIChjbGljayk9XCJkaWFsb2cuZGlzbWlzcygpXCI+PC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtRHJvcEluIGltcGxlbWVudHMgTW9kYWxDb21wb25lbnQ8RHJvcEluUHJlc2V0PiB7XG4gIHB1YmxpYyBjb250ZXh0OiBEcm9wSW5QcmVzZXQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZzogRGlhbG9nUmVmPERyb3BJblByZXNldD4pIHtcbiAgICB0aGlzLmNvbnRleHQgPSBkaWFsb2cuY29udGV4dDtcbiAgfVxufVxuIl19