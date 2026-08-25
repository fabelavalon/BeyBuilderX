if (!location.protocol.startsWith('file:')) 
    document.write(' <link rel="manifest" id="pwa-manifest" href="./pwa/manifest.webmanifest"> ');

if ('serviceWorker' in navigator && !window.location.protocol.startsWith("file")) { 
    window.addEventListener('load', () => { 
        navigator.serviceWorker.register('/BeyBuilderX/serviceWorker.js', { scope: '/BeyBuilderX/' }) 
    }) 
}