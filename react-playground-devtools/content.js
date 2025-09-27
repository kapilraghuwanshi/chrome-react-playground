// Create a root container for React content
const rootContainer = document.createElement('div');
rootContainer.id = 'react-playground-root';
document.body.appendChild(rootContainer);

// Listen for code execution messages from the panel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'EXECUTE_REACT_CODE') {
        try {
            // Transform JSX code using Babel
            const transformedCode = Babel.transform(message.code, {
                presets: ['react']
            }).code;

            // Execute the transformed code
            eval(transformedCode);
        } catch (error) {
            console.error('Error executing React code:', error);
        }
    }
});