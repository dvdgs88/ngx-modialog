import { FluentAssign } from './../framework/fluent-assign';
import { extend, arrayUnion } from './../framework/utils';
export const DEFAULT_VALUES = {
    inElement: false,
    isBlocking: true,
    keyboard: [27],
    supportsKey: function supportsKey(keyCode) {
        return this.keyboard.indexOf(keyCode) > -1;
    }
};
const DEFAULT_SETTERS = [
    'inElement',
    'isBlocking',
    'keyboard'
];
export class OverlayContext {
    normalize() {
        if (this.isBlocking !== false) {
            this.isBlocking = true;
        }
        if (this.keyboard === null) {
            this.keyboard = [];
        }
        else if (typeof this.keyboard === 'number') {
            this.keyboard = [this.keyboard];
        }
        else if (!Array.isArray(this.keyboard)) {
            this.keyboard = DEFAULT_VALUES.keyboard;
        }
    }
}
/**
 * A core context builder for a modal window instance, used to define the context upon
 * a modal choose it's behaviour.
 */
export class OverlayContextBuilder extends FluentAssign {
    constructor(defaultValues, initialSetters, baseType) {
        super(extend(DEFAULT_VALUES, defaultValues || {}), arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType || OverlayContext // https://github.com/Microsoft/TypeScript/issues/7234
        );
    }
    /**
     * Returns an new OverlayConfig with a context property representing the data in this builder.
     * @param base A base configuration that the result will extend
     */
    toOverlayConfig(base) {
        return extend(base || {}, {
            context: this.toJSON()
        });
    }
}
/**
 * A helper to create an `OverlayConfig` on the fly.
 * Since `OverlayConfig` requires context it means a builder is needed, this process had some boilerplate.
 * When a quick, on the fly overlay config is needed use this helper to avoid that boilerplate.
 *
 * A builder is used as an API to allow setting the context and providing some operations around the modal.
 * When a developers knows the context before hand we can skip this step, this is what this factory is for.
 *
 * @param context The context for the modal
 * @param baseContextType Optional. The type/class of the context. This is the class used to init a new instance of the context
 * @param baseConfig A base configuration that the result will extend
 */
