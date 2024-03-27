import { ViewContainerRef } from '@angular/core';
declare function getVCRef(key: string): ViewContainerRef[];
declare function setVCRef(key: string, vcRef: ViewContainerRef): void;
declare function delVCRef(key: string, vcRef?: ViewContainerRef): void;
/**
 * A Simple store that holds a reference to ViewContainerRef instances by a user defined key.
 * This, with the OverlayTarget directive makes it easy to block the overlay inside an element
 * without having to use the angular query boilerplate.
 */
export declare const vcRefStore: {
    getVCRef: typeof getVCRef;
    setVCRef: typeof setVCRef;
    delVCRef: typeof delVCRef;
};
export {};
