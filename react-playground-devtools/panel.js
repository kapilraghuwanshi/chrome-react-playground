const editor = document.getElementById('editor');
const runBtn = document.getElementById('run');
const formatBtn = document.getElementById('format');
const sampleBtn = document.getElementById('sample');
const status = document.getElementById('status');
const iframeWrap = document.getElementById('iframeWrap');

// Format code using Prettier
function formatCode() {
    try {
        const code = editor.value;
        const formatted = prettier.format(code, {
            parser: "babel",
            plugins: prettierPlugins,
            semi: true,
            singleQuote: true,
            trailingComma: "all",
            printWidth: 80,
            tabWidth: 2,
            bracketSpacing: true,
            jsxBracketSameLine: false,
        });
        editor.value = formatted;
        status.textContent = 'Code formatted';
    } catch (err) {
        console.error('Formatting failed:', err);
        status.textContent = 'Formatting failed: ' + err.message;
    }
}

// Add format button handler
formatBtn.onclick = formatCode;

// Check dependency versions and sources
async function checkVersions() {
    try {
        // Determine if we're using local or CDN versions
        const isUsingLocal = {
            babel: !Babel.version.includes('latest'),
            react: !React.version.includes('latest')
        };

        // Get latest versions from npm
        const [babelRes, reactRes] = await Promise.all([
            fetch('https://registry.npmjs.org/@babel/standalone/latest'),
            fetch('https://registry.npmjs.org/react/latest')
        ]);
        const babelData = await babelRes.json();
        const reactData = await reactRes.json();

        // Current versions
        const currentBabel = Babel.version;
        const currentReact = React.version;

        // Prepare status message
        const statusParts = [];

        // Add source information
        statusParts.push(`Using ${isUsingLocal.babel ? 'local' : 'CDN'} Babel`);
        statusParts.push(`Using ${isUsingLocal.react ? 'local' : 'CDN'} React`);

        // Check for updates
        if (babelData.version !== currentBabel || reactData.version !== currentReact) {
            console.log(`Updates available:
                Babel ${currentBabel} → ${babelData.version} (${isUsingLocal.babel ? 'local' : 'CDN'})
                React ${currentReact} → ${reactData.version} (${isUsingLocal.react ? 'local' : 'CDN'})
            `);
            statusParts.push('Updates available');
        }

        status.textContent = statusParts.join(' | ');
    } catch (err) {
        console.error('Version check failed:', err);
        status.textContent = 'Using offline versions';
    }
}

// Check versions when the panel loads
setTimeout(checkVersions, 1000); // Slight delay to ensure dependencies are loaded

const SAMPLE = `
export default function App() {
  const [n, setN] = React.useState(0);
  return <div style={{padding:12, fontFamily:'sans-serif'}}>
    <h4>Playground (iframe)</h4>
    <p>Counter: {n}</p>
    <button onClick={() => setN(n+1)}>Increment</button>
  </div>;
}
`.trim();

sampleBtn.onclick = () => editor.value = SAMPLE;

// Create sandboxed iframe (no allow-same-origin -> stricter isolation)
const iframe = document.createElement('iframe');
iframe.id = 'playground_iframe';
iframe.style.width = '100%';
iframe.style.height = '100%';
iframe.sandbox = 'allow-scripts'; // allow scripts only
// set src to packaged iframe page via runtime URL
iframe.src = chrome.runtime.getURL('iframe.html');
iframeWrap.appendChild(iframe);

// helper to send code to iframe
function postToIframe(message) {
    // targetOrigin set to chrome-extension origin for safety
    const targetOrigin = new URL(iframe.src).origin;
    iframe.contentWindow.postMessage(message, targetOrigin);
}

runBtn.onclick = () => {
    status.textContent = 'Compiling...';
    try {
        const userCode = editor.value || '';
        // Transform JSX -> JS (ES module style). We keep 'presets: ["react"]'.
        const res = Babel.transform(userCode, { presets: ['react'] });
        const compiled = res.code;

        // Send compiled code to iframe for execution
        postToIframe({ type: 'RUN_COMPILED', compiled });

        status.textContent = 'Sent to sandbox.';
    } catch (e) {
        console.error(e);
        status.textContent = 'Compile error: ' + e.message;
    }
};

// Optional: show errors posted back from iframe
window.addEventListener('message', (ev) => {
    // ensure message from our iframe origin
    if (ev.source === iframe.contentWindow && ev.data && ev.data.type) {
        if (ev.data.type === 'EXEC_SUCCESS') status.textContent = 'Executed OK';
        if (ev.data.type === 'EXEC_ERROR') status.textContent = 'Runtime error: ' + ev.data.error;
    }
});
