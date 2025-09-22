if ('serviceWorker' in navigator) { 
    window.addEventListener('load', () => { 
        navigator.serviceWorker.register('/pwa/sw.js', { scope: '/BeyBuilderX/' }) 
    }) 
}