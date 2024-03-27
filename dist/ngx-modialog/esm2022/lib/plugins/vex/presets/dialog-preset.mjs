import { privateKey, extend, arrayUnion } from '../../../../public_api';
import { VEXModalContext, VEXModalContextBuilder } from '../modal-context';
import { DialogFormModal as component } from '../dialog-form-modal';
const DEFAULT_SETTERS = [
    'content'
];
/**
 * Data definition
 */
export class DialogPreset extends VEXModalContext {
    get showInput() { return; }
    ;
}
/**
 * A Preset representing the configuration needed to open MessageModal.
 * This is an abstract implementation with no concrete behaviour.
 * Use derived implementation.
 */
export class DialogPresetBuilder extends VEXModalContextBuilder {
    constructor(modal, defaultValues = undefined, initialSetters = undefined, baseType = undefined) {
        super(extend({ modal, component, buttons: [], defaultResult: true }, defaultValues || {}), arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType || DialogPreset // https://github.com/Microsoft/TypeScript/issues/7234
        );
    }
    addButton(css, caption, onClick) {
        let btn = {
            cssClass: css,
            caption: caption,
            onClick: onClick
        };
        let key = privateKey('buttons');
        this[key].push(btn);
        return this;
    }
    addOkButton(text = 'OK') {
        this.addButton('vex-dialog-button-primary vex-dialog-button vex-first', text, (cmp, $event) => cmp.dialog.close(cmp.dialog.context.defaultResult));
        return this;
    }
    addCancelButton(text = 'CANCEL') {
        this.addButton('vex-dialog-button-secondary vex-dialog-button vex-last', text, (cmp, $event) => cmp.dialog.dismiss());
        return this;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXByZXNldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1tb2RpYWxvZy9zcmMvbGliL3BsdWdpbnMvdmV4L3ByZXNldHMvZGlhbG9nLXByZXNldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBRUwsVUFBVSxFQUNWLE1BQU0sRUFDTixVQUFVLEVBQ1gsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFM0UsT0FBTyxFQUNMLGVBQWUsSUFBSSxTQUFTLEVBRzdCLE1BQU0sc0JBQXNCLENBQUM7QUFHOUIsTUFBTSxlQUFlLEdBQUc7SUFDdEIsU0FBUztDQUNWLENBQUM7QUFFRjs7R0FFRztBQUNILE1BQU0sT0FBTyxZQUFhLFNBQVEsZUFBZTtJQUsvQyxJQUFJLFNBQVMsS0FBYyxPQUFNLENBQUMsQ0FBQztJQUFBLENBQUM7Q0FDckM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLG1CQUNiLFNBQVEsc0JBQXlCO0lBTS9CLFlBQVksS0FBWSxFQUNaLGdCQUFtQixTQUFTLEVBQzVCLGlCQUEyQixTQUFTLEVBQ3BDLFdBQXdCLFNBQVM7UUFDM0MsS0FBSyxDQUNILE1BQU0sQ0FBTSxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFDLEVBQUUsYUFBYSxJQUFJLEVBQUUsQ0FBQyxFQUN0RixVQUFVLENBQVMsZUFBZSxFQUFFLGNBQWMsSUFBSSxFQUFFLENBQUMsRUFDekQsUUFBUSxJQUFTLFlBQVksQ0FBQyxzREFBc0Q7U0FDckYsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLENBQUMsR0FBVyxFQUFFLE9BQWUsRUFBRSxPQUF5QjtRQUMvRCxJQUFJLEdBQUcsR0FBRztZQUNSLFFBQVEsRUFBRSxHQUFHO1lBQ2IsT0FBTyxFQUFFLE9BQU87WUFDaEIsT0FBTyxFQUFFLE9BQU87U0FDakIsQ0FBQztRQUVGLElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsR0FBRyxDQUF1QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUzQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBZSxJQUFJO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQ1osdURBQXVELEVBQ3ZELElBQUksRUFDSixDQUFDLEdBQWMsRUFBRSxNQUFrQixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FDM0YsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFlLFFBQVE7UUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FDWix3REFBd0QsRUFDeEQsSUFBSSxFQUNKLENBQUMsR0FBYyxFQUFFLE1BQWtCLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQzdELENBQUM7UUFDRixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEZsdWVudEFzc2lnbk1ldGhvZCxcbiAgcHJpdmF0ZUtleSxcbiAgZXh0ZW5kLFxuICBhcnJheVVuaW9uXG59IGZyb20gJy4uLy4uLy4uLy4uL3B1YmxpY19hcGknO1xuaW1wb3J0IHsgVkVYTW9kYWxDb250ZXh0LCBWRVhNb2RhbENvbnRleHRCdWlsZGVyIH0gZnJvbSAnLi4vbW9kYWwtY29udGV4dCc7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4uL21vZGFsJztcbmltcG9ydCB7XG4gIERpYWxvZ0Zvcm1Nb2RhbCBhcyBjb21wb25lbnQsXG4gIFZFWEJ1dHRvbkhhbmRsZXIsXG4gIFZFWEJ1dHRvbkNvbmZpZ1xufSBmcm9tICcuLi9kaWFsb2ctZm9ybS1tb2RhbCc7XG5cblxuY29uc3QgREVGQVVMVF9TRVRURVJTID0gW1xuICAnY29udGVudCdcbl07XG5cbi8qKlxuICogRGF0YSBkZWZpbml0aW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBEaWFsb2dQcmVzZXQgZXh0ZW5kcyBWRVhNb2RhbENvbnRleHQge1xuICBkZWZhdWx0UmVzdWx0OiBhbnk7XG4gIGNvbnRlbnQ6IFR5cGU8YW55PjtcbiAgYnV0dG9uczogVkVYQnV0dG9uQ29uZmlnW107XG5cbiAgZ2V0IHNob3dJbnB1dCgpOiBib29sZWFuIHsgcmV0dXJuIH07XG59XG5cbi8qKlxuICogQSBQcmVzZXQgcmVwcmVzZW50aW5nIHRoZSBjb25maWd1cmF0aW9uIG5lZWRlZCB0byBvcGVuIE1lc3NhZ2VNb2RhbC5cbiAqIFRoaXMgaXMgYW4gYWJzdHJhY3QgaW1wbGVtZW50YXRpb24gd2l0aCBubyBjb25jcmV0ZSBiZWhhdmlvdXIuXG4gKiBVc2UgZGVyaXZlZCBpbXBsZW1lbnRhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIERpYWxvZ1ByZXNldEJ1aWxkZXI8VCBleHRlbmRzIERpYWxvZ1ByZXNldD5cbmV4dGVuZHMgVkVYTW9kYWxDb250ZXh0QnVpbGRlcjxUPiB7XG4gIC8qKlxuICAgKiB0aGUgbWVzc2FnZSB0byBkaXNwbGF5IG9uIHRoZSBtb2RhbC5cbiAgICovXG4gIGNvbnRlbnQ6IEZsdWVudEFzc2lnbk1ldGhvZDxUeXBlPGFueT4sIHRoaXM+O1xuXG4gIGNvbnN0cnVjdG9yKG1vZGFsOiBNb2RhbCxcbiAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlczogVCA9IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgaW5pdGlhbFNldHRlcnM6IHN0cmluZ1tdID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICBiYXNlVHlwZTogbmV3ICgpID0+IFQgPSB1bmRlZmluZWQpIHtcbiAgICBzdXBlcihcbiAgICAgIGV4dGVuZDxhbnk+KHttb2RhbCwgY29tcG9uZW50LCBidXR0b25zOiBbXSwgZGVmYXVsdFJlc3VsdDogdHJ1ZX0sIGRlZmF1bHRWYWx1ZXMgfHwge30pLFxuICAgICAgYXJyYXlVbmlvbjxzdHJpbmc+KERFRkFVTFRfU0VUVEVSUywgaW5pdGlhbFNldHRlcnMgfHwgW10pLFxuICAgICAgYmFzZVR5cGUgfHwgPGFueT5EaWFsb2dQcmVzZXQgLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy83MjM0XG4gICAgKTtcbiAgfVxuXG4gIGFkZEJ1dHRvbihjc3M6IHN0cmluZywgY2FwdGlvbjogc3RyaW5nLCBvbkNsaWNrOiBWRVhCdXR0b25IYW5kbGVyKTogdGhpcyB7XG4gICAgbGV0IGJ0biA9IHtcbiAgICAgIGNzc0NsYXNzOiBjc3MsXG4gICAgICBjYXB0aW9uOiBjYXB0aW9uLFxuICAgICAgb25DbGljazogb25DbGlja1xuICAgIH07XG5cbiAgICBsZXQga2V5ID0gcHJpdmF0ZUtleSgnYnV0dG9ucycpO1xuICAgICh0aGlzW2tleV0gYXMgVkVYQnV0dG9uQ29uZmlnW10pLnB1c2goYnRuKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkT2tCdXR0b24odGV4dDogc3RyaW5nID0gJ09LJyk6IHRoaXMge1xuICAgIHRoaXMuYWRkQnV0dG9uKFxuICAgICAgJ3ZleC1kaWFsb2ctYnV0dG9uLXByaW1hcnkgdmV4LWRpYWxvZy1idXR0b24gdmV4LWZpcnN0JyxcbiAgICAgIHRleHQsXG4gICAgICAoY21wOiBjb21wb25lbnQsICRldmVudDogTW91c2VFdmVudCkgPT4gY21wLmRpYWxvZy5jbG9zZShjbXAuZGlhbG9nLmNvbnRleHQuZGVmYXVsdFJlc3VsdClcbiAgICApO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkQ2FuY2VsQnV0dG9uKHRleHQ6IHN0cmluZyA9ICdDQU5DRUwnKTogdGhpcyB7XG4gICAgdGhpcy5hZGRCdXR0b24oXG4gICAgICAndmV4LWRpYWxvZy1idXR0b24tc2Vjb25kYXJ5IHZleC1kaWFsb2ctYnV0dG9uIHZleC1sYXN0JyxcbiAgICAgIHRleHQsXG4gICAgICAoY21wOiBjb21wb25lbnQsICRldmVudDogTW91c2VFdmVudCkgPT4gY21wLmRpYWxvZy5kaXNtaXNzKClcbiAgICApO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iXX0=