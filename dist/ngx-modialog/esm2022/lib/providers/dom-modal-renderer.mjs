import { Injector, Injectable } from '@angular/core';
import { createComponent } from '../framework/createComponent';
import { DialogRef } from '../models/dialog-ref';
import { ModalOverlay } from '../overlay/index';
import * as i0 from "@angular/core";
export class DOMOverlayRenderer {
    constructor(appRef, injector) {
        this.appRef = appRef;
        this.injector = injector;
        this.isDoc = !(typeof document === 'undefined' || !document);
    }
    render(dialog, vcRef, injector) {
        if (!injector) {
            injector = this.injector;
        }
        const cmpRef = createComponent({
            component: ModalOverlay,
            vcRef,
            injector: Injector.create({
                providers: [
                    { provide: DialogRef, useValue: dialog }
                ],
                parent: injector
            })
        });
        if (!vcRef) {
            this.appRef.attachView(cmpRef.hostView);
            // TODO: doesn't look like this is needed, explore. leaving now to be on the safe side.
            dialog.onDestroy.subscribe(() => this.appRef.detachView(cmpRef.hostView));
        }
        if (vcRef && dialog.inElement) {
            vcRef.element.nativeElement.appendChild(cmpRef.location.nativeElement);
        }
        else if (this.isDoc) {
            document.body.appendChild(cmpRef.location.nativeElement);
        }
        return cmpRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: DOMOverlayRenderer, deps: [{ token: i0.ApplicationRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: DOMOverlayRenderer }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: DOMOverlayRenderer, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i0.ApplicationRef }, { type: i0.Injector }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLW1vZGFsLXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LW1vZGlhbG9nL3NyYy9saWIvcHJvdmlkZXJzL2RvbS1tb2RhbC1yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBSUwsUUFBUSxFQUNSLFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWpELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFHaEQsTUFBTSxPQUFPLGtCQUFrQjtJQUk3QixZQUFvQixNQUFzQixFQUFVLFFBQWtCO1FBQWxELFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUY5RCxVQUFLLEdBQVksQ0FBQyxDQUFDLE9BQU8sUUFBUSxLQUFLLFdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBR3pFLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBc0IsRUFBRSxLQUF1QixFQUFFLFFBQW1CO1FBQ3pFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUMxQjtRQUVELE1BQU0sTUFBTSxHQUFHLGVBQWUsQ0FBQztZQUM3QixTQUFTLEVBQUUsWUFBWTtZQUN2QixLQUFLO1lBQ0wsUUFBUSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQ3hCLFNBQVMsRUFBRTtvQkFDVCxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQztpQkFDdkM7Z0JBQ0QsTUFBTSxFQUFFLFFBQVE7YUFDakIsQ0FBQztTQUNILENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFeEMsdUZBQXVGO1lBQ3ZGLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzNFO1FBRUQsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUM3QixLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN4RTthQUFNLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNyQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs4R0FyQ1Usa0JBQWtCO2tIQUFsQixrQkFBa0I7OzJGQUFsQixrQkFBa0I7a0JBRDlCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgQ29tcG9uZW50UmVmLFxuICBJbmplY3RvcixcbiAgSW5qZWN0YWJsZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vZnJhbWV3b3JrL2NyZWF0ZUNvbXBvbmVudCc7XG5pbXBvcnQgeyBEaWFsb2dSZWYgfSBmcm9tICcuLi9tb2RlbHMvZGlhbG9nLXJlZic7XG5pbXBvcnQgeyBPdmVybGF5UmVuZGVyZXIgfSBmcm9tICcuLi9tb2RlbHMvdG9rZW5zJztcbmltcG9ydCB7IE1vZGFsT3ZlcmxheSB9IGZyb20gJy4uL292ZXJsYXkvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRE9NT3ZlcmxheVJlbmRlcmVyIGltcGxlbWVudHMgT3ZlcmxheVJlbmRlcmVyIHtcblxuICBwcml2YXRlIGlzRG9jOiBib29sZWFuID0gISh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnIHx8ICFkb2N1bWVudCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICB9XG5cbiAgcmVuZGVyKGRpYWxvZzogRGlhbG9nUmVmPGFueT4sIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBpbmplY3Rvcj86IEluamVjdG9yKTogQ29tcG9uZW50UmVmPE1vZGFsT3ZlcmxheT4ge1xuICAgIGlmICghaW5qZWN0b3IpIHtcbiAgICAgIGluamVjdG9yID0gdGhpcy5pbmplY3RvcjtcbiAgICB9XG5cbiAgICBjb25zdCBjbXBSZWYgPSBjcmVhdGVDb21wb25lbnQoe1xuICAgICAgY29tcG9uZW50OiBNb2RhbE92ZXJsYXksXG4gICAgICB2Y1JlZixcbiAgICAgIGluamVjdG9yOiBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICB7cHJvdmlkZTogRGlhbG9nUmVmLCB1c2VWYWx1ZTogZGlhbG9nfVxuICAgICAgICBdLFxuICAgICAgICBwYXJlbnQ6IGluamVjdG9yXG4gICAgICB9KVxuICAgIH0pO1xuXG4gICAgaWYgKCF2Y1JlZikge1xuICAgICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyhjbXBSZWYuaG9zdFZpZXcpO1xuXG4gICAgICAvLyBUT0RPOiBkb2Vzbid0IGxvb2sgbGlrZSB0aGlzIGlzIG5lZWRlZCwgZXhwbG9yZS4gbGVhdmluZyBub3cgdG8gYmUgb24gdGhlIHNhZmUgc2lkZS5cbiAgICAgIGRpYWxvZy5vbkRlc3Ryb3kuc3Vic2NyaWJlKCgpID0+IHRoaXMuYXBwUmVmLmRldGFjaFZpZXcoY21wUmVmLmhvc3RWaWV3KSk7XG4gICAgfVxuXG4gICAgaWYgKHZjUmVmICYmIGRpYWxvZy5pbkVsZW1lbnQpIHtcbiAgICAgIHZjUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZChjbXBSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzRG9jKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNtcFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY21wUmVmO1xuICB9XG59XG5cbiJdfQ==