export class DialogBailOutError extends Error {
    constructor(value) {
        super();
        if (!value) {
            value = 'Dialog was forced to close by an unknown source.';
        }
        this.message = value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LW1vZGlhbG9nL3NyYy9saWIvbW9kZWxzL2Vycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsS0FBSztJQUMzQyxZQUFZLEtBQWM7UUFDeEIsS0FBSyxFQUFFLENBQUM7UUFFUixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsS0FBSyxHQUFHLGtEQUFrRCxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIERpYWxvZ0JhaWxPdXRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IodmFsdWU/OiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdmFsdWUgPSAnRGlhbG9nIHdhcyBmb3JjZWQgdG8gY2xvc2UgYnkgYW4gdW5rbm93biBzb3VyY2UuJztcbiAgICB9XG4gICAgdGhpcy5tZXNzYWdlID0gdmFsdWU7XG4gIH1cbn1cbiJdfQ==