window.APP_CONFIG = {
    API_URL: 'http://26.128.11.168:8000',
    APP_NAME: 'AI Agregator',
    VERSION: '1.0.0'
};

(function() {
    const script = document.currentScript;
    const apiUrlAttr = script ? script.getAttribute('data-api-url') : null;
    
    if (apiUrlAttr) {
        window.APP_CONFIG.API_URL = apiUrlAttr.replace(/\/$/, '');
    }
    
    const hostname = window.location.hostname;
    const port = window.location.port;
    
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    
    if (isLocalhost && port) {
        window.APP_CONFIG.API_URL = `http://${hostname}:${port}`;
    }
})();

window.API = {
    baseUrl: () => window.APP_CONFIG.API_URL || '',
    
    endpoint: (path) => {
        const base = window.API.baseUrl();
        const cleanPath = path.startsWith('/') ? path : '/' + path;
        return base + cleanPath;
    },
    
    async get(path) {
        const res = await fetch(window.API.endpoint(path), {
            credentials: 'include'
        });
        return res.json();
    },
    
    async post(path, data) {
        const res = await fetch(window.API.endpoint(path), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        return res.json();
    },
    
    async streamPost(path, data) {
        return fetch(window.API.endpoint(path), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        });
    }
};

console.log('AI Agregator Config loaded. API URL:', window.APP_CONFIG.API_URL || '(same origin)');
