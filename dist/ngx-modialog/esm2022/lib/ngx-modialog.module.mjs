import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { DOMOutsideEventPlugin, DOMOverlayRenderer, Modal } from './providers/index';
import { OverlayRenderer } from './models/tokens';
import { CSSBackdrop, CSSDialogContainer } from './components/index';
import { Overlay, ModalOverlay, OverlayDialogBoundary, OverlayTarget } from './overlay/index';
import { BSModalContainer } from './plugins/bootstrap/modal-container.component';
import { BSMessageModal, BSMessageModalTitle, BSMessageModalBody, BSModalFooter } from './plugins/bootstrap/message-modal.component';
import * as i0 from "@angular/core";
export class ModalModule {
    /**
     * Returns a ModalModule pre-loaded with a list of dynamically inserted components.
     * Since dynamic components are not analysed by the angular compiler they must register manually
     * using entryComponents, this is an easy way to do it.
     * @param entryComponents A list of dynamically inserted components (dialog's).
     */
    static withComponents() {
        return {
            ngModule: ModalModule,
            providers: [
                { provide: Modal, useClass: Modal }
            ]
        };
    }
    /**
     * Returns a NgModule for use in the root Module.
     * @param entryComponents A list of dynamically inserted components (dialog's).
     */
    static forRoot() {
        return {
            ngModule: ModalModule,
            providers: [
                { provide: OverlayRenderer, useClass: DOMOverlayRenderer },
                { provide: EVENT_MANAGER_PLUGINS, useClass: DOMOutsideEventPlugin, multi: true },
                { provide: Modal, useClass: Modal }
            ]
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: ModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.7", ngImport: i0, type: ModalModule, declarations: [ModalOverlay,
            CSSBackdrop,
            CSSDialogContainer,
            OverlayDialogBoundary,
            OverlayTarget,
            BSModalFooter,
            BSMessageModalTitle,
            BSMessageModalBody,
            BSMessageModal,
            BSModalContainer], imports: [CommonModule], exports: [CSSBackdrop,
            CSSDialogContainer,
            OverlayDialogBoundary,
            OverlayTarget] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: ModalModule, providers: [
            Overlay,
            { provide: Modal, useClass: Modal }
        ], imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: ModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ModalOverlay,
                        CSSBackdrop,
                        CSSDialogContainer,
                        OverlayDialogBoundary,
                        OverlayTarget,
                        BSModalFooter,
                        BSMessageModalTitle,
                        BSMessageModalBody,
                        BSMessageModal,
                        BSModalContainer
                    ],
                    imports: [CommonModule],
                    exports: [
                        CSSBackdrop,
                        CSSDialogContainer,
                        OverlayDialogBoundary,
                        OverlayTarget
                    ],
                    providers: [
                        Overlay,
                        { provide: Modal, useClass: Modal }
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1vZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1tb2RpYWxvZy9zcmMvbGliL25neC1tb2RpYWxvZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JFLE9BQU8sRUFDTCxPQUFPLEVBQ1AsWUFBWSxFQUNaLHFCQUFxQixFQUNyQixhQUFhLEVBQ2QsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNqRixPQUFPLEVBQ0wsY0FBYyxFQUNkLG1CQUFtQixFQUNuQixrQkFBa0IsRUFDbEIsYUFBYSxFQUNkLE1BQU0sNkNBQTZDLENBQUM7O0FBMkJyRCxNQUFNLE9BQU8sV0FBVztJQUV0Qjs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxjQUFjO1FBQ25CLE9BQU87WUFDTCxRQUFRLEVBQUUsV0FBVztZQUNyQixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7YUFDcEM7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFNBQVMsRUFBRTtnQkFDVCxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFDO2dCQUN4RCxFQUFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztnQkFDOUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7YUFDcEM7U0FDRixDQUFDO0lBQ0osQ0FBQzs4R0E5QlUsV0FBVzsrR0FBWCxXQUFXLGlCQXZCaEIsWUFBWTtZQUNaLFdBQVc7WUFDWCxrQkFBa0I7WUFDbEIscUJBQXFCO1lBQ3JCLGFBQWE7WUFDYixhQUFhO1lBQ2IsbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQixjQUFjO1lBQ2QsZ0JBQWdCLGFBRVYsWUFBWSxhQUVsQixXQUFXO1lBQ1gsa0JBQWtCO1lBQ2xCLHFCQUFxQjtZQUNyQixhQUFhOytHQU9SLFdBQVcsYUFMVDtZQUNQLE9BQU87WUFDUCxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtTQUN0QyxZQVZTLFlBQVk7OzJGQVliLFdBQVc7a0JBekJ2QixRQUFRO21CQUFDO29CQUNOLFlBQVksRUFBRTt3QkFDVixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsa0JBQWtCO3dCQUNsQixxQkFBcUI7d0JBQ3JCLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixtQkFBbUI7d0JBQ25CLGtCQUFrQjt3QkFDbEIsY0FBYzt3QkFDZCxnQkFBZ0I7cUJBQ25CO29CQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFO3dCQUNMLFdBQVc7d0JBQ1gsa0JBQWtCO3dCQUNsQixxQkFBcUI7d0JBQ3JCLGFBQWE7cUJBQ2hCO29CQUNELFNBQVMsRUFBRTt3QkFDUCxPQUFPO3dCQUNQLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO3FCQUN0QztpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRVZFTlRfTUFOQUdFUl9QTFVHSU5TIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IERPTU91dHNpZGVFdmVudFBsdWdpbiwgRE9NT3ZlcmxheVJlbmRlcmVyLCBNb2RhbCB9IGZyb20gJy4vcHJvdmlkZXJzL2luZGV4JztcbmltcG9ydCB7IE92ZXJsYXlSZW5kZXJlciB9IGZyb20gJy4vbW9kZWxzL3Rva2Vucyc7XG5pbXBvcnQgeyBDU1NCYWNrZHJvcCwgQ1NTRGlhbG9nQ29udGFpbmVyIH0gZnJvbSAnLi9jb21wb25lbnRzL2luZGV4JztcbmltcG9ydCB7XG4gIE92ZXJsYXksXG4gIE1vZGFsT3ZlcmxheSxcbiAgT3ZlcmxheURpYWxvZ0JvdW5kYXJ5LFxuICBPdmVybGF5VGFyZ2V0XG59IGZyb20gJy4vb3ZlcmxheS9pbmRleCc7XG5pbXBvcnQgeyBCU01vZGFsQ29udGFpbmVyIH0gZnJvbSAnLi9wbHVnaW5zL2Jvb3RzdHJhcC9tb2RhbC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIEJTTWVzc2FnZU1vZGFsLFxuICBCU01lc3NhZ2VNb2RhbFRpdGxlLFxuICBCU01lc3NhZ2VNb2RhbEJvZHksXG4gIEJTTW9kYWxGb290ZXJcbn0gZnJvbSAnLi9wbHVnaW5zL2Jvb3RzdHJhcC9tZXNzYWdlLW1vZGFsLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1vZGFsT3ZlcmxheSxcbiAgICAgICAgQ1NTQmFja2Ryb3AsXG4gICAgICAgIENTU0RpYWxvZ0NvbnRhaW5lcixcbiAgICAgICAgT3ZlcmxheURpYWxvZ0JvdW5kYXJ5LFxuICAgICAgICBPdmVybGF5VGFyZ2V0LFxuICAgICAgICBCU01vZGFsRm9vdGVyLFxuICAgICAgICBCU01lc3NhZ2VNb2RhbFRpdGxlLFxuICAgICAgICBCU01lc3NhZ2VNb2RhbEJvZHksXG4gICAgICAgIEJTTWVzc2FnZU1vZGFsLFxuICAgICAgICBCU01vZGFsQ29udGFpbmVyXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIENTU0JhY2tkcm9wLFxuICAgICAgICBDU1NEaWFsb2dDb250YWluZXIsXG4gICAgICAgIE92ZXJsYXlEaWFsb2dCb3VuZGFyeSxcbiAgICAgICAgT3ZlcmxheVRhcmdldFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE92ZXJsYXksXG4gICAgICAgIHsgcHJvdmlkZTogTW9kYWwsIHVzZUNsYXNzOiBNb2RhbCB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbE1vZHVsZSB7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBNb2RhbE1vZHVsZSBwcmUtbG9hZGVkIHdpdGggYSBsaXN0IG9mIGR5bmFtaWNhbGx5IGluc2VydGVkIGNvbXBvbmVudHMuXG4gICAqIFNpbmNlIGR5bmFtaWMgY29tcG9uZW50cyBhcmUgbm90IGFuYWx5c2VkIGJ5IHRoZSBhbmd1bGFyIGNvbXBpbGVyIHRoZXkgbXVzdCByZWdpc3RlciBtYW51YWxseVxuICAgKiB1c2luZyBlbnRyeUNvbXBvbmVudHMsIHRoaXMgaXMgYW4gZWFzeSB3YXkgdG8gZG8gaXQuXG4gICAqIEBwYXJhbSBlbnRyeUNvbXBvbmVudHMgQSBsaXN0IG9mIGR5bmFtaWNhbGx5IGluc2VydGVkIGNvbXBvbmVudHMgKGRpYWxvZydzKS5cbiAgICovXG4gIHN0YXRpYyB3aXRoQ29tcG9uZW50cygpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE1vZGFsTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNb2RhbE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE1vZGFsLCB1c2VDbGFzczogTW9kYWwgfVxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIE5nTW9kdWxlIGZvciB1c2UgaW4gdGhlIHJvb3QgTW9kdWxlLlxuICAgKiBAcGFyYW0gZW50cnlDb21wb25lbnRzIEEgbGlzdCBvZiBkeW5hbWljYWxseSBpbnNlcnRlZCBjb21wb25lbnRzIChkaWFsb2cncykuXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE1vZGFsTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNb2RhbE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogT3ZlcmxheVJlbmRlcmVyLCB1c2VDbGFzczogRE9NT3ZlcmxheVJlbmRlcmVyfSxcbiAgICAgICAge3Byb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUywgdXNlQ2xhc3M6IERPTU91dHNpZGVFdmVudFBsdWdpbiwgbXVsdGk6IHRydWV9LFxuICAgICAgICB7IHByb3ZpZGU6IE1vZGFsLCB1c2VDbGFzczogTW9kYWwgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn0iXX0=