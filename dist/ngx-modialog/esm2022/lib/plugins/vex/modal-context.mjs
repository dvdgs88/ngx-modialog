import { ModalOpenContext, ModalOpenContextBuilder, privateKey, extend, arrayUnion } from '../../../public_api';
const DEFAULT_VALUES = {
    className: 'default',
    overlayClassName: 'vex-overlay',
    contentClassName: 'vex-content',
    closeClassName: 'vex-close'
};
const DEFAULT_SETTERS = [
    'className',
    'overlayClassName',
    'contentClassName',
    'closeClassName',
    'showCloseButton'
];
export class VEXModalContext extends ModalOpenContext {
    normalize() {
        if (!this.className) {
            this.className = DEFAULT_VALUES.className;
        }
        if (!this.overlayClassName) {
            this.overlayClassName = DEFAULT_VALUES.overlayClassName;
        }
        if (!this.contentClassName) {
            this.contentClassName = DEFAULT_VALUES.contentClassName;
        }
        if (!this.closeClassName) {
            this.closeClassName = DEFAULT_VALUES.closeClassName;
        }
        super.normalize();
    }
}
export class VEXModalContextBuilder extends ModalOpenContextBuilder {
    constructor(defaultValues = undefined, initialSetters = undefined, baseType = undefined) {
        super(extend(DEFAULT_VALUES, defaultValues || {}), arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType || VEXModalContext // https://github.com/Microsoft/TypeScript/issues/7234
        );
    }
    /**
     *
     * @aliasFor isBlocking
     */
    overlayClosesOnClick(value) {
        this[privateKey('isBlocking')] = !value;
        return this;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1tb2RpYWxvZy9zcmMvbGliL3BsdWdpbnMvdmV4L21vZGFsLWNvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLGdCQUFnQixFQUNoQix1QkFBdUIsRUFFdkIsVUFBVSxFQUNWLE1BQU0sRUFDTixVQUFVLEVBQ1gsTUFBTSxxQkFBcUIsQ0FBQztBQUc3QixNQUFNLGNBQWMsR0FBRztJQUNyQixTQUFTLEVBQW9CLFNBQVM7SUFDdEMsZ0JBQWdCLEVBQUUsYUFBYTtJQUMvQixnQkFBZ0IsRUFBRSxhQUFhO0lBQy9CLGNBQWMsRUFBRSxXQUFXO0NBQzVCLENBQUM7QUFFRixNQUFNLGVBQWUsR0FBRztJQUN0QixXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsaUJBQWlCO0NBQ2xCLENBQUM7QUFLRixNQUFNLE9BQU8sZUFBZ0IsU0FBUSxnQkFBZ0I7SUFhbkQsU0FBUztRQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQztTQUMzQztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztTQUN6RDtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztTQUN6RDtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQztTQUNyRDtRQUVELEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sc0JBQWtELFNBQVEsdUJBQTBCO0lBWS9GLFlBQVksZ0JBQW1CLFNBQVMsRUFDNUIsaUJBQTJCLFNBQVMsRUFDcEMsV0FBd0IsU0FBUztRQUMzQyxLQUFLLENBQ0gsTUFBTSxDQUFNLGNBQWMsRUFBRSxhQUFhLElBQUksRUFBRSxDQUFDLEVBQ2hELFVBQVUsQ0FBUyxlQUFlLEVBQUUsY0FBYyxJQUFJLEVBQUUsQ0FBQyxFQUN6RCxRQUFRLElBQVMsZUFBZSxDQUFDLHNEQUFzRDtTQUN4RixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILG9CQUFvQixDQUFDLEtBQWM7UUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3hDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgTW9kYWxPcGVuQ29udGV4dCxcbiAgTW9kYWxPcGVuQ29udGV4dEJ1aWxkZXIsXG4gIEZsdWVudEFzc2lnbk1ldGhvZCxcbiAgcHJpdmF0ZUtleSxcbiAgZXh0ZW5kLFxuICBhcnJheVVuaW9uXG59IGZyb20gJy4uLy4uLy4uL3B1YmxpY19hcGknO1xuXG5cbmNvbnN0IERFRkFVTFRfVkFMVUVTID0ge1xuICBjbGFzc05hbWU6IDxWRVhCdWlsdEluVGhlbWVzPidkZWZhdWx0JyxcbiAgb3ZlcmxheUNsYXNzTmFtZTogJ3ZleC1vdmVybGF5JyxcbiAgY29udGVudENsYXNzTmFtZTogJ3ZleC1jb250ZW50JyxcbiAgY2xvc2VDbGFzc05hbWU6ICd2ZXgtY2xvc2UnXG59O1xuXG5jb25zdCBERUZBVUxUX1NFVFRFUlMgPSBbXG4gICdjbGFzc05hbWUnLFxuICAnb3ZlcmxheUNsYXNzTmFtZScsXG4gICdjb250ZW50Q2xhc3NOYW1lJyxcbiAgJ2Nsb3NlQ2xhc3NOYW1lJyxcbiAgJ3Nob3dDbG9zZUJ1dHRvbidcbl07XG5cbmV4cG9ydCB0eXBlIFZFWEJ1aWx0SW5UaGVtZXNcbiAgPSAnZGVmYXVsdCcgfCAnb3MnIHwgJ3BsYWluJyB8ICd3aXJlZnJhbWUnIHwgJ2ZsYXQtYXR0YWNrJyB8ICd0b3AnIHwgJ2JvdHRvbS1yaWdodC1jb3JuZXInO1xuXG5leHBvcnQgY2xhc3MgVkVYTW9kYWxDb250ZXh0IGV4dGVuZHMgTW9kYWxPcGVuQ29udGV4dCB7XG4gIC8qKlxuICAgKiBTZXQgdGhlIGJ1aWx0IGluIHNjaGVtYSB0byB1c2UuXG4gICAqL1xuICBjbGFzc05hbWU6IFZFWEJ1aWx0SW5UaGVtZXM7XG5cbiAgb3ZlcmxheUNsYXNzTmFtZTogc3RyaW5nO1xuICBjb250ZW50Q2xhc3NOYW1lOiBzdHJpbmc7XG4gIGNsb3NlQ2xhc3NOYW1lOiBzdHJpbmc7XG5cbiAgc2hvd0Nsb3NlQnV0dG9uOiBib29sZWFuO1xuXG5cbiAgbm9ybWFsaXplKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jbGFzc05hbWUpIHtcbiAgICAgIHRoaXMuY2xhc3NOYW1lID0gREVGQVVMVF9WQUxVRVMuY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vdmVybGF5Q2xhc3NOYW1lKSB7XG4gICAgICB0aGlzLm92ZXJsYXlDbGFzc05hbWUgPSBERUZBVUxUX1ZBTFVFUy5vdmVybGF5Q2xhc3NOYW1lO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jb250ZW50Q2xhc3NOYW1lKSB7XG4gICAgICB0aGlzLmNvbnRlbnRDbGFzc05hbWUgPSBERUZBVUxUX1ZBTFVFUy5jb250ZW50Q2xhc3NOYW1lO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jbG9zZUNsYXNzTmFtZSkge1xuICAgICAgdGhpcy5jbG9zZUNsYXNzTmFtZSA9IERFRkFVTFRfVkFMVUVTLmNsb3NlQ2xhc3NOYW1lO1xuICAgIH1cblxuICAgIHN1cGVyLm5vcm1hbGl6ZSgpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWRVhNb2RhbENvbnRleHRCdWlsZGVyPFQgZXh0ZW5kcyBWRVhNb2RhbENvbnRleHQ+IGV4dGVuZHMgTW9kYWxPcGVuQ29udGV4dEJ1aWxkZXI8VD4ge1xuICAvKipcbiAgICogU2V0IHRoZSBidWlsdCBpbiBzY2hlbWEgdG8gdXNlLlxuICAgKi9cbiAgY2xhc3NOYW1lOiBGbHVlbnRBc3NpZ25NZXRob2Q8VkVYQnVpbHRJblRoZW1lcywgdGhpcz47XG5cbiAgb3ZlcmxheUNsYXNzTmFtZTogRmx1ZW50QXNzaWduTWV0aG9kPHN0cmluZywgdGhpcz47XG4gIGNvbnRlbnRDbGFzc05hbWU6IEZsdWVudEFzc2lnbk1ldGhvZDxzdHJpbmcsIHRoaXM+O1xuICBjbG9zZUNsYXNzTmFtZTogRmx1ZW50QXNzaWduTWV0aG9kPHN0cmluZywgdGhpcz47XG5cbiAgc2hvd0Nsb3NlQnV0dG9uOiBGbHVlbnRBc3NpZ25NZXRob2Q8Ym9vbGVhbiwgdGhpcz47XG5cbiAgY29uc3RydWN0b3IoZGVmYXVsdFZhbHVlczogVCA9IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgaW5pdGlhbFNldHRlcnM6IHN0cmluZ1tdID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICBiYXNlVHlwZTogbmV3ICgpID0+IFQgPSB1bmRlZmluZWQpIHtcbiAgICBzdXBlcihcbiAgICAgIGV4dGVuZDxhbnk+KERFRkFVTFRfVkFMVUVTLCBkZWZhdWx0VmFsdWVzIHx8IHt9KSxcbiAgICAgIGFycmF5VW5pb248c3RyaW5nPihERUZBVUxUX1NFVFRFUlMsIGluaXRpYWxTZXR0ZXJzIHx8IFtdKSxcbiAgICAgIGJhc2VUeXBlIHx8IDxhbnk+VkVYTW9kYWxDb250ZXh0IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvNzIzNFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQGFsaWFzRm9yIGlzQmxvY2tpbmdcbiAgICovXG4gIG92ZXJsYXlDbG9zZXNPbkNsaWNrKHZhbHVlOiBib29sZWFuKTogdGhpcyB7XG4gICAgdGhpc1twcml2YXRlS2V5KCdpc0Jsb2NraW5nJyldID0gIXZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iXX0=