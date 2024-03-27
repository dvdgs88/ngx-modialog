// heavily inspired by:
// http://www.bennadel.com/blog/3025-creating-custom-dom-and-host-event-bindings-in-angular-2-beta-6.htm
import { Injectable } from '@angular/core';
import { noop } from '../framework/utils';
import * as i0 from "@angular/core";
// TODO: use DI factory for this.
// TODO: consolidate dup code
const isDoc = !(typeof document === 'undefined' || !document);
const eventMap = {
    clickOutside: 'click',
    mousedownOutside: 'mousedown',
    mouseupOutside: 'mouseup',
    mousemoveOutside: 'mousemove'
};
/**
 * An event handler factory for event handlers that bubble the event to a given handler
 * if the event target is not an ancestor of the given element.
 * @param element
 * @param handler
 */
function bubbleNonAncestorHandlerFactory(element, handler) {
    return (event) => {
        let current = event.target;
        do {
            if (current === element) {
                return;
            }
        } while (current.parentNode && (current = current.parentNode));
        handler(event);
    };
}
export class DOMOutsideEventPlugin {
    constructor() {
        if (!isDoc || typeof document.addEventListener !== 'function') {
            this.addEventListener = noop;
        }
    }
    supports(eventName) {
        return eventMap.hasOwnProperty(eventName);
    }
    addEventListener(element, eventName, handler) {
        const zone = this.manager.getZone();
        // A Factory that registers the event on the document, instead of the element.
        // the handler is created at runtime, and it acts as a propagation/bubble predicate, it will
        // bubble up the event (i.e: execute our original event handler) only if the event targer
        // is an ancestor of our element.
        // The event is fired inside the angular zone so change detection can kick into action.
        const onceOnOutside = () => {
            const listener = bubbleNonAncestorHandlerFactory(element, evt => zone.runGuarded(() => handler(evt)));
            // mimic BrowserDomAdapter.onAndCancel
            document.addEventListener(eventMap[eventName], listener, false);
            return () => document.removeEventListener(eventMap[eventName], listener, false);
        };
        // we run the event registration for the document in a different zone, this will make sure
        // change detection is off.
        // It turns out that if a component that use DOMOutsideEventPlugin is built from a click
        // event, we might get here before the event reached the document, causing a quick false
        // positive handling (when stopPropagation() was'nt invoked). To workaround this we wait
        // for the next vm turn and register.
        // Event registration returns a dispose function for that event, angular use it to clean
        // up after component get's destroyed. Since we need to return a dispose function
        // synchronously we have to put a wrapper for it since we will get it asynchronously,
        // i.e: after we need to return it.
        //
        return zone.runOutsideAngular(() => {
            let fn;
            setTimeout(() => fn = onceOnOutside(), 0);
            return () => {
                if (fn) {
                    fn();
                }
            };
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: DOMOutsideEventPlugin, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: DOMOutsideEventPlugin }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: DOMOutsideEventPlugin, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0c2lkZS1ldmVudC1wbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtbW9kaWFsb2cvc3JjL2xpYi9wcm92aWRlcnMvb3V0c2lkZS1ldmVudC1wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsdUJBQXVCO0FBQ3ZCLHdHQUF3RztBQUV4RyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFFMUMsaUNBQWlDO0FBQ2pDLDZCQUE2QjtBQUM3QixNQUFNLEtBQUssR0FBWSxDQUFDLENBQUMsT0FBTyxRQUFRLEtBQUssV0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFdkUsTUFBTSxRQUFRLEdBQUc7SUFDYixZQUFZLEVBQUUsT0FBTztJQUNyQixnQkFBZ0IsRUFBRSxXQUFXO0lBQzdCLGNBQWMsRUFBRSxTQUFTO0lBQ3pCLGdCQUFnQixFQUFFLFdBQVc7Q0FDaEMsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsU0FBUywrQkFBK0IsQ0FBQyxPQUFvQixFQUFFLE9BQXdCO0lBQ25GLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNiLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDM0IsR0FBRztZQUNDLElBQUksT0FBTyxLQUFLLE9BQU8sRUFBRTtnQkFDckIsT0FBTzthQUNWO1NBQ0osUUFBUSxPQUFPLENBQUMsVUFBVSxJQUFJLENBQUUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUUsRUFBRTtRQUVqRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUdELE1BQU0sT0FBTyxxQkFBcUI7SUFHOUI7UUFDQSxJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sUUFBUSxDQUFDLGdCQUFnQixLQUFLLFVBQVUsRUFBRTtZQUMzRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBVyxDQUFDO1NBQ3ZDO0lBQ0QsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUFpQjtRQUN0QixPQUFPLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELGdCQUFnQixDQUFDLE9BQW9CLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtRQUN2RSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRXBDLDhFQUE4RTtRQUM5RSw0RkFBNEY7UUFDNUYseUZBQXlGO1FBQ3pGLGlDQUFpQztRQUNqQyx1RkFBdUY7UUFDdkYsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFO1lBQ3ZCLE1BQU0sUUFBUSxHQUNaLCtCQUErQixDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV2RixzQ0FBc0M7WUFDdEMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDaEUsT0FBTyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRixDQUFDLENBQUM7UUFFRiwwRkFBMEY7UUFDMUYsMkJBQTJCO1FBQzNCLHdGQUF3RjtRQUN4Rix3RkFBd0Y7UUFDeEYsd0ZBQXdGO1FBQ3hGLHFDQUFxQztRQUNyQyx3RkFBd0Y7UUFDeEYsaUZBQWlGO1FBQ2pGLHFGQUFxRjtRQUNyRixtQ0FBbUM7UUFDbkMsRUFBRTtRQUNGLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUMvQixJQUFJLEVBQVksQ0FBQztZQUNqQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE9BQU8sR0FBRyxFQUFFO2dCQUNSLElBQUksRUFBRSxFQUFFO29CQUFFLEVBQUUsRUFBRSxDQUFDO2lCQUFFO1lBQ3JCLENBQUMsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs4R0FoRFEscUJBQXFCO2tIQUFyQixxQkFBcUI7OzJGQUFyQixxQkFBcUI7a0JBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBoZWF2aWx5IGluc3BpcmVkIGJ5OlxuLy8gaHR0cDovL3d3dy5iZW5uYWRlbC5jb20vYmxvZy8zMDI1LWNyZWF0aW5nLWN1c3RvbS1kb20tYW5kLWhvc3QtZXZlbnQtYmluZGluZ3MtaW4tYW5ndWxhci0yLWJldGEtNi5odG1cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vZnJhbWV3b3JrL3V0aWxzJztcblxuLy8gVE9ETzogdXNlIERJIGZhY3RvcnkgZm9yIHRoaXMuXG4vLyBUT0RPOiBjb25zb2xpZGF0ZSBkdXAgY29kZVxuY29uc3QgaXNEb2M6IGJvb2xlYW4gPSAhKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWRvY3VtZW50KTtcblxuY29uc3QgZXZlbnRNYXAgPSB7XG4gICAgY2xpY2tPdXRzaWRlOiAnY2xpY2snLFxuICAgIG1vdXNlZG93bk91dHNpZGU6ICdtb3VzZWRvd24nLFxuICAgIG1vdXNldXBPdXRzaWRlOiAnbW91c2V1cCcsXG4gICAgbW91c2Vtb3ZlT3V0c2lkZTogJ21vdXNlbW92ZSdcbn07XG5cbi8qKlxuICogQW4gZXZlbnQgaGFuZGxlciBmYWN0b3J5IGZvciBldmVudCBoYW5kbGVycyB0aGF0IGJ1YmJsZSB0aGUgZXZlbnQgdG8gYSBnaXZlbiBoYW5kbGVyXG4gKiBpZiB0aGUgZXZlbnQgdGFyZ2V0IGlzIG5vdCBhbiBhbmNlc3RvciBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqIEBwYXJhbSBlbGVtZW50XG4gKiBAcGFyYW0gaGFuZGxlclxuICovXG5mdW5jdGlvbiBidWJibGVOb25BbmNlc3RvckhhbmRsZXJGYWN0b3J5KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBoYW5kbGVyOiAoZXZlbnQpID0+IHZvaWQpIHtcbiAgICByZXR1cm4gKGV2ZW50KSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAoY3VycmVudCA9PT0gZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoY3VycmVudC5wYXJlbnROb2RlICYmICggY3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZSApKTtcblxuICAgICAgICBoYW5kbGVyKGV2ZW50KTtcbiAgICB9O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRE9NT3V0c2lkZUV2ZW50UGx1Z2luIHsgLy8gZXh0ZW5kcyBFdmVudE1hbmFnZXJQbHVnaW5cbiAgICBtYW5hZ2VyOiBFdmVudE1hbmFnZXI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAoIWlzRG9jIHx8IHR5cGVvZiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciA9IG5vb3AgYXMgYW55O1xuICAgIH1cbiAgICB9XG5cbiAgICBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZXZlbnRNYXAuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lKTtcbiAgICB9XG5cbiAgICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgICAgIGNvbnN0IHpvbmUgPSB0aGlzLm1hbmFnZXIuZ2V0Wm9uZSgpO1xuXG4gICAgICAgIC8vIEEgRmFjdG9yeSB0aGF0IHJlZ2lzdGVycyB0aGUgZXZlbnQgb24gdGhlIGRvY3VtZW50LCBpbnN0ZWFkIG9mIHRoZSBlbGVtZW50LlxuICAgICAgICAvLyB0aGUgaGFuZGxlciBpcyBjcmVhdGVkIGF0IHJ1bnRpbWUsIGFuZCBpdCBhY3RzIGFzIGEgcHJvcGFnYXRpb24vYnViYmxlIHByZWRpY2F0ZSwgaXQgd2lsbFxuICAgICAgICAvLyBidWJibGUgdXAgdGhlIGV2ZW50IChpLmU6IGV4ZWN1dGUgb3VyIG9yaWdpbmFsIGV2ZW50IGhhbmRsZXIpIG9ubHkgaWYgdGhlIGV2ZW50IHRhcmdlclxuICAgICAgICAvLyBpcyBhbiBhbmNlc3RvciBvZiBvdXIgZWxlbWVudC5cbiAgICAgICAgLy8gVGhlIGV2ZW50IGlzIGZpcmVkIGluc2lkZSB0aGUgYW5ndWxhciB6b25lIHNvIGNoYW5nZSBkZXRlY3Rpb24gY2FuIGtpY2sgaW50byBhY3Rpb24uXG4gICAgICAgIGNvbnN0IG9uY2VPbk91dHNpZGUgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lciA9XG4gICAgICAgICAgICAgIGJ1YmJsZU5vbkFuY2VzdG9ySGFuZGxlckZhY3RvcnkoZWxlbWVudCwgZXZ0ID0+IHpvbmUucnVuR3VhcmRlZCgoKSA9PiBoYW5kbGVyKGV2dCkpKTtcblxuICAgICAgICAgICAgLy8gbWltaWMgQnJvd3NlckRvbUFkYXB0ZXIub25BbmRDYW5jZWxcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRNYXBbZXZlbnROYW1lXSwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TWFwW2V2ZW50TmFtZV0sIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gd2UgcnVuIHRoZSBldmVudCByZWdpc3RyYXRpb24gZm9yIHRoZSBkb2N1bWVudCBpbiBhIGRpZmZlcmVudCB6b25lLCB0aGlzIHdpbGwgbWFrZSBzdXJlXG4gICAgICAgIC8vIGNoYW5nZSBkZXRlY3Rpb24gaXMgb2ZmLlxuICAgICAgICAvLyBJdCB0dXJucyBvdXQgdGhhdCBpZiBhIGNvbXBvbmVudCB0aGF0IHVzZSBET01PdXRzaWRlRXZlbnRQbHVnaW4gaXMgYnVpbHQgZnJvbSBhIGNsaWNrXG4gICAgICAgIC8vIGV2ZW50LCB3ZSBtaWdodCBnZXQgaGVyZSBiZWZvcmUgdGhlIGV2ZW50IHJlYWNoZWQgdGhlIGRvY3VtZW50LCBjYXVzaW5nIGEgcXVpY2sgZmFsc2VcbiAgICAgICAgLy8gcG9zaXRpdmUgaGFuZGxpbmcgKHdoZW4gc3RvcFByb3BhZ2F0aW9uKCkgd2FzJ250IGludm9rZWQpLiBUbyB3b3JrYXJvdW5kIHRoaXMgd2Ugd2FpdFxuICAgICAgICAvLyBmb3IgdGhlIG5leHQgdm0gdHVybiBhbmQgcmVnaXN0ZXIuXG4gICAgICAgIC8vIEV2ZW50IHJlZ2lzdHJhdGlvbiByZXR1cm5zIGEgZGlzcG9zZSBmdW5jdGlvbiBmb3IgdGhhdCBldmVudCwgYW5ndWxhciB1c2UgaXQgdG8gY2xlYW5cbiAgICAgICAgLy8gdXAgYWZ0ZXIgY29tcG9uZW50IGdldCdzIGRlc3Ryb3llZC4gU2luY2Ugd2UgbmVlZCB0byByZXR1cm4gYSBkaXNwb3NlIGZ1bmN0aW9uXG4gICAgICAgIC8vIHN5bmNocm9ub3VzbHkgd2UgaGF2ZSB0byBwdXQgYSB3cmFwcGVyIGZvciBpdCBzaW5jZSB3ZSB3aWxsIGdldCBpdCBhc3luY2hyb25vdXNseSxcbiAgICAgICAgLy8gaS5lOiBhZnRlciB3ZSBuZWVkIHRvIHJldHVybiBpdC5cbiAgICAgICAgLy9cbiAgICAgICAgcmV0dXJuIHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZuOiBGdW5jdGlvbjtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZm4gPSBvbmNlT25PdXRzaWRlKCksIDApO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZm4pIHsgZm4oKTsgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=