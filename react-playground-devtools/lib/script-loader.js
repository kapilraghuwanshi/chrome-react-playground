function loadScript(localPath, cdnPath) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = localPath;
        script.onload = resolve;
        script.onerror = () => {
            // Try CDN as fallback if local fails
            if (cdnPath) {
                const cdnScript = document.createElement('script');
                cdnScript.src = cdnPath;
                cdnScript.onload = resolve;
                cdnScript.onerror = reject;
                document.head.appendChild(cdnScript);
            } else {
                reject(new Error(`Failed to load script: ${localPath}`));
            }
        };
        document.head.appendChild(script);
    });
}