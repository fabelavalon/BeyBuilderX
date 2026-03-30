if ('serviceWorker' in navigator) { 
    window.addEventListener('load', () => { 
        navigator.serviceWorker.register('/BeyBuilderX/pwa/sw.js', { scope: '/BeyBuilderX/' }) 
    }) 
}