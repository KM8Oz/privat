/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */
if ('serviceWorker' in navigator) {
    console.log('service worker is in the navigator');
    const register = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/'
    });

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array("BFMm7eKFgg5s5Xmj0w9wqgv9inPDo4LrteriW54eUlsObIIqy7dxXkNghxzJCgn-ydCbRLuFW444MQLVuawwFBU"),
    });

    await fetch('https://back.p2pbet.tech/api/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    console.error('Service workers are not supported in this browser',navigator);
  }