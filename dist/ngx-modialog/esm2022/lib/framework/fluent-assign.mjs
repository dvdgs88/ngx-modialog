const PRIVATE_PREFIX = '$$';
const RESERVED_REGEX = /^(\$\$).*/;
function validateMethodName(name) {
    if (!name) {
        throw new Error(`Illegal method name. Empty method name is not allowed`);
    }
    else if (name in this) {
        throw new Error(`A member name '${name}' already defined.`);
    }
}
/**
 * Returns a list of assigned property names (non private)
 * @param subject
 */
function getAssignedPropertyNames(subject) {
    return Object.getOwnPropertyNames(subject)
        .filter(name => RESERVED_REGEX.test(name))
        .map(name => name.substr(2));
}
export function privateKey(name) {
    return PRIVATE_PREFIX + name;
}
function objectDefinePropertyValue(obj, propertyName, value) {
    Object.defineProperty(obj, propertyName, {
        configurable: false,
        enumerable: false,
        writable: false,
        value
    });
}
/**
 * Given a FluentAssign instance, apply all of the supplied default values so calling
 * instance.toJSON will return those values (does not create a setter function)
 * @param instance
 * @param defaultValues
 */
function applyDefaultValues(instance, defaultValues) {
    Object.getOwnPropertyNames(defaultValues)
        .forEach(name => instance[privateKey(name)] = defaultValues[name]);
}
/**
 * Create a function for setting a value for a property on a given object.
 * @param obj The object to apply the key & setter on.
 * @param propertyName The name of the property on the object
 * @param writeOnce If true will allow writing once (default: false)
 *
 * Example:
 * let obj = new FluentAssign<any>;
 * setAssignMethod(obj, 'myProp');
 * obj.myProp('someValue');
 * const result = obj.toJSON();
 * console.log(result); //{ myProp: 'someValue' }
 *
 *
 * let obj = new FluentAssign<any>;
 * setAssignMethod(obj, 'myProp', true); // applying writeOnce
 * obj.myProp('someValue');
 * obj.myProp('someValue'); // ERROR: Overriding config property 'myProp' is not allowed.
 */
export function setAssignMethod(obj, propertyName, writeOnce = false) {
    validateMethodName.call(obj, propertyName);
    const key = privateKey(propertyName);
    objectDefinePropertyValue(obj, propertyName, (value) => {
        if (writeOnce && this.hasOwnProperty(key)) {
            throw new Error(`Overriding config property '${propertyName}' is not allowed.`);
        }
        obj[key] = value;
        return obj;
    });
}
/**
 * Create a function for setting a value that is an alias to an other setter function.
 * @param obj The object to apply the key & setter on.
 * @param propertyName The name of the property on the object
 * @param srcPropertyName The name of the property on the object this alias points to
 * @param hard If true, will set a readonly property on the object that returns
 *        the value of the source property. Default: false
 *
 * Example:
 * let obj = new FluentAssign<any> ;
 * setAssignMethod(obj, 'myProp');
 * setAssignAlias(obj, 'myPropAlias', 'myProp');
 * obj.myPropAlias('someValue');
 * const result = obj.toJSON();
 * console.log(result); //{ myProp: 'someValue' }
 * result.myPropAlias // undefined
 *
 *
 * let obj = new FluentAssign<any> ;
 * setAssignMethod(obj, 'myProp');
 * setAssignAlias(obj, 'myPropAlias', 'myProp', true); // setting a hard alias.
 * obj.myPropAlias('someValue');
 * const result = obj.toJSON();
 * console.log(result); //{ myProp: 'someValue' }
 * result.myPropAlias // someValue
 */
export function setAssignAlias(obj, propertyName, srcPropertyName, hard = false) {
    validateMethodName.call(obj, propertyName);
    objectDefinePropertyValue(obj, propertyName, (value) => {
        obj[srcPropertyName](value);
        return obj;
    });
    if (hard === true) {
        const key = privateKey(propertyName), srcKey = privateKey(srcPropertyName);
        Object.defineProperty(obj, key, {
            configurable: false,
            enumerable: false,
            get: () => obj[srcKey]
        });
    }
}
/**
 * Represent a fluent API factory wrapper for defining FluentAssign instances.
 */
