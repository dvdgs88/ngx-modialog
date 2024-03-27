import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal as VexModal } from './plugins/vex/modal';
import { ModalModule } from './ngx-modialog.module';
import { Modal } from './providers/index';
import { DialogFormModal, FormDropIn, VEXDialogButtons } from './plugins/vex/dialog-form-modal';
import { VexCSSDialogContainer } from './plugins/vex/vex-css-dialog-container';
import * as i0 from "@angular/core";
export const providers = [
    { provide: Modal, useClass: VexModal },
    { provide: VexModal, useClass: VexModal }
];
export class VexModalModule {
    static getProviders() {
        return providers;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: VexModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.7", ngImport: i0, type: VexModalModule, declarations: [VexCSSDialogContainer,
            VEXDialogButtons,
            FormDropIn,
            DialogFormModal], imports: [ModalModule, CommonModule], exports: [VEXDialogButtons,
            FormDropIn,
            DialogFormModal] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: VexModalModule, providers: providers, imports: [ModalModule, CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: VexModalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ModalModule, CommonModule],
                    declarations: [
                        VexCSSDialogContainer,
                        VEXDialogButtons,
                        FormDropIn,
                        DialogFormModal
                    ],
                    exports: [
                        VEXDialogButtons,
                        FormDropIn,
                        DialogFormModal
                    ],
                    providers
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmV4LW1vZGFsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1tb2RpYWxvZy9zcmMvbGliL3ZleC1tb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLEtBQUssSUFBSSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7O0FBRS9FLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBVTtJQUM5QixFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtJQUN0QyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtDQUMxQyxDQUFDO0FBaUJGLE1BQU0sT0FBTyxjQUFjO0lBRXpCLE1BQU0sQ0FBQyxZQUFZO1FBQ2pCLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7OEdBSlUsY0FBYzsrR0FBZCxjQUFjLGlCQVpuQixxQkFBcUI7WUFDckIsZ0JBQWdCO1lBQ2hCLFVBQVU7WUFDVixlQUFlLGFBTFQsV0FBVyxFQUFFLFlBQVksYUFRakMsZ0JBQWdCO1lBQ2hCLFVBQVU7WUFDVixlQUFlOytHQUlSLGNBQWMsYUFGdkIsU0FBUyxZQVpDLFdBQVcsRUFBRSxZQUFZOzsyRkFjMUIsY0FBYztrQkFmMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDO29CQUNwQyxZQUFZLEVBQUU7d0JBQ1YscUJBQXFCO3dCQUNyQixnQkFBZ0I7d0JBQ2hCLFVBQVU7d0JBQ1YsZUFBZTtxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGdCQUFnQjt3QkFDaEIsVUFBVTt3QkFDVixlQUFlO3FCQUNoQjtvQkFDRCxTQUFTO2lCQUNaIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IE1vZGFsIGFzIFZleE1vZGFsIH0gZnJvbSAnLi9wbHVnaW5zL3ZleC9tb2RhbCc7XG5pbXBvcnQgeyBNb2RhbE1vZHVsZSB9IGZyb20gJy4vbmd4LW1vZGlhbG9nLm1vZHVsZSc7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4vcHJvdmlkZXJzL2luZGV4JztcbmltcG9ydCB7IERpYWxvZ0Zvcm1Nb2RhbCwgRm9ybURyb3BJbiwgVkVYRGlhbG9nQnV0dG9ucyB9IGZyb20gJy4vcGx1Z2lucy92ZXgvZGlhbG9nLWZvcm0tbW9kYWwnO1xuaW1wb3J0IHsgVmV4Q1NTRGlhbG9nQ29udGFpbmVyIH0gZnJvbSAnLi9wbHVnaW5zL3ZleC92ZXgtY3NzLWRpYWxvZy1jb250YWluZXInO1xuXG5leHBvcnQgY29uc3QgcHJvdmlkZXJzOiBhbnlbXSA9IFtcbiAgeyBwcm92aWRlOiBNb2RhbCwgdXNlQ2xhc3M6IFZleE1vZGFsIH0sXG4gIHsgcHJvdmlkZTogVmV4TW9kYWwsIHVzZUNsYXNzOiBWZXhNb2RhbCB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtNb2RhbE1vZHVsZSwgQ29tbW9uTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgVmV4Q1NTRGlhbG9nQ29udGFpbmVyLFxuICAgICAgICBWRVhEaWFsb2dCdXR0b25zLFxuICAgICAgICBGb3JtRHJvcEluLFxuICAgICAgICBEaWFsb2dGb3JtTW9kYWxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgIFZFWERpYWxvZ0J1dHRvbnMsXG4gICAgICBGb3JtRHJvcEluLFxuICAgICAgRGlhbG9nRm9ybU1vZGFsXG4gICAgXSxcbiAgICBwcm92aWRlcnNcbn0pXG5leHBvcnQgY2xhc3MgVmV4TW9kYWxNb2R1bGUge1xuXG4gIHN0YXRpYyBnZXRQcm92aWRlcnMoKTogYW55W10ge1xuICAgIHJldHVybiBwcm92aWRlcnM7XG4gIH1cblxufSJdfQ==