import { Subject } from 'rxjs';
import { PromiseCompleter } from '../framework/utils';
import { DialogBailOutError } from '../models/errors';
/**
 * API to an open modal window.
 */
export class DialogRef {
    constructor(overlay, context) {
        this.overlay = overlay;
        this.context = context;
        this._resultDeferred = new PromiseCompleter();
        this._onDestroy = new Subject();
        this.onDestroy = this._onDestroy.asObservable();
    }
    /**
     * A Promise that is resolved on a close event and rejected on a dismiss event.
     */
    get result() {
        return this._resultDeferred.promise;
    }
    /**
     * Set a close/dismiss guard
     * @param guard
     */
    setCloseGuard(guard) {
        this.closeGuard = guard;
    }
    /**
     *  Close the modal with a return value, i.e: result.
     */
    close(result = null) {
        const _close = () => {
            this.destroy();
            this._resultDeferred.resolve(result);
        };
        this._fireHook('beforeClose')
            .then(value => value !== true && _close())
            .catch(_close);
    }
    /**
     *  Close the modal without a return value, i.e: cancelled.
     *  This call is automatically invoked when a user either:
     *  - Presses an exit keyboard key (if configured).
     *  - Clicks outside of the modal window (if configured).
     *  Usually, dismiss represent a Cancel button or a X button.
     */
    dismiss() {
        const _dismiss = () => {
            this.destroy();
            this._resultDeferred.promise.catch(() => { });
            this._resultDeferred.reject();
        };
        this._fireHook('beforeDismiss')
            .then(value => value !== true && _dismiss())
            .catch(_dismiss);
    }
    /**
     * Gracefully close the overlay/dialog with a rejected result.
     * Does not trigger canDestroy on the overlay.
     */
    bailOut() {
        if (this.destroyed !== true) {
            this.destroyed = true;
            this._onDestroy.next(null);
            this._onDestroy.complete();
            this._resultDeferred.reject(new DialogBailOutError());
        }
    }
    destroy() {
        if (this.destroyed !== true) {
            this.destroyed = true;
            if (typeof this.overlayRef.instance.canDestroy === 'function') {
                this.overlayRef.instance.canDestroy()
                    .catch(() => { })
                    .then(() => this._destroy());
            }
            else {
                this._destroy();
            }
        }
    }
    _destroy() {
        this._onDestroy.next(null);
        this._onDestroy.complete();
        this.overlayRef.destroy();
    }
    _fireHook(name) {
        const guard = this.closeGuard, fn = guard && typeof guard[name] === 'function' && guard[name];
        return Promise.resolve(fn ? fn.call(guard) : false);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXJlZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1tb2RpYWxvZy9zcmMvbGliL21vZGVscy9kaWFsb2ctcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHdEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFdEQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sU0FBUztJQXlCcEIsWUFBbUIsT0FBZ0IsRUFBUyxPQUFXO1FBQXBDLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFJO1FBSi9DLG9CQUFlLEdBQTBCLElBQUksZ0JBQWdCLEVBQU8sQ0FBQztRQUNyRSxlQUFVLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7UUFJdEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILGFBQWEsQ0FBQyxLQUFpQjtRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsU0FBYyxJQUFJO1FBQ3RCLE1BQU0sTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxDQUFVLGFBQWEsQ0FBQzthQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLE1BQU0sRUFBRSxDQUFDO2FBQ3pDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsT0FBTztRQUNMLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQyxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxDQUFVLGVBQWUsQ0FBQzthQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUFDO2FBQzNDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGtCQUFrQixFQUFFLENBQUMsQ0FBQztTQUN2RDtJQUNILENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtZQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUV0QixJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtnQkFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO3FCQUNsQyxLQUFLLENBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO3FCQUNoQixJQUFJLENBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFFLENBQUM7YUFDbkM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2pCO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sUUFBUTtRQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU8sU0FBUyxDQUFJLElBQXFDO1FBQ3hELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQ3ZCLEVBQUUsR0FBYSxLQUFLLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvRSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb21wb25lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUHJvbWlzZUNvbXBsZXRlciB9IGZyb20gJy4uL2ZyYW1ld29yay91dGlscyc7XG5pbXBvcnQgeyBPdmVybGF5LCBNb2RhbE92ZXJsYXkgfSBmcm9tICcuLi9vdmVybGF5L2luZGV4JztcbmltcG9ydCB7IENsb3NlR3VhcmQgfSBmcm9tICcuLi9tb2RlbHMvdG9rZW5zJztcbmltcG9ydCB7IERpYWxvZ0JhaWxPdXRFcnJvciB9IGZyb20gJy4uL21vZGVscy9lcnJvcnMnO1xuXG4vKipcbiAqIEFQSSB0byBhbiBvcGVuIG1vZGFsIHdpbmRvdy5cbiAqL1xuZXhwb3J0IGNsYXNzIERpYWxvZ1JlZjxUPiB7XG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIG92ZXJsYXkgY29tcG9uZW50IHJlZi5cbiAgICovXG4gIG92ZXJsYXlSZWY6IENvbXBvbmVudFJlZjxNb2RhbE92ZXJsYXk+O1xuXG4gIC8qKlxuICAgKiBTdGF0ZXMgaWYgdGhlIG1vZGFsIGlzIGluc2lkZSBhIHNwZWNpZmljIGVsZW1lbnQuXG4gICAqL1xuICBwdWJsaWMgaW5FbGVtZW50OiBib29sZWFuO1xuXG4gIHB1YmxpYyBkZXN0cm95ZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEZpcmVkIGJlZm9yZSBkaWFsb2cgaXMgZGVzdHJveWVkLlxuICAgKiBObyBuZWVkIHRvIHVuc3Vic2NyaWJlLCBkb25lIGF1dG9tYXRpY2FsbHkuXG4gICAqIE5vdGU6IEFsd2F5cyBjYWxsZWQuXG4gICAqIFdoZW4gY2FsbGVkLCBvdmVybGF5UmVmIG1pZ2h0IG9yIG1pZ2h0IG5vdCBiZSBkZXN0cm95ZWQuXG4gICAqL1xuICBwdWJsaWMgb25EZXN0cm95OiBPYnNlcnZhYmxlPHZvaWQ+O1xuXG4gIHByaXZhdGUgX3Jlc3VsdERlZmVycmVkOiBQcm9taXNlQ29tcGxldGVyPGFueT4gPSBuZXcgUHJvbWlzZUNvbXBsZXRlcjxhbnk+KCk7XG4gIHByaXZhdGUgX29uRGVzdHJveTogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgY2xvc2VHdWFyZDogQ2xvc2VHdWFyZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3ZlcmxheTogT3ZlcmxheSwgcHVibGljIGNvbnRleHQ/OiBUKSB7XG4gICAgdGhpcy5vbkRlc3Ryb3kgPSB0aGlzLl9vbkRlc3Ryb3kuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgb24gYSBjbG9zZSBldmVudCBhbmQgcmVqZWN0ZWQgb24gYSBkaXNtaXNzIGV2ZW50LlxuICAgKi9cbiAgZ2V0IHJlc3VsdCgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9yZXN1bHREZWZlcnJlZC5wcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIGNsb3NlL2Rpc21pc3MgZ3VhcmRcbiAgICogQHBhcmFtIGd1YXJkXG4gICAqL1xuICBzZXRDbG9zZUd1YXJkKGd1YXJkOiBDbG9zZUd1YXJkKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZUd1YXJkID0gZ3VhcmQ7XG4gIH1cblxuICAvKipcbiAgICogIENsb3NlIHRoZSBtb2RhbCB3aXRoIGEgcmV0dXJuIHZhbHVlLCBpLmU6IHJlc3VsdC5cbiAgICovXG4gIGNsb3NlKHJlc3VsdDogYW55ID0gbnVsbCkge1xuICAgIGNvbnN0IF9jbG9zZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgdGhpcy5fcmVzdWx0RGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuICAgIH07XG4gICAgdGhpcy5fZmlyZUhvb2s8Ym9vbGVhbj4oJ2JlZm9yZUNsb3NlJylcbiAgICAgIC50aGVuKHZhbHVlID0+IHZhbHVlICE9PSB0cnVlICYmIF9jbG9zZSgpKVxuICAgICAgLmNhdGNoKF9jbG9zZSk7XG4gIH1cblxuICAvKipcbiAgICogIENsb3NlIHRoZSBtb2RhbCB3aXRob3V0IGEgcmV0dXJuIHZhbHVlLCBpLmU6IGNhbmNlbGxlZC5cbiAgICogIFRoaXMgY2FsbCBpcyBhdXRvbWF0aWNhbGx5IGludm9rZWQgd2hlbiBhIHVzZXIgZWl0aGVyOlxuICAgKiAgLSBQcmVzc2VzIGFuIGV4aXQga2V5Ym9hcmQga2V5IChpZiBjb25maWd1cmVkKS5cbiAgICogIC0gQ2xpY2tzIG91dHNpZGUgb2YgdGhlIG1vZGFsIHdpbmRvdyAoaWYgY29uZmlndXJlZCkuXG4gICAqICBVc3VhbGx5LCBkaXNtaXNzIHJlcHJlc2VudCBhIENhbmNlbCBidXR0b24gb3IgYSBYIGJ1dHRvbi5cbiAgICovXG4gIGRpc21pc3MoKSB7XG4gICAgY29uc3QgX2Rpc21pc3MgPSAoKSA9PiB7XG4gICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX3Jlc3VsdERlZmVycmVkLnByb21pc2UuY2F0Y2goKCkgPT4ge30pO1xuICAgICAgdGhpcy5fcmVzdWx0RGVmZXJyZWQucmVqZWN0KCk7XG4gICAgfTtcbiAgICB0aGlzLl9maXJlSG9vazxib29sZWFuPignYmVmb3JlRGlzbWlzcycpXG4gICAgICAudGhlbih2YWx1ZSA9PiB2YWx1ZSAhPT0gdHJ1ZSAmJiBfZGlzbWlzcygpKVxuICAgICAgLmNhdGNoKF9kaXNtaXNzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHcmFjZWZ1bGx5IGNsb3NlIHRoZSBvdmVybGF5L2RpYWxvZyB3aXRoIGEgcmVqZWN0ZWQgcmVzdWx0LlxuICAgKiBEb2VzIG5vdCB0cmlnZ2VyIGNhbkRlc3Ryb3kgb24gdGhlIG92ZXJsYXkuXG4gICAqL1xuICBiYWlsT3V0KCkge1xuICAgIGlmICh0aGlzLmRlc3Ryb3llZCAhPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQobnVsbCk7XG4gICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICAgIHRoaXMuX3Jlc3VsdERlZmVycmVkLnJlamVjdChuZXcgRGlhbG9nQmFpbE91dEVycm9yKCkpO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuZGVzdHJveWVkICE9PSB0cnVlKSB7XG4gICAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vdmVybGF5UmVmLmluc3RhbmNlLmNhbkRlc3Ryb3kgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmluc3RhbmNlLmNhbkRlc3Ryb3koKVxuICAgICAgICAgIC5jYXRjaCggKCkgPT4ge30pXG4gICAgICAgICAgLnRoZW4gKCAoKSA9PiB0aGlzLl9kZXN0cm95KCkgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KG51bGwpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIHRoaXMub3ZlcmxheVJlZi5kZXN0cm95KCk7XG4gIH1cblxuICBwcml2YXRlIF9maXJlSG9vazxHPihuYW1lOiAnYmVmb3JlQ2xvc2UnIHwgJ2JlZm9yZURpc21pc3MnKTogUHJvbWlzZTxHPiB7XG4gICAgY29uc3QgZ3VhcmQgPSB0aGlzLmNsb3NlR3VhcmQsXG4gICAgICAgICAgZm46IEZ1bmN0aW9uID0gZ3VhcmQgJiYgdHlwZW9mIGd1YXJkW25hbWVdID09PSAnZnVuY3Rpb24nICYmIGd1YXJkW25hbWVdO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmbiA/IGZuLmNhbGwoZ3VhcmQpIDogZmFsc2UpO1xuICB9XG59XG4iXX0=