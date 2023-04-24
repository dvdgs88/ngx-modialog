import { ComponentRef, Injectable } from '@angular/core';

import { Overlay } from '../overlay/index';
import { Class, PromiseCompleter } from '../framework/utils';
import { OverlayConfig, ContainerContent } from '../models/tokens';
import { DialogRef } from '../models/dialog-ref';
import { combineLatest } from 'rxjs';
import { OneButtonPresetBuilder } from '../plugins/bootstrap/presets/one-button-preset';
import { PromptPresetBuilder, TwoButtonPresetBuilder } from '../plugins/bootstrap/presets/two-button-preset';
import { CSSBackdrop } from '../components/css-backdrop';
import { BSModalContainer } from '../plugins/bootstrap/modal-container.component';

// TODO: use DI factory for this.
// TODO: consolidate dup code
const isDoc: boolean = !(typeof document === 'undefined' || !document);

let animationClass = 'in';

@Injectable()
export class Modal {
  constructor(public overlay: Overlay) {
  }


  alert(): OneButtonPresetBuilder {
    return new OneButtonPresetBuilder(this, <any>{isBlocking: false});
  }

  prompt(): PromptPresetBuilder {
    return new PromptPresetBuilder(this, <any>{isBlocking: true, keyboard: null});
  }

  confirm(): TwoButtonPresetBuilder {
    return new TwoButtonPresetBuilder(this, <any>{isBlocking: true, keyboard: null});
  }

  /**
   * Opens a modal window inside an existing component.
   * @param content The content to display, either string, template ref or a component.
   * @param config Additional settings.
   */
  open(content: ContainerContent, config?: OverlayConfig): DialogRef<any> {
    config = config || {} as any;
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

  protected create(dialogRef: DialogRef<any>, content: ContainerContent): DialogRef<any> {

    const backdropRef = this.createBackdrop(dialogRef, CSSBackdrop);
    const containerRef = this.createContainer(dialogRef, BSModalContainer, content);

    const overlay = dialogRef.overlayRef.instance;
    const backdrop = backdropRef.instance;
    const container = containerRef.instance;

    dialogRef.inElement ? overlay.insideElement() : overlay.fullscreen();

    // add body class if this is the only dialog in the stack
    if (isDoc && !document.body.classList.contains('modal-open')) {
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
      const completer = new PromiseCompleter<void>();
      backdrop.removeClass(animationClass);
      container.removeClass(animationClass);

      combineLatest.call(backdrop.myAnimationEnd$(), container.myAnimationEnd$(), (s1, s2) => [s1, s2])
        .subscribe(sources => {
          if (isDoc && this.overlay.groupStackLength(dialogRef) === 1) {
            document.body.classList.remove('modal-open');
          }

          completer.resolve();
        });

      return completer.promise;
    });

    return dialogRef;
  }


  protected createBackdrop<T>(dialogRef: DialogRef<any>, BackdropComponent: Class<T>): ComponentRef<T> {
    return dialogRef.overlayRef.instance.addComponent<T>(BackdropComponent);
  }

  protected createContainer<T>(
    dialogRef: DialogRef<any>,
    ContainerComponent: Class<T>,
    content: ContainerContent): ComponentRef<T> {

    const nodes: any[] = dialogRef.overlayRef.instance.getProjectables(content);
    return dialogRef.overlayRef.instance.addComponent<T>(ContainerComponent, nodes);
  }

}
