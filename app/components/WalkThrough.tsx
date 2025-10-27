'use client';

import { useEffect, useRef } from 'react';
import FadeIn from './FadeIn';
import { useTranslation } from '../../lib/context/TranslationContext';

declare global {
  interface Window {
    Marzipano: any;
    bowser: any;
    screenfull: any;
    APP_DATA: any;
  }
}

export default function WalkThrough() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scriptsLoaded = false;

    const initializeTour = async () => {
      // Load styles if not already loaded - using scoped CSS
      const styleLink = document.createElement('link');
      styleLink.rel = 'stylesheet';
      styleLink.href = '/app-files/walkthrough-scoped.css';
      if (!document.head.querySelector(`link[href="${styleLink.href}"]`)) {
        document.head.appendChild(styleLink);
      }

      // Add container classes required by the tour
      container.classList.add('multiple-scenes', 'desktop');

      // Load vendor scripts
      const loadScript = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
          if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
          }
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed to load ${src}`));
          document.body.appendChild(script);
        });
      };

      try {
        await loadScript('/app-files/vendor/screenfull.min.js');
        await loadScript('/app-files/vendor/bowser.min.js');
        await loadScript('/app-files/vendor/marzipano.js');
        await loadScript('/app-files/data.js');

        if (!scriptsLoaded) {
          // Wait for scripts to initialize
          setTimeout(() => {
            const initScript = document.createElement('script');
            initScript.textContent = `
              (function() {
                var Marzipano = window.Marzipano;
                var bowser = window.bowser;
                var screenfull = window.screenfull;
                var data = window.APP_DATA;

                // Grab elements from DOM.
                var panoElement = document.querySelector('#pano');
                if (!panoElement) return;
                
                var sceneNameElement = document.querySelector('#titleBar .sceneName');
                var sceneListElement = document.querySelector('#sceneList');
                var sceneElements = document.querySelectorAll('#sceneList .scene');
                var sceneListToggleElement = document.querySelector('#sceneListToggle');
                var autorotateToggleElement = document.querySelector('#autorotateToggle');
                var fullscreenToggleElement = document.querySelector('#fullscreenToggle');

                // Detect desktop or mobile mode for the container.
                var container = panoElement.closest('.walkthrough-container');
                if (!container) return;
                
                if (window.matchMedia) {
                  var setMode = function() {
                    if (mql.matches) {
                      container.classList.remove('desktop');
                      container.classList.add('mobile');
                    } else {
                      container.classList.remove('mobile');
                      container.classList.add('desktop');
                    }
                  };
                  var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
                  setMode();
                  mql.addListener(setMode);
                } else {
                  container.classList.add('desktop');
                }

                // Detect whether we are on a touch device.
                container.classList.add('no-touch');
                var touchHandler = function() {
                  container.classList.remove('no-touch');
                  container.classList.add('touch');
                  window.removeEventListener('touchstart', touchHandler);
                };
                window.addEventListener('touchstart', touchHandler);

                // Use tooltip fallback mode on IE < 11.
                if (bowser.msie && parseFloat(bowser.version) < 11) {
                  container.classList.add('tooltip-fallback');
                }

                // Viewer options.
                var viewerOpts = {
                  controls: {
                    mouseViewMode: data.settings.mouseViewMode
                  }
                };

                // Initialize viewer.
                var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

                // Create scenes.
                var scenes = data.scenes.map(function(data) {
                  var urlPrefix = "app-files/tiles";
                  var source = Marzipano.ImageUrlSource.fromString(
                    urlPrefix + "/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
                    { cubeMapPreviewUrl: urlPrefix + "/" + data.id + "/preview.jpg" });
                  var geometry = new Marzipano.CubeGeometry(data.levels);

                  var limiter = Marzipano.RectilinearView.limit.traditional(data.faceSize, 100*Math.PI/180, 120*Math.PI/180);
                  var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

                  var scene = viewer.createScene({
                    source: source,
                    geometry: geometry,
                    view: view,
                    pinFirstLevel: true
                  });

                  // Create link hotspots.
                  data.linkHotspots.forEach(function(hotspot) {
                    var element = createLinkHotspotElement(hotspot);
                    scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
                  });

                  // Create info hotspots.
                  data.infoHotspots.forEach(function(hotspot) {
                    var element = createInfoHotspotElement(hotspot);
                    scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
                  });

                  return {
                    data: data,
                    scene: scene,
                    view: view
                  };
                });

                // Set up autorotate, if enabled.
                var autorotate = Marzipano.autorotate({
                  yawSpeed: 0.03,
                  targetPitch: 0,
                  targetFov: Math.PI/2
                });
                if (data.settings.autorotateEnabled) {
                  autorotateToggleElement.classList.add('enabled');
                }

                // Set handler for autorotate toggle.
                autorotateToggleElement.addEventListener('click', toggleAutorotate);

                // Set up fullscreen mode, if supported.
                if (screenfull.enabled && data.settings.fullscreenButton) {
                  container.classList.add('fullscreen-enabled');
                  fullscreenToggleElement.addEventListener('click', function() {
                    screenfull.toggle();
                  });
                  screenfull.on('change', function() {
                    if (screenfull.isFullscreen) {
                      fullscreenToggleElement.classList.add('enabled');
                    } else {
                      fullscreenToggleElement.classList.remove('enabled');
                    }
                  });
                } else {
                  container.classList.add('fullscreen-disabled');
                }

                // Set handler for scene list toggle.
                sceneListToggleElement.addEventListener('click', toggleSceneList);

                // Start with the scene list open on desktop.
                if (!container.classList.contains('mobile')) {
                  showSceneList();
                }

                // Set handler for scene switch.
                scenes.forEach(function(scene) {
                  var el = document.querySelector('#sceneList .scene[data-id="' + scene.data.id + '"]');
                  if (el) {
                    el.addEventListener('click', function() {
                      switchScene(scene);
                      // On mobile, hide scene list after selecting a scene.
                      if (container.classList.contains('mobile')) {
                        hideSceneList();
                      }
                    });
                  }
                });

                function sanitize(s) {
                  return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
                }

                function switchScene(scene) {
                  stopAutorotate();
                  scene.view.setParameters(scene.data.initialViewParameters);
                  scene.scene.switchTo();
                  startAutorotate();
                  updateSceneName(scene);
                  updateSceneList(scene);
                }

                function updateSceneName(scene) {
                  if (sceneNameElement) {
                    sceneNameElement.innerHTML = sanitize(scene.data.name);
                  }
                }

                function updateSceneList(scene) {
                  for (var i = 0; i < sceneElements.length; i++) {
                    var el = sceneElements[i];
                    if (el.getAttribute('data-id') === scene.data.id) {
                      el.classList.add('current');
                    } else {
                      el.classList.remove('current');
                    }
                  }
                }

                function showSceneList() {
                  sceneListElement.classList.add('enabled');
                  sceneListToggleElement.classList.add('enabled');
                }

                function hideSceneList() {
                  sceneListElement.classList.remove('enabled');
                  sceneListToggleElement.classList.remove('enabled');
                }

                function toggleSceneList() {
                  sceneListElement.classList.toggle('enabled');
                  sceneListToggleElement.classList.toggle('enabled');
                }

                function startAutorotate() {
                  if (!autorotateToggleElement.classList.contains('enabled')) {
                    return;
                  }
                  viewer.startMovement(autorotate);
                  viewer.setIdleMovement(3000, autorotate);
                }

                function stopAutorotate() {
                  viewer.stopMovement();
                  viewer.setIdleMovement(Infinity);
                }

                function toggleAutorotate() {
                  if (autorotateToggleElement.classList.contains('enabled')) {
                    autorotateToggleElement.classList.remove('enabled');
                    stopAutorotate();
                  } else {
                    autorotateToggleElement.classList.add('enabled');
                    startAutorotate();
                  }
                }

                function createLinkHotspotElement(hotspot) {
                  var wrapper = document.createElement('div');
                  wrapper.classList.add('hotspot');
                  wrapper.classList.add('link-hotspot');
                  var icon = document.createElement('img');
                  icon.src = 'app-files/img/link.png';
                  icon.classList.add('link-hotspot-icon');
                  var transformProperties = [ '-ms-transform', '-webkit-transform', 'transform' ];
                  for (var i = 0; i < transformProperties.length; i++) {
                    var property = transformProperties[i];
                    icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
                  }
                  wrapper.addEventListener('click', function() {
                    switchScene(findSceneById(hotspot.target));
                  });
                  stopTouchAndScrollEventPropagation(wrapper);
                  var tooltip = document.createElement('div');
                  tooltip.classList.add('hotspot-tooltip');
                  tooltip.classList.add('link-hotspot-tooltip');
                  tooltip.innerHTML = findSceneDataById(hotspot.target).name;
                  wrapper.appendChild(icon);
                  wrapper.appendChild(tooltip);
                  return wrapper;
                }

                function createInfoHotspotElement(hotspot) {
                  var wrapper = document.createElement('div');
                  wrapper.classList.add('hotspot');
                  wrapper.classList.add('info-hotspot');
                  var header = document.createElement('div');
                  header.classList.add('info-hotspot-header');
                  var iconWrapper = document.createElement('div');
                  iconWrapper.classList.add('info-hotspot-icon-wrapper');
                  var icon = document.createElement('img');
                  icon.src = 'app-files/img/info.png';
                  icon.classList.add('info-hotspot-icon');
                  iconWrapper.appendChild(icon);
                  var titleWrapper = document.createElement('div');
                  titleWrapper.classList.add('info-hotspot-title-wrapper');
                  var title = document.createElement('div');
                  title.classList.add('info-hotspot-title');
                  title.innerHTML = hotspot.title;
                  titleWrapper.appendChild(title);
                  var closeWrapper = document.createElement('div');
                  closeWrapper.classList.add('info-hotspot-close-wrapper');
                  var closeIcon = document.createElement('img');
                  closeIcon.src = 'app-files/img/close.png';
                  closeIcon.classList.add('info-hotspot-close-icon');
                  closeWrapper.appendChild(closeIcon);
                  header.appendChild(iconWrapper);
                  header.appendChild(titleWrapper);
                  header.appendChild(closeWrapper);
                  var text = document.createElement('div');
                  text.classList.add('info-hotspot-text');
                  text.innerHTML = hotspot.text;
                  wrapper.appendChild(header);
                  wrapper.appendChild(text);
                  var modal = document.createElement('div');
                  modal.innerHTML = wrapper.innerHTML;
                  modal.classList.add('info-hotspot-modal');
                  container.appendChild(modal);
                  var toggle = function() {
                    wrapper.classList.toggle('visible');
                    modal.classList.toggle('visible');
                  };
                  wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle);
                  modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle);
                  stopTouchAndScrollEventPropagation(wrapper);
                  return wrapper;
                }

                function stopTouchAndScrollEventPropagation(element, eventList) {
                  var eventList = [ 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'wheel', 'mousewheel' ];
                  for (var i = 0; i < eventList.length; i++) {
                    element.addEventListener(eventList[i], function(event) {
                      event.stopPropagation();
                    });
                  }
                }

                function findSceneById(id) {
                  for (var i = 0; i < scenes.length; i++) {
                    if (scenes[i].data.id === id) {
                      return scenes[i];
                    }
                  }
                  return null;
                }

                function findSceneDataById(id) {
                  for (var i = 0; i < data.scenes.length; i++) {
                    if (data.scenes[i].id === id) {
                      return data.scenes[i];
                    }
                  }
                  return null;
                }

                // Display the initial scene.
                if (scenes.length > 0) {
                  switchScene(scenes[0]);
                }
              })();
            `;
            document.body.appendChild(initScript);
            scriptsLoaded = true;
          }, 100);
        }
      } catch (error) {
        console.error('Failed to load Marzipano tour:', error);
      }
    };

    initializeTour();

    // Cleanup
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
  }, []);

  return (
    <section id="walkthrough" className="relative bg-black text-white py-24 overflow-hidden">
      <FadeIn>
        <div className="max-w-7xl mx-auto px-4 relative z-10 mb-12">
          <h2 className="text-red-500 text-xl mb-4 text-center uppercase">{t.walkthrough.title}</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-center">
            {t.walkthrough.subtitle}
          </h3>
        </div>
      </FadeIn>
      
      <div ref={containerRef} className="walkthrough-container" style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <div id="pano" style={{ width: '100%', height: '100%' }}></div>

        <div id="sceneList">
          <ul className="scenes">
            <a href="javascript:void(0)" className="scene" data-id="0-cherry-lips">
              <li className="text">Cherry Lips</li>
            </a>
            <a href="javascript:void(0)" className="scene" data-id="1-cherry-lips">
              <li className="text">Cherry Lips</li>
            </a>
            <a href="javascript:void(0)" className="scene" data-id="2-cherry-lips">
              <li className="text">Cherry Lips</li>
            </a>
            <a href="javascript:void(0)" className="scene" data-id="3-cherry-lips">
              <li className="text">Cherry Lips</li>
            </a>
            <a href="javascript:void(0)" className="scene" data-id="4-cherry-lips">
              <li className="text">Cherry Lips</li>
            </a>
            <a href="javascript:void(0)" className="scene" data-id="5-cherry-lips">
              <li className="text">Cherry Lips</li>
            </a>
            <a href="javascript:void(0)" className="scene" data-id="6-cherry-lips">
              <li className="text">Cherry Lips</li>
            </a>
            <a href="javascript:void(0)" className="scene" data-id="7-cherry-lips">
              <li className="text">Cherry Lips</li>
            </a>
            <a href="javascript:void(0)" className="scene" data-id="8-cherry-lips">
              <li className="text">Cherry Lips</li>
            </a>
            <a href="javascript:void(0)" className="scene" data-id="9-cherry-lips">
              <li className="text">Cherry Lips</li>
            </a>
            <a href="javascript:void(0)" className="scene" data-id="10-cherry-lips">
              <li className="text">Cherry Lips</li>
            </a>
            <a href="javascript:void(0)" className="scene" data-id="11-cherry-lips">
              <li className="text">Cherry Lips</li>
            </a>
          </ul>
        </div>

        <div id="titleBar">
          <h1 className="sceneName text-transparent"></h1>
        </div>

        <a href="javascript:void(0)" id="autorotateToggle">
          <img className="icon off" src="/app-files/img/play.png" alt="Play" />
          <img className="icon on" src="/app-files/img/pause.png" alt="Pause" />
        </a>

        <a href="javascript:void(0)" id="fullscreenToggle">
          <img className="icon off" src="/app-files/img/fullscreen.png" alt="Fullscreen" />
          <img className="icon on" src="/app-files/img/windowed.png" alt="Windowed" />
        </a>

        <a href="javascript:void(0)" id="sceneListToggle">
          <img className="icon off" src="/app-files/img/expand.png" alt="Expand" />
          <img className="icon on" src="/app-files/img/collapse.png" alt="Collapse" />
        </a>

        <a href="javascript:void(0)" id="viewUp" className="viewControlButton viewControlButton-1">
          <img className="icon" src="/app-files/img/up.png" alt="Up" />
        </a>
        <a href="javascript:void(0)" id="viewDown" className="viewControlButton viewControlButton-2">
          <img className="icon" src="/app-files/img/down.png" alt="Down" />
        </a>
        <a href="javascript:void(0)" id="viewLeft" className="viewControlButton viewControlButton-3">
          <img className="icon" src="/app-files/img/left.png" alt="Left" />
        </a>
        <a href="javascript:void(0)" id="viewRight" className="viewControlButton viewControlButton-4">
          <img className="icon" src="/app-files/img/right.png" alt="Right" />
        </a>
        <a href="javascript:void(0)" id="viewIn" className="viewControlButton viewControlButton-5">
          <img className="icon" src="/app-files/img/plus.png" alt="Zoom In" />
        </a>
        <a href="javascript:void(0)" id="viewOut" className="viewControlButton viewControlButton-6">
          <img className="icon" src="/app-files/img/minus.png" alt="Zoom Out" />
        </a>
      </div>
    </section>
  );
}
