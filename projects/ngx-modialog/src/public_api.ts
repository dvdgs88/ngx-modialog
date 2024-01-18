/*
 * Public API Surface of ngx-modialog
 */
import { Modal } from './lib/providers/index';

export * from './lib/framework/fluent-assign';
export { extend, arrayUnion, PromiseCompleter, Class } from './lib/framework/utils';
export { createComponent, CreateComponentArgs } from './lib/framework/createComponent';

export * from './lib/models/errors';

export { DialogRef } from './lib/models/dialog-ref';

export {
  DROP_IN_TYPE,
  ModalComponent,
  OverlayRenderer,
  OverlayConfig,
  CloseGuard,
  ContainerContent
} from './lib/models/tokens';

export { Modal, DOMOverlayRenderer } from './lib/providers/index';

export {
  overlayConfigFactory,
  OverlayContext,
  OverlayContextBuilder,
  ModalControllingContextBuilder
} from './lib/models/overlay-context';

export {
  Overlay,
  EmbedComponentConfig,
  ModalOverlay,
  OverlayDialogBoundary,
  OverlayTarget
} from './lib/overlay/index';

export {
  DEFAULT_VALUES,
  ModalContext,
  ModalContextBuilder
} from './lib/models/modal-context';

export { ModalOpenContext, ModalOpenContextBuilder } from './lib/models/modal-open-context';

export * from './lib/components/index';

export { ModalModule } from './lib/ngx-modialog.module';

export { BootstrapModalSize, BSModalContext, BSModalContextBuilder } from './lib/plugins/bootstrap/modal-context';
export { BSModalContainer } from './lib/plugins/bootstrap/modal-container.component';
export {
  BSMessageModal,
  BSMessageModalTitle,
  BSMessageModalBody,
  BSModalFooter,
  BSMessageModalButtonConfig,
  BSMessageModalButtonHandler
} from './lib/plugins/bootstrap/message-modal.component';

export {
  MessageModalPreset,
  MessageModalPresetBuilder
} from './lib/plugins/bootstrap/presets/message-modal-preset';

export { OneButtonPreset, OneButtonPresetBuilder } from './lib/plugins/bootstrap/presets/one-button-preset';
export {
  TwoButtonPreset,
  TwoButtonPresetBuilder,
  PromptPreset,
  PromptPresetBuilder
} from './lib/plugins/bootstrap/presets/two-button-preset';