import { EventManager } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class DOMOutsideEventPlugin {
    manager: EventManager;
    constructor();
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    static ɵfac: i0.ɵɵFactoryDeclaration<DOMOutsideEventPlugin, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DOMOutsideEventPlugin>;
}
