function loadScript(localPath, cdnPath) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.onload = resolve;
        script.onerror = () => {
            console.log(`Local ${localPath} failed, trying CDN...`);
            script.src = cdnPath;
            script.onerror = reject;
        };
        script.src = localPath;
        document.body.appendChild(script);
    });
}

Promise.all([
    loadScript('vendor/babel.min.js', 'https://unpkg.com/@babel/standalone/babel.min.js'),
    loadScript('vendor/react.development.js', 'https://unpkg.com/react@latest/umd/react.development.js'),
    loadScript('vendor/react-dom.development.js', 'https://unpkg.com/react-dom@latest/umd/react-dom.development.js'),
    loadScript('vendor/prettier.standalone.js', 'https://unpkg.com/prettier@3.0.3/standalone.js'),
    loadScript('vendor/prettier.parser-babel.js', 'https://unpkg.com/prettier@3.0.3/parser-babel.js')
]).then(() => {
    // Load panel.js after dependencies are loaded
    const script = document.createElement('script');
    script.src = 'panel.js';
    document.body.appendChild(script);
}).catch(err => {
    console.error('Failed to load dependencies:', err);
});
