import { Modal } from '../providers/index';
import { ModalContext, ModalContextBuilder } from './modal-context';
import { arrayUnion } from '../framework/utils';
const DEFAULT_SETTERS = [
    'component'
];
export class ModalOpenContext extends ModalContext {
}
/**
 * A Modal Context that knows about the modal service, and so can open a modal window on demand.
 * Use the fluent API to configure the preset and then invoke the 'open' method to open a modal
 * based on the context.
 */
export class ModalOpenContextBuilder extends ModalContextBuilder {
    constructor(defaultValues, initialSetters, baseType) {
        super(defaultValues || {}, arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType);
    }
    /**
     * Hook to alter config and return bindings.
     * @param config
     */
    $$beforeOpen(config) { }
    /**
     * Open a modal window based on the configuration of this config instance.
     * @param viewContainer If set opens the modal inside the supplied viewContainer
     */
    open(viewContainer) {
        const context = this.toJSON();
        if (!(context.modal instanceof Modal)) {
            return Promise.reject(new Error('Configuration Error: modal service not set.'));
        }
        this.$$beforeOpen(context);
        const overlayConfig = {
            context: context,
            viewContainer: viewContainer
        };
        return context.modal.open(context.component, overlayConfig);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtb3Blbi1jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LW1vZGlhbG9nL3NyYy9saWIvbW9kZWxzL21vZGFsLW9wZW4tY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3BFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVoRCxNQUFNLGVBQWUsR0FBRztJQUN0QixXQUFXO0NBQ1osQ0FBQztBQUVGLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxZQUFZO0NBR2pEO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sT0FBZ0IsdUJBQ0osU0FBUSxtQkFBc0I7SUFROUMsWUFBWSxhQUFpQixFQUNqQixjQUF5QixFQUN6QixRQUFzQjtRQUNoQyxLQUFLLENBQ0gsYUFBYSxJQUFTLEVBQUUsRUFDeEIsVUFBVSxDQUFTLGVBQWUsRUFBRSxjQUFjLElBQUksRUFBRSxDQUFDLEVBQ3pELFFBQVEsQ0FDVCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNPLFlBQVksQ0FBQyxNQUFTLElBQVUsQ0FBQztJQUUzQzs7O09BR0c7SUFDSCxJQUFJLENBQUMsYUFBeUI7UUFDNUIsTUFBTSxPQUFPLEdBQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWpDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFlBQVksS0FBSyxDQUFDLEVBQUU7WUFDckMsT0FBWSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUMsQ0FBQztTQUN0RjtRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFM0IsTUFBTSxhQUFhLEdBQWtCO1lBQ25DLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLGFBQWEsRUFBRSxhQUFhO1NBQzdCLENBQUM7UUFFRixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmx1ZW50QXNzaWduTWV0aG9kIH0gZnJvbSAnLi4vZnJhbWV3b3JrL2ZsdWVudC1hc3NpZ24nO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQsIE92ZXJsYXlDb25maWcsIFdpZGVWQ1JlZiB9IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2luZGV4JztcbmltcG9ydCB7IERpYWxvZ1JlZiB9IGZyb20gJy4vZGlhbG9nLXJlZic7XG5pbXBvcnQgeyBNb2RhbENvbnRleHQsIE1vZGFsQ29udGV4dEJ1aWxkZXIgfSBmcm9tICcuL21vZGFsLWNvbnRleHQnO1xuaW1wb3J0IHsgTW9kYWxDb250cm9sbGluZ0NvbnRleHRCdWlsZGVyIH0gZnJvbSAnLi9vdmVybGF5LWNvbnRleHQnO1xuXG5pbXBvcnQgeyBhcnJheVVuaW9uIH0gZnJvbSAnLi4vZnJhbWV3b3JrL3V0aWxzJztcblxuY29uc3QgREVGQVVMVF9TRVRURVJTID0gW1xuICAnY29tcG9uZW50J1xuXTtcblxuZXhwb3J0IGNsYXNzIE1vZGFsT3BlbkNvbnRleHQgZXh0ZW5kcyBNb2RhbENvbnRleHQge1xuICBjb21wb25lbnQ6IGFueTtcbiAgbW9kYWw6IE1vZGFsO1xufVxuXG4vKipcbiAqIEEgTW9kYWwgQ29udGV4dCB0aGF0IGtub3dzIGFib3V0IHRoZSBtb2RhbCBzZXJ2aWNlLCBhbmQgc28gY2FuIG9wZW4gYSBtb2RhbCB3aW5kb3cgb24gZGVtYW5kLlxuICogVXNlIHRoZSBmbHVlbnQgQVBJIHRvIGNvbmZpZ3VyZSB0aGUgcHJlc2V0IGFuZCB0aGVuIGludm9rZSB0aGUgJ29wZW4nIG1ldGhvZCB0byBvcGVuIGEgbW9kYWxcbiAqIGJhc2VkIG9uIHRoZSBjb250ZXh0LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTW9kYWxPcGVuQ29udGV4dEJ1aWxkZXI8VCBleHRlbmRzIE1vZGFsT3BlbkNvbnRleHQ+XG4gICAgICAgICAgICAgICAgICBleHRlbmRzIE1vZGFsQ29udGV4dEJ1aWxkZXI8VD4gaW1wbGVtZW50cyBNb2RhbENvbnRyb2xsaW5nQ29udGV4dEJ1aWxkZXI8VD4ge1xuXG4gIC8qKlxuICAgKiBBIENsYXNzIGZvciB0aGUgZm9vdGVyIGNvbnRhaW5lci5cbiAgICogRGVmYXVsdDogbW9kYWwtZm9vdGVyXG4gICAqL1xuICBjb21wb25lbnQ6IEZsdWVudEFzc2lnbk1ldGhvZDxNb2RhbENvbXBvbmVudDxUPiwgdGhpcz47XG5cbiAgY29uc3RydWN0b3IoZGVmYXVsdFZhbHVlcz86IFQsXG4gICAgICAgICAgICAgIGluaXRpYWxTZXR0ZXJzPzogc3RyaW5nW10sXG4gICAgICAgICAgICAgIGJhc2VUeXBlPzogbmV3ICgpID0+IFQpIHtcbiAgICBzdXBlcihcbiAgICAgIGRlZmF1bHRWYWx1ZXMgfHwgPGFueT57fSxcbiAgICAgIGFycmF5VW5pb248c3RyaW5nPihERUZBVUxUX1NFVFRFUlMsIGluaXRpYWxTZXR0ZXJzIHx8IFtdKSxcbiAgICAgIGJhc2VUeXBlXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIb29rIHRvIGFsdGVyIGNvbmZpZyBhbmQgcmV0dXJuIGJpbmRpbmdzLlxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgJCRiZWZvcmVPcGVuKGNvbmZpZzogVCk6IHZvaWQgeyB9XG5cbiAgLyoqXG4gICAqIE9wZW4gYSBtb2RhbCB3aW5kb3cgYmFzZWQgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2YgdGhpcyBjb25maWcgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB2aWV3Q29udGFpbmVyIElmIHNldCBvcGVucyB0aGUgbW9kYWwgaW5zaWRlIHRoZSBzdXBwbGllZCB2aWV3Q29udGFpbmVyXG4gICAqL1xuICBvcGVuKHZpZXdDb250YWluZXI/OiBXaWRlVkNSZWYpOiBEaWFsb2dSZWY8VD4ge1xuICAgIGNvbnN0IGNvbnRleHQ6IFQgPSB0aGlzLnRvSlNPTigpO1xuXG4gICAgaWYgKCEoY29udGV4dC5tb2RhbCBpbnN0YW5jZW9mIE1vZGFsKSkge1xuICAgICAgcmV0dXJuIDxhbnk+UHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdDb25maWd1cmF0aW9uIEVycm9yOiBtb2RhbCBzZXJ2aWNlIG5vdCBzZXQuJykpO1xuICAgIH1cblxuICAgIHRoaXMuJCRiZWZvcmVPcGVuKGNvbnRleHQpO1xuXG4gICAgY29uc3Qgb3ZlcmxheUNvbmZpZzogT3ZlcmxheUNvbmZpZyA9IHtcbiAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICB2aWV3Q29udGFpbmVyOiB2aWV3Q29udGFpbmVyXG4gICAgfTtcblxuICAgIHJldHVybiBjb250ZXh0Lm1vZGFsLm9wZW4oY29udGV4dC5jb21wb25lbnQsIG92ZXJsYXlDb25maWcpO1xuICB9XG59XG4iXX0=