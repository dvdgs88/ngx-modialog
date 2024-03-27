import { Directive, Input } from '@angular/core';
import { vcRefStore } from '../models/vc-ref-store';
import * as i0 from "@angular/core";
import * as i1 from "../models/dialog-ref";
/**
 * A directive use to signal the overlay that the host of this directive
 * is a dialog boundary, i.e: over click outside of the element should close the modal
 * (if non blocking)
 */
// tslint:disable-next-line:directive-class-suffix
export class OverlayDialogBoundary {
    constructor(el, dialogRef) {
        if (dialogRef && el.nativeElement) {
            dialogRef.overlayRef.instance.setClickBoundary(el.nativeElement);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: OverlayDialogBoundary, deps: [{ token: i0.ElementRef }, { token: i1.DialogRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.7", type: OverlayDialogBoundary, selector: "[overlayDialogBoundary]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: OverlayDialogBoundary, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[overlayDialogBoundary]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.DialogRef }] });
// tslint:disable-next-line:directive-class-suffix
export class OverlayTarget {
    set targetKey(value) {
        this._targetKey = value;
        if (value) {
            vcRefStore.setVCRef(value, this.vcRef);
        }
    }
    constructor(vcRef) {
        this.vcRef = vcRef;
    }
    ngOnDestroy() {
        if (this._targetKey) {
            vcRefStore.delVCRef(this._targetKey, this.vcRef);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: OverlayTarget, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.7", type: OverlayTarget, selector: "[overlayTarget]", inputs: { targetKey: ["overlayTarget", "targetKey"] }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: OverlayTarget, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[overlayTarget]'
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef }], propDecorators: { targetKey: [{
                type: Input,
                args: ['overlayTarget']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LW1vZGlhbG9nL3NyYy9saWIvb3ZlcmxheS9vdmVybGF5LmRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBSU4sTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7QUFHcEQ7Ozs7R0FJRztBQUtILGtEQUFrRDtBQUNsRCxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLFlBQVksRUFBYyxFQUFFLFNBQXlCO1FBQ25ELElBQUksU0FBUyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUU7WUFDakMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQzs4R0FMVSxxQkFBcUI7a0dBQXJCLHFCQUFxQjs7MkZBQXJCLHFCQUFxQjtrQkFMakMsU0FBUzttQkFBQztvQkFDVCw4Q0FBOEM7b0JBQzlDLFFBQVEsRUFBRSx5QkFBeUI7aUJBQ3BDOztBQWVELGtEQUFrRDtBQUNsRCxNQUFNLE9BQU8sYUFBYTtJQUN4QixJQUE0QixTQUFTLENBQUMsS0FBYTtRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLEtBQUssRUFBRTtZQUNULFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QztJQUNILENBQUM7SUFJRCxZQUFvQixLQUF1QjtRQUF2QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtJQUMzQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQzs4R0FqQlUsYUFBYTtrR0FBYixhQUFhOzsyRkFBYixhQUFhO2tCQUx6QixTQUFTO21CQUFDO29CQUNULDhDQUE4QztvQkFDOUMsUUFBUSxFQUFFLGlCQUFpQjtpQkFDNUI7cUZBRzZCLFNBQVM7c0JBQXBDLEtBQUs7dUJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIEVsZW1lbnRSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGlhbG9nUmVmIH0gZnJvbSAnLi4vbW9kZWxzL2RpYWxvZy1yZWYnO1xuaW1wb3J0IHsgdmNSZWZTdG9yZSB9IGZyb20gJy4uL21vZGVscy92Yy1yZWYtc3RvcmUnO1xuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJy4vb3ZlcmxheS5zZXJ2aWNlJztcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB1c2UgdG8gc2lnbmFsIHRoZSBvdmVybGF5IHRoYXQgdGhlIGhvc3Qgb2YgdGhpcyBkaXJlY3RpdmVcbiAqIGlzIGEgZGlhbG9nIGJvdW5kYXJ5LCBpLmU6IG92ZXIgY2xpY2sgb3V0c2lkZSBvZiB0aGUgZWxlbWVudCBzaG91bGQgY2xvc2UgdGhlIG1vZGFsXG4gKiAoaWYgbm9uIGJsb2NraW5nKVxuICovXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1tvdmVybGF5RGlhbG9nQm91bmRhcnldJ1xufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgT3ZlcmxheURpYWxvZ0JvdW5kYXJ5IHtcbiAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYsIGRpYWxvZ1JlZjogRGlhbG9nUmVmPGFueT4pIHtcbiAgICBpZiAoZGlhbG9nUmVmICYmIGVsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIGRpYWxvZ1JlZi5vdmVybGF5UmVmLmluc3RhbmNlLnNldENsaWNrQm91bmRhcnkoZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbn1cblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbb3ZlcmxheVRhcmdldF0nXG59KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBPdmVybGF5VGFyZ2V0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCdvdmVybGF5VGFyZ2V0Jykgc2V0IHRhcmdldEtleSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdGFyZ2V0S2V5ID0gdmFsdWU7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB2Y1JlZlN0b3JlLnNldFZDUmVmKHZhbHVlLCB0aGlzLnZjUmVmKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF90YXJnZXRLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fdGFyZ2V0S2V5KSB7XG4gICAgICB2Y1JlZlN0b3JlLmRlbFZDUmVmKHRoaXMuX3RhcmdldEtleSwgdGhpcy52Y1JlZik7XG4gICAgfVxuICB9XG59XG4iXX0=