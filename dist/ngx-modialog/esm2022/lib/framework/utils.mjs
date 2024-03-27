/**
 * Simple object extend
 * @param m1
 * @param m2
 */
export function extend(m1, m2) {
    const m = {};
    for (const attr in m1) {
        if (m1.hasOwnProperty(attr)) {
            m[attr] = m1[attr];
        }
    }
    for (const attr in m2) {
        if (m2.hasOwnProperty(attr)) {
            m[attr] = m2[attr];
        }
    }
    return m;
}
/**
 * Simple, not optimized, array union of unique values.
 * @param arr1
 * @param arr2
 */
export function arrayUnion(arr1, arr2) {
    return arr1
        .concat(arr2.filter(v => arr1.indexOf(v) === -1));
}
/**
 * Returns true if the config supports a given key.
 * @param keyCode
 * @param config
 */
export function supportsKey(keyCode, config) {
    if (!Array.isArray(config)) {
        return config !== null;
    }
    return config.indexOf(keyCode) > -1;
}
/**
 * Given an object representing a key/value map of css properties, returns a valid css string
 * representing the object.
 * Example:
 * console.log(toStyleString({
 *     position: 'absolute',
 *     width: '100%',
 *     height: '100%',
 *     top: '0',
 *     left: '0',
 *     right: '0',
 *     bottom: '0'
 * }));
 * // position:absolute;width:100%;height:100%;top:0;left:0;right:0;bottom:0
 * @param obj
 */
