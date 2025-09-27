// Create React Playground panel
chrome.devtools.panels.create(
    'React Playground DevTools',
    '',
    'panel.html',
    (panel) => {
        // Panel created
        console.log('React Playground panel created, now start writing your JSX..');
    }
);