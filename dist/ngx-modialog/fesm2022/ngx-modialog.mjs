import * as i0 from '@angular/core';
import { ComponentFactoryResolver, Directive, Input, Component, ViewEncapsulation, TemplateRef, ElementRef, ViewContainerRef, ViewChild, HostListener, Injectable, Injector, NgModule, EventEmitter, Output } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

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
function privateKey(name) {
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
function setAssignMethod(obj, propertyName, writeOnce = false) {
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
function setAssignAlias(obj, propertyName, srcPropertyName, hard = false) {
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
class FluentAssignFactory {
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
class FluentAssign {
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

/**
 * Simple object extend
 * @param m1
 * @param m2
 */
function extend(m1, m2) {
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
function arrayUnion(arr1, arr2) {
    return arr1
        .concat(arr2.filter(v => arr1.indexOf(v) === -1));
}
/**
 * Returns true if the config supports a given key.
 * @param keyCode
 * @param config
 */
function supportsKey(keyCode, config) {
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
function toStyleString(obj) {
    return Object.getOwnPropertyNames(obj)
        .map(k => `${k}:${obj[k]}`)
        .join(';');
    // let objStr = JSON.stringify(obj);
    // return objStr.substr(1, objStr.length - 2)
    //     .replace(/,/g, ';')
    //     .replace(/"/g, '');
}
class PromiseCompleter {
    constructor() {
        this.promise = new Promise((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }
}
function noop() {
}

function createComponent(instructions) {
    const injector = instructions.injector || instructions.vcRef.injector;
    const cmpFactory = injector.get(ComponentFactoryResolver).resolveComponentFactory(instructions.component);
    if (instructions.vcRef) {
        return instructions.vcRef.createComponent(cmpFactory, instructions.vcRef.length, injector, instructions.projectableNodes);
    }
    else {
        return cmpFactory.create(injector);
    }
}

class DialogBailOutError extends Error {
    constructor(value) {
        super();
        if (!value) {
            value = 'Dialog was forced to close by an unknown source.';
        }
        this.message = value;
    }
}

/**
 * API to an open modal window.
 */
class DialogRef {
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

var DROP_IN_TYPE;
(function (DROP_IN_TYPE) {
    DROP_IN_TYPE[DROP_IN_TYPE["alert"] = 0] = "alert";
    DROP_IN_TYPE[DROP_IN_TYPE["prompt"] = 1] = "prompt";
    DROP_IN_TYPE[DROP_IN_TYPE["confirm"] = 2] = "confirm";
})(DROP_IN_TYPE || (DROP_IN_TYPE = {}));
class OverlayRenderer {
}

const vcRefCollection = {};
function getVCRef(key) {
    return vcRefCollection[key] ? vcRefCollection[key].slice() : [];
}
function setVCRef(key, vcRef) {
    if (!vcRefCollection.hasOwnProperty(key)) {
        vcRefCollection[key] = [];
    }
    vcRefCollection[key].push(vcRef);
}
function delVCRef(key, vcRef) {
    if (!vcRef) {
        vcRefCollection[key] = [];
    }
    else {
        const coll = vcRefCollection[key] || [], idx = coll.indexOf(vcRef);
        if (idx > -1) {
            coll.splice(idx, 1);
        }
    }
}
/**
 * A Simple store that holds a reference to ViewContainerRef instances by a user defined key.
 * This, with the OverlayTarget directive makes it easy to block the overlay inside an element
 * without having to use the angular query boilerplate.
 */
const vcRefStore = { getVCRef, setVCRef, delVCRef };

/**
 * A directive use to signal the overlay that the host of this directive
 * is a dialog boundary, i.e: over click outside of the element should close the modal
 * (if non blocking)
 */
// tslint:disable-next-line:directive-class-suffix
class OverlayDialogBoundary {
    constructor(el, dialogRef) {
        if (dialogRef && el.nativeElement) {
            dialogRef.overlayRef.instance.setClickBoundary(el.nativeElement);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: OverlayDialogBoundary, deps: [{ token: i0.ElementRef }, { token: DialogRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.7", type: OverlayDialogBoundary, selector: "[overlayDialogBoundary]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: OverlayDialogBoundary, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[overlayDialogBoundary]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: DialogRef }] });
// tslint:disable-next-line:directive-class-suffix
class OverlayTarget {
    set targetKey(value) {
        this._targetKey = value;
        if (value) {
            vcRefStore.setVCRef(value, this.vcRef);
        }
    }
    constructor(vcRef) {
        this.vcRef = vcRef;
    }
    ngOnDestroy() {
        if (this._targetKey) {
            vcRefStore.delVCRef(this._targetKey, this.vcRef);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: OverlayTarget, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.7", type: OverlayTarget, selector: "[overlayTarget]", inputs: { targetKey: ["overlayTarget", "targetKey"] }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: OverlayTarget, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[overlayTarget]'
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef }], propDecorators: { targetKey: [{
                type: Input,
                args: ['overlayTarget']
            }] } });

const BROWSER_PREFIX = ['webkit', 'moz', 'MS', 'o', ''];
function register(eventName, element, cb) {
    BROWSER_PREFIX.forEach(p => {
        element.addEventListener(p ? p + eventName : eventName.toLowerCase(), cb, false);
    });
}
/**
 * A base class for supporting dynamic components.
 * There are 3 main support areas:
 * 1 - Easy wrapper for dynamic styling via CSS classes and inline styles.
 * 2 - Easy wrapper for interception of transition/animation end events.
 * 3 - Easy wrapper for component creation and injection.
 *
 * Dynamic css is done via direct element manipulation (via renderer), it does not use change detection
 * or binding. This is to allow better control over animation.
 *
 * Animation support is limited, only transition/keyframes END even are notified.
 * The animation support is needed since currently the angular animation module is limited as well and
 * does not support CSS animation that are not pre-parsed and are not in the styles metadata of a component.
 *
 * Capabilities: Add/Remove styls, Add/Remove classes, listen to animation/transition end event,
 * add components
 */
class BaseDynamicComponent {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    activateAnimationListener() {
        if (this.animationEnd) {
            return;
        }
        this.animationEnd = new Subject();
        this.animationEnd$ = this.animationEnd.asObservable();
        register('TransitionEnd', this.el.nativeElement, (e) => this.onEnd(e));
        register('AnimationEnd', this.el.nativeElement, (e) => this.onEnd(e));
    }
    /**
     * Set a specific inline style on the overlay host element.
     * @param prop The style key
     * @param value The value, undefined to remove
     */
    setStyle(prop, value) {
        this.renderer.setStyle(this.el.nativeElement, prop, value);
        return this;
    }
    forceReflow() {
        this.el.nativeElement.offsetWidth;
    }
    addClass(css, forceReflow = false) {
        css.split(' ')
            .forEach(c => this.renderer.addClass(this.el.nativeElement, c));
        if (forceReflow) {
            this.forceReflow();
        }
    }
    removeClass(css, forceReflow = false) {
        css.split(' ')
            .forEach(c => this.renderer.removeClass(this.el.nativeElement, c));
        if (forceReflow) {
            this.forceReflow();
        }
    }
    ngOnDestroy() {
        if (this.animationEnd && !this.animationEnd.closed) {
            this.animationEnd.complete();
        }
    }
    myAnimationEnd$() {
        return this.animationEnd$.pipe(filter(e => e.target === this.el.nativeElement));
    }
    /**
     * Add a component, supply a view container ref.
     * Note: The components vcRef will result in a sibling.
     */
    _addComponent(instructions) {
        const cmpRef = createComponent(instructions);
        cmpRef.changeDetectorRef.detectChanges();
        return cmpRef;
    }
    onEnd(event) {
        if (!this.animationEnd.closed) {
            this.animationEnd.next(event);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BaseDynamicComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.7", type: BaseDynamicComponent, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BaseDynamicComponent, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }] });

/**
 * Represents the modal backdrop shaped by CSS.
 */
// tslint:disable-next-line:component-class-suffix
class CSSBackdrop extends BaseDynamicComponent {
    constructor(el, renderer) {
        super(el, renderer);
        this.activateAnimationListener();
        const style = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        };
        Object.keys(style).forEach(k => this.setStyle(k, style[k]));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: CSSBackdrop, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: CSSBackdrop, selector: "css-backdrop", host: { properties: { "attr.class": "cssClass", "attr.style": "styleStr" } }, usesInheritance: true, ngImport: i0, template: ``, isInline: true, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: CSSBackdrop, decorators: [{
            type: Component,
            args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'css-backdrop',
                    host: {
                        '[attr.class]': 'cssClass',
                        '[attr.style]': 'styleStr'
                    },
                    encapsulation: ViewEncapsulation.None,
                    template: ``
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }] });

/**
 * A component that acts as a top level container for an open modal window.
 */
// tslint:disable-next-line:component-class-suffix
class CSSDialogContainer extends BaseDynamicComponent {
    constructor(dialog, el, renderer) {
        super(el, renderer);
        this.dialog = dialog;
        this.activateAnimationListener();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: CSSDialogContainer, deps: [{ token: DialogRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: CSSDialogContainer, selector: "css-dialog-container", host: { attributes: { "tabindex": "-1", "role": "dialog" } }, usesInheritance: true, ngImport: i0, template: `
    <ng-content></ng-content>`, isInline: true, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: CSSDialogContainer, decorators: [{
            type: Component,
            args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'css-dialog-container',
                    host: {
                        'tabindex': '-1',
                        'role': 'dialog'
                    },
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-content></ng-content>`
                }]
        }], ctorParameters: () => [{ type: DialogRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }] });

// export { FadeInBackdrop } from './fade-in-backdrop';
// export { SplitScreenBackdrop } from './split-screen-backdrop';

// TODO: use DI factory for this.
// TODO: consolidate dup code
const isDoc$3 = !(typeof document === 'undefined' || !document);
/**
 * Represents the modal overlay.
 */
// tslint:disable-next-line:component-class-suffix
class ModalOverlay extends BaseDynamicComponent {
    constructor(dialogRef, vcr, el, renderer) {
        super(el, renderer);
        this.dialogRef = dialogRef;
        this.vcr = vcr;
        this.activateAnimationListener();
    }
    /**
     * @internal
     */
    getProjectables(content) {
        let nodes;
        if (typeof content === 'string') {
            nodes = [[this.renderer.createText(`${content}`)]];
        }
        else if (content instanceof TemplateRef) {
            nodes = [this.vcr.createEmbeddedView(content, { $implicit: this.dialogRef.context, dialogRef: this.dialogRef }).rootNodes];
        }
        else {
            nodes = [this.embedComponent({ component: content }).rootNodes];
        }
        return nodes;
    }
    embedComponent(config) {
        const ctx = config;
        return this.vcr.createEmbeddedView(this.template, {
            $implicit: ctx
        });
    }
    addComponent(type, projectableNodes = []) {
        return super._addComponent({
            component: type,
            vcRef: this.innerVcr,
            projectableNodes
        });
    }
    fullscreen() {
        const style = {
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            'z-index': 1500
        };
        Object.keys(style).forEach(k => this.setStyle(k, style[k]));
    }
    insideElement() {
        const style = {
            position: 'absolute',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        };
        Object.keys(style).forEach(k => this.setStyle(k, style[k]));
    }
    /**
     * Set a specific inline style for the container of the whole dialog component
     * The dialog component root element is the host of this component, it contains only 1 direct
     * child which is the container.
     *
     * Structure:
     *
     * ```html
     * <modal-overlay>
     *   <div>
     *     <!-- BACKDROP ELEMENT -->
     *     <!-- DIALOG CONTAINER ELEMENT -->
     *   </div>
     * </modal-overlay>
     * ```
     *
     * @param prop The style key
     * @param value The value, undefined to remove
     */
    setContainerStyle(prop, value) {
        this.renderer.setStyle(this.container.nativeElement, prop, value);
        return this;
    }
    /**
     * Define an element that click inside it will not trigger modal close.
     * Since events bubble, clicking on a dialog will bubble up to the overlay, a plugin
     * must define an element that represent the dialog, the overlay will make sure no to close when
     * it was clicked.
     * @param element
     */
    setClickBoundary(element) {
        let target;
        const elListener = event => target = event.target;
        const docListener = event => {
            if (this.dialogRef.context.isBlocking || !this.dialogRef.overlay.isTopMost(this.dialogRef)) {
                return;
            }
            let current = event.target;
            // on click, this will hit.
            if (current === target) {
                return;
            }
            // on mouse down -> drag -> release the current might not be 'target', it might be
            // a sibling or a child (i.e: not part of the tree-up direction). It might also be a release
            // outside the dialog... so we compare to the boundary element
            do {
                if (current === element) {
                    return;
                }
            } while (current.parentNode && (current = current.parentNode));
            this.dialogRef.dismiss();
        };
        if (isDoc$3) {
            this.dialogRef.onDestroy.subscribe(() => {
                element.removeEventListener('click', elListener, false);
                element.removeEventListener('touchstart', elListener, false);
                document.removeEventListener('click', docListener, false);
                document.removeEventListener('touchend', docListener, false);
            });
            setTimeout(() => {
                element.addEventListener('mousedown', elListener, false);
                element.addEventListener('touchstart', docListener, false);
                document.addEventListener('click', docListener, false);
                document.addEventListener('touchend', docListener, false);
            });
        }
    }
    /**
     * Temp workaround for animation where destruction of the top level component does not
     * trigger child animations. Solution should be found either in animation module or in design
     * of the modal component tree.
     */
    canDestroy() {
        const completer = new PromiseCompleter();
        if (!Array.isArray(this.beforeDestroyHandlers)) {
            completer.resolve();
        }
        else {
            // run destroy notification but protect against halt.
            let id = setTimeout(() => {
                id = null;
                completer.reject();
            }, 1000);
            const resolve = () => {
                if (id === null) {
                    return;
                }
                clearTimeout(id);
                completer.resolve();
            };
            Promise.all(this.beforeDestroyHandlers.map(fn => fn()))
                .then(resolve)
                .catch(resolve);
        }
        return completer.promise;
    }
    /**
     * A handler running before destruction of the overlay
     * use to delay destruction due to animation.
     * This is part of the workaround for animation, see canDestroy.
     *
     * NOTE: There is no guarantee that the listeners will fire, use dialog.onDestory for that.
     * @param fn
     */
    beforeDestroy(fn) {
        if (!this.beforeDestroyHandlers) {
            this.beforeDestroyHandlers = [];
        }
        this.beforeDestroyHandlers.push(fn);
    }
    documentKeypress(event) {
        // check that this modal is the last in the stack.
        if (!this.dialogRef.overlay.isTopMost(this.dialogRef)) {
            return;
        }
        if (supportsKey(event.keyCode, this.dialogRef.context.keyboard)) {
            this.dialogRef.dismiss();
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.dialogRef.destroyed !== true) {
            // if we're here the overlay is destroyed by an external event that is not user invoked.
            // i.e: The user did no call dismiss or close and dialogRef.destroy() did not invoke.
            // this will happen when routing or killing an element containing a blocked overlay (ngIf)
            // we bail out, i.e gracefully shutting down.
            this.dialogRef.bailOut();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: ModalOverlay, deps: [{ token: DialogRef }, { token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: ModalOverlay, selector: "modal-overlay", host: { listeners: { "body:keydown": "documentKeypress($event)" } }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ElementRef, static: true }, { propertyName: "innerVcr", first: true, predicate: ["innerView"], descendants: true, read: ViewContainerRef, static: true }, { propertyName: "template", first: true, predicate: ["template"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div #container>\n  <ng-template #innerView></ng-template>\n</div>\n<ng-template #template let-ctx>\n  <ng-container *ngComponentOutlet=\"ctx.component; injector: ctx.injector; content: ctx.projectableNodes\"></ng-container>\n</ng-template>", dependencies: [{ kind: "directive", type: i2.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: ModalOverlay, decorators: [{
            type: Component,
            args: [{ selector: 'modal-overlay', encapsulation: ViewEncapsulation.None, template: "<div #container>\n  <ng-template #innerView></ng-template>\n</div>\n<ng-template #template let-ctx>\n  <ng-container *ngComponentOutlet=\"ctx.component; injector: ctx.injector; content: ctx.projectableNodes\"></ng-container>\n</ng-template>" }]
        }], ctorParameters: () => [{ type: DialogRef }, { type: i0.ViewContainerRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { container: [{
                type: ViewChild,
                args: ['container', { read: ElementRef, static: true }]
            }], innerVcr: [{
                type: ViewChild,
                args: ['innerView', { read: ViewContainerRef, static: true }]
            }], template: [{
                type: ViewChild,
                args: ['template', { static: true }]
            }], documentKeypress: [{
                type: HostListener,
                args: ['body:keydown', ['$event']]
            }] } });

const BASKET_GROUP = {};
/**
 * A dumb stack implementation over an array.
 */
class DialogRefStack {
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

const _stack = new DialogRefStack();
class Overlay {
    get stackLength() {
        return _stack.length;
    }
    constructor(_modalRenderer, injector) {
        this._modalRenderer = _modalRenderer;
        this.injector = injector;
    }
    /**
     * Check if a given DialogRef is the top most ref in the stack.
     * TODO: distinguish between body modal vs in element modal.
     * @param dialogRef
     */
    isTopMost(dialogRef) {
        return _stack.indexOf(dialogRef) === _stack.length - 1;
    }
    stackPosition(dialogRef) {
        return _stack.indexOf(dialogRef);
    }
    groupStackLength(dialogRef) {
        return _stack.groupLength(_stack.groupOf(dialogRef));
    }
    closeAll(result = null) {
        _stack.closeAll(result);
    }
    /**
     * Creates an overlay and returns a dialog ref.
     * @param config instructions how to create the overlay
     * @param group A token to associate the new overlay with, used for reference (stacks usually)
     */
    open(config, group) {
        const viewContainer = config.viewContainer;
        let containers = [];
        if (typeof viewContainer === 'string') {
            containers = vcRefStore.getVCRef(viewContainer);
        }
        else if (Array.isArray(viewContainer)) {
            containers = viewContainer;
        }
        else if (viewContainer) {
            containers = [viewContainer];
        }
        else {
            containers = [null];
        }
        return containers
            .map(vc => this.createOverlay(config.renderer || this._modalRenderer, vc, config, group));
    }
    createOverlay(renderer, vcRef, config, group) {
        if (config.context) {
            config.context.normalize();
        }
        if (!config.injector) {
            config.injector = this.injector;
        }
        const dialog = new DialogRef(this, config.context || {});
        dialog.inElement = config.context && !!config.context.inElement;
        const cmpRef = renderer.render(dialog, vcRef, config.injector);
        Object.defineProperty(dialog, 'overlayRef', { value: cmpRef });
        _stack.pushManaged(dialog, group);
        return dialog;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: Overlay, deps: [{ token: OverlayRenderer }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: Overlay }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: Overlay, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: OverlayRenderer }, { type: i0.Injector }] });

class DOMOverlayRenderer {
    constructor(appRef, injector) {
        this.appRef = appRef;
        this.injector = injector;
        this.isDoc = !(typeof document === 'undefined' || !document);
    }
    render(dialog, vcRef, injector) {
        if (!injector) {
            injector = this.injector;
        }
        const cmpRef = createComponent({
            component: ModalOverlay,
            vcRef,
            injector: Injector.create({
                providers: [
                    { provide: DialogRef, useValue: dialog }
                ],
                parent: injector
            })
        });
        if (!vcRef) {
            this.appRef.attachView(cmpRef.hostView);
            // TODO: doesn't look like this is needed, explore. leaving now to be on the safe side.
            dialog.onDestroy.subscribe(() => this.appRef.detachView(cmpRef.hostView));
        }
        if (vcRef && dialog.inElement) {
            vcRef.element.nativeElement.appendChild(cmpRef.location.nativeElement);
        }
        else if (this.isDoc) {
            document.body.appendChild(cmpRef.location.nativeElement);
        }
        return cmpRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: DOMOverlayRenderer, deps: [{ token: i0.ApplicationRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: DOMOverlayRenderer }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: DOMOverlayRenderer, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i0.ApplicationRef }, { type: i0.Injector }] });

class BSMessageModalTitle {
    constructor(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
    }
    get titleHtml() {
        return this.context.titleHtml ? 1 : 0;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSMessageModalTitle, deps: [{ token: DialogRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: BSMessageModalTitle, selector: "modal-title", ngImport: i0, template: `<div [ngClass]="context.headerClass" [ngSwitch]="titleHtml">
      <button *ngIf="context.showClose" type="button" class="close"
              aria-label="Close" (click)="dialog.dismiss()">
          <span aria-hidden="true">×</span>
      </button>
      <div *ngSwitchCase="1" [innerHtml]="context.titleHtml"></div>
      <h3 *ngSwitchDefault class="modal-title">{{context.title}}</h3>
 </div>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i2.NgSwitchDefault, selector: "[ngSwitchDefault]" }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSMessageModalTitle, decorators: [{
            type: Component,
            args: [{
                    selector: 'modal-title',
                    encapsulation: ViewEncapsulation.None,
                    template: `<div [ngClass]="context.headerClass" [ngSwitch]="titleHtml">
      <button *ngIf="context.showClose" type="button" class="close"
              aria-label="Close" (click)="dialog.dismiss()">
          <span aria-hidden="true">×</span>
      </button>
      <div *ngSwitchCase="1" [innerHtml]="context.titleHtml"></div>
      <h3 *ngSwitchDefault class="modal-title">{{context.title}}</h3>
 </div>`
                }]
        }], ctorParameters: () => [{ type: DialogRef }] });
// tslint:disable-next-line:component-class-suffix
class BSMessageModalBody {
    constructor(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSMessageModalBody, deps: [{ token: DialogRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: BSMessageModalBody, selector: "modal-body", ngImport: i0, template: `<div [ngClass]="context.bodyClass">
    <div [innerHtml]="context.message"></div>
      <div *ngIf="context.showInput" class="form-group">
        <input autofocus #input
            name="bootstrap"
            type="text"
            class="form-control"
            [value]="context.defaultValue"
            (change)="context.defaultValue = input.value"
            placeholder="{{context.placeholder}}">
      </div>
    </div>
`, isInline: true, styles: [".form-group{margin-top:10px}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSMessageModalBody, decorators: [{
            type: Component,
            args: [{ selector: 'modal-body', encapsulation: ViewEncapsulation.None, template: `<div [ngClass]="context.bodyClass">
    <div [innerHtml]="context.message"></div>
      <div *ngIf="context.showInput" class="form-group">
        <input autofocus #input
            name="bootstrap"
            type="text"
            class="form-control"
            [value]="context.defaultValue"
            (change)="context.defaultValue = input.value"
            placeholder="{{context.placeholder}}">
      </div>
    </div>
`, styles: [".form-group{margin-top:10px}\n"] }]
        }], ctorParameters: () => [{ type: DialogRef }] });
/**
 * Represents the modal footer for storing buttons.
 */
// tslint:disable-next-line:component-class-suffix
class BSModalFooter {
    constructor(dialog) {
        this.dialog = dialog;
    }
    onClick(btn, $event) {
        $event.stopPropagation();
        btn.onClick(this, $event);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSModalFooter, deps: [{ token: DialogRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: BSModalFooter, selector: "modal-footer", ngImport: i0, template: `<div [ngClass]="dialog.context.footerClass">
    <button *ngFor="let btn of dialog.context.buttons;"
            [ngClass]="btn.cssClass"
            (click)="onClick(btn, $event)">{{btn.caption}}</button>
</div>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSModalFooter, decorators: [{
            type: Component,
            args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'modal-footer',
                    encapsulation: ViewEncapsulation.None,
                    template: `<div [ngClass]="dialog.context.footerClass">
    <button *ngFor="let btn of dialog.context.buttons;"
            [ngClass]="btn.cssClass"
            (click)="onClick(btn, $event)">{{btn.caption}}</button>
</div>`
                }]
        }], ctorParameters: () => [{ type: DialogRef }] });
/**
 * A Component representing a generic bootstrap modal content element.
 *
 * By configuring a MessageModalContext instance you can:
 *
 *  Header:
 *      - Set header container class (default: modal-header)
 *      - Set title text (enclosed in H3 element)
 *      - Set title html (overrides text)
 *
 *  Body:
 *      - Set body container class.  (default: modal-body)
 *      - Set body container HTML.
 *
 *  Footer:
 *      - Set footer class.  (default: modal-footer)
 *      - Set button configuration (from 0 to n)
 */
// tslint:disable-next-line:component-class-suffix
class BSMessageModal {
    constructor(dialog) {
        this.dialog = dialog;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSMessageModal, deps: [{ token: DialogRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: BSMessageModal, selector: "modal-content", ngImport: i0, template: `<modal-title></modal-title><modal-body></modal-body><modal-footer></modal-footer>`, isInline: true, dependencies: [{ kind: "component", type: BSModalFooter, selector: "modal-footer" }, { kind: "component", type: BSMessageModalTitle, selector: "modal-title" }, { kind: "component", type: BSMessageModalBody, selector: "modal-body" }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSMessageModal, decorators: [{
            type: Component,
            args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'modal-content',
                    encapsulation: ViewEncapsulation.None,
                    template: `<modal-title></modal-title><modal-body></modal-body><modal-footer></modal-footer>`
                }]
        }], ctorParameters: () => [{ type: DialogRef }] });

const DEFAULT_VALUES$5 = {
    inElement: false,
    isBlocking: true,
    keyboard: [27],
    supportsKey: function supportsKey(keyCode) {
        return this.keyboard.indexOf(keyCode) > -1;
    }
};
const DEFAULT_SETTERS$7 = [
    'inElement',
    'isBlocking',
    'keyboard'
];
class OverlayContext {
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
            this.keyboard = DEFAULT_VALUES$5.keyboard;
        }
    }
}
/**
 * A core context builder for a modal window instance, used to define the context upon
 * a modal choose it's behaviour.
 */
class OverlayContextBuilder extends FluentAssign {
    constructor(defaultValues, initialSetters, baseType) {
        super(extend(DEFAULT_VALUES$5, defaultValues || {}), arrayUnion(DEFAULT_SETTERS$7, initialSetters || []), baseType || OverlayContext // https://github.com/Microsoft/TypeScript/issues/7234
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
function overlayConfigFactory(context, baseContextType, baseConfig) {
    return new OverlayContextBuilder(context, undefined, baseContextType).toOverlayConfig(baseConfig);
}

const DEFAULT_VALUES$4 = {};
const DEFAULT_SETTERS$6 = [
    'message'
];
class ModalContext extends OverlayContext {
}
/**
 * A core context builder for a modal window instance, used to define the context upon
 * a modal choose it's behaviour.
 */
class ModalContextBuilder extends OverlayContextBuilder {
    constructor(defaultValues, initialSetters, baseType) {
        super(extend(DEFAULT_VALUES$4, defaultValues || {}), arrayUnion(DEFAULT_SETTERS$6, initialSetters || []), baseType);
    }
}

const DEFAULT_SETTERS$5 = [
    'component'
];
class ModalOpenContext extends ModalContext {
}
/**
 * A Modal Context that knows about the modal service, and so can open a modal window on demand.
 * Use the fluent API to configure the preset and then invoke the 'open' method to open a modal
 * based on the context.
 */
class ModalOpenContextBuilder extends ModalContextBuilder {
    constructor(defaultValues, initialSetters, baseType) {
        super(defaultValues || {}, arrayUnion(DEFAULT_SETTERS$5, initialSetters || []), baseType);
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
        if (!(context.modal instanceof Modal$1)) {
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

const DEFAULT_VALUES$3 = {
    dialogClass: 'modal-dialog',
    showClose: false
};
const DEFAULT_SETTERS$4 = [
    'dialogClass',
    'size',
    'showClose'
];
class BSModalContext extends ModalOpenContext {
    normalize() {
        if (!this.dialogClass) {
            this.dialogClass = DEFAULT_VALUES$3.dialogClass;
        }
        super.normalize();
    }
}
class BSModalContextBuilder extends ModalOpenContextBuilder {
    constructor(defaultValues, initialSetters, baseType) {
        super(extend(DEFAULT_VALUES$3, defaultValues || {}), arrayUnion(DEFAULT_SETTERS$4, initialSetters || []), baseType || BSModalContext // https://github.com/Microsoft/TypeScript/issues/7234
        );
    }
}

const DEFAULT_VALUES$2 = {
    component: BSMessageModal,
    headerClass: 'modal-header',
    bodyClass: 'modal-body',
    footerClass: 'modal-footer'
};
const DEFAULT_SETTERS$3 = [
    'headerClass',
    'title',
    'titleHtml',
    'bodyClass',
    'footerClass'
];
/**
 * A Preset representing the configuration needed to open MessageModal.
 * This is an abstract implementation with no concrete behaviour.
 * Use derived implementation.
 */
class MessageModalPresetBuilder extends BSModalContextBuilder {
    constructor(defaultValues, initialSetters, baseType) {
        super(extend(extend({ buttons: [] }, DEFAULT_VALUES$2), defaultValues || {}), arrayUnion(DEFAULT_SETTERS$3, initialSetters || []), baseType);
        setAssignAlias(this, 'body', 'message', true);
    }
    addButton(css, caption, onClick) {
        const btn = {
            cssClass: css,
            caption: caption,
            onClick: onClick
        };
        const key = privateKey('buttons');
        this[key].push(btn);
        return this;
    }
}

/**
 * A Preset for a classic 1 button modal window.
 */
class OneButtonPresetBuilder extends MessageModalPresetBuilder {
    constructor(modal, defaultValues) {
        super(extend({
            modal: modal,
            okBtn: 'OK',
            okBtnClass: 'btn btn-primary'
        }, defaultValues || {}), [
            'okBtn',
            'okBtnClass'
        ]);
    }
    $$beforeOpen(config) {
        super.$$beforeOpen(config);
        this.addButton(config.okBtnClass, config.okBtn, (cmp, $event) => cmp.dialog.close(true));
    }
}

/** Common two button preset */
class AbstractTwoButtonPresetBuilder extends MessageModalPresetBuilder {
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
class TwoButtonPresetBuilder extends AbstractTwoButtonPresetBuilder {
    constructor(modal, defaultValues) {
        super(modal, defaultValues);
    }
    $$beforeOpen(config) {
        super.$$beforeOpen(config);
        this.addButton(config.okBtnClass, config.okBtn, (cmp, $event) => cmp.dialog.close(true));
    }
}
class PromptPresetBuilder extends AbstractTwoButtonPresetBuilder {
    constructor(modal, defaultValues) {
        super(modal, extend({ showInput: true, defaultValue: '' }, defaultValues || {}), ['placeholder', 'defaultValue']);
    }
    $$beforeOpen(config) {
        super.$$beforeOpen(config);
        this.addButton(config.okBtnClass, config.okBtn, (cmp, $event) => cmp.dialog.close(cmp.dialog.context.defaultValue));
    }
}

// tslint:disable-next-line:component-class-suffix
class BSModalContainer extends BaseDynamicComponent {
    constructor(dialog, el, renderer) {
        super(el, renderer);
        this.dialog = dialog;
        this.activateAnimationListener();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSModalContainer, deps: [{ token: DialogRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: BSModalContainer, selector: "bs-modal-container", host: { attributes: { "tabindex": "-1", "role": "dialog" }, styleAttribute: "position: absolute; display: block", classAttribute: "modal fade" }, usesInheritance: true, ngImport: i0, template: `
    <div [ngClass]="dialog.context.dialogClass"
         [class.modal-lg]="dialog.context.size == \'lg\'"
         [class.modal-sm]="dialog.context.size == \'sm\'">
      <div class="modal-content" style="display:block" role="document" overlayDialogBoundary>
        <ng-content></ng-content>
      </div>
    </div>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: OverlayDialogBoundary, selector: "[overlayDialogBoundary]" }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: BSModalContainer, decorators: [{
            type: Component,
            args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'bs-modal-container',
                    host: {
                        'tabindex': '-1',
                        'role': 'dialog',
                        'class': 'modal fade',
                        'style': 'position: absolute; display: block'
                    },
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <div [ngClass]="dialog.context.dialogClass"
         [class.modal-lg]="dialog.context.size == \'lg\'"
         [class.modal-sm]="dialog.context.size == \'sm\'">
      <div class="modal-content" style="display:block" role="document" overlayDialogBoundary>
        <ng-content></ng-content>
      </div>
    </div>`
                }]
        }], ctorParameters: () => [{ type: DialogRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }] });

// TODO: use DI factory for this.
// TODO: consolidate dup code
const isDoc$2 = !(typeof document === 'undefined' || !document);
let animationClass = 'in';
let Modal$1 = class Modal {
    constructor(overlay) {
        this.overlay = overlay;
    }
    alert() {
        return new OneButtonPresetBuilder(this, { isBlocking: false });
    }
    prompt() {
        return new PromptPresetBuilder(this, { isBlocking: true, keyboard: null });
    }
    confirm() {
        return new TwoButtonPresetBuilder(this, { isBlocking: true, keyboard: null });
    }
    /**
     * Opens a modal window inside an existing component.
     * @param content The content to display, either string, template ref or a component.
     * @param config Additional settings.
     */
    open(content, config) {
        config = config || {};
        const dialogs = this.overlay.open(config, this.constructor);
        if (dialogs.length > 1) {
            console.warn(`Attempt to open more then 1 overlay detected.
      Multiple modal copies are not supported at the moment,
      only the first viewContainer will display.`);
        }
        // TODO:  Currently supporting 1 view container, hence working on dialogs[0].
        //        upgrade to multiple containers.
        return this.create(dialogs[0], content);
    }
    create(dialogRef, content) {
        const backdropRef = this.createBackdrop(dialogRef, CSSBackdrop);
        const containerRef = this.createContainer(dialogRef, BSModalContainer, content);
        const overlay = dialogRef.overlayRef.instance;
        const backdrop = backdropRef.instance;
        const container = containerRef.instance;
        dialogRef.inElement ? overlay.insideElement() : overlay.fullscreen();
        // add body class if this is the only dialog in the stack
        if (isDoc$2 && !document.body.classList.contains('modal-open')) {
            document.body.classList.add('modal-open');
        }
        if (dialogRef.inElement) {
            backdrop.setStyle('position', 'absolute');
        }
        backdrop.addClass('modal-backdrop fade', true);
        backdrop.addClass(animationClass);
        container.addClass(animationClass);
        if (containerRef.location.nativeElement) {
            containerRef.location.nativeElement.focus();
        }
        overlay.beforeDestroy(() => {
            const completer = new PromiseCompleter();
            backdrop.removeClass(animationClass);
            container.removeClass(animationClass);
            combineLatest.call(backdrop.myAnimationEnd$(), container.myAnimationEnd$(), (s1, s2) => [s1, s2])
                .subscribe(sources => {
                if (isDoc$2 && this.overlay.groupStackLength(dialogRef) === 1) {
                    document.body.classList.remove('modal-open');
                }
                completer.resolve();
            });
            return completer.promise;
        });
        return dialogRef;
    }
    createBackdrop(dialogRef, BackdropComponent) {
        return dialogRef.overlayRef.instance.addComponent(BackdropComponent);
    }
    createContainer(dialogRef, ContainerComponent, content) {
        const nodes = dialogRef.overlayRef.instance.getProjectables(content);
        return dialogRef.overlayRef.instance.addComponent(ContainerComponent, nodes);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: Modal, deps: [{ token: Overlay }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: Modal, providedIn: 'root' }); }
};
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: Modal$1, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: Overlay }] });

// heavily inspired by:
// http://www.bennadel.com/blog/3025-creating-custom-dom-and-host-event-bindings-in-angular-2-beta-6.htm
// TODO: use DI factory for this.
// TODO: consolidate dup code
const isDoc$1 = !(typeof document === 'undefined' || !document);
const eventMap = {
    clickOutside: 'click',
    mousedownOutside: 'mousedown',
    mouseupOutside: 'mouseup',
    mousemoveOutside: 'mousemove'
};
/**
 * An event handler factory for event handlers that bubble the event to a given handler
 * if the event target is not an ancestor of the given element.
 * @param element
 * @param handler
 */
function bubbleNonAncestorHandlerFactory(element, handler) {
    return (event) => {
        let current = event.target;
        do {
            if (current === element) {
                return;
            }
        } while (current.parentNode && (current = current.parentNode));
        handler(event);
    };
}
class DOMOutsideEventPlugin {
    constructor() {
        if (!isDoc$1 || typeof document.addEventListener !== 'function') {
            this.addEventListener = noop;
        }
    }
    supports(eventName) {
        return eventMap.hasOwnProperty(eventName);
    }
    addEventListener(element, eventName, handler) {
        const zone = this.manager.getZone();
        // A Factory that registers the event on the document, instead of the element.
        // the handler is created at runtime, and it acts as a propagation/bubble predicate, it will
        // bubble up the event (i.e: execute our original event handler) only if the event targer
        // is an ancestor of our element.
        // The event is fired inside the angular zone so change detection can kick into action.
        const onceOnOutside = () => {
            const listener = bubbleNonAncestorHandlerFactory(element, evt => zone.runGuarded(() => handler(evt)));
            // mimic BrowserDomAdapter.onAndCancel
            document.addEventListener(eventMap[eventName], listener, false);
            return () => document.removeEventListener(eventMap[eventName], listener, false);
        };
        // we run the event registration for the document in a different zone, this will make sure
        // change detection is off.
        // It turns out that if a component that use DOMOutsideEventPlugin is built from a click
        // event, we might get here before the event reached the document, causing a quick false
        // positive handling (when stopPropagation() was'nt invoked). To workaround this we wait
        // for the next vm turn and register.
        // Event registration returns a dispose function for that event, angular use it to clean
        // up after component get's destroyed. Since we need to return a dispose function
        // synchronously we have to put a wrapper for it since we will get it asynchronously,
        // i.e: after we need to return it.
        //
        return zone.runOutsideAngular(() => {
            let fn;
            setTimeout(() => fn = onceOnOutside(), 0);
            return () => {
                if (fn) {
                    fn();
                }
            };
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: DOMOutsideEventPlugin, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: DOMOutsideEventPlugin }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: DOMOutsideEventPlugin, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });

class ModalModule {
    /**
     * Returns a ModalModule pre-loaded with a list of dynamically inserted components.
     * Since dynamic components are not analysed by the angular compiler they must register manually
     * using entryComponents, this is an easy way to do it.
     * @param entryComponents A list of dynamically inserted components (dialog's).
     */
    static withComponents() {
        return {
            ngModule: ModalModule,
            providers: [
                { provide: Modal$1, useClass: Modal$1 }
            ]
        };
    }
    /**
     * Returns a NgModule for use in the root Module.
     * @param entryComponents A list of dynamically inserted components (dialog's).
     */
    static forRoot() {
        return {
            ngModule: ModalModule,
            providers: [
                { provide: OverlayRenderer, useClass: DOMOverlayRenderer },
                { provide: EVENT_MANAGER_PLUGINS, useClass: DOMOutsideEventPlugin, multi: true },
                { provide: Modal$1, useClass: Modal$1 }
            ]
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: ModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.7", ngImport: i0, type: ModalModule, declarations: [ModalOverlay,
            CSSBackdrop,
            CSSDialogContainer,
            OverlayDialogBoundary,
            OverlayTarget,
            BSModalFooter,
            BSMessageModalTitle,
            BSMessageModalBody,
            BSMessageModal,
            BSModalContainer], imports: [CommonModule], exports: [CSSBackdrop,
            CSSDialogContainer,
            OverlayDialogBoundary,
            OverlayTarget] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: ModalModule, providers: [
            Overlay,
            { provide: Modal$1, useClass: Modal$1 }
        ], imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: ModalModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ModalOverlay,
                        CSSBackdrop,
                        CSSDialogContainer,
                        OverlayDialogBoundary,
                        OverlayTarget,
                        BSModalFooter,
                        BSMessageModalTitle,
                        BSMessageModalBody,
                        BSMessageModal,
                        BSModalContainer
                    ],
                    imports: [CommonModule],
                    exports: [
                        CSSBackdrop,
                        CSSDialogContainer,
                        OverlayDialogBoundary,
                        OverlayTarget
                    ],
                    providers: [
                        Overlay,
                        { provide: Modal$1, useClass: Modal$1 }
                    ]
                }]
        }] });

/**
 * A Dialog is a
 */
class VEXDialogButtons {
    constructor() {
        /**
         * Emitted when a button was clicked
         */
        this.onButtonClick = new EventEmitter();
    }
    onClick(btn, $event) {
        $event.stopPropagation();
        this.onButtonClick.emit({ btn, $event });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: VEXDialogButtons, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: VEXDialogButtons, selector: "vex-dialog-buttons", inputs: { buttons: "buttons" }, outputs: { onButtonClick: "onButtonClick" }, ngImport: i0, template: `<div class="vex-dialog-buttons">
    <button type="button"
         *ngFor="let btn of buttons;"
         [class]="btn.cssClass"
         (click)="onClick(btn, $event)">{{btn.caption}}</button>
</div>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: VEXDialogButtons, decorators: [{
            type: Component,
            args: [{
                    selector: 'vex-dialog-buttons',
                    encapsulation: ViewEncapsulation.None,
                    template: `<div class="vex-dialog-buttons">
    <button type="button"
         *ngFor="let btn of buttons;"
         [class]="btn.cssClass"
         (click)="onClick(btn, $event)">{{btn.caption}}</button>
</div>`
                }]
        }], propDecorators: { buttons: [{
                type: Input
            }], onButtonClick: [{
                type: Output
            }] } });
/**
 * A Dialog with customized buttons wrapped in a form.
 *
 */
class DialogFormModal {
    constructor(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
    }
    onButtonClick($event) {
        $event.btn.onClick(this, $event.$event);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: DialogFormModal, deps: [{ token: DialogRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: DialogFormModal, selector: "modal-dialog", ngImport: i0, template: `<form class="vex-dialog-form">
    <ng-container *ngComponentOutlet="context.content"></ng-container>
    <vex-dialog-buttons [buttons]="context.buttons"
                        (onButtonClick)="onButtonClick($event)"></vex-dialog-buttons>
</form>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "component", type: VEXDialogButtons, selector: "vex-dialog-buttons", inputs: ["buttons"], outputs: ["onButtonClick"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: DialogFormModal, decorators: [{
            type: Component,
            args: [{
                    selector: 'modal-dialog',
                    encapsulation: ViewEncapsulation.None,
                    template: `<form class="vex-dialog-form">
    <ng-container *ngComponentOutlet="context.content"></ng-container>
    <vex-dialog-buttons [buttons]="context.buttons"
                        (onButtonClick)="onButtonClick($event)"></vex-dialog-buttons>
</form>`
                }]
        }], ctorParameters: () => [{ type: DialogRef }] });
class FormDropIn {
    constructor(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: FormDropIn, deps: [{ token: DialogRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: FormDropIn, selector: "drop-in-dialog", ngImport: i0, template: `<div class="vex-dialog-message">{{context.message}}</div>
 <div *ngIf="context.showInput" class="vex-dialog-input">
   <input #input
          autofocus
          name="vex"
          type="text"
          class="vex-dialog-prompt-input"
           (change)="context.defaultResult = input.value"
          placeholder="{{context.placeholder}}">
 </div>
 <div *ngIf="context.showCloseButton"
      [class]="context.closeClassName"
      (click)="dialog.dismiss()"></div>`, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: FormDropIn, decorators: [{
            type: Component,
            args: [{
                    selector: 'drop-in-dialog',
                    encapsulation: ViewEncapsulation.None,
                    template: `<div class="vex-dialog-message">{{context.message}}</div>
 <div *ngIf="context.showInput" class="vex-dialog-input">
   <input #input
          autofocus
          name="vex"
          type="text"
          class="vex-dialog-prompt-input"
           (change)="context.defaultResult = input.value"
          placeholder="{{context.placeholder}}">
 </div>
 <div *ngIf="context.showCloseButton"
      [class]="context.closeClassName"
      (click)="dialog.dismiss()"></div>`
                }]
        }], ctorParameters: () => [{ type: DialogRef }] });

const DEFAULT_VALUES$1 = {
    className: 'default',
    overlayClassName: 'vex-overlay',
    contentClassName: 'vex-content',
    closeClassName: 'vex-close'
};
const DEFAULT_SETTERS$2 = [
    'className',
    'overlayClassName',
    'contentClassName',
    'closeClassName',
    'showCloseButton'
];
class VEXModalContext extends ModalOpenContext {
    normalize() {
        if (!this.className) {
            this.className = DEFAULT_VALUES$1.className;
        }
        if (!this.overlayClassName) {
            this.overlayClassName = DEFAULT_VALUES$1.overlayClassName;
        }
        if (!this.contentClassName) {
            this.contentClassName = DEFAULT_VALUES$1.contentClassName;
        }
        if (!this.closeClassName) {
            this.closeClassName = DEFAULT_VALUES$1.closeClassName;
        }
        super.normalize();
    }
}
class VEXModalContextBuilder extends ModalOpenContextBuilder {
    constructor(defaultValues = undefined, initialSetters = undefined, baseType = undefined) {
        super(extend(DEFAULT_VALUES$1, defaultValues || {}), arrayUnion(DEFAULT_SETTERS$2, initialSetters || []), baseType || VEXModalContext // https://github.com/Microsoft/TypeScript/issues/7234
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

const DEFAULT_SETTERS$1 = [
    'content'
];
/**
 * Data definition
 */
class DialogPreset extends VEXModalContext {
    get showInput() { return; }
    ;
}
/**
 * A Preset representing the configuration needed to open MessageModal.
 * This is an abstract implementation with no concrete behaviour.
 * Use derived implementation.
 */
class DialogPresetBuilder extends VEXModalContextBuilder {
    constructor(modal, defaultValues = undefined, initialSetters = undefined, baseType = undefined) {
        super(extend({ modal, component: DialogFormModal, buttons: [], defaultResult: true }, defaultValues || {}), arrayUnion(DEFAULT_SETTERS$1, initialSetters || []), baseType || DialogPreset // https://github.com/Microsoft/TypeScript/issues/7234
        );
    }
    addButton(css, caption, onClick) {
        let btn = {
            cssClass: css,
            caption: caption,
            onClick: onClick
        };
        let key = privateKey('buttons');
        this[key].push(btn);
        return this;
    }
    addOkButton(text = 'OK') {
        this.addButton('vex-dialog-button-primary vex-dialog-button vex-first', text, (cmp, $event) => cmp.dialog.close(cmp.dialog.context.defaultResult));
        return this;
    }
    addCancelButton(text = 'CANCEL') {
        this.addButton('vex-dialog-button-secondary vex-dialog-button vex-last', text, (cmp, $event) => cmp.dialog.dismiss());
        return this;
    }
}

const DEFAULT_VALUES = {
    component: DialogFormModal,
    content: FormDropIn,
    okBtn: 'OK',
    cancelBtn: 'Cancel'
};
const DEFAULT_SETTERS = [
    'okBtn',
    'cancelBtn',
    'placeholder'
];
/**
 * Data definition
 */
class DropInPreset extends DialogPreset {
    get showInput() {
        return this.dropInType === DROP_IN_TYPE.prompt;
    }
}
/**
 * A Preset representing all 3 drop ins (alert, prompt, confirm)
 */
class DropInPresetBuilder extends DialogPresetBuilder {
    constructor(modal, dropInType, defaultValues = undefined) {
        super(modal, extend(extend({ modal, dropInType }, DEFAULT_VALUES), defaultValues || {}), DEFAULT_SETTERS, DropInPreset);
    }
    $$beforeOpen(config) {
        super.$$beforeOpen(config);
        if (config.okBtn) {
            this.addOkButton(config.okBtn);
        }
        switch (config.dropInType) {
            case DROP_IN_TYPE.prompt:
                config.defaultResult = undefined;
                break;
            case DROP_IN_TYPE.confirm:
                if (config.cancelBtn) {
                    this.addCancelButton(config.cancelBtn);
                }
                break;
        }
    }
}

/**
 * A component that acts as a top level container for an open modal window.
 */
class VexCSSDialogContainer extends CSSDialogContainer {
    apply(overlay) {
        overlay.setClickBoundary(this.vexContentContainer.nativeElement);
        if (this.dialog.inElement) {
            this.setStyle('padding', '20px 0 0 0');
            if (this.dialog.context.className === 'bottom-right-corner') {
                this.setStyle('overflow-y', 'hidden');
                this.renderer.setStyle(this.vexContentContainer.nativeElement, 'position', 'absolute');
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: VexCSSDialogContainer, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.7", type: VexCSSDialogContainer, selector: "css-dialog-container", host: { attributes: { "tabindex": "-1", "role": "dialog" } }, viewQueries: [{ propertyName: "vexContentContainer", first: true, predicate: ["clickBoundary"], descendants: true, read: ElementRef, static: true }], usesInheritance: true, ngImport: i0, template: `<div #clickBoundary class="{{dialog.context.contentClassName}}"><ng-content></ng-content></div>`, isInline: true, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: VexCSSDialogContainer, decorators: [{
            type: Component,
            args: [{
                    selector: 'css-dialog-container',
                    host: {
                        'tabindex': '-1',
                        'role': 'dialog'
                    },
                    encapsulation: ViewEncapsulation.None,
                    template: `<div #clickBoundary class="{{dialog.context.contentClassName}}"><ng-content></ng-content></div>`
                }]
        }], propDecorators: { vexContentContainer: [{
                type: ViewChild,
                args: ['clickBoundary', { read: ElementRef, static: true }]
            }] } });

// TODO: use DI factory for this.
// TODO: consolidate dup code
const isDoc = !(typeof document === 'undefined' || !document);
let vexV3 = false;
/**
 * Execute this method to flag that you are working with VEX version 3.
 */
function vexV3Mode() {
    vexV3 = true;
}
class Modal extends Modal$1 {
    constructor(overlay) {
        super(overlay);
    }
    alert() {
        return new DropInPresetBuilder(this, DROP_IN_TYPE.alert, { isBlocking: false });
    }
    prompt() {
        return new DropInPresetBuilder(this, DROP_IN_TYPE.prompt, {
            isBlocking: true,
            keyboard: null
        });
    }
    confirm() {
        return new DropInPresetBuilder(this, DROP_IN_TYPE.confirm, {
            isBlocking: true,
            keyboard: null
        });
    }
    create(dialogRef, content) {
        if (vexV3 === true) {
            return this.createV3(dialogRef, content);
        }
        const backdropRef = this.createBackdrop(dialogRef, CSSBackdrop);
        const containerRef = this.createContainer(dialogRef, VexCSSDialogContainer, content);
        let overlay = dialogRef.overlayRef.instance;
        let backdrop = backdropRef.instance;
        let container = containerRef.instance;
        if (dialogRef.inElement) {
            overlay.insideElement();
            overlay.setContainerStyle('position', 'relative')
                .setContainerStyle('height', '100%')
                .setContainerStyle('width', '100%');
            backdrop.setStyle('position', 'absolute')
                .setStyle('display', 'block')
                .setStyle('height', '100%')
                .setStyle('width', '100%');
            container.setStyle('position', 'relative')
                .setStyle('display', 'block')
                .setStyle('height', '100%')
                .setStyle('width', '100%');
        }
        else {
            overlay.fullscreen();
        }
        // add body class if this is the only dialog in the stack
        if (isDoc && !document.body.classList.contains('vex-open')) {
            document.body.classList.add('vex-open');
        }
        backdrop.addClass('vex-overlay');
        container.addClass(`vex vex-theme-${dialogRef.context.className}`);
        container.setStyle('display', 'block');
        if (containerRef.location.nativeElement) {
            containerRef.location.nativeElement.focus();
        }
        overlay.beforeDestroy(() => {
            backdrop.addClass('vex-closing');
            container.addClass('vex-closing');
            const completer = new PromiseCompleter();
            let animationEnd$ = backdrop.myAnimationEnd$();
            // TODO: the child element inside the container (vex-content) is the one with animation
            // need to also wait for it to end, but this requires a reference to to it.
            // the container itself is its parent, won't do.
            // animationEnd$ = combineLatest.call(animationEnd$, container.myAnimationEnd$(), (s1, s2) => [s1,s2] );
            animationEnd$.subscribe(sources => {
                isDoc && this.overlay.groupStackLength(dialogRef) === 1 && document.body.classList.remove('vex-open');
                completer.resolve();
            });
            return completer.promise;
        });
        container.apply(overlay);
        return dialogRef;
    }
    createV3(dialogRef, content) {
        const backdropRef = this.createBackdrop(dialogRef, CSSBackdrop);
        const containerRef = this.createContainer(dialogRef, CSSDialogContainer, content);
        let overlay = dialogRef.overlayRef.instance;
        let backdrop = backdropRef.instance;
        let container = containerRef.instance;
        dialogRef.inElement ? overlay.insideElement() : overlay.fullscreen();
        // add body class if this is the only dialog in the stack
        if (isDoc && !document.body.classList.contains('vex-open')) {
            document.body.classList.add('vex-open');
        }
        overlay.addClass(`vex vex-theme-${dialogRef.context.className}`);
        backdrop.addClass('vex-overlay');
        container.addClass(dialogRef.context.contentClassName);
        container.setStyle('display', 'block');
        if (dialogRef.inElement) {
            overlay.setStyle('padding', '0');
            container.setStyle('margin-top', '20px');
        }
        if (containerRef.location.nativeElement) {
            containerRef.location.nativeElement.focus();
        }
        if (dialogRef.context.className === 'bottom-right-corner') {
            overlay.setStyle('overflow-y', 'hidden');
            container.setStyle('position', 'absolute');
        }
        overlay.beforeDestroy(() => {
            overlay.addClass('vex-closing');
            const completer = new PromiseCompleter();
            let animationEnd$ = container.myAnimationEnd$();
            if (dialogRef.context.className !== 'bottom-right-corner') {
                animationEnd$ = combineLatest.call(animationEnd$, backdrop.myAnimationEnd$(), (s1, s2) => [s1, s2]);
            }
            animationEnd$.subscribe(sources => {
                isDoc && this.overlay.groupStackLength(dialogRef) === 1 && document.body.classList.remove('vex-open');
                completer.resolve();
            });
            return completer.promise;
        });
        overlay.setClickBoundary(containerRef.location.nativeElement);
        return dialogRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: Modal, deps: [{ token: Overlay }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: Modal, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: Modal, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: Overlay }] });

const providers = [
    { provide: Modal$1, useClass: Modal },
    { provide: Modal, useClass: Modal }
];
class VexModalModule {
    static getProviders() {
        return providers;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: VexModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.7", ngImport: i0, type: VexModalModule, declarations: [VexCSSDialogContainer,
            VEXDialogButtons,
            FormDropIn,
            DialogFormModal], imports: [ModalModule, CommonModule], exports: [VEXDialogButtons,
            FormDropIn,
            DialogFormModal] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: VexModalModule, providers: providers, imports: [ModalModule, CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.7", ngImport: i0, type: VexModalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ModalModule, CommonModule],
                    declarations: [
                        VexCSSDialogContainer,
                        VEXDialogButtons,
                        FormDropIn,
                        DialogFormModal
                    ],
                    exports: [
                        VEXDialogButtons,
                        FormDropIn,
                        DialogFormModal
                    ],
                    providers
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BSMessageModal, BSMessageModalBody, BSMessageModalTitle, BSModalContainer, BSModalContext, BSModalContextBuilder, BSModalFooter, BaseDynamicComponent, CSSBackdrop, CSSDialogContainer, DEFAULT_VALUES$4 as DEFAULT_VALUES, DOMOverlayRenderer, DROP_IN_TYPE, DialogBailOutError, DialogFormModal, DialogPreset, DialogPresetBuilder, DialogRef, DropInPreset, DropInPresetBuilder, FluentAssign, FluentAssignFactory, FormDropIn, MessageModalPresetBuilder, Modal$1 as Modal, ModalContext, ModalContextBuilder, ModalModule, ModalOpenContext, ModalOpenContextBuilder, ModalOverlay, OneButtonPresetBuilder, Overlay, OverlayContext, OverlayContextBuilder, OverlayDialogBoundary, OverlayRenderer, OverlayTarget, PromiseCompleter, PromptPresetBuilder, TwoButtonPresetBuilder, VEXDialogButtons, VEXModalContext, VEXModalContextBuilder, Modal as VexModal, VexModalModule, arrayUnion, createComponent, extend, overlayConfigFactory, privateKey, setAssignAlias, setAssignMethod, vexV3Mode };
//# sourceMappingURL=ngx-modialog.mjs.map
