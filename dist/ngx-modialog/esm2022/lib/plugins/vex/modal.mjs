import { combineLatest } from 'rxjs';
import { Injectable } from '@angular/core';
import { DROP_IN_TYPE, Modal as Modal_, CSSBackdrop, CSSDialogContainer, PromiseCompleter } from '../../../public_api';
import { DropInPresetBuilder } from './presets/dropin-preset';
import { VexCSSDialogContainer } from './vex-css-dialog-container';
import * as i0 from "@angular/core";
import * as i1 from "../../../public_api";
// TODO: use DI factory for this.
// TODO: consolidate dup code
const isDoc = !(typeof document === 'undefined' || !document);
let vexV3 = false;
/**
 * Execute this method to flag that you are working with VEX version 3.
 */
export function vexV3Mode() {
    vexV3 = true;
}
export class Modal extends Modal_ {
    constructor(overlay) {
        super(overlay);
    }
    alert() {
        return new DropInPresetBuilder(this, DROP_IN_TYPE.alert, { isBlocking: false });
    }
    prompt() {
        return new DropInPresetBuilder(this, DROP_IN_TYPE.prompt, {
            isBlocking: true,
            keyboard: null
        });
    }
    confirm() {
        return new DropInPresetBuilder(this, DROP_IN_TYPE.confirm, {
            isBlocking: true,
            keyboard: null
        });
    }
    create(dialogRef, content) {
        if (vexV3 === true) {
            return this.createV3(dialogRef, content);
        }
        const backdropRef = this.createBackdrop(dialogRef, CSSBackdrop);
        const containerRef = this.createContainer(dialogRef, VexCSSDialogContainer, content);
        let overlay = dialogRef.overlayRef.instance;
        let backdrop = backdropRef.instance;
        let container = containerRef.instance;
        if (dialogRef.inElement) {
            overlay.insideElement();
            overlay.setContainerStyle('position', 'relative')
                .setContainerStyle('height', '100%')
                .setContainerStyle('width', '100%');
            backdrop.setStyle('position', 'absolute')
                .setStyle('display', 'block')
                .setStyle('height', '100%')
                .setStyle('width', '100%');
            container.setStyle('position', 'relative')
                .setStyle('display', 'block')
                .setStyle('height', '100%')
                .setStyle('width', '100%');
        }
        else {
            overlay.fullscreen();
        }
        // add body class if this is the only dialog in the stack
        if (isDoc && !document.body.classList.contains('vex-open')) {
            document.body.classList.add('vex-open');
        }
        backdrop.addClass('vex-overlay');
        container.addClass(`vex vex-theme-${dialogRef.context.className}`);
        container.setStyle('display', 'block');
        if (containerRef.location.nativeElement) {
            containerRef.location.nativeElement.focus();
        }
        overlay.beforeDestroy(() => {
            backdrop.addClass('vex-closing');
            container.addClass('vex-closing');
            const completer = new PromiseCompleter();
            let animationEnd$ = backdrop.myAnimationEnd$();
            // TODO: the child element inside the container (vex-content) is the one with animation
            // need to also wait for it to end, but this requires a reference to to it.
            // the container itself is its parent, won't do.
            // animationEnd$ = combineLatest.call(animationEnd$, container.myAnimationEnd$(), (s1, s2) => [s1,s2] );
            animationEnd$.subscribe(sources => {
                isDoc && this.overlay.groupStackLength(dialogRef) === 1 && document.body.classList.remove('vex-open');
                completer.resolve();
            });
            return completer.promise;
        });
        container.apply(overlay);
        return dialogRef;
    }
    createV3(dialogRef, content) {
        const backdropRef = this.createBackdrop(dialogRef, CSSBackdrop);
        const containerRef = this.createContainer(dialogRef, CSSDialogContainer, content);
        let overlay = dialogRef.overlayRef.instance;
        let backdrop = backdropRef.instance;
        let container = containerRef.instance;
        dialogRef.inElement ? overlay.insideElement() : overlay.fullscreen();
        // add body class if this is the only dialog in the stack
        if (isDoc && !document.body.classList.contains('vex-open')) {
            document.body.classList.add('vex-open');
        }
        overlay.addClass(`vex vex-theme-${dialogRef.context.className}`);
        backdrop.addClass('vex-overlay');
        container.addClass(dialogRef.context.contentClassName);
        container.setStyle('display', 'block');
        if (dialogRef.inElement) {
            overlay.setStyle('padding', '0');
            container.setStyle('margin-top', '20px');
        }
        if (containerRef.location.nativeElement) {
            containerRef.location.nativeElement.focus();
        }
        if (dialogRef.context.className === 'bottom-right-corner') {
            overlay.setStyle('overflow-y', 'hidden');
            container.setStyle('position', 'absolute');
        }
        overlay.beforeDestroy(() => {
            overlay.addClass('vex-closing');
            const completer = new PromiseCompleter();
            let animationEnd$ = container.myAnimationEnd$();
            if (dialogRef.context.className !== 'bottom-right-corner') {
                animationEnd$ = combineLatest.call(animationEnd$, backdrop.myAnimationEnd$(), (s1, s2) => [s1, s2]);
            }
            animationEnd$.subscribe(sources => {
                isDoc && this.overlay.groupStackLength(dialogRef) === 1 && document.body.classList.remove('vex-open');
                completer.resolve();
            });
            return completer.promise;
        });
        overlay.setClickBoundary(containerRef.location.nativeElement);
        return dialogRef;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtbW9kaWFsb2cvc3JjL2xpYi9wbHVnaW5zL3ZleC9tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWpELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUlMLFlBQVksRUFDWixLQUFLLElBQUksTUFBTSxFQUNmLFdBQVcsRUFDWCxrQkFBa0IsRUFDbEIsZ0JBQWdCLEVBQ2pCLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7OztBQUVuRSxpQ0FBaUM7QUFDakMsNkJBQTZCO0FBQzdCLE1BQU0sS0FBSyxHQUFZLENBQUMsQ0FBQyxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUV2RSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbEI7O0dBRUc7QUFDSCxNQUFNLFVBQVUsU0FBUztJQUN2QixLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2YsQ0FBQztBQUtELE1BQU0sT0FBTyxLQUFNLFNBQVEsTUFBTTtJQUMvQixZQUFZLE9BQWdCO1FBQzFCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsS0FBSztRQUNILE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQVEsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxJQUFJLG1CQUFtQixDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQ3hE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ekQsYUFBYSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7YUFDckc7WUFFRCxhQUFhLENBQUMsU0FBUyxDQUFFLE9BQU8sQ0FBQyxFQUFFO2dCQUNqQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN0RyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFHSCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU5RCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDOzhHQXRKVSxLQUFLO2tIQUFMLEtBQUssY0FGSixNQUFNOzsyRkFFUCxLQUFLO2tCQUhqQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBDb250YWluZXJDb250ZW50LFxuICBPdmVybGF5LFxuICBEaWFsb2dSZWYsXG4gIERST1BfSU5fVFlQRSxcbiAgTW9kYWwgYXMgTW9kYWxfLFxuICBDU1NCYWNrZHJvcCxcbiAgQ1NTRGlhbG9nQ29udGFpbmVyLFxuICBQcm9taXNlQ29tcGxldGVyXG59IGZyb20gJy4uLy4uLy4uL3B1YmxpY19hcGknO1xuXG5pbXBvcnQgeyBEcm9wSW5QcmVzZXRCdWlsZGVyIH0gZnJvbSAnLi9wcmVzZXRzL2Ryb3Bpbi1wcmVzZXQnO1xuaW1wb3J0IHsgVmV4Q1NTRGlhbG9nQ29udGFpbmVyIH0gZnJvbSAnLi92ZXgtY3NzLWRpYWxvZy1jb250YWluZXInO1xuXG4vLyBUT0RPOiB1c2UgREkgZmFjdG9yeSBmb3IgdGhpcy5cbi8vIFRPRE86IGNvbnNvbGlkYXRlIGR1cCBjb2RlXG5jb25zdCBpc0RvYzogYm9vbGVhbiA9ICEodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJyB8fCAhZG9jdW1lbnQpO1xuXG5sZXQgdmV4VjMgPSBmYWxzZTtcbi8qKlxuICogRXhlY3V0ZSB0aGlzIG1ldGhvZCB0byBmbGFnIHRoYXQgeW91IGFyZSB3b3JraW5nIHdpdGggVkVYIHZlcnNpb24gMy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZleFYzTW9kZSgpOiB2b2lkIHtcbiAgdmV4VjMgPSB0cnVlO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBNb2RhbCBleHRlbmRzIE1vZGFsX3tcbiAgY29uc3RydWN0b3Iob3ZlcmxheTogT3ZlcmxheSkge1xuICAgIHN1cGVyKG92ZXJsYXkpO1xuICB9XG5cbiAgYWxlcnQoKTogRHJvcEluUHJlc2V0QnVpbGRlciB7XG4gICAgcmV0dXJuIG5ldyBEcm9wSW5QcmVzZXRCdWlsZGVyKHRoaXMsIERST1BfSU5fVFlQRS5hbGVydCwge2lzQmxvY2tpbmc6IGZhbHNlfSBhcyBhbnkpO1xuICB9XG5cbiAgcHJvbXB0KCk6IERyb3BJblByZXNldEJ1aWxkZXIge1xuICAgIHJldHVybiBuZXcgRHJvcEluUHJlc2V0QnVpbGRlcih0aGlzLCBEUk9QX0lOX1RZUEUucHJvbXB0LCB7XG4gICAgICBpc0Jsb2NraW5nOiB0cnVlLFxuICAgICAga2V5Ym9hcmQ6IG51bGxcbiAgICB9ICBhcyBhbnkpO1xuICB9XG5cbiAgY29uZmlybSgpOiBEcm9wSW5QcmVzZXRCdWlsZGVyIHtcbiAgICByZXR1cm4gbmV3IERyb3BJblByZXNldEJ1aWxkZXIodGhpcywgRFJPUF9JTl9UWVBFLmNvbmZpcm0sIHtcbiAgICAgIGlzQmxvY2tpbmc6IHRydWUsXG4gICAgICBrZXlib2FyZDogbnVsbFxuICAgIH0gIGFzIGFueSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlKGRpYWxvZ1JlZjogRGlhbG9nUmVmPGFueT4sIGNvbnRlbnQ6IENvbnRhaW5lckNvbnRlbnQpOiBEaWFsb2dSZWY8YW55PiB7XG4gICAgaWYgKHZleFYzID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVWMyhkaWFsb2dSZWYsIGNvbnRlbnQpO1xuICAgIH1cblxuICAgIGNvbnN0IGJhY2tkcm9wUmVmID0gdGhpcy5jcmVhdGVCYWNrZHJvcChkaWFsb2dSZWYsIENTU0JhY2tkcm9wKTtcbiAgICBjb25zdCBjb250YWluZXJSZWYgPSB0aGlzLmNyZWF0ZUNvbnRhaW5lcihkaWFsb2dSZWYsIFZleENTU0RpYWxvZ0NvbnRhaW5lciwgY29udGVudCk7XG5cbiAgICBsZXQgb3ZlcmxheSA9IGRpYWxvZ1JlZi5vdmVybGF5UmVmLmluc3RhbmNlO1xuICAgIGxldCBiYWNrZHJvcCA9IGJhY2tkcm9wUmVmLmluc3RhbmNlO1xuICAgIGxldCBjb250YWluZXIgPSBjb250YWluZXJSZWYuaW5zdGFuY2U7XG5cbiAgICBpZiAoZGlhbG9nUmVmLmluRWxlbWVudCkge1xuICAgICAgb3ZlcmxheS5pbnNpZGVFbGVtZW50KCk7XG5cbiAgICAgIG92ZXJsYXkuc2V0Q29udGFpbmVyU3R5bGUoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJylcbiAgICAgICAgLnNldENvbnRhaW5lclN0eWxlKCdoZWlnaHQnLCAnMTAwJScpXG4gICAgICAgIC5zZXRDb250YWluZXJTdHlsZSgnd2lkdGgnLCAnMTAwJScpO1xuXG4gICAgICBiYWNrZHJvcC5zZXRTdHlsZSgncG9zaXRpb24nLCAnYWJzb2x1dGUnKVxuICAgICAgICAuc2V0U3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKVxuICAgICAgICAuc2V0U3R5bGUoJ2hlaWdodCcsICcxMDAlJylcbiAgICAgICAgLnNldFN0eWxlKCd3aWR0aCcsICcxMDAlJyk7XG5cbiAgICAgIGNvbnRhaW5lci5zZXRTdHlsZSgncG9zaXRpb24nLCAncmVsYXRpdmUnKVxuICAgICAgICAuc2V0U3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKVxuICAgICAgICAuc2V0U3R5bGUoJ2hlaWdodCcsICcxMDAlJylcbiAgICAgICAgLnNldFN0eWxlKCd3aWR0aCcsICcxMDAlJyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgb3ZlcmxheS5mdWxsc2NyZWVuKCk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGJvZHkgY2xhc3MgaWYgdGhpcyBpcyB0aGUgb25seSBkaWFsb2cgaW4gdGhlIHN0YWNrXG4gICAgaWYgKGlzRG9jICYmICFkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucygndmV4LW9wZW4nKSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCd2ZXgtb3BlbicpO1xuICAgIH1cblxuICAgIGJhY2tkcm9wLmFkZENsYXNzKCd2ZXgtb3ZlcmxheScpO1xuICAgIGNvbnRhaW5lci5hZGRDbGFzcyhgdmV4IHZleC10aGVtZS0ke2RpYWxvZ1JlZi5jb250ZXh0LmNsYXNzTmFtZX1gKTtcblxuICAgIGNvbnRhaW5lci5zZXRTdHlsZSgnZGlzcGxheScsICdibG9jaycpO1xuXG4gICAgaWYgKGNvbnRhaW5lclJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICBjb250YWluZXJSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIG92ZXJsYXkuYmVmb3JlRGVzdHJveSgoKSA9PiB7XG4gICAgICBiYWNrZHJvcC5hZGRDbGFzcygndmV4LWNsb3NpbmcnKTtcbiAgICAgIGNvbnRhaW5lci5hZGRDbGFzcygndmV4LWNsb3NpbmcnKTtcbiAgICAgIGNvbnN0IGNvbXBsZXRlciA9IG5ldyBQcm9taXNlQ29tcGxldGVyPHZvaWQ+KCk7XG5cbiAgICAgIGxldCBhbmltYXRpb25FbmQkOiBPYnNlcnZhYmxlPGFueT4gPSBiYWNrZHJvcC5teUFuaW1hdGlvbkVuZCQoKTtcblxuICAgICAgLy8gVE9ETzogdGhlIGNoaWxkIGVsZW1lbnQgaW5zaWRlIHRoZSBjb250YWluZXIgKHZleC1jb250ZW50KSBpcyB0aGUgb25lIHdpdGggYW5pbWF0aW9uXG4gICAgICAvLyBuZWVkIHRvIGFsc28gd2FpdCBmb3IgaXQgdG8gZW5kLCBidXQgdGhpcyByZXF1aXJlcyBhIHJlZmVyZW5jZSB0byB0byBpdC5cbiAgICAgIC8vIHRoZSBjb250YWluZXIgaXRzZWxmIGlzIGl0cyBwYXJlbnQsIHdvbid0IGRvLlxuICAgICAgLy8gYW5pbWF0aW9uRW5kJCA9IGNvbWJpbmVMYXRlc3QuY2FsbChhbmltYXRpb25FbmQkLCBjb250YWluZXIubXlBbmltYXRpb25FbmQkKCksIChzMSwgczIpID0+IFtzMSxzMl0gKTtcblxuICAgICAgYW5pbWF0aW9uRW5kJC5zdWJzY3JpYmUoIHNvdXJjZXMgPT4ge1xuICAgICAgICBpc0RvYyAmJiB0aGlzLm92ZXJsYXkuZ3JvdXBTdGFja0xlbmd0aChkaWFsb2dSZWYpID09PSAxICYmIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgndmV4LW9wZW4nKTtcbiAgICAgICAgY29tcGxldGVyLnJlc29sdmUoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gY29tcGxldGVyLnByb21pc2U7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIuYXBwbHkob3ZlcmxheSk7XG5cbiAgICByZXR1cm4gZGlhbG9nUmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVWMyhkaWFsb2dSZWY6IERpYWxvZ1JlZjxhbnk+LCBjb250ZW50OiBDb250YWluZXJDb250ZW50KTogRGlhbG9nUmVmPGFueT4ge1xuXG4gICAgY29uc3QgYmFja2Ryb3BSZWYgPSB0aGlzLmNyZWF0ZUJhY2tkcm9wKGRpYWxvZ1JlZiwgQ1NTQmFja2Ryb3ApO1xuICAgIGNvbnN0IGNvbnRhaW5lclJlZiA9IHRoaXMuY3JlYXRlQ29udGFpbmVyKGRpYWxvZ1JlZiwgQ1NTRGlhbG9nQ29udGFpbmVyLCBjb250ZW50KTtcblxuICAgIGxldCBvdmVybGF5ID0gZGlhbG9nUmVmLm92ZXJsYXlSZWYuaW5zdGFuY2U7XG4gICAgbGV0IGJhY2tkcm9wID0gYmFja2Ryb3BSZWYuaW5zdGFuY2U7XG4gICAgbGV0IGNvbnRhaW5lciA9IGNvbnRhaW5lclJlZi5pbnN0YW5jZTtcblxuICAgIGRpYWxvZ1JlZi5pbkVsZW1lbnQgPyBvdmVybGF5Lmluc2lkZUVsZW1lbnQoKSA6IG92ZXJsYXkuZnVsbHNjcmVlbigpO1xuXG4gICAgLy8gYWRkIGJvZHkgY2xhc3MgaWYgdGhpcyBpcyB0aGUgb25seSBkaWFsb2cgaW4gdGhlIHN0YWNrXG4gICAgaWYgKGlzRG9jICYmICFkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucygndmV4LW9wZW4nKSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCd2ZXgtb3BlbicpO1xuICAgIH1cblxuICAgIG92ZXJsYXkuYWRkQ2xhc3MoYHZleCB2ZXgtdGhlbWUtJHtkaWFsb2dSZWYuY29udGV4dC5jbGFzc05hbWV9YCk7XG4gICAgYmFja2Ryb3AuYWRkQ2xhc3MoJ3ZleC1vdmVybGF5Jyk7XG4gICAgY29udGFpbmVyLmFkZENsYXNzKGRpYWxvZ1JlZi5jb250ZXh0LmNvbnRlbnRDbGFzc05hbWUpO1xuICAgIGNvbnRhaW5lci5zZXRTdHlsZSgnZGlzcGxheScsICdibG9jaycpO1xuICAgIGlmIChkaWFsb2dSZWYuaW5FbGVtZW50KSB7XG4gICAgICBvdmVybGF5LnNldFN0eWxlKCdwYWRkaW5nJywgJzAnKTtcbiAgICAgIGNvbnRhaW5lci5zZXRTdHlsZSgnbWFyZ2luLXRvcCcsICcyMHB4Jyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRhaW5lclJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICBjb250YWluZXJSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGlmIChkaWFsb2dSZWYuY29udGV4dC5jbGFzc05hbWUgPT09ICdib3R0b20tcmlnaHQtY29ybmVyJykge1xuICAgICAgb3ZlcmxheS5zZXRTdHlsZSgnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcbiAgICAgIGNvbnRhaW5lci5zZXRTdHlsZSgncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICB9XG5cbiAgICBvdmVybGF5LmJlZm9yZURlc3Ryb3koKCkgPT4ge1xuICAgICAgb3ZlcmxheS5hZGRDbGFzcygndmV4LWNsb3NpbmcnKTtcbiAgICAgIGNvbnN0IGNvbXBsZXRlciA9IG5ldyBQcm9taXNlQ29tcGxldGVyPHZvaWQ+KCk7XG5cbiAgICAgIGxldCBhbmltYXRpb25FbmQkOiBPYnNlcnZhYmxlPGFueT4gPSBjb250YWluZXIubXlBbmltYXRpb25FbmQkKCk7XG4gICAgICBpZiAoZGlhbG9nUmVmLmNvbnRleHQuY2xhc3NOYW1lICE9PSAnYm90dG9tLXJpZ2h0LWNvcm5lcicpIHtcbiAgICAgICAgYW5pbWF0aW9uRW5kJCA9IGNvbWJpbmVMYXRlc3QuY2FsbChhbmltYXRpb25FbmQkLCBiYWNrZHJvcC5teUFuaW1hdGlvbkVuZCQoKSwgKHMxLCBzMikgPT4gW3MxLHMyXSApO1xuICAgICAgfVxuXG4gICAgICBhbmltYXRpb25FbmQkLnN1YnNjcmliZSggc291cmNlcyA9PiB7XG4gICAgICAgIGlzRG9jICYmIHRoaXMub3ZlcmxheS5ncm91cFN0YWNrTGVuZ3RoKGRpYWxvZ1JlZikgPT09IDEgJiYgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCd2ZXgtb3BlbicpO1xuICAgICAgICBjb21wbGV0ZXIucmVzb2x2ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBjb21wbGV0ZXIucHJvbWlzZTtcbiAgICB9KTtcblxuXG4gICAgb3ZlcmxheS5zZXRDbGlja0JvdW5kYXJ5KGNvbnRhaW5lclJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcblxuICAgIHJldHVybiBkaWFsb2dSZWY7XG4gIH1cbn1cbiJdfQ==