export class FluentAssignFactory {
    constructor(fluentAssign) {
        this._fluentAssign =
            fluentAssign instanceof FluentAssign ? fluentAssign : new FluentAssign();
    }
    /**
     * Create a setter method on the FluentAssign instance.
     * @param name The name of the setter function.
     * @param defaultValue If set (not undefined) set's the value on the instance immediately.
     */
    setMethod(name, defaultValue) {
        setAssignMethod(this._fluentAssign, name);
        if (defaultValue !== undefined) {
            this._fluentAssign[name](defaultValue);
        }
        return this;
    }
    /**
     * The FluentAssign instance.
     */
    get fluentAssign() {
        return this._fluentAssign;
    }
}
/**
 * Represent an object where every property is a function representing an assignment function.
 * Calling each function with a value will assign the value to the object and return the object.
 * Calling 'toJSON' returns an object with the same properties but this time representing the
 * assigned values.
 *
 * This allows setting an object in a fluent API manner.
 * Example:
 let fluent = new FluentAssign<any>(undefined, ['some', 'went']);
 fluent.some('thing').went('wrong').toJSON();
 // { some: 'thing', went: 'wrong' }
 */
export class FluentAssign {
    /**
     * Returns a FluentAssignFactory<FluentAssign<T>> ready to define a FluentAssign type.
     * @param defaultValues An object representing default values for the instance.
     * @param initialSetters A list of initial setters for the instance.
     */
    static compose(defaultValues, initialSetters) {
        return FluentAssign.composeWith(new FluentAssign(defaultValues, initialSetters));
    }
    /**
     * Returns a FluentAssignFactory<Z> where Z is an instance of FluentAssign<?> or a derived
     * class of it.
     * @param fluentAssign An instance of FluentAssign<?> or a derived class of FluentAssign<?>.
     */
    static composeWith(fluentAssign) {
        return new FluentAssignFactory(fluentAssign);
    }
    /**
     *
     * @param defaultValues An object representing default values for the underlying object.
     * @param initialSetters A list of initial setters for this FluentAssign.
     * @param baseType the class/type to create a new base. optional, {} is used if not supplied.
     */
    constructor(defaultValues, initialSetters, baseType) {
        if (Array.isArray(defaultValues)) {
            defaultValues.forEach(d => applyDefaultValues(this, d));
        }
        else if (defaultValues) {
            applyDefaultValues(this, defaultValues);
        }
        if (Array.isArray(initialSetters)) {
            initialSetters.forEach(name => setAssignMethod(this, name));
        }
        if (baseType) {
            this.__fluent$base__ = baseType;
        }
    }
    toJSON() {
        return getAssignedPropertyNames(this)
            .reduce((obj, name) => {
            const key = privateKey(name);
            // re-define property descriptors (we dont want their value)
            const propDesc = Object.getOwnPropertyDescriptor(this, key);
            if (propDesc) {
                Object.defineProperty(obj, name, propDesc);
            }
            else {
                obj[name] = this[key];
            }
            return obj;
        }, this.__fluent$base__ ? new this.__fluent$base__() : {});
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx1ZW50LWFzc2lnbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1tb2RpYWxvZy9zcmMvbGliL2ZyYW1ld29yay9mbHVlbnQtYXNzaWduLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQztBQUM1QixNQUFNLGNBQWMsR0FBRyxXQUFXLENBQUM7QUFFbkMsU0FBUyxrQkFBa0IsQ0FBQyxJQUFZO0lBQ3RDLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7S0FDMUU7U0FBTSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7UUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsSUFBSSxvQkFBb0IsQ0FBQyxDQUFDO0tBQzdEO0FBQ0gsQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQVMsd0JBQXdCLENBQUMsT0FBWTtJQUM1QyxPQUFPLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7U0FDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsSUFBWTtJQUNyQyxPQUFPLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFDL0IsQ0FBQztBQUVELFNBQVMseUJBQXlCLENBQUMsR0FBUSxFQUFFLFlBQVksRUFBRSxLQUEyQjtJQUNwRixNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQU87UUFDNUMsWUFBWSxFQUFFLEtBQUs7UUFDbkIsVUFBVSxFQUFFLEtBQUs7UUFDakIsUUFBUSxFQUFFLEtBQUs7UUFD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QUFRLEVBQUU7Z0JBQ1osTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzVDO2lCQUFNO2dCQUNDLEdBQUksQ0FBQyxJQUFJLENBQUMsR0FBUyxJQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDckM7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQU0sRUFBRSxDQUFDLENBQUM7SUFDcEUsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXh0ZW5kLCBhcnJheVVuaW9uIH0gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IFBSSVZBVEVfUFJFRklYID0gJyQkJztcbmNvbnN0IFJFU0VSVkVEX1JFR0VYID0gL14oXFwkXFwkKS4qLztcblxuZnVuY3Rpb24gdmFsaWRhdGVNZXRob2ROYW1lKG5hbWU6IHN0cmluZykge1xuICBpZiAoIW5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYElsbGVnYWwgbWV0aG9kIG5hbWUuIEVtcHR5IG1ldGhvZCBuYW1lIGlzIG5vdCBhbGxvd2VkYCk7XG4gIH0gZWxzZSBpZiAobmFtZSBpbiB0aGlzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBBIG1lbWJlciBuYW1lICcke25hbWV9JyBhbHJlYWR5IGRlZmluZWQuYCk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBvZiBhc3NpZ25lZCBwcm9wZXJ0eSBuYW1lcyAobm9uIHByaXZhdGUpXG4gKiBAcGFyYW0gc3ViamVjdFxuICovXG5mdW5jdGlvbiBnZXRBc3NpZ25lZFByb3BlcnR5TmFtZXMoc3ViamVjdDogYW55KTogc3RyaW5nW10ge1xuICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc3ViamVjdClcbiAgICAuZmlsdGVyKG5hbWUgPT4gUkVTRVJWRURfUkVHRVgudGVzdChuYW1lKSlcbiAgICAubWFwKG5hbWUgPT4gbmFtZS5zdWJzdHIoMikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpdmF0ZUtleShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gUFJJVkFURV9QUkVGSVggKyBuYW1lO1xufVxuXG5mdW5jdGlvbiBvYmplY3REZWZpbmVQcm9wZXJ0eVZhbHVlKG9iajogYW55LCBwcm9wZXJ0eU5hbWUsIHZhbHVlOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wZXJ0eU5hbWUsIDxhbnk+e1xuICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICAgIHZhbHVlXG4gIH0pO1xufVxuXG4vKipcbiAqIEdpdmVuIGEgRmx1ZW50QXNzaWduIGluc3RhbmNlLCBhcHBseSBhbGwgb2YgdGhlIHN1cHBsaWVkIGRlZmF1bHQgdmFsdWVzIHNvIGNhbGxpbmdcbiAqIGluc3RhbmNlLnRvSlNPTiB3aWxsIHJldHVybiB0aG9zZSB2YWx1ZXMgKGRvZXMgbm90IGNyZWF0ZSBhIHNldHRlciBmdW5jdGlvbilcbiAqIEBwYXJhbSBpbnN0YW5jZVxuICogQHBhcmFtIGRlZmF1bHRWYWx1ZXNcbiAqL1xuZnVuY3Rpb24gYXBwbHlEZWZhdWx0VmFsdWVzKGluc3RhbmNlOiBhbnksIGRlZmF1bHRWYWx1ZXM6IE9iamVjdCk6IHZvaWQge1xuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkZWZhdWx0VmFsdWVzKVxuICAgIC5mb3JFYWNoKG5hbWUgPT4gKDxhbnk+aW5zdGFuY2UpW3ByaXZhdGVLZXkobmFtZSldID0gKDxhbnk+ZGVmYXVsdFZhbHVlcylbbmFtZV0pO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGZ1bmN0aW9uIGZvciBzZXR0aW5nIGEgdmFsdWUgZm9yIGEgcHJvcGVydHkgb24gYSBnaXZlbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gYXBwbHkgdGhlIGtleSAmIHNldHRlciBvbi5cbiAqIEBwYXJhbSBwcm9wZXJ0eU5hbWUgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IG9uIHRoZSBvYmplY3RcbiAqIEBwYXJhbSB3cml0ZU9uY2UgSWYgdHJ1ZSB3aWxsIGFsbG93IHdyaXRpbmcgb25jZSAoZGVmYXVsdDogZmFsc2UpXG4gKlxuICogRXhhbXBsZTpcbiAqIGxldCBvYmogPSBuZXcgRmx1ZW50QXNzaWduPGFueT47XG4gKiBzZXRBc3NpZ25NZXRob2Qob2JqLCAnbXlQcm9wJyk7XG4gKiBvYmoubXlQcm9wKCdzb21lVmFsdWUnKTtcbiAqIGNvbnN0IHJlc3VsdCA9IG9iai50b0pTT04oKTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdCk7IC8veyBteVByb3A6ICdzb21lVmFsdWUnIH1cbiAqXG4gKlxuICogbGV0IG9iaiA9IG5ldyBGbHVlbnRBc3NpZ248YW55PjtcbiAqIHNldEFzc2lnbk1ldGhvZChvYmosICdteVByb3AnLCB0cnVlKTsgLy8gYXBwbHlpbmcgd3JpdGVPbmNlXG4gKiBvYmoubXlQcm9wKCdzb21lVmFsdWUnKTtcbiAqIG9iai5teVByb3AoJ3NvbWVWYWx1ZScpOyAvLyBFUlJPUjogT3ZlcnJpZGluZyBjb25maWcgcHJvcGVydHkgJ215UHJvcCcgaXMgbm90IGFsbG93ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRBc3NpZ25NZXRob2Q8VD4ob2JqOiBULCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgd3JpdGVPbmNlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgdmFsaWRhdGVNZXRob2ROYW1lLmNhbGwob2JqLCBwcm9wZXJ0eU5hbWUpO1xuXG4gIGNvbnN0IGtleSA9IHByaXZhdGVLZXkocHJvcGVydHlOYW1lKTtcbiAgb2JqZWN0RGVmaW5lUHJvcGVydHlWYWx1ZShvYmosIHByb3BlcnR5TmFtZSwgKHZhbHVlOiBhbnkpID0+IHtcbiAgICBpZiAod3JpdGVPbmNlICYmIHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBPdmVycmlkaW5nIGNvbmZpZyBwcm9wZXJ0eSAnJHtwcm9wZXJ0eU5hbWV9JyBpcyBub3QgYWxsb3dlZC5gKTtcbiAgICB9XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gb2JqO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBmdW5jdGlvbiBmb3Igc2V0dGluZyBhIHZhbHVlIHRoYXQgaXMgYW4gYWxpYXMgdG8gYW4gb3RoZXIgc2V0dGVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGFwcGx5IHRoZSBrZXkgJiBzZXR0ZXIgb24uXG4gKiBAcGFyYW0gcHJvcGVydHlOYW1lIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSBvbiB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gc3JjUHJvcGVydHlOYW1lIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSBvbiB0aGUgb2JqZWN0IHRoaXMgYWxpYXMgcG9pbnRzIHRvXG4gKiBAcGFyYW0gaGFyZCBJZiB0cnVlLCB3aWxsIHNldCBhIHJlYWRvbmx5IHByb3BlcnR5IG9uIHRoZSBvYmplY3QgdGhhdCByZXR1cm5zXG4gKiAgICAgICAgdGhlIHZhbHVlIG9mIHRoZSBzb3VyY2UgcHJvcGVydHkuIERlZmF1bHQ6IGZhbHNlXG4gKlxuICogRXhhbXBsZTpcbiAqIGxldCBvYmogPSBuZXcgRmx1ZW50QXNzaWduPGFueT4gO1xuICogc2V0QXNzaWduTWV0aG9kKG9iaiwgJ215UHJvcCcpO1xuICogc2V0QXNzaWduQWxpYXMob2JqLCAnbXlQcm9wQWxpYXMnLCAnbXlQcm9wJyk7XG4gKiBvYmoubXlQcm9wQWxpYXMoJ3NvbWVWYWx1ZScpO1xuICogY29uc3QgcmVzdWx0ID0gb2JqLnRvSlNPTigpO1xuICogY29uc29sZS5sb2cocmVzdWx0KTsgLy97IG15UHJvcDogJ3NvbWVWYWx1ZScgfVxuICogcmVzdWx0Lm15UHJvcEFsaWFzIC8vIHVuZGVmaW5lZFxuICpcbiAqXG4gKiBsZXQgb2JqID0gbmV3IEZsdWVudEFzc2lnbjxhbnk+IDtcbiAqIHNldEFzc2lnbk1ldGhvZChvYmosICdteVByb3AnKTtcbiAqIHNldEFzc2lnbkFsaWFzKG9iaiwgJ215UHJvcEFsaWFzJywgJ215UHJvcCcsIHRydWUpOyAvLyBzZXR0aW5nIGEgaGFyZCBhbGlhcy5cbiAqIG9iai5teVByb3BBbGlhcygnc29tZVZhbHVlJyk7XG4gKiBjb25zdCByZXN1bHQgPSBvYmoudG9KU09OKCk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQpOyAvL3sgbXlQcm9wOiAnc29tZVZhbHVlJyB9XG4gKiByZXN1bHQubXlQcm9wQWxpYXMgLy8gc29tZVZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRBc3NpZ25BbGlhczxUPihvYmo6IFQsIHByb3BlcnR5TmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyY1Byb3BlcnR5TmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhcmQ6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICB2YWxpZGF0ZU1ldGhvZE5hbWUuY2FsbChvYmosIHByb3BlcnR5TmFtZSk7XG5cbiAgb2JqZWN0RGVmaW5lUHJvcGVydHlWYWx1ZShvYmosIHByb3BlcnR5TmFtZSwgKHZhbHVlOiBhbnkpID0+IHtcbiAgICBvYmpbc3JjUHJvcGVydHlOYW1lXSh2YWx1ZSk7XG4gICAgcmV0dXJuIG9iajtcbiAgfSk7XG5cbiAgaWYgKGhhcmQgPT09IHRydWUpIHtcbiAgICBjb25zdCBrZXkgPSBwcml2YXRlS2V5KHByb3BlcnR5TmFtZSksXG4gICAgICBzcmNLZXkgPSBwcml2YXRlS2V5KHNyY1Byb3BlcnR5TmFtZSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIDxhbnk+e1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgZ2V0OiAoKSA9PiBvYmpbc3JjS2V5XVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogRGVzY3JpYmVzIGEgZmx1ZW50IGFzc2lnbiBtZXRob2QuXG4gKiBBIGZ1bmN0aW9uIHRoYXQgZ2V0cyBhIHZhbHVlIGFuZCByZXR1cm5zIHRoZSBpbnN0YW5jZSBpdCB3b3JrcyBvbi5cbiAqL1xuZXhwb3J0IHR5cGUgRmx1ZW50QXNzaWduTWV0aG9kPFQsIFo+ID0gKHZhbHVlOiBUKSA9PiBaO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZsdWVudEFzc2lnbkZhY3Rvcnk8Wj4ge1xuICBmbHVlbnRBc3NpZ246IFo7XG5cbiAgc2V0TWV0aG9kKG5hbWU6IHN0cmluZywgZGVmYXVsdFZhbHVlPzogYW55KTogSUZsdWVudEFzc2lnbkZhY3Rvcnk8Wj47XG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgZmx1ZW50IEFQSSBmYWN0b3J5IHdyYXBwZXIgZm9yIGRlZmluaW5nIEZsdWVudEFzc2lnbiBpbnN0YW5jZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBGbHVlbnRBc3NpZ25GYWN0b3J5PFQ+IHtcbiAgcHJpdmF0ZSBfZmx1ZW50QXNzaWduOiBGbHVlbnRBc3NpZ248VD47XG5cbiAgY29uc3RydWN0b3IoZmx1ZW50QXNzaWduPzogRmx1ZW50QXNzaWduPFQ+KSB7XG4gICAgdGhpcy5fZmx1ZW50QXNzaWduID1cbiAgICAgIGZsdWVudEFzc2lnbiBpbnN0YW5jZW9mIEZsdWVudEFzc2lnbiA/IGZsdWVudEFzc2lnbiA6IDxhbnk+bmV3IEZsdWVudEFzc2lnbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHNldHRlciBtZXRob2Qgb24gdGhlIEZsdWVudEFzc2lnbiBpbnN0YW5jZS5cbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHNldHRlciBmdW5jdGlvbi5cbiAgICogQHBhcmFtIGRlZmF1bHRWYWx1ZSBJZiBzZXQgKG5vdCB1bmRlZmluZWQpIHNldCdzIHRoZSB2YWx1ZSBvbiB0aGUgaW5zdGFuY2UgaW1tZWRpYXRlbHkuXG4gICAqL1xuICBzZXRNZXRob2QobmFtZTogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBhbnkpOiBGbHVlbnRBc3NpZ25GYWN0b3J5PFQ+IHtcbiAgICBzZXRBc3NpZ25NZXRob2QodGhpcy5fZmx1ZW50QXNzaWduLCBuYW1lKTtcbiAgICBpZiAoZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICg8YW55PnRoaXMuX2ZsdWVudEFzc2lnbilbbmFtZV0oZGVmYXVsdFZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVGhlIEZsdWVudEFzc2lnbiBpbnN0YW5jZS5cbiAgICovXG4gIGdldCBmbHVlbnRBc3NpZ24oKTogRmx1ZW50QXNzaWduPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fZmx1ZW50QXNzaWduO1xuICB9XG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnQgYW4gb2JqZWN0IHdoZXJlIGV2ZXJ5IHByb3BlcnR5IGlzIGEgZnVuY3Rpb24gcmVwcmVzZW50aW5nIGFuIGFzc2lnbm1lbnQgZnVuY3Rpb24uXG4gKiBDYWxsaW5nIGVhY2ggZnVuY3Rpb24gd2l0aCBhIHZhbHVlIHdpbGwgYXNzaWduIHRoZSB2YWx1ZSB0byB0aGUgb2JqZWN0IGFuZCByZXR1cm4gdGhlIG9iamVjdC5cbiAqIENhbGxpbmcgJ3RvSlNPTicgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCB0aGUgc2FtZSBwcm9wZXJ0aWVzIGJ1dCB0aGlzIHRpbWUgcmVwcmVzZW50aW5nIHRoZVxuICogYXNzaWduZWQgdmFsdWVzLlxuICpcbiAqIFRoaXMgYWxsb3dzIHNldHRpbmcgYW4gb2JqZWN0IGluIGEgZmx1ZW50IEFQSSBtYW5uZXIuXG4gKiBFeGFtcGxlOlxuIGxldCBmbHVlbnQgPSBuZXcgRmx1ZW50QXNzaWduPGFueT4odW5kZWZpbmVkLCBbJ3NvbWUnLCAnd2VudCddKTtcbiBmbHVlbnQuc29tZSgndGhpbmcnKS53ZW50KCd3cm9uZycpLnRvSlNPTigpO1xuIC8vIHsgc29tZTogJ3RoaW5nJywgd2VudDogJ3dyb25nJyB9XG4gKi9cbmV4cG9ydCBjbGFzcyBGbHVlbnRBc3NpZ248VD4ge1xuICBwcml2YXRlIF9fZmx1ZW50JGJhc2VfXzogbmV3ICgpID0+IFQ7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBGbHVlbnRBc3NpZ25GYWN0b3J5PEZsdWVudEFzc2lnbjxUPj4gcmVhZHkgdG8gZGVmaW5lIGEgRmx1ZW50QXNzaWduIHR5cGUuXG4gICAqIEBwYXJhbSBkZWZhdWx0VmFsdWVzIEFuIG9iamVjdCByZXByZXNlbnRpbmcgZGVmYXVsdCB2YWx1ZXMgZm9yIHRoZSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIGluaXRpYWxTZXR0ZXJzIEEgbGlzdCBvZiBpbml0aWFsIHNldHRlcnMgZm9yIHRoZSBpbnN0YW5jZS5cbiAgICovXG4gIHN0YXRpYyBjb21wb3NlPFQ+KGRlZmF1bHRWYWx1ZXM/OiBULCBpbml0aWFsU2V0dGVycz86IHN0cmluZ1tdKTogRmx1ZW50QXNzaWduRmFjdG9yeTxUPiB7XG5cbiAgICByZXR1cm4gPGFueT5GbHVlbnRBc3NpZ24uY29tcG9zZVdpdGg8Rmx1ZW50QXNzaWduPFQ+PihcbiAgICAgIG5ldyBGbHVlbnRBc3NpZ248VD4oZGVmYXVsdFZhbHVlcywgaW5pdGlhbFNldHRlcnMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgRmx1ZW50QXNzaWduRmFjdG9yeTxaPiB3aGVyZSBaIGlzIGFuIGluc3RhbmNlIG9mIEZsdWVudEFzc2lnbjw/PiBvciBhIGRlcml2ZWRcbiAgICogY2xhc3Mgb2YgaXQuXG4gICAqIEBwYXJhbSBmbHVlbnRBc3NpZ24gQW4gaW5zdGFuY2Ugb2YgRmx1ZW50QXNzaWduPD8+IG9yIGEgZGVyaXZlZCBjbGFzcyBvZiBGbHVlbnRBc3NpZ248Pz4uXG4gICAqL1xuICBzdGF0aWMgY29tcG9zZVdpdGg8Wj4oZmx1ZW50QXNzaWduOiBaKTogSUZsdWVudEFzc2lnbkZhY3Rvcnk8Wj4ge1xuICAgIHJldHVybiA8YW55Pm5ldyBGbHVlbnRBc3NpZ25GYWN0b3J5PGFueT4oPGFueT5mbHVlbnRBc3NpZ24pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBkZWZhdWx0VmFsdWVzIEFuIG9iamVjdCByZXByZXNlbnRpbmcgZGVmYXVsdCB2YWx1ZXMgZm9yIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cbiAgICogQHBhcmFtIGluaXRpYWxTZXR0ZXJzIEEgbGlzdCBvZiBpbml0aWFsIHNldHRlcnMgZm9yIHRoaXMgRmx1ZW50QXNzaWduLlxuICAgKiBAcGFyYW0gYmFzZVR5cGUgdGhlIGNsYXNzL3R5cGUgdG8gY3JlYXRlIGEgbmV3IGJhc2UuIG9wdGlvbmFsLCB7fSBpcyB1c2VkIGlmIG5vdCBzdXBwbGllZC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGRlZmF1bHRWYWx1ZXM/OiBUIHwgVFtdLCBpbml0aWFsU2V0dGVycz86IHN0cmluZ1tdLCBiYXNlVHlwZT86IG5ldyAoKSA9PiBUKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmYXVsdFZhbHVlcykpIHtcbiAgICAgIChkZWZhdWx0VmFsdWVzIGFzIEFycmF5PGFueT4pLmZvckVhY2goZCA9PiBhcHBseURlZmF1bHRWYWx1ZXModGhpcywgZCkpO1xuICAgIH0gZWxzZSBpZiAoZGVmYXVsdFZhbHVlcykge1xuICAgICAgYXBwbHlEZWZhdWx0VmFsdWVzKHRoaXMsIGRlZmF1bHRWYWx1ZXMpO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KGluaXRpYWxTZXR0ZXJzKSkge1xuXG4gICAgICBpbml0aWFsU2V0dGVycy5mb3JFYWNoKG5hbWUgPT4gc2V0QXNzaWduTWV0aG9kKHRoaXMsIG5hbWUpKTtcbiAgICB9XG5cbiAgICBpZiAoYmFzZVR5cGUpIHtcbiAgICAgIHRoaXMuX19mbHVlbnQkYmFzZV9fID0gYmFzZVR5cGU7XG4gICAgfVxuICB9XG5cbiAgdG9KU09OKCk6IFQge1xuICAgIHJldHVybiBnZXRBc3NpZ25lZFByb3BlcnR5TmFtZXModGhpcylcbiAgICAgIC5yZWR1Y2UoKG9iajogVCwgbmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IHByaXZhdGVLZXkobmFtZSk7XG4gICAgICAgIC8vIHJlLWRlZmluZSBwcm9wZXJ0eSBkZXNjcmlwdG9ycyAod2UgZG9udCB3YW50IHRoZWlyIHZhbHVlKVxuICAgICAgICBjb25zdCBwcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywga2V5KTtcbiAgICAgICAgaWYgKHByb3BEZXNjKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwgcHJvcERlc2MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICg8YW55Pm9iailbbmFtZV0gPSAoPGFueT50aGlzKVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9LCB0aGlzLl9fZmx1ZW50JGJhc2VfXyA/IG5ldyB0aGlzLl9fZmx1ZW50JGJhc2VfXygpIDogPGFueT57fSk7XG4gIH1cbn1cbiJdfQ==