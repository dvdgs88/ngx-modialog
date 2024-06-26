import { Observable, Subject } from 'rxjs';
import { ComponentRef, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { CreateComponentArgs } from '../framework/createComponent';
import * as i0 from "@angular/core";
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
export declare class BaseDynamicComponent implements OnDestroy {
    protected el: ElementRef;
    protected renderer: Renderer2;
    animationEnd$: Observable<TransitionEvent | AnimationEvent>;
    protected animationEnd: Subject<TransitionEvent | AnimationEvent>;
    constructor(el: ElementRef, renderer: Renderer2);
    activateAnimationListener(): void;
    /**
     * Set a specific inline style on the overlay host element.
     * @param prop The style key
     * @param value The value, undefined to remove
     */
    setStyle(prop: string, value: string): this;
    forceReflow(): void;
    addClass(css: string, forceReflow?: boolean): void;
    removeClass(css: string, forceReflow?: boolean): void;
    ngOnDestroy(): void;
    myAnimationEnd$(): Observable<AnimationEvent | TransitionEvent>;
    /**
     * Add a component, supply a view container ref.
     * Note: The components vcRef will result in a sibling.
     */
    protected _addComponent<T>(instructions: CreateComponentArgs): ComponentRef<T>;
    private onEnd;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseDynamicComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BaseDynamicComponent, never, never, {}, {}, never, never, false, never>;
}
