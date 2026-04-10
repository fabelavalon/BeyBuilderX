if ('serviceWorker' in navigator) { 
    window.addEventListener('load', () => { 
        navigator.serviceWorker.register('/BeyBuilderX/serviceWorker.js', { scope: '/BeyBuilderX/' }) 
    }) 
}