export function overlayConfigFactory(context, baseContextType, baseConfig) {
    return new OverlayContextBuilder(context, undefined, baseContextType).toOverlayConfig(baseConfig);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LW1vZGlhbG9nL3NyYy9saWIvbW9kZWxzL292ZXJsYXktY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFzQixNQUFNLDhCQUE4QixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJMUQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHO0lBQzVCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNkLFdBQVcsRUFBRSxTQUFTLFdBQVcsQ0FBQyxPQUFlO1FBQy9DLE9BQXVCLElBQUksQ0FBQyxRQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7Q0FDRixDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQUc7SUFDdEIsV0FBVztJQUNYLFlBQVk7SUFDWixVQUFVO0NBQ1gsQ0FBQztBQUVGLE1BQU0sT0FBTyxjQUFjO0lBdUJ6QixTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtZQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUN4QjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7U0FDcEI7YUFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN6QzthQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFnQixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztDQUNGO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLHFCQUFnRCxTQUFRLFlBQWU7SUF3QmxGLFlBQVksYUFBdUIsRUFDdkIsY0FBeUIsRUFDekIsUUFBc0I7UUFDaEMsS0FBSyxDQUNILE1BQU0sQ0FBTSxjQUFjLEVBQUUsYUFBYSxJQUFJLEVBQUUsQ0FBQyxFQUNoRCxVQUFVLENBQVMsZUFBZSxFQUFFLGNBQWMsSUFBSSxFQUFFLENBQUMsRUFDekQsUUFBUSxJQUFTLGNBQWMsQ0FBQyxzREFBc0Q7U0FDdkYsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSCxlQUFlLENBQUMsSUFBb0I7UUFDbEMsT0FBTyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRTtZQUN4QixPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtTQUN2QixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFNRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FBSSxPQUFVLEVBQUUsZUFBcUIsRUFBRSxVQUEwQjtJQUNuRyxPQUFPLElBQUkscUJBQXFCLENBQTBCLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzdILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGbHVlbnRBc3NpZ24sIEZsdWVudEFzc2lnbk1ldGhvZCB9IGZyb20gJy4vLi4vZnJhbWV3b3JrL2ZsdWVudC1hc3NpZ24nO1xuaW1wb3J0IHsgZXh0ZW5kLCBhcnJheVVuaW9uIH0gZnJvbSAnLi8uLi9mcmFtZXdvcmsvdXRpbHMnO1xuaW1wb3J0IHsgRGlhbG9nUmVmIH0gZnJvbSAnLi9kaWFsb2ctcmVmJztcbmltcG9ydCB7IFdpZGVWQ1JlZiwgT3ZlcmxheUNvbmZpZyB9IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfVkFMVUVTID0ge1xuICBpbkVsZW1lbnQ6IGZhbHNlLFxuICBpc0Jsb2NraW5nOiB0cnVlLFxuICBrZXlib2FyZDogWzI3XSxcbiAgc3VwcG9ydHNLZXk6IGZ1bmN0aW9uIHN1cHBvcnRzS2V5KGtleUNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoPEFycmF5PG51bWJlcj4+dGhpcy5rZXlib2FyZCkuaW5kZXhPZihrZXlDb2RlKSA+IC0xO1xuICB9XG59O1xuXG5jb25zdCBERUZBVUxUX1NFVFRFUlMgPSBbXG4gICdpbkVsZW1lbnQnLFxuICAnaXNCbG9ja2luZycsXG4gICdrZXlib2FyZCdcbl07XG5cbmV4cG9ydCBjbGFzcyBPdmVybGF5Q29udGV4dCB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgaWYgdGhlIG1vZGFsIGlzIHJlbmRlcmVkIHdpdGhpbiB0aGUgY29udGFpbmVyIGVsZW1lbnQuXG4gICAqIFRoZSBjb250YWluZXIgZWxlbWVudCBpcyB0aGUgVmlld0NvbnRhaW5lclJlZiBzdXBwbGllZC5cbiAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBpbkVsZW1lbnQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIERlc2NyaWJlcyBpZiB0aGUgbW9kYWwgaXMgYmxvY2tpbmcgbW9kYWwuXG4gICAqIEEgQmxvY2tpbmcgbW9kYWwgaXMgbm90IGNsb3NhYmxlIGJ5IGNsaWNraW5nIG91dHNpZGUgb2YgdGhlIG1vZGFsIHdpbmRvdy5cbiAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBpc0Jsb2NraW5nOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBLZXlib2FyZCB2YWx1ZS9zIHRoYXQgY2xvc2UgdGhlIG1vZGFsLlxuICAgKiBBY2NlcHRzIGVpdGhlciBhIHNpbmdsZSBudW1lcmljIHZhbHVlIG9yIGFuIGFycmF5IG9mIG51bWVyaWMgdmFsdWVzLlxuICAgKiBBIG1vZGFsIGNsb3NlZCBieSBhIGtleWJvYXJkIHN0cm9rZSB3aWxsIHJlc3VsdCBpbiBhICdyZWplY3QnIG5vdGlmaWNhdGlvbiBmcm9tIHRoZSBwcm9taXNlLlxuICAgKiBEZWZhdWx0cyB0byAyNywgc2V0IGBudWxsYCBpbXBsaWNpdGx5IHRvIGRpc2FibGUuXG4gICAqL1xuICBrZXlib2FyZDogQXJyYXk8bnVtYmVyPiB8IG51bWJlcjtcblxuICBub3JtYWxpemUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNCbG9ja2luZyAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuaXNCbG9ja2luZyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMua2V5Ym9hcmQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMua2V5Ym9hcmQgPSBbXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmtleWJvYXJkID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5rZXlib2FyZCA9IFs8bnVtYmVyPnRoaXMua2V5Ym9hcmRdO1xuICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoPEFycmF5PG51bWJlcj4+dGhpcy5rZXlib2FyZCkpIHtcbiAgICAgIHRoaXMua2V5Ym9hcmQgPSBERUZBVUxUX1ZBTFVFUy5rZXlib2FyZDtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBIGNvcmUgY29udGV4dCBidWlsZGVyIGZvciBhIG1vZGFsIHdpbmRvdyBpbnN0YW5jZSwgdXNlZCB0byBkZWZpbmUgdGhlIGNvbnRleHQgdXBvblxuICogYSBtb2RhbCBjaG9vc2UgaXQncyBiZWhhdmlvdXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBPdmVybGF5Q29udGV4dEJ1aWxkZXI8VCBleHRlbmRzIE92ZXJsYXlDb250ZXh0PiBleHRlbmRzIEZsdWVudEFzc2lnbjxUPiB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgaWYgdGhlIG1vZGFsIGlzIHJlbmRlcmVkIHdpdGhpbiB0aGUgY29udGFpbmVyIGVsZW1lbnQuXG4gICAqIFRoZSBjb250YWluZXIgZWxlbWVudCBpcyB0aGUgVmlld0NvbnRhaW5lclJlZiBzdXBwbGllZC5cbiAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBpbkVsZW1lbnQ6IEZsdWVudEFzc2lnbk1ldGhvZDxib29sZWFuLCB0aGlzPjtcblxuICAvKipcbiAgICogRGVzY3JpYmVzIGlmIHRoZSBtb2RhbCBpcyBibG9ja2luZyBtb2RhbC5cbiAgICogQSBCbG9ja2luZyBtb2RhbCBpcyBub3QgY2xvc2FibGUgYnkgY2xpY2tpbmcgb3V0c2lkZSBvZiB0aGUgbW9kYWwgd2luZG93LlxuICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIGlzQmxvY2tpbmc6IEZsdWVudEFzc2lnbk1ldGhvZDxib29sZWFuLCB0aGlzPjtcblxuICAvKipcbiAgICogS2V5Ym9hcmQgdmFsdWUvcyB0aGF0IGNsb3NlIHRoZSBtb2RhbC5cbiAgICogQWNjZXB0cyBlaXRoZXIgYSBzaW5nbGUgbnVtZXJpYyB2YWx1ZSBvciBhbiBhcnJheSBvZiBudW1lcmljIHZhbHVlcy5cbiAgICogQSBtb2RhbCBjbG9zZWQgYnkgYSBrZXlib2FyZCBzdHJva2Ugd2lsbCByZXN1bHQgaW4gYSAncmVqZWN0JyBub3RpZmljYXRpb24gZnJvbSB0aGUgcHJvbWlzZS5cbiAgICogRGVmYXVsdHMgdG8gMjcsIHNldCBgbnVsbGAgaW1wbGljaXRseSB0byBkaXNhYmxlLlxuICAgKi9cbiAga2V5Ym9hcmQ6IEZsdWVudEFzc2lnbk1ldGhvZDxBcnJheTxudW1iZXI+IHwgbnVtYmVyLCB0aGlzPjtcblxuXG4gIGNvbnN0cnVjdG9yKGRlZmF1bHRWYWx1ZXM/OiBUIHwgVFtdLFxuICAgICAgICAgICAgICBpbml0aWFsU2V0dGVycz86IHN0cmluZ1tdLFxuICAgICAgICAgICAgICBiYXNlVHlwZT86IG5ldyAoKSA9PiBUKSB7XG4gICAgc3VwZXIoXG4gICAgICBleHRlbmQ8YW55PihERUZBVUxUX1ZBTFVFUywgZGVmYXVsdFZhbHVlcyB8fCB7fSksXG4gICAgICBhcnJheVVuaW9uPHN0cmluZz4oREVGQVVMVF9TRVRURVJTLCBpbml0aWFsU2V0dGVycyB8fCBbXSksXG4gICAgICBiYXNlVHlwZSB8fCA8YW55Pk92ZXJsYXlDb250ZXh0IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvNzIzNFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBuZXcgT3ZlcmxheUNvbmZpZyB3aXRoIGEgY29udGV4dCBwcm9wZXJ0eSByZXByZXNlbnRpbmcgdGhlIGRhdGEgaW4gdGhpcyBidWlsZGVyLlxuICAgKiBAcGFyYW0gYmFzZSBBIGJhc2UgY29uZmlndXJhdGlvbiB0aGF0IHRoZSByZXN1bHQgd2lsbCBleHRlbmRcbiAgICovXG4gIHRvT3ZlcmxheUNvbmZpZyhiYXNlPzogT3ZlcmxheUNvbmZpZyk6IE92ZXJsYXlDb25maWcge1xuICAgIHJldHVybiBleHRlbmQoYmFzZSB8fCB7fSwge1xuICAgICAgY29udGV4dDogdGhpcy50b0pTT04oKVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb250cm9sbGluZ0NvbnRleHRCdWlsZGVyPFQ+IHtcbiAgb3Blbih2aWV3Q29udGFpbmVyPzogV2lkZVZDUmVmKTogRGlhbG9nUmVmPFQ+O1xufVxuXG4vKipcbiAqIEEgaGVscGVyIHRvIGNyZWF0ZSBhbiBgT3ZlcmxheUNvbmZpZ2Agb24gdGhlIGZseS5cbiAqIFNpbmNlIGBPdmVybGF5Q29uZmlnYCByZXF1aXJlcyBjb250ZXh0IGl0IG1lYW5zIGEgYnVpbGRlciBpcyBuZWVkZWQsIHRoaXMgcHJvY2VzcyBoYWQgc29tZSBib2lsZXJwbGF0ZS5cbiAqIFdoZW4gYSBxdWljaywgb24gdGhlIGZseSBvdmVybGF5IGNvbmZpZyBpcyBuZWVkZWQgdXNlIHRoaXMgaGVscGVyIHRvIGF2b2lkIHRoYXQgYm9pbGVycGxhdGUuXG4gKlxuICogQSBidWlsZGVyIGlzIHVzZWQgYXMgYW4gQVBJIHRvIGFsbG93IHNldHRpbmcgdGhlIGNvbnRleHQgYW5kIHByb3ZpZGluZyBzb21lIG9wZXJhdGlvbnMgYXJvdW5kIHRoZSBtb2RhbC5cbiAqIFdoZW4gYSBkZXZlbG9wZXJzIGtub3dzIHRoZSBjb250ZXh0IGJlZm9yZSBoYW5kIHdlIGNhbiBza2lwIHRoaXMgc3RlcCwgdGhpcyBpcyB3aGF0IHRoaXMgZmFjdG9yeSBpcyBmb3IuXG4gKlxuICogQHBhcmFtIGNvbnRleHQgVGhlIGNvbnRleHQgZm9yIHRoZSBtb2RhbFxuICogQHBhcmFtIGJhc2VDb250ZXh0VHlwZSBPcHRpb25hbC4gVGhlIHR5cGUvY2xhc3Mgb2YgdGhlIGNvbnRleHQuIFRoaXMgaXMgdGhlIGNsYXNzIHVzZWQgdG8gaW5pdCBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgY29udGV4dFxuICogQHBhcmFtIGJhc2VDb25maWcgQSBiYXNlIGNvbmZpZ3VyYXRpb24gdGhhdCB0aGUgcmVzdWx0IHdpbGwgZXh0ZW5kXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvdmVybGF5Q29uZmlnRmFjdG9yeTxUPihjb250ZXh0OiBULCBiYXNlQ29udGV4dFR5cGU/OiBhbnksIGJhc2VDb25maWc/OiBPdmVybGF5Q29uZmlnKTogT3ZlcmxheUNvbmZpZyB7XG4gIHJldHVybiBuZXcgT3ZlcmxheUNvbnRleHRCdWlsZGVyPFQgJiBPdmVybGF5Q29udGV4dD4oPGFueT5jb250ZXh0LCB1bmRlZmluZWQsIGJhc2VDb250ZXh0VHlwZSkudG9PdmVybGF5Q29uZmlnKGJhc2VDb25maWcpO1xufVxuIl19