/**
 * Tests for double-click-to-reset on the speed indicator
 */

import {
  installChromeMock,
  cleanupChromeMock,
  resetMockStorage,
} from '../../helpers/chrome-mock.js';
import { createMockVideo, createMockDOM } from '../../helpers/test-utils.js';
let mockDOM;

describe('SpeedIndicatorReset', () => {
  beforeEach(() => {
    installChromeMock();
    resetMockStorage();
    mockDOM = createMockDOM();

    if (window.VSC && window.VSC.stateManager) {
      window.VSC.stateManager.controllers.clear();
    }
    if (window.VSC && window.VSC.siteHandlerManager) {
      window.VSC.siteHandlerManager.initialize(document);
    }
  });

  afterEach(() => {
    cleanupChromeMock();
    if (window.VSC && window.VSC.stateManager) {
      window.VSC.stateManager.controllers.clear();
    }
    document.querySelectorAll('video, audio').forEach((el) => el.remove());
    if (mockDOM) {
      mockDOM.cleanup();
    }
  });

  it('ControlsManager sets up dblclick handler on speed indicator', async () => {
    const config = window.VSC.videoSpeedConfig;
    await config.load();
    const eventManager = new window.VSC.EventManager(config, null);
    const actionHandler = new window.VSC.ActionHandler(config, eventManager);

    const mockVideo = createMockVideo();
    mockDOM.container.appendChild(mockVideo);
    const controller = new window.VSC.VideoController(mockVideo, null, config, actionHandler);

    // Change speed away from 1.0
    mockVideo.playbackRate = 2.0;
    if (mockVideo.vsc.speedIndicator) {
      mockVideo.vsc.speedIndicator.textContent = '2.00';
    }

    // Track if reset was called
    let resetCalled = false;
    const origRunAction = actionHandler.runAction.bind(actionHandler);
    actionHandler.runAction = (action, value, e) => {
      if (action === 'reset') {
        resetCalled = true;
      }
      return origRunAction(action, value, e);
    };

    // Dispatch dblclick on the speed indicator
    const speedIndicator = controller.div.shadowRoot.querySelector('.draggable');
    const dblClickEvent = new Event('dblclick', { bubbles: true, cancelable: true });
    Object.defineProperty(dblClickEvent, 'target', { value: speedIndicator, writable: true });
    speedIndicator.dispatchEvent(dblClickEvent);

    expect(resetCalled).toBe(true);
  });
});
