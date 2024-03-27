import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Directive } from '@angular/core';
import { createComponent } from '../framework/createComponent';
import * as i0 from "@angular/core";
const BROWSER_PREFIX = ['webkit', 'moz', 'MS', 'o', ''];
function register(eventName, element, cb) {
    BROWSER_PREFIX.forEach(p => {
        element.addEventListener(p ? p + eventName : eventName.toLowerCase(), cb, false);
    });
}
/**
 * A base class for supporting dynamic components.
 * There are 3 main support areas:
 * 1 - Easy wrapper for dynamic styling via CSS classes and inline styles.
 * 2 - Easy wrapper for interception of transition/animation end events.
 * 3 - Easy wrapper for component creation and injection.
 *
 * Dynamic css is done via direct element manipulation (via renderer), it does not use change detection
 * or binding. This is to allow better control over animation.
 *
 * Animation support is limited, only transition/keyframes END even are notified.
 * The animation support is needed since currently the angular animation module is limited as well and
 * does not support CSS animation that are not pre-parsed and are not in the styles metadata of a component.
 *
 * Capabilities: Add/Remove styls, Add/Remove classes, listen to animation/transition end event,
 * add components
 */
export class BaseDynamicComponent {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    activateAnimationListener() {
        if (this.animationEnd) {
            return;
        }
        this.animationEnd = new Subject();
        this.animationEnd$ = this.animationEnd.asObservable();
        register('TransitionEnd', this.el.nativeElement, (e) => this.onEnd(e));
        register('AnimationEnd', this.el.nativeElement, (e) => this.onEnd(e));
    }
    /**
     * Set a specific inline style on the overlay host element.
     * @param prop The style key
     * @param value The value, undefined to remove
     */
    setStyle(prop, value) {
        this.renderer.setStyle(this.el.nativeElement, prop, value);
        return this;
    }
    forceReflow() {
        this.el.nativeElement.offsetWidth;
    }
    addClass(css, forceReflow = false) {
        css.split(' ')
            .forEach(c => this.renderer.addClass(this.el.nativeElement, c));
        if (forceReflow) {
            this.forceReflow();
        }
    }
    removeClass(css, forceReflow = false) {
        css.split(' ')
            .forEach(c => this.renderer.removeClass(this.el.nativeElement, c));
        if (forceReflow) {
            this.forceReflow();
        }
    }
    ngOnDestroy() {
        if (this.animationEnd && !this.animationEnd.closed) {
            this.animationEnd.complete();
        }
    }
    myAnimationEnd$() {
        return this.animationEnd$.pipe(filter(e => e.target === this.el.nativeElement));
    }
    /**
     * Add a component, supply a view container ref.
     * Note: The components vcRef will result in a sibling.
     */
    _addComponent(instructions) {
        const cmpRef = createComponent(instructions);
        cmpRef.changeDetectorRef.detectChanges();
        return cmpRef;
    }
    onEnd(event) {
        if (!this.animationEnd.closed) {
            this.animationEnd.next(event);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BaseDynamicComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.7", type: BaseDynamicComponent, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BaseDynamicComponent, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1keW5hbWljLWNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1tb2RpYWxvZy9zcmMvbGliL2NvbXBvbmVudHMvYmFzZS1keW5hbWljLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBRUwsU0FBUyxFQUlWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQXVCLE1BQU0sOEJBQThCLENBQUM7O0FBRXBGLE1BQU0sY0FBYyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRXhELFNBQVMsUUFBUSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUN0QyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3pCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkYsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLE9BQU8sb0JBQW9CO0lBSy9CLFlBQXNCLEVBQWMsRUFDZCxRQUFtQjtRQURuQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUN6QyxDQUFDO0lBRUQseUJBQXlCO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksT0FBTyxFQUFvQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0RCxRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBa0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLFFBQVEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFpQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxRQUFRLENBQUMsSUFBWSxFQUFFLEtBQWE7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7SUFDcEMsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXLEVBQUUsY0FBdUIsS0FBSztRQUNoRCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNYLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxXQUFXLEVBQUU7WUFDZixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLEdBQVcsRUFBRSxjQUF1QixLQUFLO1FBQ25ELEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1gsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLFdBQVcsRUFBRTtZQUNmLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUNoRCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNPLGFBQWEsQ0FBSSxZQUFpQztRQUMxRCxNQUFNLE1BQU0sR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXpDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFHTyxLQUFLLENBQUMsS0FBdUM7UUFFbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs4R0E5RVUsb0JBQW9CO2tHQUFwQixvQkFBb0I7OzJGQUFwQixvQkFBb0I7a0JBRGhDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCwgQ3JlYXRlQ29tcG9uZW50QXJncyB9IGZyb20gJy4uL2ZyYW1ld29yay9jcmVhdGVDb21wb25lbnQnO1xuXG5jb25zdCBCUk9XU0VSX1BSRUZJWCA9IFsnd2Via2l0JywgJ21veicsICdNUycsICdvJywgJyddO1xuXG5mdW5jdGlvbiByZWdpc3RlcihldmVudE5hbWUsIGVsZW1lbnQsIGNiKSB7XG4gIEJST1dTRVJfUFJFRklYLmZvckVhY2gocCA9PiB7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHAgPyBwICsgZXZlbnROYW1lIDogZXZlbnROYW1lLnRvTG93ZXJDYXNlKCksIGNiLCBmYWxzZSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIEEgYmFzZSBjbGFzcyBmb3Igc3VwcG9ydGluZyBkeW5hbWljIGNvbXBvbmVudHMuXG4gKiBUaGVyZSBhcmUgMyBtYWluIHN1cHBvcnQgYXJlYXM6XG4gKiAxIC0gRWFzeSB3cmFwcGVyIGZvciBkeW5hbWljIHN0eWxpbmcgdmlhIENTUyBjbGFzc2VzIGFuZCBpbmxpbmUgc3R5bGVzLlxuICogMiAtIEVhc3kgd3JhcHBlciBmb3IgaW50ZXJjZXB0aW9uIG9mIHRyYW5zaXRpb24vYW5pbWF0aW9uIGVuZCBldmVudHMuXG4gKiAzIC0gRWFzeSB3cmFwcGVyIGZvciBjb21wb25lbnQgY3JlYXRpb24gYW5kIGluamVjdGlvbi5cbiAqXG4gKiBEeW5hbWljIGNzcyBpcyBkb25lIHZpYSBkaXJlY3QgZWxlbWVudCBtYW5pcHVsYXRpb24gKHZpYSByZW5kZXJlciksIGl0IGRvZXMgbm90IHVzZSBjaGFuZ2UgZGV0ZWN0aW9uXG4gKiBvciBiaW5kaW5nLiBUaGlzIGlzIHRvIGFsbG93IGJldHRlciBjb250cm9sIG92ZXIgYW5pbWF0aW9uLlxuICpcbiAqIEFuaW1hdGlvbiBzdXBwb3J0IGlzIGxpbWl0ZWQsIG9ubHkgdHJhbnNpdGlvbi9rZXlmcmFtZXMgRU5EIGV2ZW4gYXJlIG5vdGlmaWVkLlxuICogVGhlIGFuaW1hdGlvbiBzdXBwb3J0IGlzIG5lZWRlZCBzaW5jZSBjdXJyZW50bHkgdGhlIGFuZ3VsYXIgYW5pbWF0aW9uIG1vZHVsZSBpcyBsaW1pdGVkIGFzIHdlbGwgYW5kXG4gKiBkb2VzIG5vdCBzdXBwb3J0IENTUyBhbmltYXRpb24gdGhhdCBhcmUgbm90IHByZS1wYXJzZWQgYW5kIGFyZSBub3QgaW4gdGhlIHN0eWxlcyBtZXRhZGF0YSBvZiBhIGNvbXBvbmVudC5cbiAqXG4gKiBDYXBhYmlsaXRpZXM6IEFkZC9SZW1vdmUgc3R5bHMsIEFkZC9SZW1vdmUgY2xhc3NlcywgbGlzdGVuIHRvIGFuaW1hdGlvbi90cmFuc2l0aW9uIGVuZCBldmVudCxcbiAqIGFkZCBjb21wb25lbnRzXG4gKi9cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEJhc2VEeW5hbWljQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgYW5pbWF0aW9uRW5kJDogT2JzZXJ2YWJsZTxUcmFuc2l0aW9uRXZlbnQgfCBBbmltYXRpb25FdmVudD47XG5cbiAgcHJvdGVjdGVkIGFuaW1hdGlvbkVuZDogU3ViamVjdDxUcmFuc2l0aW9uRXZlbnQgfCBBbmltYXRpb25FdmVudD47XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICB9XG5cbiAgYWN0aXZhdGVBbmltYXRpb25MaXN0ZW5lcigpIHtcbiAgICBpZiAodGhpcy5hbmltYXRpb25FbmQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5hbmltYXRpb25FbmQgPSBuZXcgU3ViamVjdDxUcmFuc2l0aW9uRXZlbnQgfCBBbmltYXRpb25FdmVudD4oKTtcbiAgICB0aGlzLmFuaW1hdGlvbkVuZCQgPSB0aGlzLmFuaW1hdGlvbkVuZC5hc09ic2VydmFibGUoKTtcbiAgICByZWdpc3RlcignVHJhbnNpdGlvbkVuZCcsIHRoaXMuZWwubmF0aXZlRWxlbWVudCwgKGU6IFRyYW5zaXRpb25FdmVudCkgPT4gdGhpcy5vbkVuZChlKSk7XG4gICAgcmVnaXN0ZXIoJ0FuaW1hdGlvbkVuZCcsIHRoaXMuZWwubmF0aXZlRWxlbWVudCwgKGU6IEFuaW1hdGlvbkV2ZW50KSA9PiB0aGlzLm9uRW5kKGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSBzcGVjaWZpYyBpbmxpbmUgc3R5bGUgb24gdGhlIG92ZXJsYXkgaG9zdCBlbGVtZW50LlxuICAgKiBAcGFyYW0gcHJvcCBUaGUgc3R5bGUga2V5XG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUsIHVuZGVmaW5lZCB0byByZW1vdmVcbiAgICovXG4gIHNldFN0eWxlKHByb3A6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHRoaXMge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBwcm9wLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmb3JjZVJlZmxvdygpIHtcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gIH1cblxuICBhZGRDbGFzcyhjc3M6IHN0cmluZywgZm9yY2VSZWZsb3c6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIGNzcy5zcGxpdCgnICcpXG4gICAgICAuZm9yRWFjaChjID0+IHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBjKSk7XG4gICAgaWYgKGZvcmNlUmVmbG93KSB7XG4gICAgICB0aGlzLmZvcmNlUmVmbG93KCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoY3NzOiBzdHJpbmcsIGZvcmNlUmVmbG93OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBjc3Muc3BsaXQoJyAnKVxuICAgICAgLmZvckVhY2goYyA9PiB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgYykpO1xuICAgIGlmIChmb3JjZVJlZmxvdykge1xuICAgICAgdGhpcy5mb3JjZVJlZmxvdygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFuaW1hdGlvbkVuZCAmJiAhdGhpcy5hbmltYXRpb25FbmQuY2xvc2VkKSB7XG4gICAgICB0aGlzLmFuaW1hdGlvbkVuZC5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIG15QW5pbWF0aW9uRW5kJCgpOiBPYnNlcnZhYmxlPEFuaW1hdGlvbkV2ZW50IHwgVHJhbnNpdGlvbkV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uRW5kJC5waXBlKFxuICAgICAgZmlsdGVyKGUgPT4gZS50YXJnZXQgPT09IHRoaXMuZWwubmF0aXZlRWxlbWVudClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIGNvbXBvbmVudCwgc3VwcGx5IGEgdmlldyBjb250YWluZXIgcmVmLlxuICAgKiBOb3RlOiBUaGUgY29tcG9uZW50cyB2Y1JlZiB3aWxsIHJlc3VsdCBpbiBhIHNpYmxpbmcuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2FkZENvbXBvbmVudDxUPihpbnN0cnVjdGlvbnM6IENyZWF0ZUNvbXBvbmVudEFyZ3MpOiBDb21wb25lbnRSZWY8VD4ge1xuICAgIGNvbnN0IGNtcFJlZiA9IGNyZWF0ZUNvbXBvbmVudChpbnN0cnVjdGlvbnMpO1xuICAgIGNtcFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICByZXR1cm4gY21wUmVmO1xuICB9XG5cblxuICBwcml2YXRlIG9uRW5kKGV2ZW50OiBUcmFuc2l0aW9uRXZlbnQgfCBBbmltYXRpb25FdmVudCk6IHZvaWQge1xuXG4gICAgaWYgKCF0aGlzLmFuaW1hdGlvbkVuZC5jbG9zZWQpIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uRW5kLm5leHQoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=