import { ModalOpenContext, ModalOpenContextBuilder } from "../../models/modal-open-context";
import { arrayUnion, extend } from '../../framework/utils';
const DEFAULT_VALUES = {
    dialogClass: 'modal-dialog',
    showClose: false
};
const DEFAULT_SETTERS = [
    'dialogClass',
    'size',
    'showClose'
];
export class BSModalContext extends ModalOpenContext {
    normalize() {
        if (!this.dialogClass) {
            this.dialogClass = DEFAULT_VALUES.dialogClass;
        }
        super.normalize();
    }
}
export class BSModalContextBuilder extends ModalOpenContextBuilder {
    constructor(defaultValues, initialSetters, baseType) {
        super(extend(DEFAULT_VALUES, defaultValues || {}), arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType || BSModalContext // https://github.com/Microsoft/TypeScript/issues/7234
        );
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1tb2RpYWxvZy9zcmMvbGliL3BsdWdpbnMvYm9vdHN0cmFwL21vZGFsLWNvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLHVCQUF1QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFNUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUzRCxNQUFNLGNBQWMsR0FBRztJQUNyQixXQUFXLEVBQUUsY0FBYztJQUMzQixTQUFTLEVBQUUsS0FBSztDQUNqQixDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQUc7SUFDdEIsYUFBYTtJQUNiLE1BQU07SUFDTixXQUFXO0NBQ1osQ0FBQztBQUtGLE1BQU0sT0FBTyxjQUFlLFNBQVEsZ0JBQWdCO0lBc0JsRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDO1NBQy9DO1FBRUQsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Q0FDRjtBQUdELE1BQU0sT0FBTyxxQkFBZ0QsU0FBUSx1QkFBMEI7SUF1QjdGLFlBQ0UsYUFBaUIsRUFDakIsY0FBeUIsRUFDekIsUUFBYztRQUVkLEtBQUssQ0FDSCxNQUFNLENBQU0sY0FBYyxFQUFFLGFBQWEsSUFBSSxFQUFFLENBQUMsRUFDaEQsVUFBVSxDQUFTLGVBQWUsRUFBRSxjQUFjLElBQUksRUFBRSxDQUFDLEVBQ3pELFFBQVEsSUFBUyxjQUFjLENBQUMsc0RBQXNEO1NBQ3ZGLENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RhbE9wZW5Db250ZXh0LCBNb2RhbE9wZW5Db250ZXh0QnVpbGRlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvbW9kYWwtb3Blbi1jb250ZXh0XCI7XG5pbXBvcnQgeyBGbHVlbnRBc3NpZ25NZXRob2QgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvZmx1ZW50LWFzc2lnbic7XG5pbXBvcnQgeyBhcnJheVVuaW9uLCBleHRlbmQgfSBmcm9tICcuLi8uLi9mcmFtZXdvcmsvdXRpbHMnO1xuXG5jb25zdCBERUZBVUxUX1ZBTFVFUyA9IHtcbiAgZGlhbG9nQ2xhc3M6ICdtb2RhbC1kaWFsb2cnLFxuICBzaG93Q2xvc2U6IGZhbHNlXG59O1xuXG5jb25zdCBERUZBVUxUX1NFVFRFUlMgPSBbXG4gICdkaWFsb2dDbGFzcycsXG4gICdzaXplJyxcbiAgJ3Nob3dDbG9zZSdcbl07XG5cblxuZXhwb3J0IHR5cGUgQm9vdHN0cmFwTW9kYWxTaXplID0gJ3NtJyB8ICdsZyc7XG5cbmV4cG9ydCBjbGFzcyBCU01vZGFsQ29udGV4dCBleHRlbmRzIE1vZGFsT3BlbkNvbnRleHQge1xuICAvKipcbiAgICogQSBDbGFzcyBmb3IgdGhlIG1vZGFsIGRpYWxvZyBjb250YWluZXIuXG4gICAqIERlZmF1bHQ6IG1vZGFsLWRpYWxvZ1xuICAgKi9cbiAgZGlhbG9nQ2xhc3M6IHN0cmluZztcblxuICAvKipcbiAgICogU2l6ZSBvZiB0aGUgbW9kYWwuICdsZycgb3IgJ3NtJyBvbmx5LlxuICAgKlxuICAgKiBJZiB5b3Ugd2FudCB0byB1c2UgY3VzdG9tIHNpemVzIGxlYXZlIHRoaXMgZW1wdHkgYW5kIHNldCB0aGUgZGlhbG9nQ2xhc3MgcHJvcGVydHkuXG4gICAqIGUuZzogZGlhbG9nQ2xhc3MgPSAnbW9kYWwtZGlhbG9nIG15LWN1c3RvbS1kaWFsb2dgXG4gICAqIE5PVEU6IE5vIHZhbGlkYXRpb24uXG4gICAqIERlZmF1bHQ6ICcnXG4gICAqL1xuICBzaXplOiBCb290c3RyYXBNb2RhbFNpemU7XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSwgc2hvdyBhIGNsb3NlIGJ1dHRvbiBvbiB0aGUgdG9wIHJpZ2h0IGNvcm5lci5cbiAgICovXG4gIHNob3dDbG9zZTogYm9vbGVhbjtcblxuICBub3JtYWxpemUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpYWxvZ0NsYXNzKSB7XG4gICAgICB0aGlzLmRpYWxvZ0NsYXNzID0gREVGQVVMVF9WQUxVRVMuZGlhbG9nQ2xhc3M7XG4gICAgfVxuXG4gICAgc3VwZXIubm9ybWFsaXplKCk7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgQlNNb2RhbENvbnRleHRCdWlsZGVyPFQgZXh0ZW5kcyBCU01vZGFsQ29udGV4dD4gZXh0ZW5kcyBNb2RhbE9wZW5Db250ZXh0QnVpbGRlcjxUPiB7XG4gIC8qKlxuICAgKiBBIENsYXNzIGZvciB0aGUgbW9kYWwgZGlhbG9nIGNvbnRhaW5lci5cbiAgICogRGVmYXVsdDogbW9kYWwtZGlhbG9nXG4gICAqL1xuICBkaWFsb2dDbGFzczogRmx1ZW50QXNzaWduTWV0aG9kPHN0cmluZywgdGhpcz47XG5cbiAgLyoqXG4gICAqIFNpemUgb2YgdGhlIG1vZGFsLiAnbGcnIG9yICdzbScgb25seS5cbiAgICpcbiAgICogSWYgeW91IHdhbnQgdG8gdXNlIGN1c3RvbSBzaXplcyBsZWF2ZSB0aGlzIGVtcHR5IGFuZCBzZXQgdGhlIGRpYWxvZ0NsYXNzIHByb3BlcnR5LlxuICAgKiBlLmc6IGRpYWxvZ0NsYXNzID0gJ21vZGFsLWRpYWxvZyBteS1jdXN0b20tZGlhbG9nYFxuICAgKiBOT1RFOiBObyB2YWxpZGF0aW9uLlxuICAgKiBEZWZhdWx0OiAnJ1xuICAgKi9cbiAgc2l6ZTogRmx1ZW50QXNzaWduTWV0aG9kPEJvb3RzdHJhcE1vZGFsU2l6ZSwgdGhpcz47XG5cblxuICAvKipcbiAgICogV2hlbiB0cnVlLCBzaG93IGEgY2xvc2UgYnV0dG9uIG9uIHRoZSB0b3AgcmlnaHQgY29ybmVyLlxuICAgKi9cbiAgc2hvd0Nsb3NlOiBGbHVlbnRBc3NpZ25NZXRob2Q8Ym9vbGVhbiwgdGhpcz47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZGVmYXVsdFZhbHVlcz86IFQsXG4gICAgaW5pdGlhbFNldHRlcnM/OiBzdHJpbmdbXSxcbiAgICBiYXNlVHlwZT86IGFueVxuICApIHtcbiAgICBzdXBlcihcbiAgICAgIGV4dGVuZDxhbnk+KERFRkFVTFRfVkFMVUVTLCBkZWZhdWx0VmFsdWVzIHx8IHt9KSxcbiAgICAgIGFycmF5VW5pb248c3RyaW5nPihERUZBVUxUX1NFVFRFUlMsIGluaXRpYWxTZXR0ZXJzIHx8IFtdKSxcbiAgICAgIGJhc2VUeXBlIHx8IDxhbnk+QlNNb2RhbENvbnRleHQgLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy83MjM0XG4gICAgKTtcbiAgfVxufVxuXG4iXX0=