import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

let pluginsRegistered = false;

export function initGsapPlugins() {
  if (typeof window !== 'undefined' && !pluginsRegistered) {
    gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
    pluginsRegistered = true;
  }
}

// Auto-initialize once module is imported
initGsapPlugins();