export function toStyleString(obj) {
    return Object.getOwnPropertyNames(obj)
        .map(k => `${k}:${obj[k]}`)
        .join(';');
    // let objStr = JSON.stringify(obj);
    // return objStr.substr(1, objStr.length - 2)
    //     .replace(/,/g, ';')
    //     .replace(/"/g, '');
}
export class PromiseCompleter {
    constructor() {
        this.promise = new Promise((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }
}
export function noop() {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtbW9kaWFsb2cvc3JjL2xpYi9mcmFtZXdvcmsvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxNQUFNLENBQUksRUFBTyxFQUFFLEVBQU87SUFDeEMsTUFBTSxDQUFDLEdBQVMsRUFBRSxDQUFDO0lBQ25CLEtBQUssTUFBTSxJQUFJLElBQUksRUFBRSxFQUFFO1FBQ3JCLElBQUksRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNyQixDQUFFLENBQUMsSUFBSSxDQUFDLEdBQVMsRUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xDO0tBQ0Y7SUFFRCxLQUFLLE1BQU0sSUFBSSxJQUFJLEVBQUUsRUFBRTtRQUNyQixJQUFJLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDckIsQ0FBRSxDQUFDLElBQUksQ0FBQyxHQUFTLEVBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQztLQUNGO0lBRUQsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxVQUFVLENBQUksSUFBVyxFQUFFLElBQVc7SUFDcEQsT0FBTyxJQUFJO1NBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUV0RCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQUMsT0FBZSxFQUFFLE1BQXFCO0lBQ2hFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzFCLE9BQU8sTUFBTSxLQUFLLElBQUksQ0FBQztLQUN4QjtJQUVELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBQyxHQUE4QjtJQUMxRCxPQUFPLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUM7U0FDbkMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWIsb0NBQW9DO0lBQ3BDLDZDQUE2QztJQUM3QywwQkFBMEI7SUFDMUIsMEJBQTBCO0FBQzVCLENBQUM7QUFFRCxNQUFNLE9BQU8sZ0JBQWdCO0lBSzNCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQUlELE1BQU0sVUFBVSxJQUFJO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFNpbXBsZSBvYmplY3QgZXh0ZW5kXG4gKiBAcGFyYW0gbTFcbiAqIEBwYXJhbSBtMlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kPFQ+KG0xOiBhbnksIG0yOiBhbnkpOiBUIHtcbiAgY29uc3QgbTogVCA9IDxUPnt9O1xuICBmb3IgKGNvbnN0IGF0dHIgaW4gbTEpIHtcbiAgICBpZiAobTEuaGFzT3duUHJvcGVydHkoYXR0cikpIHtcbiAgICAgICg8YW55Pm0pW2F0dHJdID0gKDxhbnk+bTEpW2F0dHJdO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3QgYXR0ciBpbiBtMikge1xuICAgIGlmIChtMi5oYXNPd25Qcm9wZXJ0eShhdHRyKSkge1xuICAgICAgKDxhbnk+bSlbYXR0cl0gPSAoPGFueT5tMilbYXR0cl07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG07XG59XG5cbi8qKlxuICogU2ltcGxlLCBub3Qgb3B0aW1pemVkLCBhcnJheSB1bmlvbiBvZiB1bmlxdWUgdmFsdWVzLlxuICogQHBhcmFtIGFycjFcbiAqIEBwYXJhbSBhcnIyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcnJheVVuaW9uPFQ+KGFycjE6IGFueVtdLCBhcnIyOiBhbnlbXSk6IFRbXSB7XG4gIHJldHVybiBhcnIxXG4gICAgLmNvbmNhdChhcnIyLmZpbHRlcih2ID0+IGFycjEuaW5kZXhPZih2KSA9PT0gLTEpKTtcblxufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgY29uZmlnIHN1cHBvcnRzIGEgZ2l2ZW4ga2V5LlxuICogQHBhcmFtIGtleUNvZGVcbiAqIEBwYXJhbSBjb25maWdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1cHBvcnRzS2V5KGtleUNvZGU6IG51bWJlciwgY29uZmlnOiBBcnJheTxudW1iZXI+KTogYm9vbGVhbiB7XG4gIGlmICghQXJyYXkuaXNBcnJheShjb25maWcpKSB7XG4gICAgcmV0dXJuIGNvbmZpZyAhPT0gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBjb25maWcuaW5kZXhPZihrZXlDb2RlKSA+IC0xO1xufVxuXG4vKipcbiAqIEdpdmVuIGFuIG9iamVjdCByZXByZXNlbnRpbmcgYSBrZXkvdmFsdWUgbWFwIG9mIGNzcyBwcm9wZXJ0aWVzLCByZXR1cm5zIGEgdmFsaWQgY3NzIHN0cmluZ1xuICogcmVwcmVzZW50aW5nIHRoZSBvYmplY3QuXG4gKiBFeGFtcGxlOlxuICogY29uc29sZS5sb2codG9TdHlsZVN0cmluZyh7XG4gKiAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gKiAgICAgd2lkdGg6ICcxMDAlJyxcbiAqICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAqICAgICB0b3A6ICcwJyxcbiAqICAgICBsZWZ0OiAnMCcsXG4gKiAgICAgcmlnaHQ6ICcwJyxcbiAqICAgICBib3R0b206ICcwJ1xuICogfSkpO1xuICogLy8gcG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtib3R0b206MFxuICogQHBhcmFtIG9ialxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9TdHlsZVN0cmluZyhvYmo6IGFueSB8IENTU1N0eWxlRGVjbGFyYXRpb24pOiBzdHJpbmcge1xuICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKVxuICAgIC5tYXAoayA9PiBgJHtrfToke29ialtrXX1gKVxuICAgIC5qb2luKCc7Jyk7XG5cbiAgLy8gbGV0IG9ialN0ciA9IEpTT04uc3RyaW5naWZ5KG9iaik7XG4gIC8vIHJldHVybiBvYmpTdHIuc3Vic3RyKDEsIG9ialN0ci5sZW5ndGggLSAyKVxuICAvLyAgICAgLnJlcGxhY2UoLywvZywgJzsnKVxuICAvLyAgICAgLnJlcGxhY2UoL1wiL2csICcnKTtcbn1cblxuZXhwb3J0IGNsYXNzIFByb21pc2VDb21wbGV0ZXI8Uj4ge1xuICBwcm9taXNlOiBQcm9taXNlPFI+O1xuICByZXNvbHZlOiAodmFsdWU/OiBSIHwgUHJvbWlzZUxpa2U8Uj4pID0+IHZvaWQ7XG4gIHJlamVjdDogKGVycm9yPzogYW55LCBzdGFja1RyYWNlPzogc3RyaW5nKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgdGhpcy5yZXNvbHZlID0gcmVzO1xuICAgICAgdGhpcy5yZWplY3QgPSByZWo7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgQ2xhc3M8VD4gPSBuZXcoLi4uYXJnczogYW55W10pID0+IFQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBub29wKCkge1xufVxuIl19