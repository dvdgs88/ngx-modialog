const BASKET_GROUP = {};
/**
 * A dumb stack implementation over an array.
 */
export class DialogRefStack {
    get length() {
        return this._stack.length;
    }
    constructor() {
        this._stack = [];
        this._stackMap = new Map();
    }
    closeAll(result = null) {
        for (let i = 0, len = this._stack.length; i < len; i++) {
            this._stack.pop().close(result);
        }
    }
    push(dialogRef, group) {
        if (this._stack.indexOf(dialogRef) === -1) {
            this._stack.push(dialogRef);
            this._stackMap.set(dialogRef, group || BASKET_GROUP);
        }
    }
    /**
     * Push a DialogRef into the stack and manage it so when it's done
     * it will automatically kick itself out of the stack.
     * @param dialogRef
     */
    pushManaged(dialogRef, group) {
        this.push(dialogRef, group);
        dialogRef.onDestroy.subscribe(() => this.remove(dialogRef));
    }
    pop() {
        const dialogRef = this._stack.pop();
        this._stackMap.delete(dialogRef);
        return dialogRef;
    }
    /**
     * Remove a DialogRef from the stack.
     * @param dialogRef
     */
    remove(dialogRef) {
        let idx = this.indexOf(dialogRef);
        if (idx > -1) {
            this._stack.splice(idx, 1);
            this._stackMap.delete(dialogRef);
        }
    }
    index(index) {
        return this._stack[index];
    }
    indexOf(dialogRef) {
        return this._stack.indexOf(dialogRef);
    }
    groupOf(dialogRef) {
        return this._stackMap.get(dialogRef);
    }
    groupBy(group) {
        const arr = [];
        if (group) {
            this._stackMap.forEach((value, key) => {
                if (value === group) {
                    arr.push(key);
                }
            });
        }
        return arr;
    }
    groupLength(group) {
        let count = 0;
        if (group) {
            this._stackMap.forEach((value) => {
                if (value === group) {
                    count++;
                }
            });
        }
        return count;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXJlZi1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1tb2RpYWxvZy9zcmMvbGliL21vZGVscy9kaWFsb2ctcmVmLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUV4Qjs7R0FFRztBQUNILE1BQU0sT0FBTyxjQUFjO0lBSXpCLElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDNUIsQ0FBQztJQUVEO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBcUIsQ0FBQztJQUNoRCxDQUFDO0lBRUQsUUFBUSxDQUFDLFNBQWMsSUFBSTtRQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0RCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7SUFFRCxJQUFJLENBQUMsU0FBdUIsRUFBRSxLQUFXO1FBQ3ZDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssSUFBSSxZQUFZLENBQUMsQ0FBQztTQUN0RDtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsV0FBVyxDQUFDLFNBQXVCLEVBQUUsS0FBVztRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1QixTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELEdBQUc7UUFDRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNLENBQUMsU0FBdUI7UUFDNUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNsQztJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsS0FBYTtRQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELE9BQU8sQ0FBQyxTQUF1QjtRQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxPQUFPLENBQUMsU0FBdUI7UUFDN0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQVU7UUFDaEIsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDcEMsSUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFO29CQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNmO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFVO1FBQ3BCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDL0IsSUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFO29CQUNuQixLQUFLLEVBQUUsQ0FBQztpQkFDVDtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpYWxvZ1JlZiB9IGZyb20gJy4vZGlhbG9nLXJlZic7XG5cbmNvbnN0IEJBU0tFVF9HUk9VUCA9IHt9O1xuXG4vKipcbiAqIEEgZHVtYiBzdGFjayBpbXBsZW1lbnRhdGlvbiBvdmVyIGFuIGFycmF5LlxuICovXG5leHBvcnQgY2xhc3MgRGlhbG9nUmVmU3RhY2s8VD4ge1xuICBwcml2YXRlIF9zdGFjazogRGlhbG9nUmVmPFQ+W107XG4gIHByaXZhdGUgX3N0YWNrTWFwOiBNYXA8RGlhbG9nUmVmPFQ+LCBhbnk+O1xuXG4gIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhY2subGVuZ3RoO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fc3RhY2sgPSBbXTtcbiAgICB0aGlzLl9zdGFja01hcCA9IG5ldyBNYXA8RGlhbG9nUmVmPFQ+LCBhbnk+KCk7XG4gIH1cblxuICBjbG9zZUFsbChyZXN1bHQ6IGFueSA9IG51bGwpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5fc3RhY2subGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRoaXMuX3N0YWNrLnBvcCgpLmNsb3NlKHJlc3VsdCk7XG4gICAgfVxuICB9XG5cbiAgcHVzaChkaWFsb2dSZWY6IERpYWxvZ1JlZjxUPiwgZ3JvdXA/OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3RhY2suaW5kZXhPZihkaWFsb2dSZWYpID09PSAtMSkge1xuICAgICAgdGhpcy5fc3RhY2sucHVzaChkaWFsb2dSZWYpO1xuICAgICAgdGhpcy5fc3RhY2tNYXAuc2V0KGRpYWxvZ1JlZiwgZ3JvdXAgfHwgQkFTS0VUX0dST1VQKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHVzaCBhIERpYWxvZ1JlZiBpbnRvIHRoZSBzdGFjayBhbmQgbWFuYWdlIGl0IHNvIHdoZW4gaXQncyBkb25lXG4gICAqIGl0IHdpbGwgYXV0b21hdGljYWxseSBraWNrIGl0c2VsZiBvdXQgb2YgdGhlIHN0YWNrLlxuICAgKiBAcGFyYW0gZGlhbG9nUmVmXG4gICAqL1xuICBwdXNoTWFuYWdlZChkaWFsb2dSZWY6IERpYWxvZ1JlZjxUPiwgZ3JvdXA/OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnB1c2goZGlhbG9nUmVmLCBncm91cCk7XG4gICAgZGlhbG9nUmVmLm9uRGVzdHJveS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZW1vdmUoZGlhbG9nUmVmKSk7XG4gIH1cblxuICBwb3AoKTogRGlhbG9nUmVmPFQ+IHtcbiAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLl9zdGFjay5wb3AoKTtcbiAgICB0aGlzLl9zdGFja01hcC5kZWxldGUoZGlhbG9nUmVmKTtcbiAgICByZXR1cm4gZGlhbG9nUmVmO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIERpYWxvZ1JlZiBmcm9tIHRoZSBzdGFjay5cbiAgICogQHBhcmFtIGRpYWxvZ1JlZlxuICAgKi9cbiAgcmVtb3ZlKGRpYWxvZ1JlZjogRGlhbG9nUmVmPFQ+KTogdm9pZCB7XG4gICAgbGV0IGlkeCA9IHRoaXMuaW5kZXhPZihkaWFsb2dSZWYpO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgdGhpcy5fc3RhY2suc3BsaWNlKGlkeCwgMSk7XG4gICAgICB0aGlzLl9zdGFja01hcC5kZWxldGUoZGlhbG9nUmVmKTtcbiAgICB9XG4gIH1cblxuICBpbmRleChpbmRleDogbnVtYmVyKTogRGlhbG9nUmVmPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fc3RhY2tbaW5kZXhdO1xuICB9XG5cbiAgaW5kZXhPZihkaWFsb2dSZWY6IERpYWxvZ1JlZjxUPik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YWNrLmluZGV4T2YoZGlhbG9nUmVmKTtcbiAgfVxuXG4gIGdyb3VwT2YoZGlhbG9nUmVmOiBEaWFsb2dSZWY8VD4pOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9zdGFja01hcC5nZXQoZGlhbG9nUmVmKTtcbiAgfVxuXG4gIGdyb3VwQnkoZ3JvdXA6IGFueSk6IERpYWxvZ1JlZjxUPltdIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBpZiAoZ3JvdXApIHtcbiAgICAgIHRoaXMuX3N0YWNrTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBncm91cCkge1xuICAgICAgICAgIGFyci5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgZ3JvdXBMZW5ndGgoZ3JvdXA6IGFueSk6IG51bWJlciB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBpZiAoZ3JvdXApIHtcbiAgICAgIHRoaXMuX3N0YWNrTWFwLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gZ3JvdXApIHtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG59XG4iXX0=