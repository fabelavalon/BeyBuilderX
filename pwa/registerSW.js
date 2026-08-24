if ('serviceWorker' in navigator && !window.location.protocol.startsWith("file")) { 
    window.addEventListener('load', () => { 
        navigator.serviceWorker.register('/BeyBuilderX/serviceWorker.js', { scope: '/BeyBuilderX/' }) 
    }) 
}