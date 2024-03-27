import { Injectable } from '@angular/core';
import { DialogRefStack } from '../models/dialog-ref-stack';
import { vcRefStore } from '../models/vc-ref-store';
import { DialogRef } from '../models/dialog-ref';
import * as i0 from "@angular/core";
import * as i1 from "../models/tokens";
const _stack = new DialogRefStack();
export class Overlay {
    get stackLength() {
        return _stack.length;
    }
    constructor(_modalRenderer, injector) {
        this._modalRenderer = _modalRenderer;
        this.injector = injector;
    }
    /**
     * Check if a given DialogRef is the top most ref in the stack.
     * TODO: distinguish between body modal vs in element modal.
     * @param dialogRef
     */
    isTopMost(dialogRef) {
        return _stack.indexOf(dialogRef) === _stack.length - 1;
    }
    stackPosition(dialogRef) {
        return _stack.indexOf(dialogRef);
    }
    groupStackLength(dialogRef) {
        return _stack.groupLength(_stack.groupOf(dialogRef));
    }
    closeAll(result = null) {
        _stack.closeAll(result);
    }
    /**
     * Creates an overlay and returns a dialog ref.
     * @param config instructions how to create the overlay
     * @param group A token to associate the new overlay with, used for reference (stacks usually)
     */
    open(config, group) {
        const viewContainer = config.viewContainer;
        let containers = [];
        if (typeof viewContainer === 'string') {
            containers = vcRefStore.getVCRef(viewContainer);
        }
        else if (Array.isArray(viewContainer)) {
            containers = viewContainer;
        }
        else if (viewContainer) {
            containers = [viewContainer];
        }
        else {
            containers = [null];
        }
        return containers
            .map(vc => this.createOverlay(config.renderer || this._modalRenderer, vc, config, group));
    }
    createOverlay(renderer, vcRef, config, group) {
        if (config.context) {
            config.context.normalize();
        }
        if (!config.injector) {
            config.injector = this.injector;
        }
        const dialog = new DialogRef(this, config.context || {});
        dialog.inElement = config.context && !!config.context.inElement;
        const cmpRef = renderer.render(dialog, vcRef, config.injector);
        Object.defineProperty(dialog, 'overlayRef', { value: cmpRef });
        _stack.pushManaged(dialog, group);
        return dialog;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: Overlay, deps: [{ token: i1.OverlayRenderer }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: Overlay }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: Overlay, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.OverlayRenderer }, { type: i0.Injector }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LW1vZGlhbG9nL3NyYy9saWIvb3ZlcmxheS9vdmVybGF5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFvQixVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFHdkUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7OztBQUdqRCxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQWMsRUFBTyxDQUFDO0FBR3pDLE1BQU0sT0FBTyxPQUFPO0lBQ2xCLElBQUksV0FBVztRQUNiLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsWUFBb0IsY0FBK0IsRUFBWSxRQUFrQjtRQUE3RCxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFBWSxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ2pGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsU0FBUyxDQUFDLFNBQXlCO1FBQ2pDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsYUFBYSxDQUFDLFNBQXlCO1FBQ3JDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsU0FBeUI7UUFDeEMsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQWMsSUFBSTtRQUN2QixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsSUFBSSxDQUEyQixNQUFxQixFQUFFLEtBQVc7UUFDL0QsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUMzQyxJQUFJLFVBQVUsR0FBNEIsRUFBRSxDQUFDO1FBRTdDLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFO1lBQ3JDLFVBQVUsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLGFBQXVCLENBQUMsQ0FBQztTQUMzRDthQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN2QyxVQUFVLEdBQUcsYUFBb0IsQ0FBQztTQUNuQzthQUFNLElBQUksYUFBYSxFQUFFO1lBQ3hCLFVBQVUsR0FBRyxDQUFDLGFBQWEsQ0FBUSxDQUFDO1NBQ3JDO2FBQU07WUFDTCxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQjtRQUVELE9BQU8sVUFBVTthQUNkLEdBQUcsQ0FBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBRU8sYUFBYSxDQUFDLFFBQXlCLEVBQ3pCLEtBQXVCLEVBQ3ZCLE1BQXFCLEVBQ3JCLEtBQVU7UUFFOUIsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNwQixNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDakM7UUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBTSxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM5RCxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBRWhFLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFDN0QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFbEMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs4R0ExRVUsT0FBTztrSEFBUCxPQUFPOzsyRkFBUCxPQUFPO2tCQURuQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgT3ZlcmxheVJlbmRlcmVyLCBPdmVybGF5Q29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzL3Rva2Vucyc7XG5pbXBvcnQgeyBEaWFsb2dSZWZTdGFjayB9IGZyb20gJy4uL21vZGVscy9kaWFsb2ctcmVmLXN0YWNrJztcbmltcG9ydCB7IHZjUmVmU3RvcmUgfSBmcm9tICcuLi9tb2RlbHMvdmMtcmVmLXN0b3JlJztcbmltcG9ydCB7IERpYWxvZ1JlZiB9IGZyb20gJy4uL21vZGVscy9kaWFsb2ctcmVmJztcbmltcG9ydCB7IE92ZXJsYXlDb250ZXh0IH0gZnJvbSAnLi4vbW9kZWxzL292ZXJsYXktY29udGV4dCc7XG5cbmNvbnN0IF9zdGFjayA9IG5ldyBEaWFsb2dSZWZTdGFjazxhbnk+KCk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPdmVybGF5IHtcbiAgZ2V0IHN0YWNrTGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIF9zdGFjay5sZW5ndGg7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tb2RhbFJlbmRlcmVyOiBPdmVybGF5UmVuZGVyZXIsIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIGdpdmVuIERpYWxvZ1JlZiBpcyB0aGUgdG9wIG1vc3QgcmVmIGluIHRoZSBzdGFjay5cbiAgICogVE9ETzogZGlzdGluZ3Vpc2ggYmV0d2VlbiBib2R5IG1vZGFsIHZzIGluIGVsZW1lbnQgbW9kYWwuXG4gICAqIEBwYXJhbSBkaWFsb2dSZWZcbiAgICovXG4gIGlzVG9wTW9zdChkaWFsb2dSZWY6IERpYWxvZ1JlZjxhbnk+KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIF9zdGFjay5pbmRleE9mKGRpYWxvZ1JlZikgPT09IF9zdGFjay5sZW5ndGggLSAxO1xuICB9XG5cbiAgc3RhY2tQb3NpdGlvbihkaWFsb2dSZWY6IERpYWxvZ1JlZjxhbnk+KSB7XG4gICAgcmV0dXJuIF9zdGFjay5pbmRleE9mKGRpYWxvZ1JlZik7XG4gIH1cblxuICBncm91cFN0YWNrTGVuZ3RoKGRpYWxvZ1JlZjogRGlhbG9nUmVmPGFueT4pOiBudW1iZXIge1xuICAgIHJldHVybiBfc3RhY2suZ3JvdXBMZW5ndGgoX3N0YWNrLmdyb3VwT2YoZGlhbG9nUmVmKSk7XG4gIH1cblxuICBjbG9zZUFsbChyZXN1bHQ6IGFueSA9IG51bGwpOiB2b2lkIHtcbiAgICAgIF9zdGFjay5jbG9zZUFsbChyZXN1bHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gb3ZlcmxheSBhbmQgcmV0dXJucyBhIGRpYWxvZyByZWYuXG4gICAqIEBwYXJhbSBjb25maWcgaW5zdHJ1Y3Rpb25zIGhvdyB0byBjcmVhdGUgdGhlIG92ZXJsYXlcbiAgICogQHBhcmFtIGdyb3VwIEEgdG9rZW4gdG8gYXNzb2NpYXRlIHRoZSBuZXcgb3ZlcmxheSB3aXRoLCB1c2VkIGZvciByZWZlcmVuY2UgKHN0YWNrcyB1c3VhbGx5KVxuICAgKi9cbiAgb3BlbjxUIGV4dGVuZHMgT3ZlcmxheUNvbnRleHQ+KGNvbmZpZzogT3ZlcmxheUNvbmZpZywgZ3JvdXA/OiBhbnkpOiBEaWFsb2dSZWY8VD5bXSB7XG4gICAgY29uc3Qgdmlld0NvbnRhaW5lciA9IGNvbmZpZy52aWV3Q29udGFpbmVyO1xuICAgIGxldCBjb250YWluZXJzOiBBcnJheTxWaWV3Q29udGFpbmVyUmVmPiA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiB2aWV3Q29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGFpbmVycyA9IHZjUmVmU3RvcmUuZ2V0VkNSZWYodmlld0NvbnRhaW5lciBhcyBzdHJpbmcpO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2aWV3Q29udGFpbmVyKSkge1xuICAgICAgY29udGFpbmVycyA9IHZpZXdDb250YWluZXIgYXMgYW55O1xuICAgIH0gZWxzZSBpZiAodmlld0NvbnRhaW5lcikge1xuICAgICAgY29udGFpbmVycyA9IFt2aWV3Q29udGFpbmVyXSBhcyBhbnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRhaW5lcnMgPSBbbnVsbF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRhaW5lcnNcbiAgICAgIC5tYXAoIHZjID0+IHRoaXMuY3JlYXRlT3ZlcmxheShjb25maWcucmVuZGVyZXIgfHwgdGhpcy5fbW9kYWxSZW5kZXJlciwgdmMsIGNvbmZpZywgZ3JvdXApKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlT3ZlcmxheShyZW5kZXJlcjogT3ZlcmxheVJlbmRlcmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWc6IE92ZXJsYXlDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cDogYW55KTogRGlhbG9nUmVmPGFueT4ge1xuXG4gICAgaWYgKGNvbmZpZy5jb250ZXh0KSB7XG4gICAgICBjb25maWcuY29udGV4dC5ub3JtYWxpemUoKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5pbmplY3Rvcikge1xuICAgICAgY29uZmlnLmluamVjdG9yID0gdGhpcy5pbmplY3RvcjtcbiAgICB9XG5cbiAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nUmVmPGFueT4odGhpcywgY29uZmlnLmNvbnRleHQgfHwge30pO1xuICAgIGRpYWxvZy5pbkVsZW1lbnQgPSBjb25maWcuY29udGV4dCAmJiAhIWNvbmZpZy5jb250ZXh0LmluRWxlbWVudDtcblxuICAgIGNvbnN0IGNtcFJlZiA9IHJlbmRlcmVyLnJlbmRlcihkaWFsb2csIHZjUmVmLCBjb25maWcuaW5qZWN0b3IpO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRpYWxvZywgJ292ZXJsYXlSZWYnLCB7dmFsdWU6IGNtcFJlZn0pO1xuICAgIF9zdGFjay5wdXNoTWFuYWdlZChkaWFsb2csIGdyb3VwKTtcblxuICAgIHJldHVybiBkaWFsb2c7XG4gIH1cbn1cbiJdfQ==