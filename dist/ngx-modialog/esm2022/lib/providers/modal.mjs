import { Injectable } from '@angular/core';
import { PromiseCompleter } from '../framework/utils';
import { combineLatest } from 'rxjs';
import { OneButtonPresetBuilder } from '../plugins/bootstrap/presets/one-button-preset';
import { PromptPresetBuilder, TwoButtonPresetBuilder } from '../plugins/bootstrap/presets/two-button-preset';
import { CSSBackdrop } from '../components/css-backdrop';
import { BSModalContainer } from '../plugins/bootstrap/modal-container.component';
import * as i0 from "@angular/core";
import * as i1 from "../overlay/index";
// TODO: use DI factory for this.
// TODO: consolidate dup code
const isDoc = !(typeof document === 'undefined' || !document);
let animationClass = 'in';
export class Modal {
    constructor(overlay) {
        this.overlay = overlay;
    }
    alert() {
        return new OneButtonPresetBuilder(this, { isBlocking: false });
    }
    prompt() {
        return new PromptPresetBuilder(this, { isBlocking: true, keyboard: null });
    }
    confirm() {
        return new TwoButtonPresetBuilder(this, { isBlocking: true, keyboard: null });
    }
    /**
     * Opens a modal window inside an existing component.
     * @param content The content to display, either string, template ref or a component.
     * @param config Additional settings.
     */
    open(content, config) {
        config = config || {};
        const dialogs = this.overlay.open(config, this.constructor);
        if (dialogs.length > 1) {
            console.warn(`Attempt to open more then 1 overlay detected.
      Multiple modal copies are not supported at the moment,
      only the first viewContainer will display.`);
        }
        // TODO:  Currently supporting 1 view container, hence working on dialogs[0].
        //        upgrade to multiple containers.
        return this.create(dialogs[0], content);
    }
    create(dialogRef, content) {
        const backdropRef = this.createBackdrop(dialogRef, CSSBackdrop);
        const containerRef = this.createContainer(dialogRef, BSModalContainer, content);
        const overlay = dialogRef.overlayRef.instance;
        const backdrop = backdropRef.instance;
        const container = containerRef.instance;
        dialogRef.inElement ? overlay.insideElement() : overlay.fullscreen();
        // add body class if this is the only dialog in the stack
        if (isDoc && !document.body.classList.contains('modal-open')) {
            document.body.classList.add('modal-open');
        }
        if (dialogRef.inElement) {
            backdrop.setStyle('position', 'absolute');
        }
        backdrop.addClass('modal-backdrop fade', true);
        backdrop.addClass(animationClass);
        container.addClass(animationClass);
        if (containerRef.location.nativeElement) {
            containerRef.location.nativeElement.focus();
        }
        overlay.beforeDestroy(() => {
            const completer = new PromiseCompleter();
            backdrop.removeClass(animationClass);
            container.removeClass(animationClass);
            combineLatest.call(backdrop.myAnimationEnd$(), container.myAnimationEnd$(), (s1, s2) => [s1, s2])
                .subscribe(sources => {
                if (isDoc && this.overlay.groupStackLength(dialogRef) === 1) {
                    document.body.classList.remove('modal-open');
                }
                completer.resolve();
            });
            return completer.promise;
        });
        return dialogRef;
    }
    createBackdrop(dialogRef, BackdropComponent) {
        return dialogRef.overlayRef.instance.addComponent(BackdropComponent);
    }
    createContainer(dialogRef, ContainerComponent, content) {
        const nodes = dialogRef.overlayRef.instance.getProjectables(content);
        return dialogRef.overlayRef.instance.addComponent(ContainerComponent, nodes);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: Modal, deps: [{ token: i1.Overlay }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: Modal, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: Modal, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.Overlay }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtbW9kaWFsb2cvc3JjL2xpYi9wcm92aWRlcnMvbW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHekQsT0FBTyxFQUFTLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUM3RyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7OztBQUdsRixpQ0FBaUM7QUFDakMsNkJBQTZCO0FBQzdCLE1BQU0sS0FBSyxHQUFZLENBQUMsQ0FBQyxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUV2RSxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFLMUIsTUFBTSxPQUFPLEtBQUs7SUFDaEIsWUFBbUIsT0FBZ0I7UUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztJQUNuQyxDQUFDO0lBR0QsS0FBSztRQUNILE9BQU8sSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLEVBQU8sRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLEVBQU8sRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FB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QUFDLFlBQVksQ0FBQyxDQUFDO2lCQUM5QztnQkFFRCxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFFTCxPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBR1MsY0FBYyxDQUFJLFNBQXlCLEVBQUUsaUJBQTJCO1FBQ2hGLE9BQU8sU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFJLGlCQUFpQixDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVTLGVBQWUsQ0FDdkIsU0FBeUIsRUFDekIsa0JBQTRCLEVBQzVCLE9BQXlCO1FBRXpCLE1BQU0sS0FBSyxHQUFVLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1RSxPQUFPLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBSSxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRixDQUFDOzhHQWpHVSxLQUFLO2tIQUFMLEtBQUssY0FGSixNQUFNOzsyRkFFUCxLQUFLO2tCQUhqQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPdmVybGF5IH0gZnJvbSAnLi4vb3ZlcmxheS9pbmRleCc7XG5pbXBvcnQgeyBDbGFzcywgUHJvbWlzZUNvbXBsZXRlciB9IGZyb20gJy4uL2ZyYW1ld29yay91dGlscyc7XG5pbXBvcnQgeyBPdmVybGF5Q29uZmlnLCBDb250YWluZXJDb250ZW50IH0gZnJvbSAnLi4vbW9kZWxzL3Rva2Vucyc7XG5pbXBvcnQgeyBEaWFsb2dSZWYgfSBmcm9tICcuLi9tb2RlbHMvZGlhbG9nLXJlZic7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPbmVCdXR0b25QcmVzZXRCdWlsZGVyIH0gZnJvbSAnLi4vcGx1Z2lucy9ib290c3RyYXAvcHJlc2V0cy9vbmUtYnV0dG9uLXByZXNldCc7XG5pbXBvcnQgeyBQcm9tcHRQcmVzZXRCdWlsZGVyLCBUd29CdXR0b25QcmVzZXRCdWlsZGVyIH0gZnJvbSAnLi4vcGx1Z2lucy9ib290c3RyYXAvcHJlc2V0cy90d28tYnV0dG9uLXByZXNldCc7XG5pbXBvcnQgeyBDU1NCYWNrZHJvcCB9IGZyb20gJy4uL2NvbXBvbmVudHMvY3NzLWJhY2tkcm9wJztcbmltcG9ydCB7IEJTTW9kYWxDb250YWluZXIgfSBmcm9tICcuLi9wbHVnaW5zL2Jvb3RzdHJhcC9tb2RhbC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERyb3BJblByZXNldEJ1aWxkZXIgfSBmcm9tICcuLi8uLi9wdWJsaWNfYXBpJztcblxuLy8gVE9ETzogdXNlIERJIGZhY3RvcnkgZm9yIHRoaXMuXG4vLyBUT0RPOiBjb25zb2xpZGF0ZSBkdXAgY29kZVxuY29uc3QgaXNEb2M6IGJvb2xlYW4gPSAhKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWRvY3VtZW50KTtcblxubGV0IGFuaW1hdGlvbkNsYXNzID0gJ2luJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3ZlcmxheTogT3ZlcmxheSkge1xuICB9XG5cblxuICBhbGVydCgpOiBPbmVCdXR0b25QcmVzZXRCdWlsZGVyfCBEcm9wSW5QcmVzZXRCdWlsZGVyIHtcbiAgICByZXR1cm4gbmV3IE9uZUJ1dHRvblByZXNldEJ1aWxkZXIodGhpcywgPGFueT57aXNCbG9ja2luZzogZmFsc2V9KTtcbiAgfVxuXG4gIHByb21wdCgpOiBQcm9tcHRQcmVzZXRCdWlsZGVyIHwgRHJvcEluUHJlc2V0QnVpbGRlciB7XG4gICAgcmV0dXJuIG5ldyBQcm9tcHRQcmVzZXRCdWlsZGVyKHRoaXMsIDxhbnk+e2lzQmxvY2tpbmc6IHRydWUsIGtleWJvYXJkOiBudWxsfSk7XG4gIH1cblxuICBjb25maXJtKCk6IFR3b0J1dHRvblByZXNldEJ1aWxkZXIgfCBEcm9wSW5QcmVzZXRCdWlsZGVyIHtcbiAgICByZXR1cm4gbmV3IFR3b0J1dHRvblByZXNldEJ1aWxkZXIodGhpcywgPGFueT57aXNCbG9ja2luZzogdHJ1ZSwga2V5Ym9hcmQ6IG51bGx9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBhIG1vZGFsIHdpbmRvdyBpbnNpZGUgYW4gZXhpc3RpbmcgY29tcG9uZW50LlxuICAgKiBAcGFyYW0gY29udGVudCBUaGUgY29udGVudCB0byBkaXNwbGF5LCBlaXRoZXIgc3RyaW5nLCB0ZW1wbGF0ZSByZWYgb3IgYSBjb21wb25lbnQuXG4gICAqIEBwYXJhbSBjb25maWcgQWRkaXRpb25hbCBzZXR0aW5ncy5cbiAgICovXG4gIG9wZW4oY29udGVudDogQ29udGFpbmVyQ29udGVudCwgY29uZmlnPzogT3ZlcmxheUNvbmZpZyk6IERpYWxvZ1JlZjxhbnk+IHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge30gYXMgYW55O1xuICAgIGNvbnN0IGRpYWxvZ3MgPSB0aGlzLm92ZXJsYXkub3Blbihjb25maWcsIHRoaXMuY29uc3RydWN0b3IpO1xuXG4gICAgaWYgKGRpYWxvZ3MubGVuZ3RoID4gMSkge1xuICAgICAgY29uc29sZS53YXJuKGBBdHRlbXB0IHRvIG9wZW4gbW9yZSB0aGVuIDEgb3ZlcmxheSBkZXRlY3RlZC5cbiAgICAgIE11bHRpcGxlIG1vZGFsIGNvcGllcyBhcmUgbm90IHN1cHBvcnRlZCBhdCB0aGUgbW9tZW50LFxuICAgICAgb25seSB0aGUgZmlyc3Qgdmlld0NvbnRhaW5lciB3aWxsIGRpc3BsYXkuYCk7XG4gICAgfVxuICAgIC8vIFRPRE86ICBDdXJyZW50bHkgc3VwcG9ydGluZyAxIHZpZXcgY29udGFpbmVyLCBoZW5jZSB3b3JraW5nIG9uIGRpYWxvZ3NbMF0uXG4gICAgLy8gICAgICAgIHVwZ3JhZGUgdG8gbXVsdGlwbGUgY29udGFpbmVycy5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGUoZGlhbG9nc1swXSwgY29udGVudCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlKGRpYWxvZ1JlZjogRGlhbG9nUmVmPGFueT4sIGNvbnRlbnQ6IENvbnRhaW5lckNvbnRlbnQpOiBEaWFsb2dSZWY8YW55PiB7XG5cbiAgICBjb25zdCBiYWNrZHJvcFJlZiA9IHRoaXMuY3JlYXRlQmFja2Ryb3AoZGlhbG9nUmVmLCBDU1NCYWNrZHJvcCk7XG4gICAgY29uc3QgY29udGFpbmVyUmVmID0gdGhpcy5jcmVhdGVDb250YWluZXIoZGlhbG9nUmVmLCBCU01vZGFsQ29udGFpbmVyLCBjb250ZW50KTtcblxuICAgIGNvbnN0IG92ZXJsYXkgPSBkaWFsb2dSZWYub3ZlcmxheVJlZi5pbnN0YW5jZTtcbiAgICBjb25zdCBiYWNrZHJvcCA9IGJhY2tkcm9wUmVmLmluc3RhbmNlO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRhaW5lclJlZi5pbnN0YW5jZTtcblxuICAgIGRpYWxvZ1JlZi5pbkVsZW1lbnQgPyBvdmVybGF5Lmluc2lkZUVsZW1lbnQoKSA6IG92ZXJsYXkuZnVsbHNjcmVlbigpO1xuXG4gICAgLy8gYWRkIGJvZHkgY2xhc3MgaWYgdGhpcyBpcyB0aGUgb25seSBkaWFsb2cgaW4gdGhlIHN0YWNrXG4gICAgaWYgKGlzRG9jICYmICFkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucygnbW9kYWwtb3BlbicpKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ21vZGFsLW9wZW4nKTtcbiAgICB9XG5cblxuICAgIGlmIChkaWFsb2dSZWYuaW5FbGVtZW50KSB7XG4gICAgICBiYWNrZHJvcC5zZXRTdHlsZSgncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICB9XG4gICAgYmFja2Ryb3AuYWRkQ2xhc3MoJ21vZGFsLWJhY2tkcm9wIGZhZGUnLCB0cnVlKTtcblxuICAgIGJhY2tkcm9wLmFkZENsYXNzKGFuaW1hdGlvbkNsYXNzKTtcbiAgICBjb250YWluZXIuYWRkQ2xhc3MoYW5pbWF0aW9uQ2xhc3MpO1xuXG4gICAgaWYgKGNvbnRhaW5lclJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICBjb250YWluZXJSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIG92ZXJsYXkuYmVmb3JlRGVzdHJveSgoKSA9PiB7XG4gICAgICBjb25zdCBjb21wbGV0ZXIgPSBuZXcgUHJvbWlzZUNvbXBsZXRlcjx2b2lkPigpO1xuICAgICAgYmFja2Ryb3AucmVtb3ZlQ2xhc3MoYW5pbWF0aW9uQ2xhc3MpO1xuICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKGFuaW1hdGlvbkNsYXNzKTtcblxuICAgICAgY29tYmluZUxhdGVzdC5jYWxsKGJhY2tkcm9wLm15QW5pbWF0aW9uRW5kJCgpLCBjb250YWluZXIubXlBbmltYXRpb25FbmQkKCksIChzMSwgczIpID0+IFtzMSwgczJdKVxuICAgICAgICAuc3Vic2NyaWJlKHNvdXJjZXMgPT4ge1xuICAgICAgICAgIGlmIChpc0RvYyAmJiB0aGlzLm92ZXJsYXkuZ3JvdXBTdGFja0xlbmd0aChkaWFsb2dSZWYpID09PSAxKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLW9wZW4nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb21wbGV0ZXIucmVzb2x2ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgcmV0dXJuIGNvbXBsZXRlci5wcm9taXNlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpYWxvZ1JlZjtcbiAgfVxuXG5cbiAgcHJvdGVjdGVkIGNyZWF0ZUJhY2tkcm9wPFQ+KGRpYWxvZ1JlZjogRGlhbG9nUmVmPGFueT4sIEJhY2tkcm9wQ29tcG9uZW50OiBDbGFzczxUPik6IENvbXBvbmVudFJlZjxUPiB7XG4gICAgcmV0dXJuIGRpYWxvZ1JlZi5vdmVybGF5UmVmLmluc3RhbmNlLmFkZENvbXBvbmVudDxUPihCYWNrZHJvcENvbXBvbmVudCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlQ29udGFpbmVyPFQ+KFxuICAgIGRpYWxvZ1JlZjogRGlhbG9nUmVmPGFueT4sXG4gICAgQ29udGFpbmVyQ29tcG9uZW50OiBDbGFzczxUPixcbiAgICBjb250ZW50OiBDb250YWluZXJDb250ZW50KTogQ29tcG9uZW50UmVmPFQ+IHtcblxuICAgIGNvbnN0IG5vZGVzOiBhbnlbXSA9IGRpYWxvZ1JlZi5vdmVybGF5UmVmLmluc3RhbmNlLmdldFByb2plY3RhYmxlcyhjb250ZW50KTtcbiAgICByZXR1cm4gZGlhbG9nUmVmLm92ZXJsYXlSZWYuaW5zdGFuY2UuYWRkQ29tcG9uZW50PFQ+KENvbnRhaW5lckNvbXBvbmVudCwgbm9kZXMpO1xuICB9XG5cbn1cbiJdfQ==