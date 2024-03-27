import { MessageModalPresetBuilder } from './message-modal-preset';
import { arrayUnion, extend } from '../../../framework/utils';
/** Common two button preset */
export class AbstractTwoButtonPresetBuilder extends MessageModalPresetBuilder {
    constructor(modal, defaultValues, initialSetters = []) {
        super(extend({
            modal: modal,
            okBtn: 'OK',
            okBtnClass: 'btn btn-primary',
            cancelBtn: 'Cancel',
            cancelBtnClass: 'btn btn-default'
        }, defaultValues || {}), arrayUnion([
            'okBtn',
            'okBtnClass',
            'cancelBtn',
            'cancelBtnClass',
        ], initialSetters));
    }
    $$beforeOpen(config) {
        super.$$beforeOpen(config);
        this.addButton(config.cancelBtnClass, config.cancelBtn, (cmp, $event) => cmp.dialog.dismiss());
    }
}
/**
 * A Preset for a classic 2 button modal window.
 */
export class TwoButtonPresetBuilder extends AbstractTwoButtonPresetBuilder {
    constructor(modal, defaultValues) {
        super(modal, defaultValues);
    }
    $$beforeOpen(config) {
        super.$$beforeOpen(config);
        this.addButton(config.okBtnClass, config.okBtn, (cmp, $event) => cmp.dialog.close(true));
    }
}
export class PromptPresetBuilder extends AbstractTwoButtonPresetBuilder {
    constructor(modal, defaultValues) {
        super(modal, extend({ showInput: true, defaultValue: '' }, defaultValues || {}), ['placeholder', 'defaultValue']);
    }
    $$beforeOpen(config) {
        super.$$beforeOpen(config);
        this.addButton(config.okBtnClass, config.okBtn, (cmp, $event) => cmp.dialog.close(cmp.dialog.context.defaultValue));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdvLWJ1dHRvbi1wcmVzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtbW9kaWFsb2cvc3JjL2xpYi9wbHVnaW5zL2Jvb3RzdHJhcC9wcmVzZXRzL3R3by1idXR0b24tcHJlc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSW5FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFnQjlELCtCQUErQjtBQUMvQixNQUFNLE9BQWdCLDhCQUErQixTQUFRLHlCQUEwQztJQU1yRyxZQUFZLEtBQVksRUFBRSxhQUErQixFQUM3QyxpQkFBMkIsRUFBRTtRQUN2QyxLQUFLLENBQUMsTUFBTSxDQUFNO1lBQ2hCLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFLElBQUk7WUFDWCxVQUFVLEVBQUUsaUJBQWlCO1lBQzdCLFNBQVMsRUFBRSxRQUFRO1lBQ25CLGNBQWMsRUFBRSxpQkFBaUI7U0FDbEMsRUFBRSxhQUFhLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFTO1lBQzFDLE9BQU87WUFDUCxZQUFZO1lBQ1osV0FBVztZQUNYLGdCQUFnQjtTQUNqQixFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELFlBQVksQ0FBQyxNQUF1QjtRQUNsQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQ1osTUFBTSxDQUFDLGNBQWMsRUFDckIsTUFBTSxDQUFDLFNBQVMsRUFDaEIsQ0FBQyxHQUFtQixFQUFFLE1BQWtCLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQ2xFLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRDs7R0FFRztBQUNILE1BQU0sT0FBTyxzQkFBdUIsU0FBUSw4QkFBOEI7SUFFeEUsWUFBWSxLQUFZLEVBQUUsYUFBK0I7UUFDdkQsS0FBSyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsWUFBWSxDQUFDLE1BQXVCO1FBQ2xDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FDWixNQUFNLENBQUMsVUFBVSxFQUNqQixNQUFNLENBQUMsS0FBSyxFQUNaLENBQUMsR0FBbUIsRUFBRSxNQUFrQixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FDcEUsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQVdELE1BQU0sT0FBTyxtQkFBb0IsU0FBUSw4QkFBOEI7SUFJckUsWUFBWSxLQUFZLEVBQUUsYUFBNEI7UUFDcEQsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQU0sRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUMsRUFBRSxhQUFhLElBQUksRUFBRSxDQUFDLEVBQ2hGLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFlBQVksQ0FBQyxNQUFvQjtRQUMvQixLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQ1osTUFBTSxDQUFDLFVBQVUsRUFDakIsTUFBTSxDQUFDLEtBQUssRUFDWixDQUFDLEdBQW1CLEVBQUUsTUFBa0IsRUFBRSxFQUFFLENBQzFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBd0IsQ0FBQyxZQUFZLENBQUMsQ0FDdEUsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJTTWVzc2FnZU1vZGFsIH0gZnJvbSAnLi4vbWVzc2FnZS1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZU1vZGFsUHJlc2V0QnVpbGRlciB9IGZyb20gJy4vbWVzc2FnZS1tb2RhbC1wcmVzZXQnO1xuaW1wb3J0IHsgT25lQnV0dG9uUHJlc2V0IH0gZnJvbSAnLi9vbmUtYnV0dG9uLXByZXNldCc7XG5pbXBvcnQgeyBGbHVlbnRBc3NpZ25NZXRob2QgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvZmx1ZW50LWFzc2lnbic7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4uLy4uLy4uL3Byb3ZpZGVycyc7XG5pbXBvcnQgeyBhcnJheVVuaW9uLCBleHRlbmQgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFR3b0J1dHRvblByZXNldCBleHRlbmRzIE9uZUJ1dHRvblByZXNldCB7XG4gIC8qKlxuICAgKiBDYXB0aW9uIGZvciB0aGUgQ2FuY2VsIGJ1dHRvbi5cbiAgICogRGVmYXVsdDogQ2FuY2VsXG4gICAqL1xuICBjYW5jZWxCdG46IHN0cmluZztcblxuICAvKipcbiAgICogQSBDbGFzcyBmb3IgdGhlIENhbmNlbCBidXR0b24uXG4gICAqIERlZmF1bHQ6IGJ0biBidG4tZGVmYXVsdFxuICAgKi9cbiAgY2FuY2VsQnRuQ2xhc3M6IHN0cmluZztcbn1cblxuLyoqIENvbW1vbiB0d28gYnV0dG9uIHByZXNldCAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0VHdvQnV0dG9uUHJlc2V0QnVpbGRlciBleHRlbmRzIE1lc3NhZ2VNb2RhbFByZXNldEJ1aWxkZXI8VHdvQnV0dG9uUHJlc2V0PiB7XG4gIG9rQnRuOiBGbHVlbnRBc3NpZ25NZXRob2Q8c3RyaW5nLCB0aGlzPjtcbiAgb2tCdG5DbGFzczogRmx1ZW50QXNzaWduTWV0aG9kPHN0cmluZywgdGhpcz47XG4gIGNhbmNlbEJ0bjogRmx1ZW50QXNzaWduTWV0aG9kPHN0cmluZywgdGhpcz47XG4gIGNhbmNlbEJ0bkNsYXNzOiBGbHVlbnRBc3NpZ25NZXRob2Q8c3RyaW5nLCB0aGlzPjtcblxuICBjb25zdHJ1Y3Rvcihtb2RhbDogTW9kYWwsIGRlZmF1bHRWYWx1ZXM/OiBUd29CdXR0b25QcmVzZXQsXG4gICAgICAgICAgICAgIGluaXRpYWxTZXR0ZXJzOiBzdHJpbmdbXSA9IFtdKSB7XG4gICAgc3VwZXIoZXh0ZW5kPGFueT4oe1xuICAgICAgbW9kYWw6IG1vZGFsLFxuICAgICAgb2tCdG46ICdPSycsXG4gICAgICBva0J0bkNsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcbiAgICAgIGNhbmNlbEJ0bjogJ0NhbmNlbCcsXG4gICAgICBjYW5jZWxCdG5DbGFzczogJ2J0biBidG4tZGVmYXVsdCdcbiAgICB9LCBkZWZhdWx0VmFsdWVzIHx8IHt9KSwgYXJyYXlVbmlvbjxzdHJpbmc+KFtcbiAgICAgICdva0J0bicsXG4gICAgICAnb2tCdG5DbGFzcycsXG4gICAgICAnY2FuY2VsQnRuJyxcbiAgICAgICdjYW5jZWxCdG5DbGFzcycsXG4gICAgXSwgaW5pdGlhbFNldHRlcnMpKTtcbiAgfVxuXG4gICQkYmVmb3JlT3Blbihjb25maWc6IFR3b0J1dHRvblByZXNldCk6IHZvaWQge1xuICAgIHN1cGVyLiQkYmVmb3JlT3Blbihjb25maWcpO1xuICAgIHRoaXMuYWRkQnV0dG9uKFxuICAgICAgY29uZmlnLmNhbmNlbEJ0bkNsYXNzLFxuICAgICAgY29uZmlnLmNhbmNlbEJ0bixcbiAgICAgIChjbXA6IEJTTWVzc2FnZU1vZGFsLCAkZXZlbnQ6IE1vdXNlRXZlbnQpID0+IGNtcC5kaWFsb2cuZGlzbWlzcygpXG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIEEgUHJlc2V0IGZvciBhIGNsYXNzaWMgMiBidXR0b24gbW9kYWwgd2luZG93LlxuICovXG5leHBvcnQgY2xhc3MgVHdvQnV0dG9uUHJlc2V0QnVpbGRlciBleHRlbmRzIEFic3RyYWN0VHdvQnV0dG9uUHJlc2V0QnVpbGRlciB7XG5cbiAgY29uc3RydWN0b3IobW9kYWw6IE1vZGFsLCBkZWZhdWx0VmFsdWVzPzogVHdvQnV0dG9uUHJlc2V0KSB7XG4gICAgc3VwZXIobW9kYWwsIGRlZmF1bHRWYWx1ZXMpO1xuICB9XG5cbiAgJCRiZWZvcmVPcGVuKGNvbmZpZzogVHdvQnV0dG9uUHJlc2V0KTogdm9pZCB7XG4gICAgc3VwZXIuJCRiZWZvcmVPcGVuKGNvbmZpZyk7XG4gICAgdGhpcy5hZGRCdXR0b24oXG4gICAgICBjb25maWcub2tCdG5DbGFzcyxcbiAgICAgIGNvbmZpZy5va0J0bixcbiAgICAgIChjbXA6IEJTTWVzc2FnZU1vZGFsLCAkZXZlbnQ6IE1vdXNlRXZlbnQpID0+IGNtcC5kaWFsb2cuY2xvc2UodHJ1ZSlcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvbXB0UHJlc2V0IGV4dGVuZHMgVHdvQnV0dG9uUHJlc2V0IHtcbiAgc2hvd0lucHV0OiBib29sZWFuO1xuICAvKiogRGVmYXVsdCB2YWx1ZSBzaG93biBpbiB0aGUgcHJvbXB0LiAqL1xuICBkZWZhdWx0VmFsdWU6IHN0cmluZztcbiAgLyoqIEEgcGxhY2Vob2xkZXIgZm9yIHRoZSBpbnB1dCBlbGVtZW50LiAqL1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG59XG5cbmV4cG9ydCBjbGFzcyBQcm9tcHRQcmVzZXRCdWlsZGVyIGV4dGVuZHMgQWJzdHJhY3RUd29CdXR0b25QcmVzZXRCdWlsZGVyIHtcbiAgcGxhY2Vob2xkZXI6IEZsdWVudEFzc2lnbk1ldGhvZDxzdHJpbmcsIHRoaXM+O1xuICBkZWZhdWx0VmFsdWU6IEZsdWVudEFzc2lnbk1ldGhvZDxzdHJpbmcsIHRoaXM+O1xuXG4gIGNvbnN0cnVjdG9yKG1vZGFsOiBNb2RhbCwgZGVmYXVsdFZhbHVlcz86IFByb21wdFByZXNldCkge1xuICAgIHN1cGVyKG1vZGFsLCBleHRlbmQ8YW55Pih7c2hvd0lucHV0OiB0cnVlLCBkZWZhdWx0VmFsdWU6ICcnfSwgZGVmYXVsdFZhbHVlcyB8fCB7fSksXG4gICAgICBbJ3BsYWNlaG9sZGVyJywgJ2RlZmF1bHRWYWx1ZSddKTtcbiAgfVxuXG4gICQkYmVmb3JlT3Blbihjb25maWc6IFByb21wdFByZXNldCk6IHZvaWQge1xuICAgIHN1cGVyLiQkYmVmb3JlT3Blbihjb25maWcpO1xuICAgIHRoaXMuYWRkQnV0dG9uKFxuICAgICAgY29uZmlnLm9rQnRuQ2xhc3MsXG4gICAgICBjb25maWcub2tCdG4sXG4gICAgICAoY21wOiBCU01lc3NhZ2VNb2RhbCwgJGV2ZW50OiBNb3VzZUV2ZW50KSA9PlxuICAgICAgICBjbXAuZGlhbG9nLmNsb3NlKChjbXAuZGlhbG9nLmNvbnRleHQgYXMgUHJvbXB0UHJlc2V0KS5kZWZhdWx0VmFsdWUpXG4gICAgKTtcbiAgfVxufVxuXG4iXX0=