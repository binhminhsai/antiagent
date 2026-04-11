/// <reference types="@figma/plugin-typings" />
import { c2dToFigmaCanvas } from '@divriots/c2d-sdk';

figma.showUI(__html__, { visible: false });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'render' && msg.payload) {
    try {
      const node = await c2dToFigmaCanvas(msg.payload.output_model, msg.payload.output_images, {
        onWarning(warning) { console.warn(warning) },
      });
      if (node) {
        figma.currentPage.selection = [node as SceneNode];
        figma.viewport.scrollAndZoomIntoView([node as SceneNode]);
        figma.notify('✅ Auto-Figma: Design Output Rendered Successfully!');
      }
    } catch (e) {
      console.error(e);
      figma.notify('❌ Error rendering design: ' + e);
    }
  }
};
