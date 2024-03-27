import { Component, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../models/dialog-ref";
import * as i2 from "@angular/common";
export class BSMessageModalTitle {
    constructor(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
    }
    get titleHtml() {
        return this.context.titleHtml ? 1 : 0;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSMessageModalTitle, deps: [{ token: i1.DialogRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: BSMessageModalTitle, selector: "modal-title", ngImport: i0, template: `<div [ngClass]="context.headerClass" [ngSwitch]="titleHtml">
      <button *ngIf="context.showClose" type="button" class="close"
              aria-label="Close" (click)="dialog.dismiss()">
          <span aria-hidden="true">×</span>
      </button>
      <div *ngSwitchCase="1" [innerHtml]="context.titleHtml"></div>
      <h3 *ngSwitchDefault class="modal-title">{{context.title}}</h3>
 </div>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i2.NgSwitchDefault, selector: "[ngSwitchDefault]" }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSMessageModalTitle, decorators: [{
            type: Component,
            args: [{
                    selector: 'modal-title',
                    encapsulation: ViewEncapsulation.None,
                    template: `<div [ngClass]="context.headerClass" [ngSwitch]="titleHtml">
      <button *ngIf="context.showClose" type="button" class="close"
              aria-label="Close" (click)="dialog.dismiss()">
          <span aria-hidden="true">×</span>
      </button>
      <div *ngSwitchCase="1" [innerHtml]="context.titleHtml"></div>
      <h3 *ngSwitchDefault class="modal-title">{{context.title}}</h3>
 </div>`
                }]
        }], ctorParameters: () => [{ type: i1.DialogRef }] });
// tslint:disable-next-line:component-class-suffix
export class BSMessageModalBody {
    constructor(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSMessageModalBody, deps: [{ token: i1.DialogRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: BSMessageModalBody, selector: "modal-body", ngImport: i0, template: `<div [ngClass]="context.bodyClass">
    <div [innerHtml]="context.message"></div>
      <div *ngIf="context.showInput" class="form-group">
        <input autofocus #input
            name="bootstrap"
            type="text"
            class="form-control"
            [value]="context.defaultValue"
            (change)="context.defaultValue = input.value"
            placeholder="{{context.placeholder}}">
      </div>
    </div>
`, isInline: true, styles: [".form-group{margin-top:10px}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSMessageModalBody, decorators: [{
            type: Component,
            args: [{ selector: 'modal-body', encapsulation: ViewEncapsulation.None, template: `<div [ngClass]="context.bodyClass">
    <div [innerHtml]="context.message"></div>
      <div *ngIf="context.showInput" class="form-group">
        <input autofocus #input
            name="bootstrap"
            type="text"
            class="form-control"
            [value]="context.defaultValue"
            (change)="context.defaultValue = input.value"
            placeholder="{{context.placeholder}}">
      </div>
    </div>
`, styles: [".form-group{margin-top:10px}\n"] }]
        }], ctorParameters: () => [{ type: i1.DialogRef }] });
/**
 * Represents the modal footer for storing buttons.
 */
// tslint:disable-next-line:component-class-suffix
export class BSModalFooter {
    constructor(dialog) {
        this.dialog = dialog;
    }
    onClick(btn, $event) {
        $event.stopPropagation();
        btn.onClick(this, $event);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSModalFooter, deps: [{ token: i1.DialogRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: BSModalFooter, selector: "modal-footer", ngImport: i0, template: `<div [ngClass]="dialog.context.footerClass">
    <button *ngFor="let btn of dialog.context.buttons;"
            [ngClass]="btn.cssClass"
            (click)="onClick(btn, $event)">{{btn.caption}}</button>
</div>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSModalFooter, decorators: [{
            type: Component,
            args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'modal-footer',
                    encapsulation: ViewEncapsulation.None,
                    template: `<div [ngClass]="dialog.context.footerClass">
    <button *ngFor="let btn of dialog.context.buttons;"
            [ngClass]="btn.cssClass"
            (click)="onClick(btn, $event)">{{btn.caption}}</button>
</div>`
                }]
        }], ctorParameters: () => [{ type: i1.DialogRef }] });
/**
 * A Component representing a generic bootstrap modal content element.
 *
 * By configuring a MessageModalContext instance you can:
 *
 *  Header:
 *      - Set header container class (default: modal-header)
 *      - Set title text (enclosed in H3 element)
 *      - Set title html (overrides text)
 *
 *  Body:
 *      - Set body container class.  (default: modal-body)
 *      - Set body container HTML.
 *
 *  Footer:
 *      - Set footer class.  (default: modal-footer)
 *      - Set button configuration (from 0 to n)
 */
// tslint:disable-next-line:component-class-suffix
export class BSMessageModal {
    constructor(dialog) {
        this.dialog = dialog;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSMessageModal, deps: [{ token: i1.DialogRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: BSMessageModal, selector: "modal-content", ngImport: i0, template: `<modal-title></modal-title><modal-body></modal-body><modal-footer></modal-footer>`, isInline: true, dependencies: [{ kind: "component", type: BSModalFooter, selector: "modal-footer" }, { kind: "component", type: BSMessageModalTitle, selector: "modal-title" }, { kind: "component", type: BSMessageModalBody, selector: "modal-body" }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSMessageModal, decorators: [{
            type: Component,
            args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'modal-content',
                    encapsulation: ViewEncapsulation.None,
                    template: `<modal-title></modal-title><modal-body></modal-body><modal-footer></modal-footer>`
                }]
        }], ctorParameters: () => [{ type: i1.DialogRef }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1tb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtbW9kaWFsb2cvc3JjL2xpYi9wbHVnaW5zL2Jvb3RzdHJhcC9tZXNzYWdlLW1vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBOEI3RCxNQUFNLE9BQU8sbUJBQW1CO0lBRzlCLFlBQW1CLE1BQXFDO1FBQXJDLFdBQU0sR0FBTixNQUFNLENBQStCO1FBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs4R0FUVSxtQkFBbUI7a0dBQW5CLG1CQUFtQixtREFUcEI7Ozs7Ozs7UUFPSjs7MkZBRUssbUJBQW1CO2tCQVovQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFOzs7Ozs7O1FBT0o7aUJBQ1A7O0FBa0NELGtEQUFrRDtBQUNsRCxNQUFNLE9BQU8sa0JBQWtCO0lBUzdCLFlBQW1CLE1BQXFDO1FBQXJDLFdBQU0sR0FBTixNQUFNLENBQStCO1FBQ3RELElBQUksQ0FBQyxPQUFPLEdBQVMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUN0QyxDQUFDOzhHQVhVLGtCQUFrQjtrR0FBbEIsa0JBQWtCLGtEQWZuQjs7Ozs7Ozs7Ozs7O0NBWVg7OzJGQUdZLGtCQUFrQjtrQkF0QjlCLFNBQVM7K0JBRUUsWUFBWSxpQkFDUCxpQkFBaUIsQ0FBQyxJQUFJLFlBSTNCOzs7Ozs7Ozs7Ozs7Q0FZWDs7QUFrQkQ7O0dBRUc7QUFXSCxrREFBa0Q7QUFDbEQsTUFBTSxPQUFPLGFBQWE7SUFDeEIsWUFBbUIsTUFBcUM7UUFBckMsV0FBTSxHQUFOLE1BQU0sQ0FBK0I7SUFDeEQsQ0FBQztJQUVELE9BQU8sQ0FBQyxHQUErQixFQUFFLE1BQWtCO1FBQ3pELE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDOzhHQVBVLGFBQWE7a0dBQWIsYUFBYSxvREFQZDs7OztPQUlMOzsyRkFHTSxhQUFhO2tCQVh6QixTQUFTO21CQUFDO29CQUNULDhDQUE4QztvQkFDOUMsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUU7Ozs7T0FJTDtpQkFDTjs7QUFZRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFPSCxrREFBa0Q7QUFDbEQsTUFBTSxPQUFPLGNBQWM7SUFDekIsWUFBbUIsTUFBcUM7UUFBckMsV0FBTSxHQUFOLE1BQU0sQ0FBK0I7SUFDeEQsQ0FBQzs4R0FGVSxjQUFjO2tHQUFkLGNBQWMscURBSGYsbUZBQW1GLDREQWhDbEYsYUFBYSx5REEvRGIsbUJBQW1CLHdEQWtDbkIsa0JBQWtCOzsyRkFnRWxCLGNBQWM7a0JBUDFCLFNBQVM7bUJBQUM7b0JBQ1QsOENBQThDO29CQUM5QyxRQUFRLEVBQUUsZUFBZTtvQkFDekIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxtRkFBbUY7aUJBQzlGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVzc2FnZU1vZGFsUHJlc2V0IH0gZnJvbSAnLi9wcmVzZXRzL21lc3NhZ2UtbW9kYWwtcHJlc2V0JztcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3Rva2Vucyc7XG5pbXBvcnQgeyBEaWFsb2dSZWYgfSBmcm9tICcuLi8uLi9tb2RlbHMvZGlhbG9nLXJlZic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQlNNZXNzYWdlTW9kYWxCdXR0b25IYW5kbGVyIHtcbiAgKGNtcDogTW9kYWxDb21wb25lbnQ8TWVzc2FnZU1vZGFsUHJlc2V0PiwgJGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZDtcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGJ1dHRvbiBkZWZpbml0aW9uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQlNNZXNzYWdlTW9kYWxCdXR0b25Db25maWcge1xuICBjc3NDbGFzczogc3RyaW5nO1xuICBjYXB0aW9uOiBzdHJpbmc7XG4gIG9uQ2xpY2s6IEJTTWVzc2FnZU1vZGFsQnV0dG9uSGFuZGxlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbW9kYWwtdGl0bGUnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYDxkaXYgW25nQ2xhc3NdPVwiY29udGV4dC5oZWFkZXJDbGFzc1wiIFtuZ1N3aXRjaF09XCJ0aXRsZUh0bWxcIj5cbiAgICAgIDxidXR0b24gKm5nSWY9XCJjb250ZXh0LnNob3dDbG9zZVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkNsb3NlXCIgKGNsaWNrKT1cImRpYWxvZy5kaXNtaXNzKClcIj5cbiAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj7Dlzwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiMVwiIFtpbm5lckh0bWxdPVwiY29udGV4dC50aXRsZUh0bWxcIj48L2Rpdj5cbiAgICAgIDxoMyAqbmdTd2l0Y2hEZWZhdWx0IGNsYXNzPVwibW9kYWwtdGl0bGVcIj57e2NvbnRleHQudGl0bGV9fTwvaDM+XG4gPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBCU01lc3NhZ2VNb2RhbFRpdGxlIHtcbiAgcHVibGljIGNvbnRleHQ6IE1lc3NhZ2VNb2RhbFByZXNldDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nOiBEaWFsb2dSZWY8TWVzc2FnZU1vZGFsUHJlc2V0Pikge1xuICAgIHRoaXMuY29udGV4dCA9IGRpYWxvZy5jb250ZXh0O1xuICB9XG5cbiAgZ2V0IHRpdGxlSHRtbCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQudGl0bGVIdG1sID8gMSA6IDA7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdtb2RhbC1ib2R5JyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVzOiBbYC5mb3JtLWdyb3VwIHtcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICB9YF0sXG4gIHRlbXBsYXRlOiBgPGRpdiBbbmdDbGFzc109XCJjb250ZXh0LmJvZHlDbGFzc1wiPlxuICAgIDxkaXYgW2lubmVySHRtbF09XCJjb250ZXh0Lm1lc3NhZ2VcIj48L2Rpdj5cbiAgICAgIDxkaXYgKm5nSWY9XCJjb250ZXh0LnNob3dJbnB1dFwiIGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8aW5wdXQgYXV0b2ZvY3VzICNpbnB1dFxuICAgICAgICAgICAgbmFtZT1cImJvb3RzdHJhcFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICBbdmFsdWVdPVwiY29udGV4dC5kZWZhdWx0VmFsdWVcIlxuICAgICAgICAgICAgKGNoYW5nZSk9XCJjb250ZXh0LmRlZmF1bHRWYWx1ZSA9IGlucHV0LnZhbHVlXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3tjb250ZXh0LnBsYWNlaG9sZGVyfX1cIj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuYFxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgQlNNZXNzYWdlTW9kYWxCb2R5IHtcbiAgcHVibGljIGNvbnRleHQ6IE1lc3NhZ2VNb2RhbFByZXNldCAmIHtcbiAgICBzaG93SW5wdXQ6IGJvb2xlYW47XG4gICAgLyoqIERlZmF1bHQgdmFsdWUgc2hvd24gaW4gdGhlIHByb21wdC4gKi9cbiAgICBkZWZhdWx0VmFsdWU6IHN0cmluZztcbiAgICAvKiogQSBwbGFjZWhvbGRlciBmb3IgdGhlIGlucHV0IGVsZW1lbnQuICovXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nOiBEaWFsb2dSZWY8TWVzc2FnZU1vZGFsUHJlc2V0Pikge1xuICAgIHRoaXMuY29udGV4dCA9IDxhbnk+IGRpYWxvZy5jb250ZXh0O1xuICB9XG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBtb2RhbCBmb290ZXIgZm9yIHN0b3JpbmcgYnV0dG9ucy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdtb2RhbC1mb290ZXInLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYDxkaXYgW25nQ2xhc3NdPVwiZGlhbG9nLmNvbnRleHQuZm9vdGVyQ2xhc3NcIj5cbiAgICA8YnV0dG9uICpuZ0Zvcj1cImxldCBidG4gb2YgZGlhbG9nLmNvbnRleHQuYnV0dG9ucztcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiYnRuLmNzc0NsYXNzXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrKGJ0biwgJGV2ZW50KVwiPnt7YnRuLmNhcHRpb259fTwvYnV0dG9uPlxuPC9kaXY+YFxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgQlNNb2RhbEZvb3RlciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2c6IERpYWxvZ1JlZjxNZXNzYWdlTW9kYWxQcmVzZXQ+KSB7XG4gIH1cblxuICBvbkNsaWNrKGJ0bjogQlNNZXNzYWdlTW9kYWxCdXR0b25Db25maWcsICRldmVudDogTW91c2VFdmVudCkge1xuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBidG4ub25DbGljayh0aGlzLCAkZXZlbnQpO1xuICB9XG59XG5cbi8qKlxuICogQSBDb21wb25lbnQgcmVwcmVzZW50aW5nIGEgZ2VuZXJpYyBib290c3RyYXAgbW9kYWwgY29udGVudCBlbGVtZW50LlxuICpcbiAqIEJ5IGNvbmZpZ3VyaW5nIGEgTWVzc2FnZU1vZGFsQ29udGV4dCBpbnN0YW5jZSB5b3UgY2FuOlxuICpcbiAqICBIZWFkZXI6XG4gKiAgICAgIC0gU2V0IGhlYWRlciBjb250YWluZXIgY2xhc3MgKGRlZmF1bHQ6IG1vZGFsLWhlYWRlcilcbiAqICAgICAgLSBTZXQgdGl0bGUgdGV4dCAoZW5jbG9zZWQgaW4gSDMgZWxlbWVudClcbiAqICAgICAgLSBTZXQgdGl0bGUgaHRtbCAob3ZlcnJpZGVzIHRleHQpXG4gKlxuICogIEJvZHk6XG4gKiAgICAgIC0gU2V0IGJvZHkgY29udGFpbmVyIGNsYXNzLiAgKGRlZmF1bHQ6IG1vZGFsLWJvZHkpXG4gKiAgICAgIC0gU2V0IGJvZHkgY29udGFpbmVyIEhUTUwuXG4gKlxuICogIEZvb3RlcjpcbiAqICAgICAgLSBTZXQgZm9vdGVyIGNsYXNzLiAgKGRlZmF1bHQ6IG1vZGFsLWZvb3RlcilcbiAqICAgICAgLSBTZXQgYnV0dG9uIGNvbmZpZ3VyYXRpb24gKGZyb20gMCB0byBuKVxuICovXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ21vZGFsLWNvbnRlbnQnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYDxtb2RhbC10aXRsZT48L21vZGFsLXRpdGxlPjxtb2RhbC1ib2R5PjwvbW9kYWwtYm9keT48bW9kYWwtZm9vdGVyPjwvbW9kYWwtZm9vdGVyPmBcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIEJTTWVzc2FnZU1vZGFsIGltcGxlbWVudHMgTW9kYWxDb21wb25lbnQ8TWVzc2FnZU1vZGFsUHJlc2V0PiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2c6IERpYWxvZ1JlZjxNZXNzYWdlTW9kYWxQcmVzZXQ+KSB7XG4gIH1cbn1cbiJdfQ==